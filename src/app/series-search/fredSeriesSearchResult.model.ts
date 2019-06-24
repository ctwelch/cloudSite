import { FredSeries } from './fredSeries.model';

export class FredSeriesSearchResult {
  constructor(
    public count: number,
    public limit: number,
    public offset: number,
    public orderBy: string,
    public realtimeEnd: string,
    public realtimeStart: string,
    public seriess: FredSeries[],
    public sortOrder: string
  ) {}
}
