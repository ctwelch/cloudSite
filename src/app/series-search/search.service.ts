import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, tap, map } from 'rxjs/operators';
import { FredSeries } from './fredSeries.model';
import { FredSeriesSearchResult } from './fredSeriesSearchResult.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
  }

  keywordSearch(keywords: string): Observable<FredSeriesSearchResult> {
    keywords = keywords.replace(/\s/g, '+');
    // return this.http.get<any>('https://api.stlouisfed.org/fred/series/search?search_text=' +
    //                             keywords + '&api_key=11415bc0dd389c78c9094ffd5f8f41e5').pipe(
    //                               tap(data => console.log(JSON.stringify(data))),
    //                               // catchError()
    //                             );
    return this.http.get<FredSeriesSearchResult>('/api/fred/series/search?search_text=' +
      keywords + '&api_key=11415bc0dd389c78c9094ffd5f8f41e5&file_type=json').pipe(
      tap(data => console.log(JSON.stringify(data.seriess)))
      // catchError()
    );
  }

  getSeriesObservations(seriesId: string): Observable<any> {
    return this.http.get<any>('/api/fred/series/observations?series_id=' +
    seriesId + '&api_key=11415bc0dd389c78c9094ffd5f8f41e5&file_type=json').pipe(
    tap(data => console.log(JSON.stringify(data))));
  }
}
// "target": "https://api.stlouisfed.org/fred/series/search?search_text=interest&api_key=11415bc0dd389c78c9094ffd5f8f41e5",
