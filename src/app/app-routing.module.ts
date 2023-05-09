import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const routes: Routes = [

  {path: '', component: HomeComponent, pathMatch: 'full'}, 

  { path: 'permit',
    loadChildren: () => import('./permit/permit.module').then(m => m.PermitModule)
  },   

  { path: 'inspection',
    loadChildren: () => import('./inspection/inspection.module').then(m => m.InspectionModule)
  }, 

  { path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
  }, 

  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
