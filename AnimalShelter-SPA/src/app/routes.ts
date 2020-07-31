import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    // {
    //     path: '',
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [AuthGuard],
    //     children: [
    //         { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    //     ]
    // },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    { path: 'animals', component: AnimalListComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];

