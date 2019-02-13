import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GloaleVariablesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GloaleVariablesProvider {
apiUrl = 'https://app.soexpo.net/api/';
  constructor(public http: HttpClient) {
    console.log('Hello GloaleVariablesProvider Provider');
  }

}
