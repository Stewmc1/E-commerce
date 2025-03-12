import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const signUpButton = this.el.nativeElement.querySelector('#signUp');
    const signInButton = this.el.nativeElement.querySelector('#signIn');
    const container = this.el.nativeElement.querySelector('#container');

    if (signUpButton && signInButton && container) {
      this.renderer.listen(signUpButton, 'click', () => {
        this.renderer.addClass(container, 'right-panel-active');
      });

      this.renderer.listen(signInButton, 'click', () => {
        this.renderer.removeClass(container, 'right-panel-active');
      });
    }
  }
  signIn(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Uy',
        text: 'Completa todos los campos para seguir :)',
      });
      return;
    }

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.setUserName(name);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: `Sesión iniciada como: ${name}`,
    });

    this.router.navigate(['/platform']);
  }

  signUp(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Uy',
        text: 'Completa todos los campos para seguir :)',
      });

      return;
    }

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.setUserName(name);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: `Cuenta creada para: ${name} (${email})`,
    });
    this.router.navigate(['/platform']);
  }
}
