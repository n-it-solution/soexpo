import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {TabsPage} from "../../pages/tabs/tabs";
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'ion-rating',
  templateUrl: 'ion-rating.html'
})
export class IonRating {

	@Input() numStars: number = 0;
	@Input() readOnly: boolean = true;
	@Input() value: number = 0;
  @Input() ratingName:string;
  @Input() url:string;
	@Output() clicked: EventEmitter<number> = new EventEmitter<number>();

	stars: string[] = [];
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }
  constructor(public toastCtrl: ToastController,
              public httpClient: HttpClient,
              public globalvar: GloaleVariablesProvider,
  ) {
    // this.presentToast();
  }

  ngAfterViewInit(){
    this.calc();
  }

  calc(){
    setTimeout(() => {
      this.stars = [];
      let tmp = this.value;
      for(let i=0; i < this.numStars; i++, tmp--)
        if(tmp >= 1)
          this.stars.push("star");
        else if (tmp < 1 && tmp > 0)
          this.stars.push("star-half");
        else
          this.stars.push("star-outline");
    }, 0);
  }
  data:any;
  postRating(value,name,url){
    let data  = {rating: value, criteria: name};
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this.globalvar.loginData.authorization,
        'Content-Type' : 'application/json'
      })
    };
    this.data = this.httpClient.post(url+'?lang='+this.globalvar.lang,data,httpOptions);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){

        }
      },error=> {
        console.log(error);
        if(error.status == 422){
          alert(error.error.message)
        }
        console.log(error.error.message)
      });
  }
  starClicked(index){
  	if(!this.readOnly) {
		  this.value = index+1;
		  this.calc();
		  this.clicked.emit(this.value);
		  console.log(this.value);
		  console.log(this.ratingName);
		  console.log(this.url);
		  this.postRating(this.value,this.ratingName,this.url)
	  }
  }
}
