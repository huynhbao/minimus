import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { City } from 'src/app/models/city.model';
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
    this.userData = user;
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

  getCities(): Observable<City[]> {
    const citiesDocuments = this.fs.collection<City[]>(`${this.userData.uid}`);
    return citiesDocuments.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((city) => {
          const data = city.payload.doc.data();
          const id = city.payload.doc.id;
          return { id, ...data } as City;
        });
      })
    );

    /* return citiesDocuments.snapshotChanges().pipe(
      map((changes) =>
        changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        })
      ),
      map((products) => products.find((doc) => doc.id === id))
    ); */

    /* return citiesDocuments.snapshotChanges().pipe(
      map((changes) => {
        const name = changes.payload.data();
        //const id = changes.payload.id;
        return { ...name };
      })
    ); */

    //return of();
  }

  /* addCity(name: string) {
    return this.auth.uid()
      .pipe(switchMap((uid) => {
        return this.fs
          .write(`${uid}/${name}`, {name, added: new Date()})
          .pipe(first());
      }), first());
  } */
}
