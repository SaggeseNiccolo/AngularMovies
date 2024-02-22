import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiscoverResponse } from '../intefaces/types';
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
}
