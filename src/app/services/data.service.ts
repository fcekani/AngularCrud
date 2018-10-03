import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Catalogs } from '../models/catalogs';
import { Requestdata } from '../models/requestdata';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getConfigurationsData(){
    return this.http.get('http://localhost/api/config/read')
  }

  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getUser(userId){
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + userId)
  }

  addUser(user: User):Observable<User>{
    return this.http.post<User>("https://jsonplaceholder.typicode.com/users", user);
  }

  getPosts(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  getComments(postId){
    return this.http.get('https://jsonplaceholder.typicode.com/comments/' + postId)
  }

  getAlbums(){
    return this.http.get('https://jsonplaceholder.typicode.com/albums')
  }

  getPhotos(){
    return this.http.get('https://jsonplaceholder.typicode.com/photos')
  }

  getCatalogs(requestData: Requestdata):Observable<Catalogs>{
    return this.http.post<Catalogs>('http://localhost/api/data/getall', requestData)
  }
}
