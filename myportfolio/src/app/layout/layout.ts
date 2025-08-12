import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,Footer,Nav],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  

}
