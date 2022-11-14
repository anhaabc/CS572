import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsDataService } from '../students-data.service';
import { Students } from '../students-list/students-list.component';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent implements OnInit {

  student!: Students;

  constructor(private route: ActivatedRoute, private service: StudentsDataService, private router: Router) { }

  ngOnInit(): void {
    console.log("detail");
    
    const studentId = this.route.snapshot.params['studentId'];
    this.service.getOneStudent(studentId).subscribe(data => {
      this.student = data;
    })

  }

  onDelete(): void {
    this.service.deleteOneStudent(this.student._id).subscribe(data => {
      console.log("deleted data: ", data);
    })
    this.router.navigate([""]);
  }

}
