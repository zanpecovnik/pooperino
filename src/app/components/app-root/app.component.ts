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
    this.firebaseService.setNewTop5();
  }
}
