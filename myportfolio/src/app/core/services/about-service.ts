import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iabout } from '../interfaces/Iabout';
@Injectable({
  providedIn: 'root'
})
export class AboutService {
    constructor(private _http:HttpClient){
   }
   URL='http://localhost:3000/about'

   getData(){
    return this._http.get<Iabout[]>(this.URL)
   }
  setData(data: Iabout) {
    return this._http.post<Iabout>(this.URL, data);
  }

 
  updateData(id: string, data: Iabout) {
    return this._http.put<Iabout>(`${this.URL}/${id}`, data);
  }


    delete(id: string) {
    return this._http.delete(`${this.URL}/${id}`);
  }
}
