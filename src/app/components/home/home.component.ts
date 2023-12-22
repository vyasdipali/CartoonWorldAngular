import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiCallService } from '../../services/api-call.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [CommonModule, FormsModule,NavbarComponent],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id: any;
  updateForm: any;

  imgUrl = environment.imgUrl;
  liveData: any = [{}];
  showData: any[] = [];
  deletedId: any[] = [];
  storedId: number | null = null;

  img: any;
  image: any;
  public files!: any[];

  user: any = {
    name: '',
    description: '',
    carToonLink: '',
    reviewImage: '',
  };

  constructor(private _api: ApiCallService) {}

  ngOnInit(): void {
    this.loadShowData();
  }
  // All data show

  private loadShowData() {
    this._api.getAllData().subscribe({
      next: (data: any) => {
        console.log(data);
        this.liveData = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  storeAndOpenModal(id: number): void {
    this.storedId = id;
    this.onClick(id);
  }

  updateDataOnModalClose(): void {
    if (this.storedId !== null) {
      this.updateDataId(this.storedId, this.user);
    }
  }

  // data get id

  onClick(id: number): void {
    this._api.getDataById(id).subscribe({
      next: (data: any) => {
        if (data && data.data) {
          console.log('DataById>>>>', data.data);
          this.showData = Array.isArray(data.data) ? data.data : [data.data];
        } else {
          console.warn('API response is null or missing data.');
        }
      },
      error: (error: any) => {
        console.error('API Error:', error);
      },
    });
  }
  //  deleted Data
  removeDataById(id: number): void {
    console.log('ID::::', id);
    this._api.removeData(id).subscribe({
      next: (data: any) => {
        if (data && data.data) {
          // Swal.fire({
          //   title: 'Are you sure?',
          //   text: "You won't be able to revert this!",
          //   icon: 'warning',
          //   showCancelButton: true,
          //   confirmButtonColor: '#3085d6',
          //   cancelButtonColor: '#d33',
          //   confirmButtonText: 'Yes, delete it!',
          // })
          // .then((result: { isConfirmed: any }) => {
          //   if (result.isConfirmed) {
          //     Swal.fire({
          //       title: 'Deleted!',
          //       text: 'Your file has been deleted.',
          //       icon: 'success',
          //     });
          //   }
          // });
          console.log('DataById>>>>', data.data);
alert("Delete success")
          this.ngOnInit();
        } else {
          console.warn('API response is null or missing data.');
        }
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle error as needed
      },
    });
  }

  //  Data update function

  updateDataId(id: number, user: any): void {
    if (id === null) {
      console.error('Error: No ID available for update.');
      return;
    }

    this._api.updateData(id, user).subscribe({
      next: (response) => {
        console.log('Success:', response);
        console.log('Response Data:', response.data);
        this.loadShowData();

        // Reset the form fields and clear any selected file
        this.user = {
          name: '',
          description: '',
          carToonLink: '',
          reviewImage: '', // Clear any selected file
        };
        this.updateForm.resetForm();
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
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
      this.file.push(this.user.reviewImage);
    };
    reader.readAsDataURL(file);
  }
}
