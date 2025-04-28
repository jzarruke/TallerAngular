import { Component, OnInit } from '@angular/core';
import { Serie } from './Serie';
// import { DataSeries } from './dataSeries';
import { SerieService } from './serie.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
  standalone: false
})
export class SeriesComponent implements OnInit {
  constructor(private serieService: SerieService) { }
  series: Array<Serie> = [];
  seasonAverage: number = 0;
  serieDetails: HTMLElement = document.getElementById('serieDetails')!;
  
  putSeriesList() {
    this.serieService.getSeriesData().subscribe(series => {
      this.series = series;
      this.calculateSeasonAverage();
    });
  }

  calculateSeasonAverage() {
    if (this.series.length > 0) {
      const totalSeasons = this.series.reduce((sum, serie) => sum + serie.seasons, 0);
      this.seasonAverage = totalSeasons / this.series.length;
    }
  }

  renderSerieDetails(serie: Serie) {
    console.log("entrando a renderSerieDetails");
    this.serieDetails.innerHTML = `<img src="${serie.poster}" alt="${serie.name}" class="img-fluid">
                                <h3>${serie.name}</h3>
                                <p>${serie.description}</p>
                                <a href="${serie.webpage}" target="_blank">${serie.webpage}</a>`;
  }

  ngOnInit() {
    this.putSeriesList();
  }
}