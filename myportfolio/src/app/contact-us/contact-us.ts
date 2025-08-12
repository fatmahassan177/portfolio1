import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../core/services/contact-service';
import { FormGroup ,FormControl,Validators  } from '@angular/forms';
import { Icontact } from '../core/interfaces/Icontact';
@Component({
  selector: 'app-contact-us',
  providers:[ContactService],
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
  contactForm!: FormGroup;
  submitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const contactData: Icontact = this.contactForm.value;

    this.contactService.setContact(contactData).subscribe({
      next: (res) => {
        this.successMessage = "Message sent successfully!";
        this.contactForm.reset();
        this.submitting = false;
      },
      error: (err) => {
        this.errorMessage = "Failed to send message. Please try again.";
        this.submitting = false;
      }
    });
  }
}
