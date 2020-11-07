import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-animal-by-poop',
  templateUrl: './find-animal-by-poop.component.html',
  styleUrls: ['./find-animal-by-poop.component.css'],
})
export class FindAnimalByPoopComponent implements OnInit {
  poops = [
    'cat-poop',
    'chicken-poop',
    'cow-poop',
    'dog-poop',
    'frog-poop',
    'horse-poop',
    'mouse-poop',
    'pig-poop',
    'rabbit-poop',
    'sheep-poop',
    'elephant-poop',
  ];

  constructor() {}

  ngOnInit(): void {
    let numArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let poopsArray: number[];

    let randomNum = Math.floor(Math.random() * 9);
    for (let i = 0; i < 10; i++) {
      let num = numArray[randomNum];
      if (num > 9) {
        num = 0;
      }
      poopsArray[i] = num;
      num++;
    }
  }
}
