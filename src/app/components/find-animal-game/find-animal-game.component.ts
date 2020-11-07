import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import games from 'src/app/constants/games';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-find-animal-game',
  templateUrl: './find-animal-game.component.html',
  styleUrls: ['./find-animal-game.component.css'],
})
export class FindAnimalGameComponent implements OnInit {
  animalPath: string;
  currentIndex = 0;
  startTime;
  endTime;
  animals = [
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
    'elephant',
  ];
  constructor(
    @Inject(DOCUMENT) document,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.startTime = new Date().getTime();
    this.animals = this.shuffleArray(this.animals);
    let animalName = this.animals[0];
    this.animalPath = `${animalName}/${animalName}`;

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

      if (
        currentDistanceBetweenMouseAndAnimal / maxDistanceToEdgeOfScreen >=
        0.9
      ) {
        document.querySelector('audio').volume = 0.1;
      } else {
        document.querySelector('audio').volume =
          1 - currentDistanceBetweenMouseAndAnimal / maxDistanceToEdgeOfScreen;
      }
    };

    animalPic.onclick = () => {
      animalPic.style.opacity = '1';
      document.querySelector('audio').pause();
      this.endTime = new Date().getTime();
      const timeNeeded = this.endTime - this.startTime;

      let top5 = this.firebaseService
        .getTop5(games.SOUND_ORIGINAL_GAME)
        .subscribe((snapshot) => console.log(snapshot.data().scoreboard));
    };
  }

  ngOnDestroy() {
    document.onmousemove = (event) => {};
  }

  shuffleArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
}
