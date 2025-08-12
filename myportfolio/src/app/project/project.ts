import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../core/services/project-service';
import { Iprojects } from '../core/interfaces/Iprojectd';

@Component({
  selector: 'app-project',
  providers:[ProjectService],
  imports: [CommonModule],
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project implements OnInit{
  Projects!:Iprojects[]
   constructor(private _projectS:ProjectService){}

   ngOnInit(): void {
       this.getData()
   }

   getData(){
    this._projectS.getData().subscribe(data=>{
      this.Projects=data
      console.log('projects',this.Projects)

  })
}}
