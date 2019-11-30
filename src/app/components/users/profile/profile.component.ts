import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthService) {    
   }


   user : UserInterface = {
     name : '',
     email : '',
     photoUrl : '',
     roles : {
       
     }
   };

   public providerId : string = '';

  ngOnInit() {
    this.authService.isAuth().subscribe((data) => {
      if (data) {

        this.user.name = data.displayName;
        this.user.email = data.email;
        this.user.photoUrl = data.photoURL;
        
        //console.log("user", this.user);

      }
    });
  }

}
