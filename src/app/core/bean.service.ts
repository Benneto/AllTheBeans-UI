import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bean } from './bean.model';
import { Observable, delay, map, of } from 'rxjs';
import { OrderRequest } from './order-request.model';

@Injectable({
  providedIn: 'root'
})
export class BeanService {
  private dataUrl = 'assets/data/AllTheBeans.json';

  constructor(private http: HttpClient) {}

  getBeans(): Observable<Bean[]> {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map(data =>
        data.map(item => ({
          id: item._id,
          index: item.index,
          isBeanOfTheDay: item.isBOTD,
          cost: item.Cost,
          image: item.Image,
          colour: item.colour,
          name: item.Name,
          description: item.Description,
          country: item.Country,
        }))
      )
    );
  }

  submitOrder(order: OrderRequest): Observable<{ success: boolean }> {
    console.log("Your Order Was Submitted!", order);
    return of({ success: true }).pipe(delay(5000));
  }
}
