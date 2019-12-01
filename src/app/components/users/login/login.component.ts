import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email : string = "";
  public pass : string = "";
  public isError : boolean = false;

  constructor(public afAuth : AngularFireAuth, private router : Router, private authService : AuthService) { }

  ngOnInit() {
  }

  onLogin() {   

  this.authService.loginEmailUser(this.email, this.pass).then(data => {    
    this.redirectListBook();
    }).catch ((err) => {
      console.log("error de logueo", err)
      this.isError = true;
      setTimeout(() =>{
        this.isError = false       
      }, 4000)
    });  
    
  }

  onLoginGoogle(){
    this.authService.loginGoogleUser().then((data) => {      
      this.redirectListBook();
    }).catch(err => console.log('error', err.message));
  }

  onLoginFacebook(){
    this.authService.loginFacebookUser().then((data) => {
      this.redirectListBook();
    }).catch(err => console.log('error', err));
  }

  private redirectListBook(){
    this.router.navigate(['/admin/list-books']);
  }

}
