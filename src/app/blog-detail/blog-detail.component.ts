import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from '../blog.service';
import { AuthService } from '../authservice.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blog: any = {};
  relatedBlogs: any[] = [];
  newComment: string = '';
  newReply: string = '';
  replyingTo: string | null = null;
  showAlert: boolean = false;
  token: string | null = null;
  currentUser: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.fetchBlog(blogId);
    }

    this.token = localStorage.getItem('token');
    this.currentUser = this.authService.getUserName();
  }

  fetchBlog(blogId: string) {
    this.blogService.getBlogById(blogId).subscribe((data) => {
      this.blog = data.blog;
      this.relatedBlogs = data.relatedBlogs;
    });
  }

  addComment(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.newComment.trim()) {
      this.blog.comments.push({
        id: Date.now().toString(),
        userId: this.currentUser,
        user: this.authService.getUserName(),
        comment: this.newComment,
        date: new Date().toISOString(),
        isApproved: true, // Requires approval
        replies: [],
      });

      this.newComment = '';
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 5000);
    }
  }

  toggleReply(commentId: string) {
    this.replyingTo = this.replyingTo === commentId ? null : commentId;
  }

  addReply(commentId: string) {
    if (!this.newReply.trim()) return;

    const comment = this.blog.comments.find((c: any) => c.id === commentId);
    if (comment) {
      comment.replies.push({
        user: this.currentUser,
        date: new Date().toISOString(),
        comment: this.newReply,
      });
    }

    this.newReply = '';
    this.replyingTo = null;
  }

  cancelReply() {
    this.newReply = '';
    this.replyingTo = null;
  }
}
