import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService : AuthService, private afsAuth : AngularFireAuth, private router : Router) { 

  }

  public app_name  : string = "BookStore";
  public isLogged : boolean = false;
  public aleatorio : String;
  public lastUpdate : Date;

  ngOnInit() {
    this.getCurrentUser();
    this.lastUpdate = new Date();
    this.aleatorio = new String(this.lastUpdate.getHours()+":"+this.lastUpdate.getMinutes()+":"+this.lastUpdate.getSeconds());
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe((data) => {
      if(data) {       
        this.isLogged = true;
      } else {        
        this.isLogged = false;
      }
    });
  }

  onLogout(){
     this.authService.logoutUser().then((data) => {       
       this.router.navigate(['/user/login']);
     } ).catch (err => {
       alert("No se pudo cerrar Sesion correctamente"+err)
      });
     
  }

}
