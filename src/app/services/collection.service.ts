import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICollection } from '../models/collection';
import { Observable, catchError, retry } from 'rxjs';
import { API_PATH } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getAllCollections(): Observable<ICollection[]> {
    return this.http.get<ICollection[]>(`${API_PATH}/collections`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));
  }

  getCollection(id: number): Observable<ICollection> {
    return this.http.get<ICollection>(`${API_PATH}/collections/${id}`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));
  }

  createCollection(collection: ICollection): Observable<ICollection> {
    return this.http.post<ICollection>(`${API_PATH}/collections`, collection).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));
  }

  updateCollection(id: number ,collection: ICollection): Observable<ICollection> {
    return this.http.put<ICollection>(`${API_PATH}/collections/${id}`, collection).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));
  }

  deleteCollection(id: number): Observable<ICollection> {
    return this.http.delete<ICollection>(`${API_PATH}/collections/${id}`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));
  }

  getAllCollectionsSorted(): Observable<ICollection[]> {
    return this.http.get<ICollection[]>(`${API_PATH}/collections?_sort=budget&_order=DESC`).pipe(catchError(() => {
      throw new Error("Failed to reach the server!");
    }), retry({count: 2, delay: 500}));
  }
}
