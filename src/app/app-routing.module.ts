import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindAnimalGameComponent } from './components/find-animal-game/find-animal-game.component';

import { FrontPageComponent } from './components/front-page/front-page.component';
import { StartGamePopupComponent } from './components/start-game-popup/start-game-popup.component';
import { FindAnimalBySoundGameComponent } from './components/find-animal-by-sound-game/find-animal-by-sound-game.component';
import { FindAnimalByPoopComponent } from './components/find-animal-by-poop/find-animal-by-poop.component';

const routes: Routes = [
  {
    path: '',
    component: FrontPageComponent,
  },
  {
    path: 'setup',
    component: StartGamePopupComponent,
  },
  {
    path: 'setup/:gameType',
    component: StartGamePopupComponent,
  },
  {
    path: 'findAnimal',
    component: FindAnimalGameComponent,
  },
  {
    path: 'findAnimal/:gameId',
    component: FindAnimalGameComponent,
  },
  {
    path: 'findAnimalByPoop',
    component: FindAnimalByPoopComponent,
  },
  {
    path: 'findAnimalByPoop/:gameId',
    component: FindAnimalByPoopComponent,
  },
  {
    path: 'findAnimalBySound',
    component: FindAnimalBySoundGameComponent,
  },
  {
    path: 'findAnimalBySound/:gameId',
    component: FindAnimalBySoundGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
