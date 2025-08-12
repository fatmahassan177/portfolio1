import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IIntro } from '../interfaces/Iintro';
@Injectable({
  providedIn: 'root'
})
export class IntroService {
    constructor(private _http:HttpClient){}
    URL='http://localhost:3000/intro'


    getData(){
return this._http.get<IIntro[]>(this.URL);
}

 setData(payload: { name: string; title: string; img: File }) {
    const fd = new FormData();
    fd.append('name', payload.name);
    fd.append('title', payload.title);
    fd.append('img', payload.img);
    return this._http.post<IIntro>(this.URL, fd);
  }

  updateData(id: string, payload: { name: string; title: string; img?: File | null }) {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('title', payload.title);

  if (payload.img instanceof File) {
    formData.append('img', payload.img);
  }

  return this._http.put<IIntro>(`${this.URL}/${id}`, formData);
}


 delete(id: string) {
    return this._http.delete(`${this.URL}/${id}`);
  }
}

