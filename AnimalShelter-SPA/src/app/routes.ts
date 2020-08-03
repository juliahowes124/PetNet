import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { RehomeComponent } from './rehome/rehome.component';
import { LoginComponent } from './login/login.component';
import { AnimalListComponent } from './animals/animal-list/animal-list/animal-list.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
        ]
    },
    { path: 'animals', component: AnimalListComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'rehome', component: RehomeComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];

