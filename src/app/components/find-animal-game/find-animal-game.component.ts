import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-animal-game',
  templateUrl: './find-animal-game.component.html',
  styleUrls: ['./find-animal-game.component.css'],
})
export class FindAnimalGameComponent implements OnInit {
  constructor(@Inject(DOCUMENT) document) {}

  ngOnInit(): void {
    document.querySelector('audio').volume = 0.1;
    console.log(document.getElementById('testnidiv'));

    document.onmousemove = (event) => {
      // let mouseLoc = { x: event.pageX, y: event.pageY };
    };
  }

  ngAfterViewInit(): void {}
}
