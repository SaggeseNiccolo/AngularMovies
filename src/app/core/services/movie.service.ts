import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiscoverResponse, Movie, VideoResult } from '../intefaces/types';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient, private base: HttpBaseService) {}

  getPopularMovies() {
    return this.http.get<DiscoverResponse>(
      this.base.buildApiRequest(
        'discover/movie',
        '&sort_by=popularity.desc&include_adult=false'
      )
    );
  }

  getMovieInfo(id: number) {
    return this.http.get<Movie>(this.base.buildApiRequest(`movie/${id}`));
  }

  getMovieTrailer(id: number) {
    return this.http.get<VideoResult>(
      this.base.buildApiRequest(`movie/${id}/videos`, '&language=it-IT')
    );
  }
}
