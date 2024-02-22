import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Movie } from '../../core/intefaces/types';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  @Input() info!: Movie;
  @Output() movieClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
