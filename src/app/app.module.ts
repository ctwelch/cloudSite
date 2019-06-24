import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FredDataComponent } from './dataSources/fred-data.component';
import { SeriesSearchComponent } from './series-search/series-search.component';
import { SearchService } from './series-search/search.service';
import { SeriesChartComponent } from './series-chart/series-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    FredDataComponent,
    SeriesSearchComponent,
    SeriesChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
