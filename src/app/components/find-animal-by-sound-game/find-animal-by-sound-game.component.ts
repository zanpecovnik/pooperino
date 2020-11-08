import { Component, Inject, OnInit, SystemJsNgModuleLoader } from '@angular/core';
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

  constructor(@Inject(DOCUMENT) document,
  private firebaseService: FirebaseService) {}

  public animals : String[];
  animalPath: string;
  startTime;
  counter = 10;
  correct = 0;

  ngOnInit() : void {
    console.log("Starting");
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
    

    $(document).ready(function() {

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

      $(`.${animal}`).click(
        function(){
          this.correct += 1;
          console.log(animal);
          document.querySelector('audio').pause();
          this.nextAnimal();
        }
      )
    });
  }

  nextAnimal = () => {
    console.log("im here");

  };
}
