import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const TRIVIA_ENDPOINT = 'http://laravelcoronacheckup-env.eba-usbxhfdm.us-west-2.elasticbeanstalk.com/api/questions';

@Injectable({
  providedIn: 'root'
})
export class LaravelService {

  constructor(private http: HttpClient) {
  }

  getQuestions() {
    return this.http.get(TRIVIA_ENDPOINT, {})
      .pipe(
        map(
          (response: any) => response
        )
      );
  }
}
