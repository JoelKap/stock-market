import { Metadata } from './metadata.viewmodel';
import { TimeSeriesDailyViewModel } from './time-series-daily.viewmodel';

export class StockMarketViewModel {
  metaData: Metadata | undefined;
  timeSeriesDailyViewModels: TimeSeriesDailyViewModel[] | undefined;
}
