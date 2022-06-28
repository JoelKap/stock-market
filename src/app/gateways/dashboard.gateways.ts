import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class DashboardGateaway {
  constructor(private http: HttpClient) {}

  getStockMarkets(skip: number, take: number): Observable<any> {
    return this.http.get(`${BACKEND_URL}/api/StockMarket/${skip}/${take}`);
  }
}
