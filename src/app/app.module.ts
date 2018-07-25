import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
} from '@angular/material';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';

import { environment } from '../environments/environment';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostsManagerComponent } from './posts-manager/posts-manager.component';

const oktaConfig = {
  issuer: `${environment.oktaOrgURL}/oauth2/default`,
  redirectUri: `${window.location.origin}/implicit/callback`,
  clientId: environment.oktaClientId,
};

const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'posts-manager',
    component: PostsManagerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostsManagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatButtonModule,

    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(oktaConfig),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
