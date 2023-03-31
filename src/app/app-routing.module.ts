import { BuildingComponent } from './pages/building/building.component';
import { LoggedGuard } from './guard/logged.guard';
import { AuthGuard } from './guard/auth.guard';
import { EditModelComponent } from './pages/model/edit-model/edit-model.component';
import { ListModelComponent } from './pages/model/list-model/list-model.component';
import { EditCollectionComponent } from './pages/collection/edit-collection/edit-collection.component';
import { CreateCollectionComponent } from './pages/collection/create-collection/create-collection.component';
import { ListCollectionComponent } from './pages/collection/list-collection/list-collection.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { WrapperComponent } from './layouts/wrapper/wrapper.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateModelComponent } from './pages/model/create-model/create-model.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    canActivate: [LoggedGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'password-recovery',
        component: ForgotPasswordComponent
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'help',
        component: BuildingComponent
      },
      {
        path: 'comments',
        component: BuildingComponent
      },
      {
        path: 'collections',
        children: [
          {
            path: '',
            component: ListCollectionComponent
          },
          {
            path: 'create',
            component: CreateCollectionComponent
          },
          {
            path: 'update/:id',
            component: EditCollectionComponent
          }
        ]
      },
      {
        path: 'models',
        children: [
          {
            path: '',
            component:  ListModelComponent
          },
          {
            path: 'create',
            component: CreateModelComponent
          },
          {
            path: 'update/:id',
            component: EditModelComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
