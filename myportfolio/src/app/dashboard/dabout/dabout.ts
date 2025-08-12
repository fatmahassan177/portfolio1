 import { CommonModule } from '@angular/common';
 import { Component } from '@angular/core';
 import { AboutService } from '../../core/services/about-service';
 import { Iabout } from '../../core/interfaces/Iabout';

 import { FormGroup,FormControl, ReactiveFormsModule ,Validators} from '@angular/forms';
declare var bootstrap: any;
 @Component({
   selector: 'app-dabout',
   standalone: true,
   providers: [AboutService],
   imports: [CommonModule,ReactiveFormsModule],
   templateUrl: './dabout.html',
   styleUrl: './dabout.css'
 })
 export class DAbout {
  
  aboutList: Iabout[] = [];
  aboutForm!: FormGroup;
  editingId: string | null = null;
  modalRef: any;

  constructor(private _aboutS: AboutService) {}

  ngOnInit(): void {
    this.aboutForm = new FormGroup({
      title: new FormControl('', Validators.required),
      t_description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      education: new FormControl('', Validators.required),
      edu_description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      intersted: new FormControl('', Validators.required),
      int_description: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
    this.getData();
  }

  openModal() {
    const modalEl = document.getElementById('aboutModal');
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
    this._aboutS.getData().subscribe({
      next: (data) => this.aboutList = data,
      error: (err) => console.error(err)
    });
  }

 saveData() {
  if (this.aboutForm.invalid) return;

  const formData = this.aboutForm.value;

  if (this.editingId) {
    this._aboutS.updateData(this.editingId, formData).subscribe({
      next: (updated) => {
        this.aboutList = this.aboutList.map(item =>
          item._id === updated._id ? updated : item
        );
        this.closeModal();
        this.resetForm();
      },
      error: (err) => console.error(err)
    });
  } else {
    this._aboutS.setData(formData).subscribe({
      next: (created) => {
        this.aboutList.unshift(created);
        this.closeModal();
        this.resetForm();
      },
      error: (err) => console.error(err)
    });
  }
}


  onEdit(item: Iabout) {
    this.editingId = item._id || null;
    this.aboutForm.patchValue({
      title: item.title,
      t_description: item.t_description,
      education: item.education,
      edu_description: item.edu_description,
      intersted: item.intersted,
      int_description: item.int_description
    });
    this.openModal();
  }

  deleteItem(id: string) {
    this._aboutS.delete(id).subscribe({
      next: () => this.aboutList = this.aboutList.filter(i => i._id !== id),
      error: (err) => console.error(err)
    });
  }

  resetForm() {
    this.aboutForm.reset();
    this.editingId = null;
  }
 }



 

  




 
