import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { NewPostPage } from '../pages/new-post/new-post';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { JobInfoPage } from '../pages/job-info/job-info';
import { NewOfferPage } from '../pages/new-offer/new-offer';
import { UploadImagePage } from '../pages/upload-image/upload-image';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { ReviewsPage } from '../pages/reviews/reviews';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JobProvider } from '../providers/job/job';
import { CategoryPage } from '../pages/category/category';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    HomePage,
    NewPostPage,
    TabsControllerPage,
    LoginPage,
    SignupPage,
    JobInfoPage,
    NewOfferPage,
    UploadImagePage,
    ProfileViewPage,
    ReviewsPage,
    CategoryPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    HomePage,
    NewPostPage,
    TabsControllerPage,
    LoginPage,
    SignupPage,
    JobInfoPage,
    NewOfferPage,
    UploadImagePage,
    ProfileViewPage,
    ReviewsPage,
    CategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    JobProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
  ],
})
export class AppModule {
}
