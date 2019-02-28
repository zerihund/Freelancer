import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user'
import { User } from '../../interfaces/Media'
// import { MyOpenOffersPage } from '../my-open-offers/my-open-offers';
// import { JobInfoOfferedPage } from '../job-info-offered/job-info-offered';
// import { HomePage } from '../home/home';
// import { JobInfoPage } from '../job-info/job-info';
// import { ProfileView2Page } from '../profile-view2/profile-view2';
// import { Reviews2Page } from '../reviews2/reviews2';
// import { UsersOpenJobsPage } from '../users-open-jobs/users-open-jobs';
// import { JobInfo2Page } from '../job-info2/job-info2';
// import { SendOffer2Page } from '../send-offer2/send-offer2';
// import { OfferSentPage } from '../offer-sent/offer-sent';
// import { SendOfferPage } from '../send-offer/send-offer';
// import { ViewerPage } from '../viewer/viewer';
// import { MyOpenJobsPage } from '../my-open-jobs/my-open-jobs';
// import { MyJobInfoPage } from '../my-job-info/my-job-info';
// import { OffersPage } from '../offers/offers';
// import { Page10Page } from '../page10/page10';
// import { ReviewsPage } from '../reviews/reviews';
// import { AcceptOfferPage } from '../accept-offer/accept-offer';
// import { MySavedAddsPage } from '../my-saved-adds/my-saved-adds';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User

  constructor (
    public navCtrl: NavController,
    public userProvider: UserProvider,
  ) {
  }

  logout () {
    localStorage.clear()
    this.userProvider.loggedIn = false
    this.user = null
    console.log('logout btn pressed')
    console.log(this.userProvider.loggedIn)
    this.navCtrl.parent.select(1)
  }

  /*  goToMyOpenOffers(params){
      if (!params) params = {};
      this.navCtrl.push(MyOpenOffersPage);
    }goToJobInfoOffered(params){
      if (!params) params = {};
      this.navCtrl.push(JobInfoOfferedPage);
    }goToHome(params){
      if (!params) params = {};
      this.navCtrl.push(HomePage);
    }goToJobInfo(params){
      if (!params) params = {};
      this.navCtrl.push(JobInfoPage);
    }goToProfileView2(params){
      if (!params) params = {};
      this.navCtrl.push(ProfileView2Page);
    }goToReviews2(params){
      if (!params) params = {};
      this.navCtrl.push(Reviews2Page);
    }goToUsersOpenJobs(params){
      if (!params) params = {};
      this.navCtrl.push(UsersOpenJobsPage);
    }goToJobInfo2(params){
      if (!params) params = {};
      this.navCtrl.push(JobInfo2Page);
    }goToSendOffer2(params){
      if (!params) params = {};
      this.navCtrl.push(SendOffer2Page);
    }goToOfferSent(params){
      if (!params) params = {};
      this.navCtrl.push(OfferSentPage);
    }goToSendOffer(params){
      if (!params) params = {};
      this.navCtrl.push(SendOfferPage);
    }goToViewer(params){
      if (!params) params = {};
      this.navCtrl.push(ViewerPage);
    }goToMyOpenJobs(params){
      if (!params) params = {};
      this.navCtrl.push(MyOpenJobsPage);
    }goToMyJobInfo(params){
      if (!params) params = {};
      this.navCtrl.push(MyJobInfoPage);
    }goToOffers(params){
      if (!params) params = {};
      this.navCtrl.push(OffersPage);
    }goToPage10(params){
      if (!params) params = {};
      this.navCtrl.push(Page10Page);
    }goToReviews(params){
      if (!params) params = {};
      this.navCtrl.push(ReviewsPage);
    }goToAcceptOffer(params){
      if (!params) params = {};
      this.navCtrl.push(AcceptOfferPage);
    }goToMySavedAdds(params){
      if (!params) params = {};
      this.navCtrl.push(MySavedAddsPage);
    }*/
}
