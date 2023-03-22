import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthEffects } from './core/effects/authEffects';
import { allUsersState, authReducer } from './core/reducers/authReducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { questionReducer } from './shared/reducers/question';
import { QuestionEffects } from './shared/effects/question';
import { TruncatePipe } from './truncate.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { SearchPipe } from './search.pipe';
import { FilterByPipe } from './filter-by.pipe';
import { OrderByPipe } from './order-by.pipe';
import { MarkdownPipe } from './markdown.pipe';
import { HighlightDirective } from 'src/templates/highlight.directive';
import { TokenInterceptorService } from './core/services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    TruncatePipe,
    TimeAgoPipe,
    SearchPipe,
    FilterByPipe,
    OrderByPipe,
    HighlightDirective,
    MarkdownPipe
  ],
  imports: [
    MatSlideToggleModule,
    FormsModule,
    StoreModule.forRoot({ prof:authReducer, question:questionReducer, users:allUsersState}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    EffectsModule.forRoot([ AuthEffects, QuestionEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
