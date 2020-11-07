import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-animal-game',
  templateUrl: './find-animal-game.component.html',
  styleUrls: ['./find-animal-game.component.css'],
})
export class FindAnimalGameComponent implements OnInit {
  animalPath: string;
  constructor(@Inject(DOCUMENT) document) {}

  ngOnInit(): void {
    this.animalPath = 'pig/pig';

    document.querySelector(
      'audio'
    ).src = `../../../assets/${this.animalPath}.mp3`;

    let animalPic = document.getElementById('animalPic');
    animalPic.style.left =
      (Math.random() * (window.innerWidth - 300)).toFixed() + 'px';
    animalPic.style.top =
      (Math.random() * (window.innerHeight - 200)).toFixed() + 'px';

    let animalLoc = {
      x: animalPic.getBoundingClientRect().x,
      y: animalPic.getBoundingClientRect().y,
    };
    let maxDistanceToEdgeOfScreen = Math.sqrt(
      Math.pow(window.innerWidth - animalLoc.x, 2) +
        Math.pow(window.innerHeight - animalLoc.y, 2)
    );

    document.onmousemove = (event) => {
      let mouseLoc = { x: event.pageX, y: event.pageY };
      let currentDiff = {
        x: Math.abs(mouseLoc.x - animalLoc.x),
        y: Math.abs(mouseLoc.y - animalLoc.y),
      };
      let currentDistanceBetweenMouseAndAnimal = Math.sqrt(
        Math.pow(currentDiff.x, 2) + Math.pow(currentDiff.y, 2)
      );

      document.querySelector('audio').volume =
        1 - currentDistanceBetweenMouseAndAnimal / maxDistanceToEdgeOfScreen;
    };

    animalPic.onclick = () => {
      animalPic.style.opacity = '1';
      document.querySelector('audio').pause();
    };
  }

  ngOnDestroy() {
    document.onmousemove = (event) => {};
  }
}
