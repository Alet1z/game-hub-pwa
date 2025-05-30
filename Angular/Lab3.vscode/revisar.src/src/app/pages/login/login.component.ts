import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  private frmBuilder = inject(FormBuilder);
  private authSrv = inject(AuthService);
  private router = inject(Router);

  loginForm = this.frmBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  onLogin() {
    console.table(this.loginForm.value);

    if (this.loginForm.valid) {
      this.authSrv.login(this.loginForm.value as User).subscribe({
        next: () => {
          this.loginForm.reset();
          // inicio de sesion exitoso, puede redirigir a otra página
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(`Error en el inicio de sesión ${err}`);
        }
      });
    }
  }
}