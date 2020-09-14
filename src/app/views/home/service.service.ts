import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {logger} from 'codelyzer/util/logger';
import {Record} from './Record';
import {Category} from './Category';
import {log} from 'util';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private serviceUrl = 'http://127.0.0.1:8080';

  constructor(private httpClient: HttpClient) { }

  // 获取列表数据
  getCatList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.serviceUrl + '/category');
  }

  // 获取单个数据
  // getmyList(start: Date, end: Date): Observable<myList[]> {
  //   const params = new HttpParams({
  //     fromString: 'start=' + start + ',end=' + end
  //   });
  //   const findhttpOptions = {
  //     headers: new HttpHeaders({'content-Type': 'application/json'}),
  //     params: params
  //   };
  //   return this.httpClient.get<UserInfo>(this.serviceUrl + '/findOneUser', findhttpOptions)
  //     .pipe(catchError(this.handleError<UserInfo>('getOneUser id' + id)));
  // }
 
  // 添加一个新用户
  addCategory(cat: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.serviceUrl + '/category', cat, httpOptions)
      .pipe(catchError(this.handleError<Category>('addCategory')));
  }
 
  // // 删除一个用户
  // deleteCategory(user: number): Observable<UserInfo> {
  //   const id = typeof user === 'number' ? user : user.id;
  //   const url = `${this.serviceUrl}/${id}`;
  //   const delhttpOptions = {
  //     headers: new HttpHeaders({'content-Type': 'application/json'}),
  //     body: user
  //   };
  //   return this.httpClient.delete<UserInfo>(url, delhttpOptions)
  //     .pipe(catchError(this.handleError<UserInfo>('deleteUser')));
  // }
 
  // // 更新数据
  // updateUser(user: UserInfo): Observable<any> {
  //   return this.httpClient.put(this.serviceUrl + '/update', user, httpOptions)
  //     .pipe(catchError(this.handleError('updateUser id=' + user.id)));
  // }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
