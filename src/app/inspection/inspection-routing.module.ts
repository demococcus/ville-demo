import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionComponent } from './inspection.component';
import { AqueductComponent } from './aqueduct/aqueduct.component';
import { SewerComponent } from './sewer/sewer.component';

const routes: Routes = [
  { path: '', component: InspectionComponent },
  { path: 'aqueduct', component: AqueductComponent},
  { path: 'sewer', component: SewerComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionRoutingModule { }
