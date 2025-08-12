

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../core/services/project-service';
import { Iprojects } from '../../core/interfaces/Iprojectd';
import { CommonModule } from '@angular/common';

declare var bootstrap: any
@Component({
  selector: 'app-dproject',
  providers:[ProjectService],
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './dproject.html',
  styleUrl: './dproject.css'
})
export class Dproject {
    projects: Iprojects[] = [];
  projectForm!: FormGroup;
  editingId: string | null = null;
  filePreview: string | null = null;
  modalRef: any;

  constructor(private projectS: ProjectService) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      link: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/[^\s$.?#].[^\s]*$/gm)]),
      img: new FormControl<File | null>(null)
    });
    this.getProjects();
  }

  openModal() {
    const modalEl = document.getElementById('projectModal');
    if (modalEl) {
      this.modalRef = new bootstrap.Modal(modalEl);
      this.modalRef.show();
    }
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  getProjects() {
    this.projectS.getData().subscribe({
      next: (data: Iprojects[]) => this.projects = data,
      error: err => console.error(err)
    });
  }

  onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.projectForm.patchValue({ img: file });
  }

  saveData() {
    if (this.editingId) {
      this.updateProject();
    } else {
      this.addProject();
    }
  }

  addProject() {
    const { title, description, link, img } = this.projectForm.value;
    if (!img) return alert('Image is required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('img', img);

    this.projectS.addProject(formData).subscribe({
      next: (created: Iprojects) => {
        this.projects.unshift(created);
        this.closeModal();
        this.resetForm();
      },
      error: err => console.error(err)
    });
  }

  updateProject() {
    const { title, description, link, img } = this.projectForm.value;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);

    if (img instanceof File) {
      formData.append('img', img);
    }

    this.projectS.updateProject(this.editingId!, formData).subscribe({
      next: (updated: Iprojects) => {
        this.projects = this.projects.map(p => p._id === updated._id ? updated : p);
        this.closeModal();
        this.resetForm();
      },
      error: err => console.error(err)
    });
  }

  onEdit(item: Iprojects) {
    this.editingId = item._id || null;
    this.projectForm.patchValue({
      title: item.title,
      description: item.description || '',
      link: item.link,
      img: null
    });
    this.filePreview = `http://localhost:3000/uploads/${item.img}`;
    this.openModal();
  }

  deleteProject(id: string) {
    this.projectS.deleteProject(id).subscribe({
      next: () => this.projects = this.projects.filter(p => p._id !== id),
      error: err => console.error(err)
    });
  }

  resetForm() {
    this.projectForm.reset();
    this.filePreview = null;
    this.editingId = null;
  }
}
