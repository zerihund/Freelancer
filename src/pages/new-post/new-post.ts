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

  checkTitle = true;
  checkDescription = true;
  checkPlace = true;
  checkPrice = true;
  checkDeadline = true;
  checkCate = true;
  checkFile = true;

  validTitle = () => {
    this.title.length === 0 ? this.checkTitle = false : this.checkTitle = true
  };

  validDescription = () => {
    this.description.length === 0 ? this.checkDescription = false : this.checkDescription = true
  };

  validPlace = () => {
    this.place.length === 0 ? this.checkPlace = false : this.checkPlace = true
  };

  validPrice = () => {
    this.price.length === 0 ? this.checkPrice = false : this.checkPrice = true
  };

  validDeadline = () => {
    this.deadline.length === 0 ? this.checkDeadline = false : this.checkDeadline = true
  };

  validCategory = () => {
    this.category.length === 0 ? this.checkCate = false : this.checkCate = true
  };

  validFile = () => {
    this.file === null ? this.checkFile = false : this.checkFile = true
  };

  // check input and upload job to server
  onUpload = () => {
    if(this.title.length === 0) this.checkTitle = false;
    else if (this.description.length === 0) this.checkDescription = false;
    else if (this.place.length === 0) this.checkPlace = false;
    else if (this.price.length === 0) this.checkPrice = false;
    else if (this.category.length === 0) this.checkCate = false;
    else if (this.deadline.length === 0) this.checkDeadline = false;

    //this is for u Hamed
    else if (this.file === null) this.checkFile = false;
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
        this.jobProvider.attachTag(res.file_id, 'freelancer').subscribe(() => {
          this.goToHome();
        });
      });
    }
  };

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
