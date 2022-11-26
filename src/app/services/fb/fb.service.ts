import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FbService {

  userData?: any;

  constructor(public afAuth: AngularFireAuth, private fs: AngularFirestore) {
    this.afAuth.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  get isAuth(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
    //return user !== null && user.emailVerified !== false ? true : false;
  }

  signin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signOut() {
    return this.afAuth.signOut();
  }


  getCities() {
    return this.userData.pipe(switchMap((uid) => {
      return this.fs.collection(`${uid}`);
    }));
  }

  addCity(name: string) {
    return this.auth.uid()
      .pipe(switchMap((uid) => {
        return this.fs
          .write(`${uid}/${name}`, {name, added: new Date()})
          .pipe(first());
      }), first());
  }
}
