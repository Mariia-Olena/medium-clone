import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendErrorMessagesComponent } from 'src/app/shared/modules/backend-error-messages/components/backend-error-messages/backend-error-messages.component';

@NgModule({
  declarations: [BackendErrorMessagesComponent],
  imports: [CommonModule],
  exports: [BackendErrorMessagesComponent],
})
export class BackendErrorMessagesModule {}
