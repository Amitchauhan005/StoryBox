// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule,FormsModule,RouterModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'

// })
// export class RegisterComponent {

//   registerData = {
//     name: '',
//     email: '',
//     password: ''
//   };

//   onRegister() {
//     console.log(this.registerData);
  
//   }
// }



import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'

})
export class RegisterComponent {
  private firebase = inject(FirebaseService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

 form = this.fb.group({
  name: [''], 
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', [Validators.required]] 
});

successMsg: string = '';
errorMsg: string = '';

 async onRegister() {
  const { name, email, password, confirmPassword } = this.form.value;

  // ✅ password match check
  if (password !== confirmPassword) {
    this.errorMsg = 'Passwords do not match ❌';
    this.successMsg = '';
    return;
  }

  try {
    await this.firebase.register(email!, password!);

    // ✅ success message
    this.successMsg = 'Registration Successful 🎉';
    this.errorMsg = '';

    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 1000);

  } catch (err: any) {

    this.successMsg = '';

    // ✅ custom error messages
    if (err.code === 'auth/email-already-in-use') {
      this.errorMsg = 'Email already registered ❌';
    } 
    else if (err.code === 'auth/weak-password') {
      this.errorMsg = 'Password should be at least 6 characters ❌';
    } 
    else {
      this.errorMsg = 'Registration failed ❌';
    }
  }
}

}