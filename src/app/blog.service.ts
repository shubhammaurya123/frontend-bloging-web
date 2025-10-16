import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseApi = 'http://54.92.219.55'; // Update this URL

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<{ blogs: any[] }> {
    return this.http.get<{ blogs: any[] }>(`${this.baseApi}/api/post/all`);
  }

  getBlogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseApi}/api/post/${id}`);
  }

  createBlog(blogData: FormData, token: string): Observable<any> {
    console.log(blogData, 'blogData');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseApi}/api/post`, blogData, {
      headers,
    });
  }

  updateBlog(id: string, blogData: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseApi}/api/post/${id}`, blogData, {
      headers,
    });
  }

  deleteBlog(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.baseApi}/api/post/${id}`, { headers });
  }
}
