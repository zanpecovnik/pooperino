import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import collections from 'src/app/constants/collections';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  /**
   * Vrne zadevo, na katero se subscribaš in ti potem vrne lestvico najboljših 5
   * @param gameType je string, ki pove od katere igre vrne lestvico najboljših 5
   */
  getTop5 = (gameType) => {
    return this.db.collection(collections.TOP5).doc(gameType).get();
  };

  /**
   * Nastavi lestvico novih najboljših 5 in jih potem vrne
   * @param newTop5 je array objektov oblike {name: "xyz", time: 20.1}
   * @param gameType je string, ki kateri igri nastavi lestvico najboljših 5
   */
  setNewTop5 = (newTop5, gameType) => {
    return this.db
      .collection(collections.TOP5)
      .doc(gameType)
      .set({
        scoreboard: newTop5,
      })
      .then(() => newTop5);
  };

  /**
   * Ustvari novo live igro, nastavi prvega igralca in vrne gameId
   * @param player1 je string, ki predstavlja ime prvega igralca
   */
  createNewLiveGame = (player1, whichGame, gameId) => {
    this.db.collection(collections.LIVEGAMES).doc(gameId).set({
      player1Name: player1,
      player2Name: '',
      winner: '',
      game: whichGame,
    });
    return gameId;
  };

  /**
   * V že live igro doda novega igralca
   * @param player2 je string, ki predstavlja ime drugega igralca
   * @param gameId je UUID, ki predstavlja ID live igre
   */
  setPlayer2ForLiveGame = (player2, gameId) => {
    this.db
      .collection(collections.LIVEGAMES)
      .doc(gameId)
      .set({ player2Name: player2 }, { merge: true });
  };

  /**
   * V live igro doda ime igralca, ki je zmagal
   * @param playerWhichWon je string, ki predstavlja ime igralca, ki je zmagal
   * @param gameId je UUID, ki predstavlja ID live igre
   */
  setWinnerOfLiveGame = (playerWhichWon, gameId) => {
    this.db
      .collection(collections.LIVEGAMES)
      .doc(gameId)
      .set({ winner: playerWhichWon }, { merge: true });
  };

  /**
   * Vrne zadevo na katero se lahko subscribaš in ti vrne imena obeh igralcev in ime zmagovalca
   * @param gameId je UUID, ki predstavlja ID igre
   */
  getGame = (gameId) => {
    return this.db.collection(collections.LIVEGAMES).doc(gameId).get();
  };

  /**
   * Vrne neko zadevo, ki opazuje live game in na katero se lahko subscribaš, ko se podatki spremenijo pa vrne nove podatke
   * @param gameId je UUID, ki predstavlja ID igre
   */
  listenToLiveGame = (gameId) => {
    return this.db
      .collection(collections.LIVEGAMES)
      .doc(gameId)
      .snapshotChanges();
  };
}
