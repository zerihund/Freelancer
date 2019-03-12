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
  place: string = '';
  price: string = '';
  deadline: string = '';
  category: string = '';
  fileData: string = '';
  file: File;

  checkTitle = false;
  checkDescription = false;
  checkPlace = false;
  checkPrice = false;
  checkDeadline = false;
  checkCate = false;
  checkFile = false;

  validTitle = () => {
    this.title.length === 0 ? this.checkTitle = true : this.checkTitle = false
  };

  validDescription = () => {
    this.description.length === 0 ? this.checkDescription = true : this.checkDescription = false
  };

  validPlace = () => {
    this.place.length === 0 ? this.checkPlace = true : this.checkPlace = false
  };

  validPrice = () => {
    this.price.length === 0 ? this.checkPrice = true : this.checkPrice = false
  };

  // check input and upload job to server
  onUpload = () => {
    if(this.title.length === 0) this.checkTitle = true;
    else if (this.description.length === 0) this.checkDescription = true;
    else if (this.place.length === 0) this.checkPlace = true;
    else if (this.price.length === 0) this.checkPrice = true;
    else if (this.deadline.length === 0) this.checkDeadline = true;
    else if (this.category.length === 0) this.checkCate = true;
    else if (this.file === null) this.checkFile = true;
    else {
      const myObject = {
        description: this.description,
        place: this.place,
        price: this.price,
        deadline: this.deadline,
        category: this.category,
        user: localStorage.getItem('user'),
      };
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
    }
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
}
