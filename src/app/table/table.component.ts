import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import io from 'socket.io-client';

const SOCKET_ENDPOINT = 'wss://api.zaibatsu.fyi/'


//wss://api.zaibatsu.fyi/socket.io/?EIO=3&transport=websocket&sid=GbLEKJgQEmf7P-vZAAAB


//table data model:
export interface Report {
  os: string;
  storedAppID: string;
  appNameText: string;
  releaseDateText: string;
  versionText: string;
  releaseNotesText: string;
}

//table data:
const reportData: Report[] = [
  {os: 'iOS', storedAppID: 'one123', appNameText: "Skype", releaseDateText: "09.11.20", versionText: "8.66", releaseNotesText: "We're listening to your feedback and working hard to improve Skype. Here's what's new: - Customised message reactions - Raise your hand during a group call - Smart share suggestions - Bug fixes and stability improvements Visit https://go.skype.com/whatsnew for more details."},
  {os: 'iOS', storedAppID: 'one123', appNameText: "Pinterest", releaseDateText: "12.11.20", versionText: "8.41", releaseNotesText: "Every week, we polish up the Pinterest app. This update includes: - Introducing the Pinterest iMessage extension! Now you can search and share pins with your friends directly in iMessage - Bug fixes - Performance improvements Tell us if you like this latest version at https://help.pinterest.com/contact."},
  {os: 'iOS', storedAppID: 'one123', appNameText: "Gmail", releaseDateText: "07.11.20", versionText: "6.0.201018", releaseNotesText: "Thanks for using Gmail! This release brings you a new Gmail icon and bug fixes that improve our product to help you do more in one place."},
  {os: 'iOS', storedAppID: 'one123', appNameText: "Spotify", releaseDateText: "10.11.20", versionText: "8.5.83", releaseNotesText: "We’re always making changes and improvements to Spotify. To make sure you don’t miss a thing, just keep your Updates turned on. Bug fixes and improvements in this version include: - Fixed stability and performance issues"}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    socket

    //table column names
    col_names: string[] = ['app', 'releaseDate', 'version', 'releaseNotes'];
    //table data exported:
    table_data = reportData;

    mobileQuery: MediaQueryList
    private _mobileQueryListener: () => void;
  
    constructor(
      changeDetectorRef: ChangeDetectorRef, 
      media: MediaMatcher
    ) {
      this.mobileQuery = media.matchMedia('(max-width: 760px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.setupSocketConnection()
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT)
    this.socket.on('UpdateComplete', (report: Report) => {      
      console.log(report)
      if (report) {
        const reportText = JSON.stringify(report)
        const element = document.createElement('li')
        element.innerHTML = reportText
        document.getElementById('reports').appendChild(element)
      }
    })
  }

}
