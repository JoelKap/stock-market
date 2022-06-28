import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DashboardGateaway } from '../gateways/dashboard.gateways';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private dashboardGateway: DashboardGateaway) {}

  getStockMarkets(skip: number, take: number): Observable<any> {
    return this.dashboardGateway.getStockMarkets(skip, take);
  }
}
