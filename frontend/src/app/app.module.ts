import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './components/admin/admin.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import { VidService } from './services/vid.service';

const routes: Routes = [
	{ path: 'create', component: CreateComponent },
	{ path: 'edit/:id', component: EditComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: '', redirectTo: 'admin', pathMatch: 'full' }
];

@NgModule({
	declarations: [
		AppComponent,
		AdminComponent,
		CreateComponent,
		EditComponent
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
		MatSnackBarModule
	],
	providers: [VidService],
	bootstrap: [AppComponent]
})
export class AppModule { }
