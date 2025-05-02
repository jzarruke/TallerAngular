import { Component, OnInit } from '@angular/core';
import { Serie } from './serie';
import { SerieService } from './serie.service';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css'],
  standalone: false
})

export class SerieComponent implements OnInit {
  constructor(private serieService: SerieService) { }
  series: Array<Serie> = [];
  seasonAverage: number = 0;
  @ViewChild('serieDetails') serieDetailsRef!: ElementRef<HTMLDivElement>;

  
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
    this.serieDetailsRef.nativeElement.innerHTML = `
    <img src="${serie.poster}" alt="${serie.name}" class="img-fluid">
    <h3>${serie.name}</h3>
    <p>${serie.description}</p>
    <a href="${serie.webpage}" target="_blank">${serie.webpage}</a>`;
  }

  ngOnInit() {
    this.putSeriesList();
  }
}