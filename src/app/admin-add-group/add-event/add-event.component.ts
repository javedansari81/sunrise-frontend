import { Component } from '@angular/core'

import { EventService } from '../../services/event.service'
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { SuccessDialogComponent } from 'src/app/util/success-dialog/success-dialog.component'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent {
  eventForm: FormGroup
  user: any
  images: string[] = []
  currentYear: number = new Date().getFullYear()
  categories: string[] = ['Sports', 'Art', 'Music', 'Annual Day', 'Other'];

  banner: any = {
    pagetitle: 'Add New EVENT',
    bg_image: 'assets/images/banner/bnr5.jpg',
    title: 'Add New Event',
  }
  // Custom file validator to check for file presence and types
  fileValidator(control: AbstractControl): ValidationErrors | null {
    const files = control.value

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

  yearValidator(control: AbstractControl): ValidationErrors | null {
    const year = control.value
    const currentYear = new Date().getFullYear()
    if (year < 1900 || year > currentYear) {
      return { invalidYear: true }
    }
    return null
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private dialog: MatDialog,
  ) {
    this.eventForm = this.fb.group({
      organizerName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],

      aboutEvent: ['', Validators.required],
      eventHighLight: ['', Validators.required],

      eventAddress: ['', Validators.required],
      eventTitle: ['', Validators.required],
      eventLabels: this.fb.array([this.createLabel()]), // FormArray for event labels
      eventImage: [null, this.fileValidator],
      eventYear: ['', [Validators.required, this.yearValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      category: ['Arts', Validators.required], // Add the new category field
      isActive: [1],
    })
  }
  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser')

    if (userData) {
      this.user = JSON.parse(userData)
    }
  }
  getControl(value: any) {
    return this.eventForm.get(value)
  }

  onFileChange(event: any) {
    const files = event.target.files
    this.images = [] // Reset images array

    if (files && files.length) {
      // Set the form control value to the selected files

      this.eventForm.patchValue({
        // eventImage:files
        eventImage: {
          name: files[0]['name'],
          size: files[0]['size'],
          type: files[0]['type'],
        },
      })
      console.log('evt-valid--', this.eventForm)

      for (let file of files) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          this.images.push(e.target.result) // Preview image
        }
        reader.readAsDataURL(file)
      }
    } else {
      this.eventForm.patchValue({ eventImage: null }) // Clear the form control if no files
    }
  }

  // Getter for the eventLabels FormArray
  get eventLabels(): FormArray {
    return this.eventForm.get('eventLabels') as FormArray;
  }

  // Method to create a new label FormControl
  createLabel(): FormGroup {
    return this.fb.group({
      label: ['', Validators.required],
    });
  }

  // Method to add a new label to the FormArray
  addLabel(): void {
    this.eventLabels.push(this.createLabel());
  }

  // Method to remove a label from the FormArray
  removeLabel(index: number): void {
    if (this.eventLabels.length > 1) {
      this.eventLabels.removeAt(index);
    }
  }

  onSubmit() {
    console.log('Form Submitted!', this.eventForm.valid)

    if (this.eventForm.valid) {
      console.log('Form Submitted!', this.eventForm)
      this.eventService.addEvent(this.eventForm.value).subscribe(
        (response) => {
          console.log('event added successfully!', response)
          this.openSuccessDialog('event is saved successfully!')
        },
        (error) => {
          this.openSuccessDialog('Failed to save event. Please try again.')
        },
      )
    } else {
      console.log('Form is invalid', this.eventForm)
      this.eventForm.markAllAsTouched() // Mark all fields as touched to show validation messages
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
    this.eventForm.reset({
      organizerName: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',

      aboutEvent: '',
      eventAddress: '',
      eventTitle: '',
      eventLabel: '',
      eventImage: null,
      eventHighLight: '',
      eventYear: '',
      email: '',
      phone: '',
      isActive: [1],
    })
  }
}
