import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookInterface } from '../../model/book';
import { NgForm } from '@Angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi : DataApiService) { }

  ngOnInit() {   
  }

  @ViewChild('btnClose' ,{static :true}) btnClose : ElementRef;
  @Input() userUid : string;


  onSaveBook(bookForm : NgForm) : void {    
    
    if (bookForm.value.id === null) {
     
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    } else {
    
     this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();    
    this.btnClose.nativeElement.click();        
  }

  onClose(formBook : NgForm){
    formBook.resetForm();
  }

}
