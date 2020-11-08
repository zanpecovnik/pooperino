import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-start-game-popup',
  templateUrl: './start-game-popup.component.html',
  styleUrls: ['./start-game-popup.component.css'],
})
export class StartGamePopupComponent implements OnInit {
  singlePlayerBtn;
  multiPlayerBtn;
  multiPlayerUrlDiv;
  selectedGameMode = '';
  selectedGameType = '';
  selectedPlayerName = '';
  gameId = '';
  multiPlayerUrl = '';
  constructor(
    @Inject(DOCUMENT) document,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameId = uuid();
    this.selectedGameType = this.router.url.split('/')[2];

    this.multiPlayerUrl = `${window.location.href.split('/setup')[0]}${
      window.location.href.split('/setup')[1]
    }/${this.gameId}`;

    this.singlePlayerBtn = document.getElementById('singlePlayerBtn');
    this.multiPlayerBtn = document.getElementById('multiPlayerBtn');
    this.multiPlayerUrlDiv = document.getElementById('multiPlayerUrlDiv');
    this.setSinglePlayerMode();
  }

  setSinglePlayerMode = () => {
    this.selectedGameMode = 'singlePlayer';
    this.singlePlayerBtn.style.opacity = 0.6;
    this.multiPlayerBtn.style.opacity = 1;
    this.multiPlayerUrlDiv.style.visibility = 'hidden';
  };

  setMultiPlayerMode = () => {
    this.selectedGameMode = 'multiPlayer';
    this.singlePlayerBtn.style.opacity = 1;
    this.multiPlayerBtn.style.opacity = 0.6;
    this.multiPlayerUrlDiv.style.visibility = 'visible';
  };

  /*
  copyText = () => {
    this.multiPlayerUrlDiv.select();
    this.multiPlayerUrlDiv.selectionRange(0, 9999);
    document.execCommand('copy');
  };
  */

  onFormSubmit = () => {
    if (!this.selectedPlayerName) return;

    if (this.selectedGameMode === 'singlePlayer') {
      if (this.selectedGameType === 'findAnimal') {
        this.router.navigate(['/findAnimal'], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      } else if (this.selectedGameType === 'findAnimalBySound') {
        this.router.navigate(['/findAnimalBySound'], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      } else if (this.selectedGameType === 'findAnimalByPoop') {
        this.router.navigate(['/findAnimalByPoop'], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      }
    } else if (this.selectedGameMode === 'multiPlayer') {
      if (this.selectedGameType === 'findAnimal') {
        this.router.navigate([`/findAnimal/${this.gameId}`], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      } else if (this.selectedGameType === 'findAnimalBySound') {
        this.router.navigate([`/findAnimalBySound/${this.gameId}`], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      } else if (this.selectedGameType === 'findAnimalByPoop') {
        this.router.navigate([`/findAnimalByPoop/${this.gameId}`], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      }
    }
  };
}
