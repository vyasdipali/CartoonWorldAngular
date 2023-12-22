import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiCallService } from '../../services/api-call.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
@Component({
  selector: 'app-add-more',
  standalone: true,
  imports: [FormsModule, RouterLink,NavbarComponent],
  templateUrl: './add-more.component.html',
  styleUrl: './add-more.component.css',
})
export class AddMoreComponent {
  updateForm: any;

  constructor(private _api: ApiCallService, private router: Router) {}

  img: any;
  image: any;
  public files!: any[];
  user: any = {
    name: '',
    description: '',
    carToonLink: '',
    reviewImage: '',
  };

  onSubmit() {
    this._api.postAllData(this.user).subscribe({
      next: (data: any) => {
        console.log(data);

        alert('Data was added'); // Updated alert message
        this.user = {
          name: '',
          description: '',
          carToonLink: '',
          reviewImage: '',
        };
        // this.updateForm.resetForm(); // This line is not needed
        // this.ngOnInit(); // This line is not needed
        this.router.navigate(['/home']);
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



  ngOnInit() {
    throw new Error('Method not implemented.');
  }
  private file: any;
  reader: any;
  image1: any;
  image2: any;
  uploadModuleImage(element: any) {
    var file = element.target.files[0];
    this.reader = new FileReader();
    this.reader.onload = (e: any) => {
      this.image1 = e.target.result;
    };
    this.reader.readAsDataURL(file);
  }
  imagetobase64() {
    const formData = new FormData();
    for (this.file of this.files) {
      formData.append('file', this.file, this.file.name);
    }
    let dt: string = this.reader.result;
    let data2: string = dt.substring(dt.indexOf('|') + 1);
    let base64: string = data2.substring(data2.indexOf(',') + 1);
    return base64;
  }
  uploadImg(element: any) {
    var file = element.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
      let data: string = e.target.result;
      let data2: string = data.substring(data.indexOf('|') + 1);
      let base64 = data2.substring(data2.indexOf(',') + 1);
      this.user.ReviewImage = base64;
      this.file.push(this.user.ReviewImage);
    };
    reader.readAsDataURL(file);
  }
}
