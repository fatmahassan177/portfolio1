import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iprojects } from '../interfaces/Iprojectd';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private URL = 'http://localhost:3000/project';

  constructor(private _http: HttpClient) {}

  getData() {
    return this._http.get<Iprojects[]>(this.URL);
  }

  addProject(formData: FormData) {
    return this._http.post<Iprojects>(this.URL, formData);
  }

  updateProject(id: string, formData: FormData) {
    return this._http.put<Iprojects>(`${this.URL}/${id}`, formData);
  }

  deleteProject(id: string) {
    return this._http.delete(`${this.URL}/${id}`);
  }
}
