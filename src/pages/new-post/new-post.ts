import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { Chooser } from '@ionic-native/chooser';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {

  constructor(
    public loadingCtrl: LoadingController, public navCtrl: NavController,
    public jobProvider: JobProvider, public chooser: Chooser, public toastController: ToastController) {
  }

  title: string = '';
  description: string = '';
  place: string = '';
  price: string = '';
  deadline: string = '';
  category: string = '';
  fileData: string = '';
  myBlob: Blob;

  checkTitle = true;
  checkDescription = true;
  checkPlace = true;
  checkPrice = true;
  checkDeadline = true;
  checkCate = true;
  checkFile = true;

  validTitle = () => {
    this.title.length === 0 ? this.checkTitle = false : this.checkTitle = true;
  };

  validDescription = () => {
    this.description.length === 0 ?
      this.checkDescription = false :
      this.checkDescription = true;
  };

  validPlace = () => {
    this.place.length === 0 ? this.checkPlace = false : this.checkPlace = true;
  };

  validPrice = () => {
    this.price.length === 0 ? this.checkPrice = false : this.checkPrice = true;
  };

  validDeadline = () => {
    this.deadline.length === 0 ?
      this.checkDeadline = false :
      this.checkDeadline = true;
  };

  validCategory = () => {
    this.category.length === 0 ? this.checkCate = false : this.checkCate = true;
  };

  // check input and upload job to server
  onUpload = () => {
    if (this.title.length === 0) this.checkTitle = false;
    else if (this.description.length === 0) this.checkDescription = false;
    else if (this.place.length === 0) this.checkPlace = false;
    else if (this.price.length === 0) this.checkPrice = false;
    else if (this.category.length === 0) this.checkCate = false;
    else if (this.deadline.length === 0) this.checkDeadline = false;
    else if (this.fileData.length === 0) this.checkFile = false;
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
      formData.append('file', this.myBlob);
      this.jobProvider.upload(formData).subscribe((res) => {
        this.jobProvider.attachTag(res.file_id, 'freelancer').subscribe(() => {
          this.goToHome();
        });
      });
    }
  };

  // change to Home tab
  goToHome = () => {
    this.navCtrl.parent.select(1);
  };

  onChoose = () => {
    this.chooser.getFile('image/jpeg/png/jpg/*').then(file => {
      if (!file.mediaType.includes('image')) this.showToast('Please choose only image file')
      else if (file.mediaType.includes('image')) {
        this.fileData = file.dataURI;
      }
      this.myBlob = new Blob([file.data], { type: file.mediaType });
    }).catch((error: any) => console.error(error));
  };

  // shows a toast with provided message
  showToast = (msg: string) => {
    let toast = this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present().catch();
  };
}
