import { Component, Inject, OnInit } from '@angular/core'
import { ClassServiceService } from 'src/app/services/class-service.service'
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SuccessDialogComponent } from 'src/app/util/success-dialog/success-dialog.component'

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
})
export class AddClassComponent {
  classForm: FormGroup
  user: any
  images: string[] = []

  banner: any = {
    pagetitle: 'Add New Class',
    bg_image: 'assets/images/banner/bnr5.jpg',
    title: 'Add New Class',
  }

  // Custom file validator to check for file presence and types
  fileValidator(control: AbstractControl): ValidationErrors | null {
    const files = control.value
    console.log('files-v-', files)
    if (!files || files.length === 0) {
      return { required: true } // Required error
    }

    const validExtensions = ['image/jpeg', 'image/png', 'image/gif'] // Allowed file types
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!validExtensions.includes(file.type)) {
        return { invalidFileType: true } // Invalid file type error
      }
    }

    return null // No errors
  }
  constructor(
    private fb: FormBuilder,
    private class_Service: ClassServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.classForm = this.fb.group({
      className: ['', Validators.required],
      classStudent: ['', Validators.required],
      classSubject: ['', Validators.required],
      aboutClass: ['', Validators.required],
      classImage: [null, this.fileValidator],
      isActive: [1],
    })
  }
  ngOnInit(): void {
    // Check if the data passed in contains a teacher object (i.e., the mode is 'edit')
    if (this.data && this.data.classDetail) {
      this.classForm.patchValue({
        className: this.data.classDetail.className,
        classStudent: this.data.classDetail.students,
        classSubject: this.data.classDetail.subjects,
        aboutClass: this.data.classDetail.aboutClass,
        classImage: this.data.classDetail.classUrl,

        // Assuming this is a base64 string or URL
      })
      // If there's an image, you can load it into the images array for preview
      if (this.data.classDetail.classUrl) {
        this.images = [this.data.classDetail.classUrl]
      }
    }
  }

  getControl(value: any) {
    return this.classForm.get(value)
  }

  onFileChange(event: any) {
    const files = event.target.files
    this.images = [] // Reset images array

    if (files && files.length) {
      // Set the form control value to the selected files
      console.log('files-onchange-', files)

      this.classForm.patchValue({
        // classImage: files,
        classImage: {
          name: files[0]['name'],
          size: files[0]['size'],
          type: files[0]['type'],
        },
      })

      for (let file of files) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          this.images.push(e.target.result) // Preview image
        }
        reader.readAsDataURL(file)
      }
    } else {
      this.classForm.patchValue({ classImage: null }) // Clear the form control if no files
    }
  }

  onSubmit() {
    if (this.classForm.valid) {
      console.log('Form Submit-value!', this.classForm.value)

      this.class_Service.addClass(this.classForm.value).subscribe(
        (response) => {
          console.log('class added successfully!', response)
          this.openSuccessDialog('class is saved successfully!')
        },
        (error) => {
          console.error('Error adding class:', error)
          this.openSuccessDialog('Failed to save class. Please try again.')
        },
      )
    } else {
      console.log('Form is invalid')
    }
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: {
        message,
        callback: () => this.clearForm(), // Pass the callback to clear the form
      },
    })
  }

  clearForm(): void {
    this.classForm.reset({
      className: '',
      classStudent: '',
      classSubject: '',
      aboutClass: '',
      classImage: null,
      isActive: 1,
    })
  }
}
