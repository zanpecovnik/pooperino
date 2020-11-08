import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as $ from 'jquery';
import games from 'src/app/constants/games';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find-animal-by-poop',
  templateUrl: './find-animal-by-poop.component.html',
  styleUrls: ['./find-animal-by-poop.component.css'],
})
export class FindAnimalByPoopComponent implements OnInit {
  poops = [
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
  poop_box;
  poop;
  wrong;
  poop_box_img;
  poop_img;
  wrong_img;
  startTime;
  endTime;
  interval;
  currentTimePassed = 0;
  correct = 0;
  counter = 10;
  playerName = '';
  animal = '';
  animalPoopPath = '';
  end_game = false;

  constructor(
    @Inject(DOCUMENT) document,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.playerName = params.playerName;
    });

    document.querySelector('audio').volume = 0.2;

    this.poop_box = document.getElementById('poop_box');
    this.poop = document.getElementById('poop');
    this.wrong = document.getElementById('wrong');
    this.poop_box_img = document.getElementById('poop_box_img');
    this.poop_img = document.getElementById('poop_img');
    this.wrong_img = document.getElementById('wrong_img');

    setTimeout(this.changeCssStylesAfter5s, 5000);

    const clickHandler = function () {
      console.log(this.animal);
      $(`.${this.animal}`).addClass('changeAnimal');
      nextPoop();
    };

    const nextPoop = () => {
      this.correct += 1;

      var element = document.querySelector(`.${this.animal}`);
      console.log('Prev anial is: ' + this.animal);
      //var element = document.getElementsByClassName(`.${animal}`);
      element.removeEventListener('click', clickHandler);

      if (this.correct < this.counter) {
        console.log(this.correct);
        var animalPoop = Math.floor(Math.random() * this.poops.length);
        this.animalPoopPath = `${this.poops[animalPoop]}/${this.poops[animalPoop]}`;

        this.animal = `${this.poops[animalPoop]}`;
        console.log('animal is: ' + this.animal);
        var element = document.querySelector(`.${this.animal}`);
        console.log(element);
        //var element = document.getElementsByClassName(`.${animal}`);

        if (this.animal === 'cat' || this.animal === 'sheep') {
          this.poop_box_img.src = `../../../assets/${this.animalPoopPath}-poop.png`;
          this.poop_img.src = `../../../assets/${this.animalPoopPath}-poop.png`;
        } else {
          this.poop_box_img.src = `../../../assets/${this.animalPoopPath}-poop.jpg`;
          this.poop_img.src = `../../../assets/${this.animalPoopPath}-poop.jpg`;
        }
        this.wrong_img.src = `../../../assets/${this.animalPoopPath}-gif.gif`;

        element.addEventListener('click', clickHandler);
      } else {
        console.log('End game');
        this.endTime = new Date().getTime();
        this.stopCounting();
        this.end_game = true;
        this.getAndPossiblySetTop5(
          this.playerName,
          (this.endTime - this.startTime) / 1000
        );
      }
    };

    var animalPoop = Math.floor(Math.random() * this.poops.length);
    console.log(animalPoop);

    this.animalPoopPath = `${this.poops[animalPoop]}/${this.poops[animalPoop]}`;

    this.animal = `${this.poops[animalPoop]}`;

    if (this.animal === 'cat' || this.animal === 'sheep') {
      this.poop_box_img.src = `../../../assets/${this.animalPoopPath}-poop.png`;
      this.poop_img.src = `../../../assets/${this.animalPoopPath}-poop.png`;
    } else {
      this.poop_box_img.src = `../../../assets/${this.animalPoopPath}-poop.jpg`;
      this.poop_img.src = `../../../assets/${this.animalPoopPath}-poop.jpg`;
    }
    this.wrong_img.src = `../../../assets/${this.animalPoopPath}-gif.gif`;

    var element = document.querySelector(`.${this.animal}`);
    console.log(element);
    //var element = document.getElementsByClassName(`.${animal}`);
    element.addEventListener('click', clickHandler);
  }

  changeCssStylesAfter5s = () => {
    this.startTime = new Date().getTime();
    this.startCounting();

    this.poop_box.style.visibility = 'hidden';
    this.poop.style.bottom = '10px';
  };

  getAndPossiblySetTop5 = (playerName, timeNeeded) => {
    this.firebaseService
      .getTop5(games.MATCH_POOP_GAME)
      .subscribe((snapshot) => {
        let top5 = snapshot.data().scoreboard;
        top5.push({ name: playerName, time: timeNeeded });
        top5.sort((x, y) => (x.time > y.time ? 1 : -1));

        if (top5[5].time !== timeNeeded) {
          this.firebaseService.setNewTop5(
            top5.slice(0, 5),
            games.MATCH_POOP_GAME
          );
        }
      });
  };

  startCounting() {
    this.interval = setInterval(() => {
      this.currentTimePassed++;

      // več kot 1 minuta - fail
      if (this.currentTimePassed > 600) {
        this.stopCounting();
        this.wrong.style.visibility = 'visible';
        setTimeout(() => (this.end_game = true), 3000);
      }
    }, 100);
  }

  stopCounting() {
    clearInterval(this.interval);
  }

  exitGame() {
    console.log('Exit game');
    this.router.navigate(['/']);
  }

  playAgain() {
    console.log('Play again');
    this.currentTimePassed = 0;
    this.end_game = false;
    this.correct = 0;
    this.wrong.style.visibility = 'hidden';
    this.ngOnInit();
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
