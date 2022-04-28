import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  //post

  postRestaurant(data: any) {
    return this._http.post('http://localhost:3000/posts/', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //get
  getRestaurant() {
    return this._http.get('http://localhost:3000/posts/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deletRestaurant(id: any) {
    return this._http.delete('http://localhost:3000/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateRestaurant(id: any, data: any) {
    return this._http
      .patch('http://localhost:3000/posts/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
