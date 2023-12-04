import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlobalFeedComponent } from 'src/app/global-feed/components/global-feed/global-feed.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class GlobalFeedRoutingModule {}
