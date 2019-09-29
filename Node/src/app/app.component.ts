import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ ServiceService ]
})
export class AppComponent implements OnInit {
  title = 'nodeIntegration';

  firstView = true;
  dataView = false;

  private employees: Employees[];
  private UserStatus: UserStatus[];
  formdata; 

  constructor(private _service: ServiceService){}

  ngOnInit(){
    this.getCourses();

    this.formdata = new FormGroup({
      EmpID: new FormControl(0),
      Name: new FormControl(),
      EmpCode: new FormControl(),
      Salary: new FormControl()
   });
  }

  getCourses(){
    this._service.getCourse().subscribe( data => {this.employees = data})
    console.log(this.employees)
    debugger;
}


onClickSubmit(dataValue){
  this._service.postCourse(dataValue).subscribe((data: any) => {
    this.UserStatus = data;
  },);
  this.getCourses();
  console.log(dataValue);
  this.firstView = false;
  this.dataView = true;
  debugger;
}

deleteCourse(id){
  this._service.deleteCourse(id).subscribe();
  console.log(id)
  debugger;
}
  
}



export class Employees {  
  EmpID?: number;  
  Name?: string;  
  EmpCode?: string;
  Salary?: number;
}  


export class UserStatus {

  constructor (
    EmpID?: number,
    Name?: string, 
    EmpCode?: string,
    Salary?: number,
  ) {

  }
}
