import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface VideoFilter {
  name: string;
  label: string;
  css: string;
  icon: string;
}

export interface Clip {
  id: number;
  blob: Blob;
  url: string;
  duration: number;
  thumbnail: string;
  filterName: string;
  text: string;
}

@Component({
  selector: 'app-make-reel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './make-reel.component.html',
  styleUrl: './make-reel.component.css'
})
export class MakeReelComponent implements OnDestroy {

  @ViewChild('cameraVideo')   cameraVideoRef!:   ElementRef<HTMLVideoElement>;
  @ViewChild('filterCanvas')  filterCanvasRef!:  ElementRef<HTMLCanvasElement>;
  @ViewChild('previewVideo')  previewVideoRef!:  ElementRef<HTMLVideoElement>;

  /* ── UI State ──────────────────────────────────────────── */
  cameraStarted    = false;
  isRecording      = false;
  recordingTime    = 0;
  statusMsg        = 'Start camera to begin';
  statusType       = 'idle';           // idle | active | recording | done
  selectedClipIdx  = -1;
  overlayText      = '';
  activeFilterName = 'none';
  showTextPanel    = false;
  errorMsg         = '';

  /* ── Media ─────────────────────────────────────────────── */
  private stream:         MediaStream | null = null;
  private mediaRecorder:  MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private animFrameId:    number | null = null;
  private timerInterval:  any = null;
  private clipIdCounter   = 0;

  clips: Clip[] = [];

  /* ── Filters ───────────────────────────────────────────── */
  filters: VideoFilter[] = [
    { name: 'none',      label: 'Normal',   css: 'none',                                                 icon: '☀️' },
    { name: 'grayscale', label: 'B&W',      css: 'grayscale(100%)',                                      icon: '⬛' },
    { name: 'sepia',     label: 'Sepia',    css: 'sepia(80%)',                                           icon: '🟤' },
    { name: 'vivid',     label: 'Vivid',    css: 'saturate(220%) contrast(115%)',                        icon: '🌈' },
    { name: 'cold',      label: 'Ice',      css: 'hue-rotate(190deg) saturate(140%) brightness(105%)',   icon: '🧊' },
    { name: 'warm',      label: 'Warm',     css: 'sepia(45%) saturate(160%) brightness(108%)',           icon: '🔶' },
    { name: 'noir',      label: 'Noir',     css: 'grayscale(100%) contrast(160%) brightness(75%)',       icon: '🖤' },
    { name: 'vintage',   label: 'Vintage',  css: 'sepia(55%) hue-rotate(10deg) saturate(75%) brightness(88%)', icon: '📷' },
    { name: 'neon',      label: 'Neon',     css: 'hue-rotate(270deg) saturate(300%) contrast(120%)',    icon: '💜' },
    { name: 'dreamy',    label: 'Dreamy',   css: 'blur(1px) brightness(115%) saturate(130%)',            icon: '✨' },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  /* ── Camera ─────────────────────────────────────────────── */
  async startCamera() {
    this.errorMsg = '';
    this.setStatus('Requesting camera…', 'idle');

    const attempts = [
      { video: true, audio: true },
      { video: true, audio: false },
      { video: { facingMode: 'user' }, audio: false },
    ];

    for (const constraints of attempts) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = this.cameraVideoRef.nativeElement;
        video.srcObject = this.stream;
        await video.play();

        video.onloadedmetadata = () => {
          this.cameraStarted = true;
          const hasAudio = this.stream!.getAudioTracks().length > 0;
          this.setStatus(`Camera ready ${hasAudio ? '+ mic' : '(no mic)'} — choose filter & record`, 'active');
          this.startCanvasLoop();
          this.cdr.detectChanges();
        };
        return;

      } catch (err: any) {
        console.warn('Camera attempt failed:', constraints, err.name);
      }
    }

