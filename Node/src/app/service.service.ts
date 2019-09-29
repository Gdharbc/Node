import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url ='http://localhost:2345/api/employees/';

  constructor(private http: Http) { }

  getCourse(){
    return this.http.get(this.url)
    .pipe(map((response : Response) => {
        return response.json();   
    }));  
  }

  postCourse(data){
    return this.http.post(this.url, data);
  }

  deleteCourse(id){
    return this.http.delete(this.url+id);
  }

}
