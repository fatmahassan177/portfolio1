import { Component } from '@angular/core';
import { SkillsService } from '../../core/services/skills-service';
import { Iskills } from '../../core/interfaces/Iskills';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup ,FormControl,Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-dskills',
  providers:[SkillsService],
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dskills.html',
  styleUrl: './dskills.css'
})
export class DSkills {


  skillsList: Iskills[] = [];
  skillsForm!: FormGroup;
  editingId: string | null = null;
  modalRef: any;

  constructor(private _skillsS: SkillsService) {}

  ngOnInit(): void {
    this.skillsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      percentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      icon: new FormControl('', Validators.required)
    });
    this.getData();
  }

  openModal() {
    const modalEl = document.getElementById('skillsModal');
    if (modalEl) {
      this.modalRef = new bootstrap.Modal(modalEl);
      this.modalRef.show();
    }
  }

  closeModal() {
    if (this.modalRef) {
       (document.activeElement as HTMLElement)?.blur();
      this.modalRef.hide();
      const addButton = document.querySelector('.add-btn') as HTMLElement;
  addButton?.focus();
    }
  }

  getData() {
    this._skillsS.getData().subscribe({
      next: (data) => this.skillsList = data,
      error: (err) => console.error(err)
    });
  }

  saveData() {
    if (this.skillsForm.invalid) return;

    if (this.editingId) {
      this._skillsS.updateData(this.editingId, this.skillsForm.value).subscribe({
        next: (updated) => {
          this.skillsList = this.skillsList.map(item => item._id === updated._id ? updated : item);
          this.closeModal();
          this.resetForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      this._skillsS.setData(this.skillsForm.value).subscribe({
        next: (created) => {
          this.skillsList.unshift(created);
          this.closeModal();
          this.resetForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  onEdit(item: Iskills) {
    this.editingId = item._id || null;
    this.skillsForm.patchValue({
      name: item.name,
      percentage: item.percentage,
      icon: item.icon
    });
    this.openModal();
  }

  deleteItem(id: string) {
    this._skillsS.delete(id).subscribe({
      next: () => this.skillsList = this.skillsList.filter(i => i._id !== id),
      error: (err) => console.error(err)
    });
  }

  resetForm() {
    this.skillsForm.reset();
    this.editingId = null;
  }
  

}
