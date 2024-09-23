import { Component, OnInit, Inject } from '@angular/core'
import { EventService } from '../../services/event.service'
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms'
import { Router } from '@angular/router'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SuccessDialogComponent } from 'src/app/util/success-dialog/success-dialog.component'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup
  user: any
  images: string[] = []
  currentYear: number = new Date().getFullYear()
  categories: string[] = ['Sports', 'Art', 'Music', 'Annual Day', 'Other']

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
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      eventLabels: this.fb.array([this.createLabel()]), // Initialize with one label
      eventImage: ['', [Validators.required, this.fileValidator]],
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

    // Check if the data passed in contains a eventDetail object (i.e., the mode is 'edit')
    if (this.data && this.data.eventDetail) {
      const eventDetail = this.data.eventDetail
      console.log('data--', this.data)

      // Patch the main form values
      this.eventForm.patchValue({
        organizerName: eventDetail.organizerName,
        startDate: eventDetail.startDate,
        endDate: eventDetail.endDate,
        startTime: eventDetail.startTime,
        endTime: eventDetail.endTime,
        aboutEvent: eventDetail.about,
        eventHighLight: eventDetail.highlight,
        eventAddress: eventDetail.location,
        eventTitle: eventDetail.title,
        eventYear: eventDetail.year,
        email: eventDetail.email,
        phone: eventDetail.phone,
        category: eventDetail.category,
        isActive: eventDetail.isActive,
      })

      // Manually update the FormArray for eventLabels
      this.updateFormArray(
        this.eventLabels,
        eventDetail.label.map((label: any) => ({ label })), // Map to the correct structure
      )

      // If there's an image, you can load it into the images array for preview
      if (eventDetail.img) {
        this.images = [eventDetail.img]
      }
    }
  }

  // Helper method to update FormArray
  updateFormArray(formArray: FormArray, items: any[]): void {
    formArray.clear() // Clear the existing form array
    items.forEach((item) => {
      formArray.push(this.fb.group(item.label)) // Ensure you push a FormGroup, not just a string
    })
  }

  getControl(value: any) {
    return this.eventForm.get(value)
  }

  onFileChange(event: any) {
    const file = event.target.files[0]
    console.log('main image-change--', file)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.images = [e.target.result] // Preview main Product image
        this.eventForm.patchValue({ eventImage: file }) // Set image file to form
      }
      reader.readAsDataURL(file)
    } else {
      this.images = []
      this.eventForm.patchValue({ eventImage: null })
    }
  }

  // Getter for the eventLabels FormArray
  get eventLabels(): FormArray {
    return this.eventForm.get('eventLabels') as FormArray
  }

  // Method to create a new label FormControl
  createLabel(): FormGroup {
    return this.fb.group({
      label: ['', Validators.required],
    })
  }

  // Method to add a new label to the FormArray
  addLabel(): void {
    this.eventLabels.push(this.createLabel())
  }

  // Method to remove a label from the FormArray
  removeLabel(index: number): void {
    if (this.eventLabels.length > 1) {
      this.eventLabels.removeAt(index)
    }
  }

  onSubmit(event: Event) {
    event.preventDefault() // Prevent the default form submission
    event.stopPropagation() // Stop event propagation
    if (this.eventForm.valid) {
      if (this.data.mode === 'Edit' && this.data.eventDetail) {
        // Edit existing event
        this.eventService
          .updateEvent(this.data.eventDetail._id, this.eventForm.value)
          .subscribe(
            (response) => {
              console.log('Event updated successfully!', response)
              this.openSuccessDialog('Event updated successfully!')
            },
            (error) => {
              console.error('Error updating event:', error)
              this.openSuccessDialog(
                'Failed to update event. Please try again.',
              )
            },
          )
      } else {
        // Add new Event
        this.eventService.addEvent(this.eventForm.value).subscribe(
          (response) => {
            console.log('Event added successfully!', response)
            this.openSuccessDialog('Event is saved successfully!')
          },
          (error) => {
            console.error('Error adding event:', error)
            this.openSuccessDialog('Failed to save event. Please try again.')
          },
        )
      }
    } else {
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
      eventLabels: this.fb.array([this.createLabel()]), // Reset with one label
      eventImage: null,
      eventHighLight: '',
      eventYear: '',
      email: '',
      phone: '',
      isActive: [1],
    })
  }
}
