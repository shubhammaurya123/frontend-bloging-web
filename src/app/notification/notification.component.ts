import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notifications = [
    {
      id: 1,
      userName: 'John Doe',
      comment: 'This blog post was very helpful, thanks!',
      commentTime: '2025-02-08T14:30:00Z',
      status: 'pending'
    },
    {
      id: 2,
      userName: 'Jane Smith',
      comment: 'I have a question regarding the setup process.',
      commentTime: '2025-02-08T15:00:00Z',
      status: 'approved'
    },
    {
      id: 3,
      userName: 'Samuel Lee',
      comment: 'Great article, but I think some points need clarification.',
      commentTime: '2025-02-08T16:45:00Z',
      status: 'rejected'
    }
  ];

  approveComment(notification: any): void {
    notification.status = 'approved';
  }

  rejectComment(notification: any): void {
    notification.status = 'rejected';
  }
}
