import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadService } from './lead.service';
import { XlsxComponent } from '../file/xlsx/xlsx.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[LeadService],
  declarations: []
})
export class LeadModule { }
