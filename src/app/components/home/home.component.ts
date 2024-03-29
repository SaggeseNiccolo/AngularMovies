import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MovieService } from '../../core/services/movie.service';
import { DiscoverResponse, Movie } from '../../core/intefaces/types';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MatCardModule, CommonModule, MovieCardComponent],
})
export class HomeComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {
    this.getPopular();
  }

  getPopular() {
    this.movieService
      .getPopularMovies()
      .pipe(take(1))
      .subscribe({
        next: (result: DiscoverResponse) => {
          this.movies = result.results;
          // Sort by vote_average
          this.movies.sort((a, b) => b.vote_average - a.vote_average);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  cardClicked(id: number) {
    this.router.navigateByUrl(`/movie/${id}`);
  }
}
