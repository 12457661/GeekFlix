import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from '../models/Page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  url:string = 'https://api.themoviedb.org/3/discover/movie?api_key=b45808cfc639faa44235410b835b0912&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=878&page=';
  constructor(private http:HttpClient) { }

  getPage(pageNum):Observable<Page> {
    return this.http.get<Page>(this.url + pageNum);
  }
}
