import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { map, finalize } from 'rxjs/operators' ;
import { auth } from 'firebase';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { UserInterface, Roles } from '../model/user';
import { Observable, merge } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth : AngularFireAuth, private afs: AngularFirestore) { }

  
  public userCollection : AngularFirestoreCollection<UserInterface>;

  public user : AngularFirestoreDocument<UserInterface>
  public userCurrent : Observable<UserInterface>;
  public users : Observable<UserInterface[]>
  public userExist : boolean;

  public selectedUser : UserInterface;
  public roles : Roles;

  public isLogged : boolean = false;
  public isAdmin : boolean = false;

  

  registerUser(email : string, pass : string){

     return new Promise((resolve, reject)=> {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then((data) => {
        resolve(data),

        this.updateUserData(data)

      }).catch (err => console.log(reject(err)))      
    });

    
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

      this.updateUserData(credential)
    }) 

  }

  loginGoogleUser(){

     return this.afsAuth.auth.signInWithPopup( new auth.GoogleAuthProvider())
     .then((credential) => {      
      this.updateUserData(credential);       
     });

  }

  logoutUser(){

    return this.afsAuth.auth.signOut();

  }

  isAuth(){ 
    return this.afsAuth.authState.pipe(map (auth => auth));
  }

  public updateUserData(datos : auth.UserCredential){
    
    const userRef : AngularFirestoreDocument <any> = this.afs.doc('users/'+datos.user.uid);
    
    if (datos.additionalUserInfo.isNewUser) {
      return userRef.set({
        name : datos.user.displayName,
        email : datos.user.email,
        id : datos.user.uid,
        roles : {
          client : true, 
          role_text : 'client'
        }
      }, { merge : true});      
    } 
  }

  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>('users/'+userUid).valueChanges();
  }

  getOneUser (idUser : string){
    this.user = this.afs.doc<UserInterface>('users/'+idUser);
    return this.userCurrent = this.user.snapshotChanges().pipe( map (action => {
      if (action.payload.exists == false){
        return null;
      } else {
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  getAllUser(){
    this.userCollection = this.afs.collection<UserInterface>('users');
    return this.users = this.userCollection.snapshotChanges()
    .pipe( map (changes => {
      return changes.map ( action => {
        const data = action.payload.doc.data() as UserInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  updateDateCompleteUser (datos) { 
    const userRef : AngularFirestoreDocument <UserInterface> = this.afs.doc('users/'+datos.userId);
    

    switch (datos.role_text) {
      case 'client' : this.roles = { client : true, role_text : 'client'};
      break;

      case 'admin' : this.roles = { admin : true, role_text : 'admin'};
      break;

      case 'editor' : this.roles = { editor : true, role_text : 'editor'};
      break;

      case 'collaborator' : this.roles = { collaborator : true, role_text : 'collaborator'};
      break;

      default : 
      console.log("ha ocurrido un error, ha llegado", datos.value.role_text);
    }

    userRef.update({
      name : datos.name,
      email : datos.email,
      id : datos.userId,
      roles : this.roles
    });


  }
  
  /*
  private getUserByEmail (email : string) {
    this.userCollection = this.afs.collection('users', ref => ref.where('email', "==", email));
    
    return this.users = this.userCollection.snapshotChanges()
    .pipe (map ( changes=> {
      return changes.map (action => {
        const data = action.payload.doc.data() as UserInterface;
        data.id = action.payload.doc.id;
        return data;
      })
    }));
  }*/

  getCurrentUser(){
    return this.isAuth().subscribe((data) => {
      if(data) {       
        this.isLogged = true;
        this.isUserAdmin(data.uid).subscribe(data => {
          if (data){
            try {
              this.isAdmin = data.roles.admin;
            } catch (error) {
              console.log("Usted no es administrador");
            }           
          }         
        });
      } else {        
        this.isLogged = false;
      }
    });
  }
}
