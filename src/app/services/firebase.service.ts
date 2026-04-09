
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut,
  onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, User } from 'firebase/auth';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FirebaseService {

  private app = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.app);
  private googleProvider = new GoogleAuthProvider();

  currentUser$ = new BehaviorSubject<User | null | undefined>(undefined);

  constructor(private router: Router) { 
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser$.next(user);

      if (user) {
        user.getIdToken().then(token => localStorage.setItem('token', token));
        // ✅ Login hote hi home pe bhejo
        if (this.router.url.includes('/auth')) {
          this.router.navigate(['/home']);
        }
      } else {
        localStorage.removeItem('token');
      }
    });
  }

  loginWithGoogle() { return signInWithPopup(this.auth, this.googleProvider); }
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  logout() { return signOut(this.auth); }
}




// import { Injectable } from '@angular/core';
// import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   User
// } from 'firebase/auth';
// import { environment } from '../../environments/environment';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class FirebaseService {

//   private app = initializeApp(environment.firebaseConfig);
//   private auth = getAuth(this.app);
//   private googleProvider = new GoogleAuthProvider();

//   currentUser$ = new BehaviorSubject<User | null>(null);

//   constructor() {
//     onAuthStateChanged(this.auth, (user) => {
//       this.currentUser$.next(user);
//       if (user) {
//         user.getIdToken().then(token => localStorage.setItem('token', token));
//       } else {
//         localStorage.removeItem('token');
//       }
//     });
//   }

//   loginWithGoogle() {
//     return signInWithPopup(this.auth, this.googleProvider);
//   }

//   register(email: string, password: string) {
//     return createUserWithEmailAndPassword(this.auth, email, password);
//   }

//   login(email: string, password: string) {
//     return signInWithEmailAndPassword(this.auth, email, password);
//   }

//   logout() {
//     return signOut(this.auth);
//   }
// }



