import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  LoginForm: FormGroup;

  constructor(
    private _api: ApiCallService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.LoginForm = this.fb.group({
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }
  user: any = {
    phoneNumber: '',
    password: '',
  };
  onLoginDataSubmit() {
    this._api.LoginData(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.status !== true) {
          this.user = {
            phoneNumber: '',
            password: '',
          };
          
        } 
        else {
          alert('Login successful!');
          this.router.navigate(['/home']);
        }
      },
      error: (error: any) => {
        if (error.status === 400) {
          console.error('Bad request:', error.error);
        } else if (error.status === 500) {
          console.error('Internal server error:', error.error);
        } else {
          console.error('Unknown error:', error);
        }
      },
    });
  }
}
