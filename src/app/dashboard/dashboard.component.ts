import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { interval, mergeMap, Subscription } from 'rxjs';

import { DashboardService } from '../service/dashboard.service';
import { StockMarketViewModel } from '../viewmodels/stock-market.viewmodel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  date: Date | undefined;

  private take: number = 5;
  private skip: number = 0;

  private minute: number = 1;
  private readonly _time = this.minute * 60 * 1000;

  private isAppLive: boolean = true;

  viewModel: StockMarketViewModel | undefined;
  $observableRef: Subscription = new Subscription();

  constructor(
    private toastServ: ToastrService,
    private dashboardService: DashboardService
  ) {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.getStockMarkets(this.skip, this.take);
  }

  ngOnDestroy(): void {
    this.$observableRef.unsubscribe();
  }

  private getStockMarkets(skip: number, take: number): any {
    if (!this.isAppLive) {
      this.resetAppConfig();
      return this.toastServ.info(`The system has reached it daily feeds!`);
    }

    try {
      this.$observableRef = interval(this._time)
        .pipe(
          mergeMap(() =>
            this.dashboardService.getStockMarkets(this.skip, this.take)
          )
        )
        .subscribe((resp: any) => {
          if (resp.timeSeriesDailyViewModels.length) {
            this.skip += this.take;
            this.viewModel = resp;
          } else {
            this.toastServ.info(`The system has reached it daily feeds!`);
            this.resetAppConfig();
          }
        });
    } catch (ex) {
      this.toastServ.error(
        `Please contact admin, something had gone wrong! ${ex}`
      );
    }
  }

  private resetAppConfig() {
    this.minute = 0;
    this.isAppLive = false;
  }
}
