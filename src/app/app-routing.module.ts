import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/app-root/app.component';

import { FrontPageComponent } from './components/front-page/front-page.component';
import { StartGamePopupComponent } from './components/start-game-popup/start-game-popup.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'setup',
    component: StartGamePopupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
