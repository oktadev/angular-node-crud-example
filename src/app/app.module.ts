import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { OktaAuthModule, OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

import { environment } from '../environments/environment';
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
    canActivate: [OktaAuthGuard],
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

    FormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,

    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(oktaConfig),
  ],
  providers: [OktaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
