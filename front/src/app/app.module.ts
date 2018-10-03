import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StudentPanelComponent } from './student-panel/student-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterStudentComponent
},
{
  path: 'admin',
  component: AdminPanelComponent
},
{
  path: 'student',
  component: StudentPanelComponent
}]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterStudentComponent,
    StudentPanelComponent,
    AdminPanelComponent
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }