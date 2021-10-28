import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LemonRaterComponent } from './lemon-rater.component';

@NgModule({
  declarations: [LemonRaterComponent],
  imports: [CommonModule],
  exports: [LemonRaterComponent],
})
export class LemonRaterModule {}
