<<<<<<< Updated upstream
import {
  Component,
  Inject,
  OnInit,
  SystemJsNgModuleLoader,
} from '@angular/core';
=======
import { Component, Inject, OnInit, ElementRef } from '@angular/core';
>>>>>>> Stashed changes
import { FirebaseService } from 'src/app/services/firebase.service';
import * as $ from 'jquery';
import { nextTick } from 'process';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-find-animal-by-sound-game',
  templateUrl: './find-animal-by-sound-game.component.html',
  styleUrls: ['./find-animal-by-sound-game.component.css'],
})
export class FindAnimalBySoundGameComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) document,
    private firebaseService: FirebaseService
  ) {}

<<<<<<< Updated upstream
  public animals: String[];
=======
  constructor(@Inject(DOCUMENT) document,
  private firebaseService: FirebaseService,
  private elRef: ElementRef) {}

  public animals : String[];
>>>>>>> Stashed changes
  animalPath: string;
  startTime;
  endTime;
  interval;
  counter = 10;
  correct = 1;
  animal = "";
  currentTimePassed = 0;

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
<<<<<<< Updated upstream

    const nextAnimal = () => {
      console.log('im here');
    };

    $(document).ready(function () {
      this.startTime = new Date().getTime();
      console.log(this.startTime);

      var animalSound = Math.floor(Math.random() * animals.length);
      console.log(animalSound);

      this.animalPath = `${animals[animalSound]}/${animals[animalSound]}`;
      document.querySelector(
        'audio'
      ).src = `../../../assets/${this.animalPath}.mp3`;

      var animal = `${animals[animalSound]}`;
      console.log(animal);

      $(`.${animal}`).click(function () {
        this.correct += 1;
        console.log(animal);
        document.querySelector('audio').pause();
        console.log('dela');
        nextAnimal();
      });
    });
  }
=======

    this.startTime = new Date().getTime();
    this.startCounting();

    const clickHandler = function() {
      console.log(this.animal);
      document.querySelector('audio').pause();
      $(`.${this.animal}`).addClass('changeAnimal');
      this.correct = nextAnimal();
    };

    const nextAnimal = () => {
      console.log(this.correct, this.animal);
      this.correct += 1;

      var element = document.querySelector(`.${this.animal}`);
      console.log("Prev anial is: " + this.animal);
      //var element = document.getElementsByClassName(`.${animal}`);
      element.removeEventListener('click', clickHandler);

      if (this.correct < this.counter){
        console.log(this.correct);
        var animalSound = Math.floor(Math.random() * animals.length);
        this.animalPath = `${animals[animalSound]}/${animals[animalSound]}`;
        document.querySelector(
          'audio'
        ).src = `../../../assets/${this.animalPath}.mp3`;

        this.animal = `${animals[animalSound]}`;
        console.log("animal is: " + this.animal);
        var element = document.querySelector(`.${this.animal}`);
        console.log(element);
        //var element = document.getElementsByClassName(`.${animal}`);
        element.addEventListener('click', clickHandler);
      } else {
        console.log("End game");
        this.endTime = new Date().getTime();
        this.stopCounting();
        console.log("Needed time:", this.endTime - this.startTime);
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
    console.log(element);
    //var element = document.getElementsByClassName(`.${animal}`);
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

>>>>>>> Stashed changes
}
