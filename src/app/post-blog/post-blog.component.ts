import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css'],
})
export class PostBlogComponent {
  blogForm: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(20)]],
      image: [null],
      categories: this.fb.array([], Validators.required),
      tags: this.fb.array([], Validators.required),
    });
  }

  get categories(): FormArray {
    return this.blogForm.get('categories') as FormArray;
  }

  get tags(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }

  addCategory(categoryInput: HTMLInputElement) {
    const category = categoryInput.value.trim();
    if (category) {
      this.categories.push(this.fb.control(category, Validators.required));
      categoryInput.value = '';
    }
  }

  addTag(tagInput: HTMLInputElement) {
    const tag = tagInput.value.trim();
    if (tag) {
      this.tags.push(this.fb.control(tag, Validators.required));
      tagInput.value = '';
    }
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.blogForm.patchValue({ image: file });
    }
  }

  submitBlog() {
    console.log('hey' ,this.blogForm.value)
    if (this.blogForm.valid) {
      const token = localStorage.getItem('token')??"";
      // if (!token) {
      //   alert('You must be logged in to post a blog.');
      //   return;
      // }

      const formData = new FormData();
      formData.append('title', this.blogForm.value.title);
      formData.append('content', this.blogForm.value.content);
      formData.append('image', this.blogForm.value.image);
      this.blogForm.value.categories.forEach((cat: string) => formData.append('categories', cat));
      this.blogForm.value.tags.forEach((tag: string) => formData.append('tags', tag));

      this.blogService.createBlog(formData, token).subscribe(
        (response:any) => {
          alert('Blog Submitted Successfully!');
          this.blogForm.reset();
          this.categories.clear();
          this.tags.clear();
          this.imagePreview = null;
        },
        (error:any) => {
          console.error('Error submitting blog:', error);
          alert('Failed to submit blog. Please try again.');
        }
      );
    }
  }

  deleteBlog(id: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to delete a blog.');
      return;
    }

    this.blogService.deleteBlog(id, token).subscribe(
      () => {
        alert('Blog Deleted Successfully!');
      },
      (error:any) => {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog.');
      }
    );
  }
}
