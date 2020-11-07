import { Component } from '@angular/core';
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
    const gameId = this.firebaseService.createNewLiveGame('prvi player');
    this.firebaseService.listenToLiveGame(gameId).subscribe((snapshot) => {
      console.log(snapshot.payload.data());
    });
    this.firebaseService.setPlayer2ForLiveGame('drugi player', gameId);
    setTimeout(
      () => this.firebaseService.setWinnerOfLiveGame('winner', gameId),
      30000
    );

    this.firebaseService
      .getLiveGame(gameId)
      .subscribe((snapshot) => console.log(snapshot.data()));

    this.firebaseService
      .getTop5()
      .subscribe((snapshot) => console.log(snapshot.data().namesAndTimes));

    console.log(
      'new top 5',
      this.firebaseService.setNewTop5([
        {
          name: 'test1',
          time: Math.random() * 30,
        },
        {
          name: 'test2',
          time: Math.random() * 30,
        },
        {
          name: 'test3',
          time: Math.random() * 30,
        },
        {
          name: 'test4',
          time: Math.random() * 30,
        },
        {
          name: 'test5',
          time: Math.random() * 30,
        },
      ])
      
    );
     */
  }
}
