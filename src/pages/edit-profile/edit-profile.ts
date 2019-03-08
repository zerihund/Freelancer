import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { Media, User } from '../../interfaces/Media';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { stringify, unescape } from 'querystring';
import { JobProvider } from '../../providers/job/job';
import { MediaProvider } from '../../providers/media/media';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user: User;
  private avatar: string;
  private editPhone: string;
  private editEmail: string;
  private file: any;
  private filePath = '';
  private skills: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public jobProvider: JobProvider,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider,
    public alertCtrl: AlertController,
  ) {

    // gets current user object & info passed from profile page
    this.fetchUserData();
    this.avatar = this.navParams.get('avatar');
    this.editPhone = '0440508282';
  }

  ionViewWillEnter() {
    this.getSkills(parseInt(this.avatar));
  }

  // opens the menu for changing profile image
  private showChangePhotoMenu() {
    const actionSheet = this.actionSheetCtrl.create({

      buttons: [
        {
          text: 'Choose Photo',
          role: 'choose photo',
          handler: () => {
            this.choosePhoto();
            console.log('Choose Photo Clicked!');
          },
        }, {
          text: 'Take New Photo',
          role: 'take new photo',
          handler: () => {
            this.takePhoto();
            console.log('Take New Photo Clicked!');
          },
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked!');
          },
        },
      ],
    });
    actionSheet.present();
  }

  // Updates profile info
  private updateProfile() {
    let id = parseInt(this.avatar);
    let skills = {'description': this.skills};
    let profileData = {
      'email': this.editEmail,
      // TODO add phone later
    };

    this.updateContactInfo(profileData);
    this.updateSkills(skills, id);
    this.showAlert();
  }

  // chooses photo from local storage
  private choosePhoto() {
    // TODO chooser comes here
  }

  // takes new photo with camera
  private takePhoto() {
    console.log('takephoto():');

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.filePath = base64Image;
      this.file = EditProfilePage.dataURItoBlob(base64Image);
      //this.fileSelected = true;
    }, (error) => {
      console.log(error);
    }).then(response => {
      this.changeAvatar();
    }, error => {
      console.log(error);
    });
  }

  // Changes the old avatar with the new one
  private changeAvatar() {
    console.log('changeAvatar():');

    // TODO upload avatar with skills
    this.uploadNewAvatar();

    // TODO delete old avatar
    this.deleteOldAvatar();
  }

  // Uploads image to server
  private uploadNewAvatar() {
    console.log('uploadAvatar():');
    console.log('uploadAvatar() / skills here: ' + this.skills);

    const formData = new FormData();
    formData.append('title', 'avatar');
    formData.append('description', this.skills);
    formData.append('file', this.file);
    this.jobProvider.uploadAvatar(formData).subscribe(res => {
      console.log('File uploaded. file id: ' + res.file_id);

      // test: checking what was uploaded
      // =========================================
      this.mediaProvider.getSingleMedia(res.file_id).subscribe(res => {
        console.log('uploadAvatar() / uploaded file info:');
        console.log(res);
        console.log('uploadAvatar() / uploaded desc: ' + res.description);
      });
      // =========================================

      this.jobProvider.attachTag(res.file_id, 'profile_freelancer').
        subscribe(res => {
          console.log(res);
        });
    });
    this.showSpinner('Updating profile...', 1500);
  }

  // Deletes the old avatar image from serve
  private deleteOldAvatar = () => {
    console.log('deleteOldAvatar():');
    let oldAvatar = parseInt(this.avatar);
    console.log('old avatar: ' + oldAvatar + ' type: ' + typeof oldAvatar);

    this.jobProvider.deleteJob(oldAvatar).subscribe(res => {
        console.log('deleteOldAvatar() / res:');
        console.log(res);
      },
      error => {
        console.log(error);
      });
  };

  // Gets skills of current user
  private getSkills(id: number) {
    // getting description property of old avatar
    this.mediaProvider.getSingleMedia(id).subscribe(
      (response: Media) => {
        this.skills = response.description;
      }, error => {
        console.log(error);
      },
    );
  }

  // Converts dataURI to blob
  static dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString = dataURI.split(',')[0].indexOf('base64') >= 0 ? atob(
      dataURI.split(',')[1]) : unescape(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
  }

  // shows spinner while uploading photo
  private showSpinner(msg: string, time: number) {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: msg,
    });
    loading.present().catch();
    // setting timeout 2 secs
    setTimeout(() => {
      // hide spinner
      loading.dismiss().catch();
      this.navCtrl.pop().catch();
    }, time);
  }

  // Update userInfo / Email & Phone
  private updateContactInfo(profileData) {
    this.userProvider.updateUserInfo(profileData).subscribe(
      result => {
        console.log(result);
      }, error => {
        console.log(error);
      });
  }

  // Update skills
  private updateSkills(skills, id) {
    this.userProvider.updateAvatarInfo(skills, id).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      },
    );
  }

  // Requests user information from serve
  private fetchUserData() {
    let id = this.navParams.get('userId');
    this.mediaProvider.requestUserInfo(id).
      subscribe(
        result => {
            this.editEmail = result.email;
        }, error => {
          console.log(error);
        });
  }

  // Shows alert that user information is updates
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Saved',
      subTitle: 'Profile information is updated.',
      buttons: ['OK']
    });
    alert.present().catch();
  }
}


