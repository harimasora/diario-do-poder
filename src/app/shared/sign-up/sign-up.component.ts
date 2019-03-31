import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(1)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        passwordConfirmation: ['', [Validators.required]],
        hasAgreed: [false, [Validators.requiredTrue]],
      },
      { validators: [this.checkPasswords] },
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const password = group.controls.password.value;
    const passwordConfirmation = group.controls.passwordConfirmation.value;

    return password === passwordConfirmation
      ? null
      : { passwordsNotEqual: true };
  }

  async signUp() {
    try {
      await this.auth.emailSignUp(
        this.email.value,
        this.password.value,
        this.name.value,
      );
      this.router.navigate(['/tabs/home']);
    } catch (error) {
      console.error(error);
    }
  }

  // GETTERS
  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get passwordConfirmation() {
    return this.signUpForm.get('passwordConfirmation');
  }

  get hasAgreed() {
    return this.signUpForm.get('hasAgreed');
  }
}
