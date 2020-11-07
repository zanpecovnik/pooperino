import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-animal-by-sound-game',
  templateUrl: './find-animal-by-sound-game.component.html',
  styleUrls: ['./find-animal-by-sound-game.component.css'],
})
export class FindAnimalBySoundGameComponent implements OnInit {
  sounds = [
    'cat',
    'chicken',
    'cow',
    'dog',
    'frog',
    'horse',
    'mouse',
    'pig',
    'rabbit',
    'sheep',
    'snake',
  ];

  constructor() {}

  ngOnInit(): void {}
}
