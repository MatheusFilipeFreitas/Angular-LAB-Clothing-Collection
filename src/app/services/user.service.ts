import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { IUser } from '../models/user';
import { API_PATH } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${API_PATH}/users`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${API_PATH}/users/${id}`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${API_PATH}/users`, user).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }

  updateUser(id: number ,user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${API_PATH}/users/${id}`, user).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }

  deleteUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${API_PATH}/users/${id}`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }
}
