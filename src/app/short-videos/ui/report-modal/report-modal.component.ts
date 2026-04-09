import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule],
})
export class ReportModalComponent {

  @Output() close = new EventEmitter();

  reasons = ['Spam', 'Violence', 'Scam', 'Harassment'];
  selected = '';

  report() {
    if (!this.selected) {
      alert('Select reason');
      return;
    }

    alert('Reported: ' + this.selected);
    this.close.emit();
  }
}