import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IModel } from './../models/model';
import { Observable, catchError, retry } from 'rxjs';
import { API_PATH } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  getAllModels(): Observable<IModel[]> {
    return this.http.get<IModel[]>(`${API_PATH}/models`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }

  getModel(id: number): Observable<IModel> {
    return this.http.get<IModel>(`${API_PATH}/models/${id}`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }

  createModel(model: IModel): Observable<IModel> {
    return this.http.post<IModel>(`${API_PATH}/models`, model).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }

  updateModel(id: number ,model: IModel): Observable<IModel> {
    return this.http.put<IModel>(`${API_PATH}/models/${id}`, model).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }

  deleteModel(id: number): Observable<IModel> {
    return this.http.delete<IModel>(`${API_PATH}/models/${id}`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));;
  }
}
