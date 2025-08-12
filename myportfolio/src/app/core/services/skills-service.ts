import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iskills } from '../interfaces/Iskills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  constructor(private _http:HttpClient){}

  URL='http://localhost:3000/skills'

   getData(){
  return this._http.get<Iskills[]>(this.URL);
  }
  setData(data: Iskills) {
      return this._http.post<Iskills>(this.URL, data);
    }
  
   
    updateData(id: string, data: Iskills) {
      return this._http.put<Iskills>(`${this.URL}/${id}`, data);
    }

   delete(id: string) {
    return this._http.delete(`${this.URL}/${id}`);
  }
}

