import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  @Input() user: any;
  @Output() close = new EventEmitter();

  isFollowing = false;

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }
}