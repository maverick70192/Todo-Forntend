import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordSecurityQuestionComponent } from './forgot-password-security-question/forgot-password-security-question.component';
import { ForgotPasswordSetComponent } from './forgot-password-set/forgot-password-set.component';
import { SuccessComponent } from './success/success.component';
import { TodoComponent } from './todo/todo.component';
import { LoginRouteGaurdService } from './service/login-route-gaurd.service';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginRouteGaurdService] },
  { path: 'login', component: LoginComponent, canActivate: [LoginRouteGaurdService] },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-password-security-question', component: ForgotPasswordSecurityQuestionComponent },
  { path: 'forgot-password-set', component: ForgotPasswordSetComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'welcome/:username', component: WelcomeComponent, canActivate: [RouteGuardService] },
  { path: 'todos', component: ListTodosComponent, canActivate: [RouteGuardService]  },
  { path: 'todos/:id', component: TodoComponent, canActivate: [RouteGuardService]  },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [RouteGuardService]  },
  { path: 'edit-profile/:username', component: EditProfileComponent, canActivate: [RouteGuardService]  },
  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
