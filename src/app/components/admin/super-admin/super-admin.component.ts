import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { UserInterface } from 'src/app/model/user';
import { NgForm } from '@angular/forms';
import { Roles } from '../../../model/user'


@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})

export class SuperAdminComponent implements OnInit {

  constructor(private authService : AuthService) { }

  public users : UserInterface[];
  public isEditing : boolean = null;
  public selectedUser : string = null; 
  public selectedName : string = null;
  public selectedEmail : string = null;
  public selectedRole : string = null;
  public rolSelected : string; 
  public roles : Roles;



  ngOnInit() {
    this.onGetAllUsers();
    
  }

  onGetAllUsers(){
    this.authService.getAllUser().subscribe( data => {
      this.users = data; 
           
    });
  }

  onPreUpdate (user : UserInterface) {
    this.selectedUser = user.id;
    this.selectedName = user.name;
    this.selectedEmail  = user.email;
    this.selectedRole = user.roles.role_text;

    this.isEditing = true;

    this.authService.selectedUser = Object.assign({}, user);
  }  

  onSave(userForm : NgForm){  

    this.authService.updateDateCompleteUser(userForm.value);

    this.selectedEmail = null;
    this.selectedName = null;
    this.selectedUser = null;
    this.selectedRole = null;
  }
  

}
