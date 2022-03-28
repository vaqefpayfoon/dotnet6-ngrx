import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { REDUCERS } from './+state/reducer';
import { EFFECTS } from './+state/effect';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', REDUCERS),
    EffectsModule.forFeature(EFFECTS),
  ]
})
export class AuthModule { }
