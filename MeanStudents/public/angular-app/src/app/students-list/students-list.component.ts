import { Component, OnInit } from '@angular/core';
import { StudentsDataService } from '../students-data.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: Students[] = [];

  constructor(private service: StudentsDataService) { }

  ngOnInit(): void {
    this.service.getStudents().subscribe(data => {
      this.students = data;
    })
  }

}

export class Students {
  _id!: string;
  ID!: string;
  LastName!: string;
  FirstName!: string;
  City!: string;
  State!: string;
  Gender!: string;
  StudentStatus!: string;
  Major!: string;
  Country!: string;
  Age!: string;
  SAT!: string;
  'Grade '!: string;
  Height!: string;
  constructor(){}

  set grade(grade: string) {
    this["Grade "] = grade;
  }
  get grade() {
    return this["Grade "];
  }

}
