import { Component, Inject, OnInit } from '@angular/core'
import { TeacherService } from 'src/app/services/teacher.service'
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SuccessDialogComponent } from 'src/app/util/success-dialog/success-dialog.component'

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  teacherForm: FormGroup
  user: any
  images: string[] = []
  emailRegex = `^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$`
  genderOptions = ['Male', 'Female']

  banner: any = {
    pagetitle: 'Add New Teacher',
    bg_image: 'assets/images/banner/bnr5.jpg',
    title: 'Add/Edit New Teacher',
  }
  // Custom file validator to check for file presence and types
  fileValidator(control: AbstractControl): ValidationErrors | null {
    const files = control.value

    if (!files || files.length === 0) {
      return { required: true } // Required error
    }

    const validExtensions = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
    ] // Allowed file types
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
    private teacherService: TeacherService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['Male', Validators.required],
      position: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      about: [''],
      duty: [''],
      experience: [''],
      teacherImage: [null], // Placeholder for image
      isActive: [1],
    })
  }

  ngOnInit(): void {
      // Check if the data passed in contains a teacher object (i.e., the mode is 'edit')
      if (this.data && this.data.teacher) {
        this.teacherForm.patchValue({
          name: this.data.teacher.name,
          age: this.data.teacher.age,
          gender: this.data.teacher.gender,
          position: this.data.teacher.position,
          subject: this.data.teacher.subject,
          email: this.data.teacher.email,
          about: this.data.teacher.about,
          duty: this.data.teacher.duty,
          experience: this.data.teacher.experience,
          isActive: this.data.teacher.isActive,
          teacherImage: this.data.teacher.teacherImage, // Assuming this is a base64 string or URL
        });
        // If there's an image, you can load it into the images array for preview
        if (this.data.teacher.teacherImage) {
          this.images = [this.data.teacher.teacherImage];
        }
    }
  }

  getControl(controlName: string) {
    return this.teacherForm.get(controlName)
  }

  onFileChange(event: any) {
    this.images = [] // Reset images array
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e : any) => {
        this.images.push(e.target.result) // Preview image
        this.teacherForm.patchValue({
          teacherImage: reader.result
        });
      };
    }else {
      this.teacherForm.patchValue({ teacherImage: null }) // Clear the form control if no files
    }
  }

  saveTeacher() {
    if (this.teacherForm.valid) {
      if (this.data.mode === 'Edit' && this.data.teacher) {
        // Edit existing teacher
        this.teacherService.updateTeacher(this.data.teacher._id, this.teacherForm.value).subscribe(
          (response) => {
            console.log('Teacher updated successfully!', response);
            this.openSuccessDialog('Teacher updated successfully!');
          },
          (error) => {
            console.error('Error updating teacher:', error);
            this.openSuccessDialog('Failed to update teacher. Please try again.');
          },
        );
      } else {
        // Add new teacher
        this.teacherService.addTeacher(this.teacherForm.value).subscribe(
          (response) => {
            console.log('Teacher added successfully!', response);
            this.openSuccessDialog('Teacher is saved successfully!');
          },
          (error) => {
            console.error('Error adding teacher:', error);
            this.openSuccessDialog('Failed to save teacher. Please try again.');
          },
        );
      }
    } else {
      this.teacherForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }  

  addTeacher() {
    if (this.teacherForm.valid) {
      // console.log('tchvalue--', this.teacherForm.value)

      this.teacherService.addTeacher(this.teacherForm.value).subscribe(
        (response) => {
          console.log('Teacher added successfully!', response)
          this.openSuccessDialog('Teacher is saved successfully!')
        },
        (error) => {
          console.error('Error adding teacher:', error)
          this.openSuccessDialog('Failed to save teacher. Please try again.')
        },
      )
    } else {
      this.teacherForm.markAllAsTouched() // Mark all fields as touched to show validation messages
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
    this.teacherForm.reset({
      name: '',
      age: '',
      gender: 'Male',
      position: '',
      subject: '',
      email: '',
      about: '',
      duty: '',
      experience: '',
      teacherImage: null, // Reset to placeholder
      isActive: 1,
    })
  }
}
