import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import collections from 'src/app/constants/collections';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  getTop5 = () => {
    return this.db
      .collection(collections.TOP5)
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          return snapshot.data().namesAndTimes;
        });
      });
  };

  setNewTop5 = () => {
    this.db
      .collection(collections.TOP5)
      .doc('top5')
      .set({
        namesAndTimes: [
          {
            name: 'Prvi',
            time: 1,
          },
          {
            name: 'Drugi',
            time: 9,
          },
          {
            name: 'Tretji',
            time: 10.4,
          },
          {
            name: 'Četrti',
            time: 90,
          },
          {
            name: 'Zadnji',
            time: 100,
          },
        ],
      })
      .then(() => console.log('success'));
  };
}
