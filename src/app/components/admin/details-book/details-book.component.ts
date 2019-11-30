import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service'
import { BookInterface } from 'src/app/model/book';
import { ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  constructor(private dataApi : DataApiService, private router: ActivatedRoute) { }

  private book : BookInterface = {};

  ngOnInit() {
    const idBook = this.router.snapshot.params['id'];
    this.getDetails(idBook);
  }

  getDetails(idBook : string) {    
    this.dataApi.getOneBook(idBook).subscribe( data => {
      this.book = data;
    })
  }

}
