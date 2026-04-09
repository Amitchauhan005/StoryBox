// import { Component, inject } from '@angular/core';
// import { FirebaseService } from '../../services/firebase.service';
// import { Router, RouterModule } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-login',
//    standalone: true,  
//   imports: [CommonModule, ReactiveFormsModule,RouterModule], 
 
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })

// export class LoginComponent {

// constructor(private firebase: FirebaseService) {}

//   login() {
//     this.firebase.loginWithGoogle()
//       .then((res: any) => console.log(res))
//        .catch((err: any) => console.error(err));
//   }

//   logout() {
//     this.firebase.logout();
//   }

//     private router = inject(Router);

//   goToRegister() {
//     this.router.navigate(['/auth/register']);
//   }

// }


import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent {
  private firebase = inject(FirebaseService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  successMsg: string = '';
  errorMsg: string = '';

  // Email/Password login
 async onLogin() {
  const { email, password } = this.form.value;

  try {
    await this.firebase.login(email!, password!);

    this.successMsg = 'Login Successful ';
    this.errorMsg = '';

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);

  } catch (err: any) {

    this.successMsg = '';

    if (err.code === 'auth/user-not-found') {
      this.errorMsg = 'User not found ❌';
    } 
    else if (err.code === 'auth/wrong-password') {
      this.errorMsg = 'Wrong password ❌';
    } 
    else if (err.code === 'auth/invalid-email') {
      this.errorMsg = 'Invalid email ❌';
    } 
    else {
      this.errorMsg = 'Login failed ❌';
    }
  }
}

  // Google login
  async onGoogleLogin() {
    try {
      await this.firebase.loginWithGoogle();
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.errorMsg = err.message;
    }
  }
}


  