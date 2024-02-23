import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, VideoInfo, VideoResult } from '../../core/intefaces/types';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ResolvedMovie {
  info: Movie;
  trailer: VideoResult;
}

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss',
})
export class MovieInfoComponent {
  movie!: Movie;
  trailer!: VideoInfo | undefined;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.data.subscribe({
      next: (routeData) => {
        let resolvedMovie: ResolvedMovie = routeData['movieInfo'];
        this.movie = resolvedMovie.info;
        this.trailer = resolvedMovie.trailer.results.find(
          (video) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer' &&
            video.official === true &&
            !video.name.toLowerCase().includes('Teaser')
        );
        console.log(this.trailer, resolvedMovie);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openTrailerDialog(): void {
    if (this.trailer) {
      this.dialog.open(TrailerDialog, {
        data: {
          trailer: this.trailer.key,
        },
      });
    }
  }
}

@Component({
  selector: 'trailer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  template: `
    @if (trailerUrl){
    <iframe
      width="560"
      height="315"
      [src]="trailerUrl"
      frameborder="0"
      allowfullscreen
    ></iframe>
    }
  `,
})
export class TrailerDialog implements OnInit {
  trailerUrl!: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<TrailerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _sanitizer: DomSanitizer
  ) {
    this.trailerUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.data.trailer}`
    );
  }

  ngOnInit(): void {}
}
