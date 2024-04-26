import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin!: FormGroup;
  hideToglePassword = true;
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  // Toogle PW
  togglePasswordVisibility() {
    const inputanPassword = document.querySelector('#password');
    this.hideToglePassword = !this.hideToglePassword;
    inputanPassword?.setAttribute('type', 'text');
  }
  toggleAlert() {
    const wrongAlert = document.querySelector('#alert-wrong-input');
    wrongAlert?.classList.toggle('hidden');
  }

  onSubmit() {
    if (this.formLogin.valid) {
      // console.log(this.formLogin.value);
      this.authService.login(this.formLogin.value).subscribe(
        (res: any) => {
          this.authService.savetoken(res.token, res.data);
          this.route.navigate(['']);
        },
        (error) => {
          this.toggleAlert();
        }
      );
    }
    if (this.formLogin.invalid) {
      const alertImportant = document.querySelector('#alert-importan-input');
      alertImportant?.classList.toggle('hidden');
    }
  }
}
