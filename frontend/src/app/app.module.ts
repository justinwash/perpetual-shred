import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {
	MatToolbarModule,
	MatFormFieldModule,
	MatInputModule,
	MatOptionModule,
	MatSelectModule,
	MatIconModule,
	MatButtonModule,
	MatCardModule,
	MatTableModule,
	MatDividerModule,
	MatSnackBarModule,
	MatSidenavModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { PlayerComponent } from './components/home/player/player.component';
import { SidebarComponent } from './components/home/sidebar/sidebar.component';

import { VidService } from './services/vid.service';
import { YouTubeService } from './services/youtube.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/authguard.service';
import { AdminGuardService } from './services/adminguard.service';

import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';



const routes: Routes = [
	{ path: 'create', component: CreateComponent },
	{ path: 'edit/:id', component: EditComponent },
	{ path: 'admin', component: AdminComponent, canActivate: [AdminGuardService] },
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		AdminComponent,
		CreateComponent,
		EditComponent,
		HomeComponent,
		PlayerComponent,
		SidebarComponent,
		RegisterComponent,
		LoginComponent,
		ProfileComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		ReactiveFormsModule,
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatTableModule,
		MatDividerModule,
		MatSnackBarModule,
		MatSidenavModule,
		FormsModule
	],
	providers: [VidService, YouTubeService, AuthenticationService, AuthGuardService, AdminGuardService],
	bootstrap: [AppComponent]
})
export class AppModule { }
