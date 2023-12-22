import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  activatedRoute: any;
  constructor(private _httpClient: HttpClient) {}

  getAllData() {
    return this._httpClient.get(`${environment.apiUrl}Admin/ReviewMasterGet`);
  }

  postAllData(user: any): Observable<any> {
    const url = `${environment.apiUrl}Admin/ReviewMasterPost`;
    return this._httpClient.post<any>(url, user);
  }
  SingUpPostData(user: any): Observable<any> {
    const url = `${environment.apiUrl}Auth/SignupDemo`;
    return this._httpClient.post<any>(url, user);
  }
  LoginData(user: any): Observable<any> {
    const url = `${environment.apiUrl}Auth/LoginDemo`;
    return this._httpClient.post<any>(url, user);
  }
  
  getDataById(id: number) {
    return this._httpClient.get(`${environment.apiUrl}Admin/ShowDataDemo/${id}`);
  }

  removeData(id: number): Observable<any> {
    const url = `${environment.apiUrl}Admin/DeleteReviewMaster/${id}`;
    return this._httpClient.post<any>(url, {id});
  }
  updateData(id: number, user: any | null): Observable<any> {
    const url = `${environment.apiUrl}Admin/UpdateReviewMaster/${id}`;
    return this._httpClient.post<any>(url, user);
  }
  

}
