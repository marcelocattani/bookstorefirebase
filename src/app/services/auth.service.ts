import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators' ;
import { auth } from 'firebase';

import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { UserInterface } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth : AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email : string, pass : string){
    return new Promise((resolve, reject)=> {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then((data) => {
        resolve(data),
        this.updateUserData(data.user)
      }).catch (err => console.log(reject(err)))      
    });
  }

  loginUser(){

  }

  loginEmailUser(email : string, pass : string){    
    return new Promise ((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass).
      then (userData => resolve (userData),
      err => reject(err));
    });
  }

  loginFacebookUser(){
    return  this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then ((credential) => {
      this.updateUserData(credential.user)
    })    
  }

  loginGoogleUser(){
     return this.afsAuth.auth.signInWithPopup( new auth.GoogleAuthProvider())
     .then((credential) => {
       this.updateUserData(credential.user);
     });    
  }

  logoutUser(){
    return this.afsAuth.auth.signOut();
  }

  isAuth(){     
    return this.afsAuth.authState.pipe(map (auth => auth));
  }

  private updateUserData(user){
    const userRef : AngularFirestoreDocument <any> = this.afs.doc('users/'+user.uid);
    const data : UserInterface = {
      id : user.uid,
      email : user.email,
      roles : {
        editor : false
      }
    }
    return userRef.set(data, {merge : true});
  }

  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>('users/'+userUid).valueChanges();
  }

}