    // All failed
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideo = devices.some(d => d.kind === 'videoinput');
      this.errorMsg = hasVideo
        ? '📷 Camera detected but busy — close Zoom/Teams then retry'
        : '📷 No camera found — plug one in or use HTTPS/localhost';
    } catch {
      this.errorMsg = '❌ Camera unavailable. Run on localhost or HTTPS.';
    }
    this.setStatus('Camera failed', 'idle');
  }

  /* ── Canvas filter loop ─────────────────────────────────── */
  private startCanvasLoop() {
    const draw = () => {
      const video  = this.cameraVideoRef?.nativeElement;
      const canvas = this.filterCanvasRef?.nativeElement;
      if (!video || !canvas) return;

      const ctx = canvas.getContext('2d')!;
      canvas.width  = video.videoWidth  || 640;
      canvas.height = video.videoHeight || 360;

      const f = this.filters.find(x => x.name === this.activeFilterName);
      ctx.filter = f?.css ?? 'none';
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (this.overlayText.trim()) {
        ctx.filter = 'none';
        const fontSize = Math.max(20, Math.round(canvas.width / 18));
        ctx.font      = `bold ${fontSize}px 'Segoe UI', sans-serif`;
        ctx.textAlign = 'center';
        // Shadow for readability
        ctx.shadowColor   = 'rgba(0,0,0,0.7)';
        ctx.shadowBlur    = 8;
        ctx.fillStyle     = '#ffffff';
        ctx.strokeStyle   = '#000000';
        ctx.lineWidth     = 3;
        const x = canvas.width / 2;
        const y = canvas.height - 40;
        ctx.strokeText(this.overlayText, x, y);
        ctx.fillText(this.overlayText, x, y);
        ctx.shadowBlur = 0;
      }

      this.animFrameId = requestAnimationFrame(draw);
    };
    draw();
  }

  /* ── Recording ──────────────────────────────────────────── */
  startRecording() {
    const canvas = this.filterCanvasRef.nativeElement;
    const canvasStream = canvas.captureStream(30);

    // Attach audio tracks
    this.stream?.getAudioTracks().forEach(t => canvasStream.addTrack(t));

    const mimeType = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']
      .find(m => MediaRecorder.isTypeSupported(m)) || '';

    this.mediaRecorder  = new MediaRecorder(canvasStream, mimeType ? { mimeType } : {});
    this.recordedChunks = [];

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.recordedChunks.push(e.data);
    };

    this.mediaRecorder.onstop = () => this.onRecordingStop();

    this.mediaRecorder.start(200);
    this.isRecording  = true;
    this.recordingTime = 0;
    this.setStatus('● Recording…', 'recording');
    this.timerInterval = setInterval(() => { this.recordingTime++; this.cdr.detectChanges(); }, 1000);
  }

  stopRecording() {
    if (this.mediaRecorder?.state !== 'inactive') {
      this.mediaRecorder?.stop();
    }
    clearInterval(this.timerInterval);
  }

  private onRecordingStop() {
    const canvas = this.filterCanvasRef.nativeElement;
    const blob   = new Blob(this.recordedChunks, { type: 'video/webm' });
    const clip: Clip = {
      id:         ++this.clipIdCounter,
      blob,
      url:        URL.createObjectURL(blob),
      duration:   this.recordingTime,
      thumbnail:  canvas.toDataURL('image/jpeg', 0.6),
      filterName: this.activeFilterName,
      text:       this.overlayText,
    };
    this.clips.push(clip);
    this.isRecording   = false;
    this.recordingTime = 0;
    this.setStatus(`Clip ${clip.id} saved (${clip.duration}s) — record more or export`, 'done');
    this.cdr.detectChanges();
  }

  /* ── Clip actions ───────────────────────────────────────── */
  selectClip(index: number) {
    this.selectedClipIdx = index;
    const preview = this.previewVideoRef.nativeElement;
    preview.src   = this.clips[index].url;
    preview.play();
  }

  deleteClip(index: number, e: Event) {
    e.stopPropagation();
    URL.revokeObjectURL(this.clips[index].url);
    this.clips.splice(index, 1);
    if (this.selectedClipIdx === index) {
      this.selectedClipIdx = -1;
      this.previewVideoRef.nativeElement.src = '';
    }
    this.cdr.detectChanges();
  }

  downloadClip(index: number, e: Event) {
    e.stopPropagation();
    const clip = this.clips[index];
    this.triggerDownload(clip.url, `reel-clip-${clip.id}.webm`);
  }

  exportReel() {
    if (!this.clips.length) return;
    const merged = new Blob(this.clips.map(c => c.blob), { type: 'video/webm' });
    const url    = URL.createObjectURL(merged);
    this.triggerDownload(url, `my-reel-${Date.now()}.webm`);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    this.setStatus('🎬 Reel exported!', 'done');
  }

  private triggerDownload(url: string, name: string) {
    const a    = document.createElement('a');
    a.href     = url;
    a.download = name;
    a.click();
  }

  /* ── Helpers ────────────────────────────────────────────── */
  setFilter(name: string)       { this.activeFilterName = name; }
  toggleTextPanel()             { this.showTextPanel = !this.showTextPanel; }

  private setStatus(msg: string, type: string) {
    this.statusMsg  = msg;
    this.statusType = type;
  }

  formatTime(s: number): string {
    const m   = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  get totalDuration(): number {
    return this.clips.reduce((a, c) => a + c.duration, 0);
  }

  get activeFilterCss(): string {
    return this.filters.find(f => f.name === this.activeFilterName)?.css ?? 'none';
  }

  ngOnDestroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.stream?.getTracks().forEach(t => t.stop());
    clearInterval(this.timerInterval);
    this.clips.forEach(c => URL.revokeObjectURL(c.url));
  }
}