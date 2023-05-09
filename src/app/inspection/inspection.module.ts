import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionComponent } from './inspection.component';
import { MapComponent } from './map/map.component';
import { SharedModule } from '../shared/shared.module';
import { AqueductComponent } from './aqueduct/aqueduct.component';
import { SewerComponent } from './sewer/sewer.component';
import { InspectionNavbarComponent } from './inspection-navbar/inspection-navbar.component';
import { RepairPipe } from './pipes/repair.pipe';


@NgModule({
  declarations: [
    InspectionComponent,
    MapComponent,
    AqueductComponent,
    SewerComponent,
    InspectionNavbarComponent,
    RepairPipe

  ],
  imports: [
    CommonModule,
    InspectionRoutingModule,
    SharedModule,
  ]
})
export class InspectionModule { }
