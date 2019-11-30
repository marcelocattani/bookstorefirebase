import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service'
import { BookInterface } from 'src/app/model/book';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private dataApi : DataApiService) { }

  public books = [];

  ngOnInit() {
    
    this.dataApi.getAllBooks().subscribe((data) => { 

       for (var i  = 0; i< data.length; i++){
        
        if (data[i].oferta == "1"){
         
          this.books[this.books.length] = data[i];

        }
      }  
    });

    

    } 

}
