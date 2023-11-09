import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backend-error-messages/backend-error-messages.module';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from 'src/app/auth/services/auth.service';
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect';
import { reducer } from 'src/app/auth/store/reducers';
import { RegisterComponent } from 'src/app/auth/components/register/register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([RegisterEffect]),
    AuthRoutingModule,
    BackendErrorMessagesModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
