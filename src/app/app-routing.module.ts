import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { NotificationComponent } from './notification/notification.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'dashboard/blogs',
    component: BlogListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/myblogs',
    component: BlogListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/notifications',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: BlogListComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }, // Redirect to login by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
