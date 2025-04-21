import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bean } from './bean.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeanService {
  private dataUrl = 'assets/AllTheBeans.json';

  constructor(private http: HttpClient) {}

  getBeans(): Observable<Bean[]> {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map(data =>
        data.map(item => ({
          id: item._id,
          index: item.index,
          isBeanOfTheDay: item.isBOTD,
          Cost: item.Cost,
          Image: item.Image,
          colour: item.colour,
          Name: item.Name,
          Description: item.Description,
          Country: item.Country
        }))
      )
    );
  }
}
