import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {logger} from 'codelyzer/util/logger';
import {Record} from './Record';
import {HomeList} from './HomeList';
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

  //private serviceUrl = 'http://127.0.0.1:8080';
  private serviceUrl = 'http://6d4703ac.cpolar.io/';


  constructor(private httpClient: HttpClient) { }

  // 获取列表数据
  getCatList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.serviceUrl + '/category');
  }


  getRecordList(start: string, end: string): Observable<HomeList[]> {
    return this.httpClient.get<HomeList[]>(this.serviceUrl + '/record/getCategoryDetail?start=' + start + '&end=' + end);
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

  addRecord(record: Record, start: string, end: string): Observable<HomeList[]> {
    // const params = new HttpParams({fromString:"record=" + record +"&start=" + start + "&end=" + end});//方式二：使用 fromString
    return this.httpClient.post<HomeList[]>(this.serviceUrl + '/record?start='+start+"&end="+end, record, httpOptions)
      .pipe(catchError(this.handleError<HomeList[]>('addRecord')));
  }
 
  // 删除一个用户
  deleteCategory(id: number): Observable<Category[]> {
    
    return this.httpClient.delete<Category[]>(this.serviceUrl + '/category/'+id)
      .pipe(catchError(this.handleError<Category[]>('deleteCategory')));
  }

  deleteRecord(id: number,start: string, end: string): Observable<HomeList[]> {
    
    return this.httpClient.delete<HomeList[]>(this.serviceUrl + '/record/'+id+'?start='+start+'&end='+end)
      .pipe(catchError(this.handleError<HomeList[]>('deleteRecord')));
  }
 
  // 更新数据
  updateCategory(id: number, name: string): Observable<any> {
    return this.httpClient.put(this.serviceUrl + '/category/'+id +'?name='+name,httpOptions)
      .pipe(catchError(this.handleError('updateCat id=' + id)));
  }

  updateRecord(id: number, record: Record, start: string, end: string): Observable<any> {
    return this.httpClient.put(this.serviceUrl + '/record/'+id +'?start='+start+"&end="+end,record,httpOptions)
      .pipe(catchError(this.handleError('updateRecord id=' + id)));
  }
 
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
