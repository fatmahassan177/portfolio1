import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Icontact } from '../interfaces/Icontact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
   constructor(private _http:HttpClient){
   }
   URL='http://localhost:3000/contact'

   getData(){
    return this._http.get<Icontact[]>(this.URL)
   }

  setContact(contact:Icontact) {
return this._http.post<Icontact>(this.URL,contact);
  }

  

  delete(id: string) {
    return this._http.delete(`${this.URL}/${id}`);
  }
}
