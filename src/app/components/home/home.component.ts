import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MovieService } from '../../core/services/movie.service';
import { DiscoverResponse, Movie } from '../../core/intefaces/types';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MatCardModule, CommonModule, MovieCardComponent],
})
export class HomeComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {
    this.getPopular();
  }

  getPopular() {
    this.movieService
      .getPopularMovies()
      .pipe(take(1))
      .subscribe({
        next: (result: DiscoverResponse) => {
          this.movies = result.results;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  cardClicked(title: string) {
    console.log(`Card clicked: ${title}`);
  }
}
