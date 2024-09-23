import { Component, OnInit } from '@angular/core'

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms'
import { Router } from '@angular/router'
import { EventService } from 'src/app/services/event.service'
import { AddEventComponent } from 'src/app/admin-add-group/add-event/add-event.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
})
export class UpdateEventComponent implements OnInit {
  banner: any = {
    pagetitle: 'Event',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Event',
  }
  eventData: any
  showEventForm = false
  isAdmin: boolean = false
  isEditMode = false
  eventForm!: FormGroup
  selectedEvent: any

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eventService: EventService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data: any) => {
      this.eventData = data
      console.log('cd', data)
    })
  }

  openAddEventModel() {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '600px',
      data: { mode: 'Add' },
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.ngOnInit() // Refresh the list after closing the dialog
      }
    })
  }

  openEditEventModel(data: any) {
    console.log('dt', data)

    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '600px',
      data: { mode: 'Edit', eventDetail: data },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit() // Refresh the list after closing the dialog
      }
    })
  }

  handleDelete(id: any) {
    console.log('handledelete-', id)

    this.eventService.deleteEvent(id)
    this.ngOnInit() // Refresh the list
  }
}
