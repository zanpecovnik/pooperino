import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as $ from 'jquery';
import { nextTick } from 'process';
import { DOCUMENT } from '@angular/common';
import games from 'src/app/constants/games';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find-animal-by-sound-game',
  templateUrl: './find-animal-by-sound-game.component.html',
  styleUrls: ['./find-animal-by-sound-game.component.css'],
})
export class FindAnimalBySoundGameComponent implements OnInit {


  constructor(@Inject(DOCUMENT) document,
  private firebaseService: FirebaseService,
  private elRef: ElementRef,
  private route: ActivatedRoute,
  private router: Router) {}

  public inputdata : Boolean = false;

  public animals : String[];
  other_animal;
  animalPath: string;
  startTime;
  endTime;
  interval;
  counter = 10;
  correct = 0;
  animal = '';
  currentTimePassed = 0;
  playerName = '';
  end_game : Boolean = false;
  wrong_img;
  wrong;

  ngOnInit(): void {
    console.log('Starting');
    this.end_game = false;
    this.currentTimePassed = 0;
    this.correct = 0;

    this.wrong = document.getElementById('wrong');
    this.wrong_img = document.getElementById('wrong_img');

    var animals = [
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

    this.route.queryParams.subscribe((params) => {
      this.playerName = params.playerName;
    });

    this.startTime = new Date().getTime();
    this.startCounting();

    const clickHandler = function() {
      console.log("Animal found: ", this.animal);
      document.querySelector('audio').pause();
      this.correct = nextAnimal();
    };

    const nextAnimal = () => {
      console.log(this.correct, this.animal);
      this.correct += 1;

      var element = document.querySelector(`.${this.animal}`);
      console.log('Prev anial is: ' + this.animal);
      element.removeEventListener('click', clickHandler);


      if (this.correct < this.counter) {
        //make gif
        this.wrong_img.src = `../../../assets/${this.animal}/${this.animal}-gif.gif`;
        this.wrong.style.visibility = 'visible';
        var currTime = new Date().getTime();
        setTimeout(function(){
          this.wrong.style.visibility = 'hidden';
        }, 1000);

        console.log(this.correct);
        var animalSound = Math.floor(Math.random() * animals.length);
        this.animalPath = `${animals[animalSound]}/${animals[animalSound]}`;
        document.querySelector(
          'audio'
        ).src = `../../../assets/${this.animalPath}.mp3`;

        this.animal = `${animals[animalSound]}`;
        console.log('animal is: ' + this.animal);
        var element = document.querySelector(`.${this.animal}`);
        console.log(element);
        element.addEventListener('click', clickHandler);
      } else {
        this.end_game = true;
        console.log('End game');
        this.endTime = new Date().getTime();
        this.stopCounting();
        console.log('Needed time:', this.endTime - this.startTime);
        this.getAndPossiblySetTop5(
          this.playerName,
          (this.endTime - this.startTime) / 1000
        );
      }
    };

    var animalSound = Math.floor(Math.random() * animals.length);
    console.log(animalSound);

    this.animalPath = `${animals[animalSound]}/${animals[animalSound]}`;
    document.querySelector(
      'audio'
    ).src = `../../../assets/${this.animalPath}.mp3`;

    this.animal = `${animals[animalSound]}`;

    var element = document.querySelector(`.${this.animal}`);
    console.log("Element is :", element);
    element.addEventListener('click', clickHandler);
  };

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
      .getTop5(games.MATCH_SOUND_GAME)
      .subscribe((snapshot) => {
        let top5 = snapshot.data().scoreboard;
        top5.push({ name: playerName, time: timeNeeded });
        top5.sort((x, y) => (x.time > y.time ? 1 : -1));

        if (top5[5].time !== timeNeeded) {
          this.firebaseService.setNewTop5(
            top5.slice(0, 5),
            games.MATCH_SOUND_GAME
          );
        }
      });
  };

  exitGame() {
    console.log("Exit game");
    this.router.navigate(['/']);
  }

  playAgain() {
    console.log("Play again");
    this.ngOnInit();
  }

}
