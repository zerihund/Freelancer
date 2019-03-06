import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModifyUser, User } from '../../interfaces/Media';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { ModalController } from 'ionic-angular';
import { ChangePhotoPage } from '../change-photo/change-photo';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';
  user: User;
  private avatar: string;
  private token: string;
  private skills: string;
  editEmail: string;
  editPhone: string;
  data: ModifyUser;
  editPassword: string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public mediaProvider: MediaProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public userProvider: UserProvider,
  ) {
    // gets current user object passed from profile page
    this.user = this.navParams.get('user'); // type object
    // get current email
    this.editEmail = this.user.email;
    //this.editPhone = this.user.phone;
    console.log('user: ');
    console.log(this.user);
    console.log(typeof this.user);
    console.log('skills: "' + this.skills + '"');
    console.log(this.skills);
    console.log(typeof this.skills);

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter EditProfilePage');

    // getting skills ( description of current avatar )
    this.mediaProvider.getSingleMedia(this.avatar).
      subscribe(response => {
          this.skills = response.description;
        },
        error => {
          console.log(error);
        });
    this.avatar = this.navParams.get('avatar');
    this.token = this.navParams.get('token');
    console.log('avatar: ');
    console.log(this.avatar);
  }

  /*showChangePhotoMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Change Profile Photo',
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
          text: 'Delete Current Photo',
          role: 'delete current photo',
          handler: () => {
            this.deletePhoto();
            console.log('Delete Current Photo Clicked!');
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
  }*/

  private choosePhoto() {

  }

  private takePhoto() {

  }

  presentModal() {
    let uploadModal = this.modalCtrl.create(ChangePhotoPage,
      {skills: this.skills});
    uploadModal.onDidDismiss(data => {
      console.log('onDidDismiss()');
      console.log(data);
    });
    uploadModal.present().catch();
  }

  saveProfile() {
    console.log('save profile');
    this.data = {
      password: this.editPassword,
      email: this.editEmail,
      phone: this.editPhone,
    };
    this.userProvider.modifyUser(this.data);
  }
}
