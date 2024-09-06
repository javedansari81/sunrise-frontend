import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TeacherService } from 'src/app/services/teacher.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AddTeacherComponent } from 'src/app/admin-add-group/add-teacher/add-teacher.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css'],
})
export class UpdateTeacherComponent implements OnInit {
  banner: any = {
    pagetitle: 'Teachers',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Teachers',
  }

  teachersData: any
  showTeacherForm = false
  isAdmin: boolean = false
  isEditMode = false
  teacherForm!: FormGroup
  selectedTeacher: any

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.teacherService.getBackendTeachers().subscribe((data: any) => {
      this.teachersData = data
    })

    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['', Validators.required],
      position: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      about: [''],
      duty: [''],
      experience: [''],
      teacherImage: [null],
    })
  }

  openAddTeacherModal() {
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '600px',
      data: { mode: 'Add' },
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.ngOnInit() // Refresh the list after closing the dialog
      }
    })
  }

  openEditTeacherModal(teacher: any) {
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '600px',
      data: { mode: 'Edit', teacher: teacher },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit() // Refresh the list after closing the dialog
      }
    })
  }

  closeModal() {
    this.showTeacherForm = false
  }
  handleDelete(id: any) {
    console.log('handledelete-', id)

    this.teacherService.deleteTeacher(id)
    this.ngOnInit() // Refresh the list
  }

  onSubmit() {
    if (this.teacherForm.invalid) {
      return
    }
    if (this.isEditMode) {
      this.teacherService
        .updateTeacher(this.selectedTeacher._id, this.teacherForm.value)
        .subscribe((response) => {
          // Handle success
          this.closeModal()
          this.ngOnInit() // Refresh the list
        })
    } else {
      this.teacherService
        .addTeacher(this.teacherForm.value)
        .subscribe((response) => {
          // Handle success
          this.closeModal()
          this.ngOnInit() // Refresh the list
        })
    }
  }
}
