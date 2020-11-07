import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import games from 'src/app/constants/games';
import { FirebaseService } from 'src/app/services/firebase.service';
// import { v4 as uuid } from 'uuid';

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
  interval;
  currentTimePassed = 0;
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
    this.startCounting();
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
      const timeNeeded = (this.endTime - this.startTime) / 1000;

      this.getAndPossiblySetTop5('testPlayerName', timeNeeded);

      this.stopCounting();
    };
  }

  startCounting() {
    this.interval = setInterval(() => {
      this.currentTimePassed++;
    }, 100);
  }

  stopCounting() {
    clearInterval(this.interval);
  }

  getAndPossiblySetTop5 = (playerName, timeNeeded) => {
    this.firebaseService
      .getTop5(games.SOUND_ORIGINAL_GAME)
      .subscribe((snapshot) => {
        let top5 = snapshot.data().scoreboard;
        top5.push({ name: playerName, time: timeNeeded });
        top5.sort((x, y) => (x.time > y.time ? 1 : -1));

        if (top5[5].time !== timeNeeded) {
          this.firebaseService.setNewTop5(
            top5.slice(0, 5),
            games.SOUND_ORIGINAL_GAME
          );
        }
      });
  };

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
