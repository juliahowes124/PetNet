import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
// import { NgxGalleryModule } from '@kolkov/ngx-gallery';
// import { FileUploadModule } from 'ng2-file-upload';
// import { TimeagoModule } from 'ngx-timeago';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error-interceptor.service';
// import { AlertifyService } from './services/alertify.service';
// import { MemberListComponent } from './members/member-list/member-list.component';
// import { ListsComponent } from './lists/lists.component';
// import { MessagesComponent } from './messages/messages.component';
// import { appRoutes } from './routes';
// import { MemberCardComponent } from './members/member-card/member-card.component';
// import { MemberDetailComponent } from './members/member-detail/member-detail.component';
// import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
// import { MemberListResolver } from './_resolvers/member-list.resolver';
// import { MemberEditComponent } from './members/member-edit/member-edit.component';
// import { MemberEditResolver } from './_resolvers/member-edit.resolver';
// import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
// import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
// import { ListsResolver } from './_resolvers/lists.resolver';
// import { MessagesResolver } from './_resolvers/messages.resolver';
// import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AlertifyService } from './_services/alertify.service';
import { MessagesComponent } from './messages/messages.component';



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
      MessagesComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      BrowserAnimationsModule,
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter
         }
      })
   ],
   providers: [
      AuthService,
      AlertifyService,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

