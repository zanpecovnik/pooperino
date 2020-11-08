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
  selectedGameMode = '';
  selectedGameType = '';
  selectedPlayerName = '';
  constructor(
    @Inject(DOCUMENT) document,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedGameType = this.router.url.split('/')[2];

    this.singlePlayerBtn = document.getElementById('singlePlayerBtn');
    this.multiPlayerBtn = document.getElementById('multiPlayerBtn');
    this.setSinglePlayerMode();
  }

  setSinglePlayerMode = () => {
    this.selectedGameMode = 'singlePlayer';
    this.singlePlayerBtn.style.opacity = 0.6;
    this.multiPlayerBtn.style.opacity = 1;
  };

  setMultiPlayerMode = () => {
    this.selectedGameMode = 'multiPlayer';
    this.singlePlayerBtn.style.opacity = 1;
    this.multiPlayerBtn.style.opacity = 0.6;
  };

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
      } else if (this.selectedGameType === 'guessPoop') {
        this.router.navigate(['/guessPoop'], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      }
    } else if (this.selectedGameMode === 'multiPlayer') {
      let gameId = uuid();
      if (this.selectedGameType === 'findAnimal') {
        this.router.navigate([`/findAnimal/${gameId}`], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      } else if (this.selectedGameType === 'findAnimalBySound') {
        this.router.navigate([`/findAnimalBySound/${gameId}`], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      } else if (this.selectedGameType === 'guessPoop') {
        this.router.navigate([`/guessPoop/${gameId}`], {
          queryParams: { playerName: this.selectedPlayerName },
        });
      }
    }
  };
}
