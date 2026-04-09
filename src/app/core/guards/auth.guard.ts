import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { filter, map, take, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const firebase = inject(FirebaseService);
  const router = inject(Router);

  return firebase.currentUser$.pipe(
         filter(user => user !== undefined), 
      tap(user => console.log('Guard check — user:', user)),
    take(1),
    map(user => {
       console.log('Guard decision — user:', user); 
      if (user) return true;
      router.navigate(['/auth/login']);
      return false;
    })
  );
};



// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { FirebaseService } from '../../services/firebase.service';
// import { filter, map, take } from 'rxjs/operators';

// export const authGuard: CanActivateFn = () => {
//   const firebase = inject(FirebaseService);
//   const router = inject(Router);

//   return firebase.currentUser$.pipe(
//     filter(user => user !== undefined), 
//     take(1),                            
//     map(user => {
//       if (user) return true;            
//       router.navigate(['/auth/login']); 
//       return false;
//     })
//   );
// };