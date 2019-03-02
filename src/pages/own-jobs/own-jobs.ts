import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { MediaProvider } from '../../providers/media/media'
import { JobProvider } from '../../providers/job/job'

@Component({
  selector: 'page-my-open-jobs',
  templateUrl: 'own-jobs.html',
})
export class OwnJobsPage {

  avatar: string
  private ownJobsArray = []
  private detailedJobsArray: any
  filesObject: Object
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/'

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public jobProvider: JobProvider,
  ) {
  }

  ionViewWillEnter () {
    this.filesObject = this.navParams.get('files')
    this.avatar = this.navParams.get('avatar')

    this.getUserOwnJobs(this.filesObject)

    // TODO generateDetailedJob for jobInfo page
  }

  // ========================
  //        Navigation
  // ========================

  // ========================
  //        Functions
  // ========================
  private getUserOwnJobs (filesObject) {
    // generate an array of jobs
    Object.keys(filesObject).map(key => {
      this.ownJobsArray.push(filesObject[key])
    })
    this.ownJobsArray = this.ownJobsArray.filter(job =>
      job.file_id != parseInt(this.avatar))

    console.log(this.ownJobsArray)
  }
}
