
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IntroService } from '../../core/services/intro-service';
import { IIntro } from '../../core/interfaces/Iintro';

declare var bootstrap: any; 

@Component({
  selector: 'app-dintro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dintro.html',
  styleUrl: './dintro.css',
  providers: [IntroService]
})
export class DIntro implements OnInit {
  introData: IIntro[] = [];
  introForm!: FormGroup;
  editingId: string | null = null;
  filePreview: string | null = null;
  modalRef: any;

  constructor(private introS: IntroService) {}

  ngOnInit(): void {
    this.introForm = new FormGroup({
      name: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      img: new FormControl<File | null>(null)
    });
    this.getData();
  }

  openModal() {
    const modalEl = document.getElementById('introModal');
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

  getData() {
    this.introS.getData().subscribe({
      next: data => this.introData = data,
      error: err => console.error(err)
    });
  }

  onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.introForm.patchValue({ img: file });
  }

  saveData() {
    if (this.editingId) {
      this.updateData();
    } else {
      this.addData();
    }
  }

  addData() {
    const { name, title, img } = this.introForm.value;
    if (!img) return alert('Requierd');
    this.introS.setData({ name, title, img }).subscribe({
      next: created => {
        this.introData.unshift(created);
        this.closeModal();
        this.resetForm();
      },
      error: err => console.error(err)
    });
  }

  updateData() {
    const { name, title, img } = this.introForm.value;
    const payload: any = { name, title };
    if (img instanceof File) payload.img = img;
    this.introS.updateData(this.editingId!, payload).subscribe({
      next: updated => {
        this.introData = this.introData.map(x => x._id === updated._id ? updated : x);
        this.closeModal();
        this.resetForm();
      },
      error: err => console.error(err)
    });
  }

  onEdit(item: IIntro) {
    this.editingId = item._id || null;
    this.introForm.patchValue({ name: item.name, title: item.title, img: null });
    this.filePreview = `http://localhost:3000/img/${item.img}`;
    this.openModal();
  }

  deleteItem(id: string) {
    this.introS.delete(id).subscribe({
      next: () => this.introData = this.introData.filter(i => i._id !== id),
      error: err => console.error(err)
    });
  }

  resetForm() {
    this.introForm.reset();
    this.filePreview = null;
    this.editingId = null;
  }
}
