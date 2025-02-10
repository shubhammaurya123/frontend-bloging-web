import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice.service';
import { BlogService } from '../blog.service'; 
import { Router } from '@angular/router'; // Import Router
import * as bootstrap from 'bootstrap'; 

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchTerm: string = '';
  blogs: any[] = [];

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
      // if (this.isLoggedIn) {
      //   this.router.navigate(['/dashboard/blogs']); // Redirect on login
      // }
    });

    // Fetch blogs from API
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.blogService.getBlogs().subscribe(
      (data) => {
        console.log(data, 'data');
        this.blogs = data?.blogs ?? [];
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  onBlogAdded() {
    // Refresh the blogs list after a new blog is added
    this.fetchBlogs();

    // Close the modal manually if required (for example, using Bootstrap Modal JS).
    const modal = document?.getElementById('postBlogModal');
    const modalInstance = bootstrap.Modal.getInstance(modal ?? '');
    modalInstance?.hide();
  }

  get filteredBlogPosts() {
    return this.blogs.filter(
      (post) =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.categorys?.some((category: any) =>
          category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ) ||
        post.tags?.some((tag: any) =>
          tag.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
    );
  }
}
