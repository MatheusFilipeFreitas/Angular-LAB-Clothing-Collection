import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WrapperComponent } from './layouts/wrapper/wrapper.component';
import { FullComponent } from './layouts/full/full.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListCollectionComponent } from './pages/collection/list-collection/list-collection.component';
import { CreateCollectionComponent } from './pages/collection/create-collection/create-collection.component';
import { EditCollectionComponent } from './pages/collection/edit-collection/edit-collection.component';
import { ListModelComponent } from './pages/model/list-model/list-model.component';
import { CreateModelComponent } from './pages/model/create-model/create-model.component';
import { EditModelComponent } from './pages/model/edit-model/edit-model.component';
import { NumberAbbreviationPipe } from './common/pipe/number-abbreviation.pipe';
import { BuildingComponent } from './pages/building/building.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    FullComponent,
    MenuComponent,
    HeaderComponent,
    CardComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ListCollectionComponent,
    CreateCollectionComponent,
    EditCollectionComponent,
    ListModelComponent,
    CreateModelComponent,
    EditModelComponent,
    NumberAbbreviationPipe,
    BuildingComponent,
    NotFoundComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
