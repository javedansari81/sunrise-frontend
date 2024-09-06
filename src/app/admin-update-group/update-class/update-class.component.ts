import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ClassServiceService } from 'src/app/services/class-service.service'
import { AddClassComponent } from 'src/app/admin-add-group/add-class/add-class.component'
import { MatDialog } from '@angular/material/dialog'
@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css'],
})
export class UpdateClassComponent implements OnInit {
  banner: any = {
    pagetitle: 'Class',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Classes',
  }

  classData: any
  showClassForm = false
  isAdmin: boolean = false
  isEditMode = false
  classForm!: FormGroup
  selectedClass: any
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private classService: ClassServiceService,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.classService.findClasses().subscribe((data: any) => {
      this.classData = data
      console.log('cd', this.classData)
    })

    this.classForm = this.fb.group({
      className: ['', Validators.required],
      classStudent: ['', Validators.required],
      classSubject: ['', Validators.required],
      aboutClass: ['', Validators.required],
      classImage: [null],
      isActive: [1],
    })
  }

  openAddClassModel() {
    const dialogRef = this.dialog.open(AddClassComponent, {
      width: '600px',
      data: { mode: 'Add' },
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.ngOnInit() // Refresh the list after closing the dialog
      }
    })
  }
  openEditClassModel(data: any) {
    console.log('dt', data)

    const dialogRef = this.dialog.open(AddClassComponent, {
      width: '600px',
      data: { mode: 'Edit', classDetail: data },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit() // Refresh the list after closing the dialog
      }
    })
  }

  closeModal() {}

  onSubmit() {
    if (this.classForm.invalid) {
      return
    }
    if (this.isEditMode) {
      this.classService
        .updateClass(this.selectedClass._id, this.classForm.value)
        .subscribe((response) => {
          // Handle success
          this.closeModal()
          this.ngOnInit() // Refresh the list
        })
    } else {
      this.classService.addClass(this.classForm.value).subscribe((response) => {
        // Handle success
        this.closeModal()
        this.ngOnInit() // Refresh the list
      })
    }
  }

  handleDelete(class_id: any) {
    console.log('cl', class_id)

    this.classService.deleteClass(class_id)
    this.ngOnInit() // Refresh the list
  }
}
