import { Component, OnInit, ElementRef,  ViewChild} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router : Router, private authService : AuthService, private storage : AngularFireStorage) { }

  public email : string = "";
  public password : string  = "";

  uploadPercent : Observable<number>;
  urlImage : Observable<string>;

  @ViewChild('imageUser',{static : true}) inputImageUser : ElementRef;

  ngOnInit() {
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = 'upload/profile_'+id+'';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize (() => 
      this.urlImage = ref.getDownloadURL()
    )).subscribe();
  }

  onAddUser(){

    this.authService.registerUser(this.email, this.password)
    .then ((res) => {
      this.authService.isAuth().subscribe( data => {
        this.redirectListBook();
        if (data) {
          data.updateProfile ({
            photoURL : this.inputImageUser.nativeElement.value
          }).then (function() {
            //console.log("User Update");            
            
          }).catch ( function(err) {
            console.log("error", err)
          });
        }
      });     
    }).catch (err => console.log("error", err));

    this.redirectListBook();
    
  }

  onLogin() {    
    this.authService.loginEmailUser(this.email, this.password).then(data => {
      this.redirectListBook();
    }).catch ((err) => {
      console.log("error de logueo", err)
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
