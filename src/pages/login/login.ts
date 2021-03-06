import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { LoginService } from "./loginService";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    email:string;
    password:string;
  constructor(public nav: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController,
   private mservice: LoginService) {
    //this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    if(this.email == "" || this.email == undefined)
    {
      let toast = this.toastCtrl.create({
        message: 'Enter Username / Email Id ',
        duration: 3000,
        position: 'bottom',
        cssClass: 'dark-trans',
        closeButtonText: 'OK',
        showCloseButton: true
      });
      toast.present();
    }
    else if(this.password == "" || this.password == undefined)
    {
      let toast = this.toastCtrl.create({
        message: 'Enter Password',
        duration: 3000,
        position: 'top',
        cssClass: 'dark-trans',
        closeButtonText: 'OK',
        showCloseButton: true
      });
      toast.present();
    }
    else{
    this.mservice.getLogin(this.email,this.password).subscribe((response:any) =>
    {
      console.log(response);
      if(response.status)
      {
        alert(response.message);
      }
      else
      {
        alert(response.message);
      }
    });
  }
  }

  forgotPass() {
    let forgot = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
