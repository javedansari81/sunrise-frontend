import { Component } from '@angular/core'
import { TeacherService } from 'src/app/services/teacher.service'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent {
  banner: any = {
    pagetitle: 'Teachers',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Teachers',
  }

  teachersData: any
  showTeacherForm = false
  isAdmin: boolean = false

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.teacherService.getBackendTeachers().subscribe((data: any) => {
      this.teachersData = data
    })
    const user = this.authService.getUser()
    if (user) {
      this.isAdmin = user.userType === 'admin'
    }
  }
}
