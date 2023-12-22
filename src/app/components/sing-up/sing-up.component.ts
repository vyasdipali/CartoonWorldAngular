import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
})
export class SingUpComponent {

  signupForm: FormGroup;

  constructor(
    private _api: ApiCallService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  user: any = {
    userName: '',
    password: '',
    phoneNo: '',
    email: '',
  };

  onDataSubmit() {
    this._api.SingUpPostData(this.user).subscribe({
      next: (data: any) => {
       
        console.log(data);
        if (data.status !== true) {
          this.user = {
            userName: '',
            password: '',
            phoneNo: '',
            email: '',
          };
          alert('User Already Exist !! Please LogIn')
        } else {
          alert('login successfully');
          this.router.navigate(['/Login']);
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
