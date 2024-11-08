import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Credential } from '../../interfaces/credenciales';
import { CredencialesService } from '../../services/credenciales.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ''
  password: string = ''
  Error: string = ''
  constructor(private router: Router, private _CredencialesService: CredencialesService) {

  }

  login() {
    if (this.validateForm()) {
      const user: User = { email: this.email, password: this.password }
      this._CredencialesService.login(user).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('rol', data.rol)
          console.log(data)
          this.router.navigate([''])
        },
        error: (e: HttpErrorResponse) => {
          this.Error = 'Password or Usser wrongs'
        }
      })
    }

  }

  validateForm() {
    if (!this.email || !this.password) {
      this.Error = ' Put all Camps'
      return false
    }
    const regrex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!regrex.test(this.password)) {
      this.Error = 'Put a validate Password'
      return false
    }
    return true
  }
}

