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
  correct = 1;
  animal = '';
  currentTimePassed = 0;
  playerName = '';
  end_game : Boolean = false;

  ngOnInit(): void {
    console.log('Starting');
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

    const clickOther = function() {
      var element = document.querySelector(`.${this.other_animal}`);
      element.classList.add('changeAnimal');
      $(`.${this.other_animal}`).addClass('changeAnimal');
      
      //this.correct = nextAnimal();
    };

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
      //var element = document.getElementsByClassName(`.${animal}`);
      element.removeEventListener('click', clickHandler);

      //make gif
      //element.classList.add('changeAnimal');
      //$(`.${this.animal}`).addClass('changeAnimal');

      if (this.correct < this.counter) {
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
        //var element = document.getElementsByClassName(`.${animal}`);
        element.addEventListener('click', clickHandler);
      } else {
        this.end_game = true;
        //$scope.end_game = true;
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
    //var element = document.getElementsByClassName(`.${animal}`);
    element.addEventListener('click', clickHandler);

    //set eventListener for other animals
    /*for(let i = 0; i < animals.length; i++){
      if(i != animalSound){
        this.other_animal = `${animals[i]}`;
        var element = document.querySelector(`.${this.other_animal}`);
        element.addEventListener('click', clickOther.bind(this.other_animal));
      }
    }*/
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
    this.router.navigate(['/findAnimalBySound?playerName=', this.playerName]);
  }

}
