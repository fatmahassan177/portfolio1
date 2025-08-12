import { Component, OnInit } from '@angular/core';
import { Icontact } from '../../core/interfaces/Icontact';
import { ContactService } from '../../core/services/contact-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dcontact',
  providers: [ContactService],
  imports: [CommonModule],
  templateUrl: './dcontact.html',
  styleUrl: './dcontact.css'
})
export class DContact implements OnInit {
  contacts!: Icontact[];

  constructor(private _contactS: ContactService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._contactS.getData().subscribe(data => {
      this.contacts = data;
      console.log('Contact data:', this.contacts);
    });
  }

   deleteItem(id: string) {
    this._contactS.delete(id).subscribe(() => this.getData());
  }
}

