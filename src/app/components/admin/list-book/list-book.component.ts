import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../../../services/data-api.service'
import { BookInterface } from 'src/app/model/book';

import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../model/user';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  constructor(private dataApi : DataApiService,private authService : AuthService) { 

  }

  public isAdmin : any = null;
  public userUid : string = null;

  private books : BookInterface[]; //No se debe Inicializar

  ngOnInit() {
    this.getListBook();
    this.getCurrenUser();
  }


  public getCurrenUser() : void{
    this.authService.isAuth().subscribe( (data) => {
      if (data) {

        this.userUid = data.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({},userRole.roles);
          this.isAdmin = this.isAdmin.hasOwnProperty('admin');
          
        })
      }
    });
  }

  getListBook(){
    this.dataApi.getAllBooks().subscribe( (books) => {
      this.books = books;           
    });
  }

  onDeleteBook(id: string) {
    const confirmacion = confirm("Are you sure?");
    if (confirm) {      
      this.dataApi.deleteBook(id);
    }    
  } 

  onPreUpdateBook(book: BookInterface){    
    this.dataApi.selectedBook = Object.assign({},book);
  }

}
