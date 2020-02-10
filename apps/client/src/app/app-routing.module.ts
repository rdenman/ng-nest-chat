import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module')
        .then(m => m.LoginModule)
        .catch(e => console.error('Unable to load Login module:', e)),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./chat/chat.module')
        .then(m => m.ChatModule)
        .catch(e => console.error('Unable to load Chat module:', e)),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
