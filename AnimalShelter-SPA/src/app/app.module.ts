import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule} from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_services/auth.service';
import { AnimalService } from './_services/animal.service';
import { ErrorInterceptorProvider } from './_services/error-interceptor.service';
// import { AlertifyService } from './services/alertify.service';
// import { MemberListComponent } from './members/member-list/member-list.component';
// import { ListsComponent } from './lists/lists.component';
// import { MessagesComponent } from './messages/messages.component';
// import { appRoutes } from './routes';
// import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
// import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
// import { ListsResolver } from './_resolvers/lists.resolver';
// import { MessagesResolver } from './_resolvers/messages.resolver';
// import { MemberMessagesComponent } from './members/member-messages/member-messages.component';

import { AlertifyService } from './_services/alertify.service';
import { MessagesComponent } from './messages/messages.component';
import { RehomeComponent } from './rehome/rehome.component';
import { LoginComponent } from './login/login.component';
import { AnimalListComponent } from './animals/animal-list/animal-list/animal-list.component';
import { AnimalCardComponent } from './animals/animal-card/animal-card.component';
import { AnimalDetailComponent } from './animals/animal-detail/animal-detail.component';
import { AnimalDetailResolver } from './_resolvers/animal-detail.resolver';
import { AnimalListResolver } from './_resolvers/animal-list.resolver';
import { YourAnimalsComponent } from './your-animals/your-animals.component';
import { YourAnimalsResolver } from './_resolvers/your-animals.resolver';
import { AnimalEditComponent } from './animals/animal-edit/animal-edit.component';
import { AnimalEditResolver } from './_resolvers/animal-edit.resolver';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { SavedAnimalsResolver } from './_resolvers/saved-animals.resolver';
import { CommonModule, DatePipe } from '@angular/common';
import { SavedAnimalsComponent } from './animals/saved-animals/saved-animals.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MessageThreadComponent } from './message-thread/message-thread.component';
import { MessageThreadResolver } from './_resolvers/message-thread.resolver';
import { AboutComponent } from './about/about.component';



export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [	
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      AnimalListComponent,
      MessagesComponent,
      RehomeComponent,
      LoginComponent,
      SavedAnimalsComponent,
      AnimalCardComponent,
      AnimalDetailComponent,
      YourAnimalsComponent,
      AnimalEditComponent,
      PhotoEditorComponent,
      UserEditComponent,
      MessageThreadComponent,
      AboutComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      BrowserAnimationsModule,
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      NgxGalleryModule,
      TabsModule.forRoot(),
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/api/auth']
         }
      }),
      RouterModule.forRoot(appRoutes),
      TimeagoModule.forRoot()
   ],
   providers: [
      AuthService,
      AlertifyService,
      AnimalService,
      AnimalDetailResolver,
      AnimalListResolver,
      YourAnimalsResolver,
      AnimalEditResolver,
      UserEditResolver,
      SavedAnimalsResolver,
      MessagesResolver,
      MessageThreadResolver,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

