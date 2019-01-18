import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseURL = "http://localhost:8080/expense/";

  constructor(private http: HttpClient) { }

  // private extractData(res: Response) {
  //   let body = res;
  //   return body || { };
  // }

  getAllExpensesByCategory(userId, cycle, category): Observable<any> {
    // userId = "5c355a7efb6fc0600bdc135d";
    // cycle = "012019";
    // category = "Travel";
    var payload = {
      "userId":userId,
      "cycle":cycle,
      "category":category
    }
    console.log(payload)
    return this.http.post(this.baseURL+"getAllExpensesByCategory/", payload);
    // return this.http.get(this.baseURL+"5c355bb3fb6fc0600bdc13f5").pipe(
    //   tap(_ => console.log(`hiiiii`)),
    //   catchError(this.handleError(`Server down`))
    // );
  }

  createExpense(expenseObject): Observable<any> {
    expenseObject = {
      "userId":"",
      "category":"",
      "amount":"",
      "date":"",
      "cycle":"",
      "description":""
    }
    return this.http.get(this.baseURL, expenseObject);
  }

  getTotalPerCategory(userId, cycle): Observable<any> {
    // userId = "5c355a7efb6fc0600bdc135d";
    // cycle = "012019";
    return this.http.get(this.baseURL+"getTotalPerCategory/"+userId+"/"+cycle)
  }

  // deleteProduct (id): Observable<any> {
  //   return this.http.delete<any>(endpoint + 'products/' + id, httpOptions).pipe(
  //     tap(_ => console.log(`deleted product id=${id}`)),
  //     catchError(this.handleError<any>('deleteProduct'))
  //   );
  // }

  

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  
  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);
  
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
