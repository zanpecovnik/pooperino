import { Component } from '@angular/core';
import games from 'src/app/constants/games';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pooperino';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    /**
     * Primer uporabe
     * 
     * 
     * 
    const gameId = this.firebaseService.createNewLiveGame(
      'prvi player',
      games.SOUND_ORIGINAL_GAME
    );
    this.firebaseService.listenToLiveGame(gameId).subscribe((snapshot) => {
      console.log(snapshot.payload.data());
    });
    this.firebaseService.setPlayer2ForLiveGame('drugi player', gameId);
    setTimeout(
      () => this.firebaseService.setWinnerOfLiveGame('winner', gameId),
      30000
    );

    this.firebaseService
      .getGame(gameId)
      .subscribe((snapshot) => console.log(snapshot.data()));

    this.firebaseService.setNewTop5(
      [
        {
          name: 'testOriginal1',
          time: Math.random() * 30,
        },
        {
          name: 'testOriginal2',
          time: Math.random() * 30,
        },
        {
          name: 'testOriginal3',
          time: Math.random() * 30,
        },
        {
          name: 'testOriginal4',
          time: Math.random() * 30,
        },
        {
          name: 'testOriginal5',
          time: Math.random() * 30,
        },
      ],
      games.SOUND_ORIGINAL_GAME
    );

    this.firebaseService
      .getTop5(games.SOUND_ORIGINAL_GAME)
      .subscribe((snapshot) => console.log(snapshot.data().namesAndTimes));

    this.firebaseService.setNewTop5(
      [
        {
          name: 'testMatchSound1',
          time: Math.random() * 30,
        },
        {
          name: 'testMatchSound2',
          time: Math.random() * 30,
        },
        {
          name: 'testMatchSound3',
          time: Math.random() * 30,
        },
        {
          name: 'testMatchSound4',
          time: Math.random() * 30,
        },
        {
          name: 'testMatchSound5',
          time: Math.random() * 30,
        },
      ],
      games.MATCH_SOUND_GAME
    );

    this.firebaseService
      .getTop5(games.MATCH_SOUND_GAME)
      .subscribe((snapshot) => console.log(snapshot.data().namesAndTimes));

    this.firebaseService.setNewTop5(
      [
        {
          name: 'testMatchPoop1',
          time: Math.random() * 30,
        },
        {
          name: 'testMatchPoop2',
          time: Math.random() * 30,
        },
        {
          name: 'testMatchPoop3',
          time: Math.random() * 30,
        },
        {
          name: 'testMatchPoop4',
          time: Math.random() * 30,
        },
        {
          name: 'testMatchPoop5',
          time: Math.random() * 30,
        },
      ],
      games.MATCH_POOP_GAME
    );

    this.firebaseService
      .getTop5(games.MATCH_POOP_GAME)
      .subscribe((snapshot) => console.log(snapshot.data().namesAndTimes));
      */
  }
}
