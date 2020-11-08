import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-root/app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { StartGamePopupComponent } from './components/start-game-popup/start-game-popup.component';
import { FindAnimalGameComponent } from './components/find-animal-game/find-animal-game.component';
import { FindAnimalBySoundGameComponent } from './components/find-animal-by-sound-game/find-animal-by-sound-game.component';
import { FindAnimalByPoopComponent } from './components/find-animal-by-poop/find-animal-by-poop.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    StartGamePopupComponent,
    FindAnimalGameComponent,
    FindAnimalBySoundGameComponent,
    FindAnimalByPoopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
