import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
} from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  integerRegex = /^\d+$/
  emailRegex = `^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$`
  mobileRegex = '^((\\+91-?)|0)?[0-9]{10}$'

  banner: any = {
    pagetitle: 'Register',
    bg_image: 'assets/images/banner/bnr5.jpg',
    title: 'Register',
  }
  registrationForm: FormGroup
  IsRegistrationSuccess: boolean = false
  hasSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.registrationForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(13),
        Validators.pattern(this.emailRegex),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(this.mobileRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
    })
  }

  ngOnInit(): void {}
  getControl(value: any) {
    return this.registrationForm.get(value)
  }
  submitForm(): void {
    if (this.registrationForm.valid) {
      this.userService.addUser(this.registrationForm.value).subscribe(
        (response) => {
          console.log('User added successfully', response)
          this.IsRegistrationSuccess = true
          this.hasSubmitted = true;
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 2000) // Redirect to login after 2 seconds
          // Reset form after successful submission
          //this.registrationForm.reset();
        },
        (error) => {
          console.error('Error adding user', error)
          this.IsRegistrationSuccess = false
        },
      )
    }
  }
}
