import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {

  constructor(
    public loadingCtrl: LoadingController, public navCtrl: NavController,
    public jobProvider: JobProvider) {
  }

  title: string = '';
  description: string = '';
  place: string = 'Vantaa';
  price: string = '1000 euros';
  deadline: string = '28/2/2019';
  category: string = 'Home Renovation';
  fileData = '';
  file: File;

  onUpload = () => {
    const myObject = {
      description: this.description,
      place: this.place,
      price: this.price,
      deadline: this.deadline,
      category: this.category,
      user: localStorage.getItem('user'),
    };
    console.log(myObject);

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', JSON.stringify(myObject));
    formData.append('file', this.file);
    this.jobProvider.upload(formData).subscribe((res) => {
      //this.presentLoadingDefault();
      console.log(res);
      this.jobProvider.attachTag(res.file_id, 'freelancer').subscribe(res => {
        console.log(res);
      });
    });
  };

  // show loading spinner
  presentLoadingDefault() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });

    loading.present().catch();

    setTimeout(() => {
      loading.dismiss().catch();
      this.navCtrl.pop().catch();
    }, 5000);
  }

  // change event in file input
  handleChange = ($event) => {
    this.file = $event.target.files[0];
    this.showPreview();
  };

  // show preview for media
  showPreview = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.fileData = reader.result;
    };
    reader.readAsDataURL(this.file);
  };

  // change to Home tab
  goToHome = () => {
    this.navCtrl.parent.select(1);
  };

  // move this to edit profile page
  uploadAvatar(){
    const formData = new FormData();
    formData.append('title', '754');
    formData.append('description', '');
    formData.append('file', this.file);
    this.jobProvider.uploadAvatar(formData).subscribe(res => {
      this.jobProvider.attachTag(res.file_id, 'profile_freelancer').subscribe(res => {
        console.log(res);
      });
    })
  }


}
