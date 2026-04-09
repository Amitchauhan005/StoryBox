import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Hls from 'hls.js';
import Plyr from 'plyr';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements AfterViewInit, OnDestroy {

  constructor(private http: HttpClient) {}

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  movies: any[] = [];
  selectedMovie: any;

  page = 1;
  loading = false;

  hls!: Hls;
  player!: any;

  // 🔥 Loader
  isLoading = true;

  // ================= INIT =================

  ngOnInit() {
    this.getMovies();
  }

  ngAfterViewInit() {
    this.loadVideo();
  }

  ngOnDestroy() {
    if (this.hls) this.hls.destroy();
    if (this.player) this.player.destroy();
  }

  // ================= LOAD VIDEO =================

  loadVideo(url?: string) {
    const video = this.videoPlayer.nativeElement;
    const videoSrc = url || 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

    this.isLoading = true;

    // destroy old
    if (this.hls) this.hls.destroy();
    if (this.player) this.player.destroy();

    // 🎯 VIDEO EVENTS (Loader control)
    video.onwaiting = () => this.isLoading = true;
    video.onplaying = () => this.isLoading = false;
    video.oncanplay = () => this.isLoading = false;

    if (Hls.isSupported()) {

      this.hls = new Hls();
      this.hls.loadSource(videoSrc);
      this.hls.attachMedia(video);

      // 🎯 HLS EVENTS (extra smooth loader)
      this.hls.on(Hls.Events.FRAG_LOADING, () => {
        this.isLoading = true;
      });

      this.hls.on(Hls.Events.FRAG_BUFFERED, () => {
        this.isLoading = false;
      });

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {

        const levels = this.hls.levels;

        // 🔥 SORT (high → low)
        levels.sort((a: any, b: any) => b.height - a.height);

        // 🔥 index-based quality
        const qualityOptions = levels.map((l: any, i: number) => i);
        qualityOptions.unshift(-1); // AUTO

        // 🔥 labels
        const qualityLabels: any = {
          [-1]: 'Auto'
        };

        levels.forEach((l: any, i: number) => {
          qualityLabels[i] = l.height + 'p';
        });

        // 🔥 Plyr init
        this.player = new Plyr(video, {
          controls: [
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen'
          ],

          settings: ['quality', 'speed'],

          quality: {
            default: -1,
            options: qualityOptions,
            forced: true,
            onChange: (q: number) => {
              this.hls.currentLevel = q;
            }
          },

          i18n: {
            qualityLabel: qualityLabels
          },

          speed: {
            selected: 1,
            options: [0.5, 1, 1.5, 2]
          }
        });

        this.player.play();
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {

      video.src = videoSrc;

      this.player = new Plyr(video);

      video.onloadedmetadata = () => {
        this.isLoading = false;
        this.player.play();
      };
    }
  }

  // ================= API =================

  getMovies() {
    if (this.loading) return;

    this.loading = true;

    this.http.get<any>(
      `https://api.themoviedb.org/3/movie/popular?api_key=325be08aa92d074eb7536755cb3010ab&page=${this.page}`
    ).subscribe(res => {

      this.movies = [...this.movies, ...res.results];

      if (!this.selectedMovie && this.movies.length > 0) {
        this.selectedMovie = this.movies[0];
      }

      this.page++;
      this.loading = false;

    }, err => {
      console.error(err);
      this.loading = false;
    });
  }

  // ================= SCROLL =================

  onScroll(event: any) {
    const el = event.target;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      this.getMovies();
    }
  }

  // ================= SELECT MOVIE =================

  selectMovie(movie: any) {
    this.selectedMovie = movie;

    const container = document.querySelector('.movie-list');
    if (container) container.scrollTop = 0;

    this.loadVideo();
  }

  // ================= CONTROLS =================

  rewind() {
    if (this.player) this.player.currentTime -= 10;
  }

  forward() {
    if (this.player) this.player.currentTime += 10;
  }

  changeSpeed() {
    if (!this.player) return;

    const speeds = [1, 1.5, 2];
    const index = speeds.indexOf(this.player.speed);
    this.player.speed = speeds[(index + 1) % speeds.length];
  }

  toggleFullscreen() {
    if (this.player) {
      this.player.fullscreen.toggle();
    }
  }
}