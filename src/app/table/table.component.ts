import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';


//table data model:
export interface Report {
  app: string;
  releaseDate: string;
  version: string;
  releaseNotes: string;
}

//table data:
const reportData: Report[] = [
  {app: "Skype", releaseDate: "09.11.20", version: "8.66", releaseNotes: "We're listening to your feedback and working hard to improve Skype. Here's what's new: - Customised message reactions - Raise your hand during a group call - Smart share suggestions - Bug fixes and stability improvements Visit https://go.skype.com/whatsnew for more details."},
  {app: "Pinterest", releaseDate: "12.11.20", version: "8.41", releaseNotes: "Every week, we polish up the Pinterest app. This update includes: - Introducing the Pinterest iMessage extension! Now you can search and share pins with your friends directly in iMessage - Bug fixes - Performance improvements Tell us if you like this latest version at https://help.pinterest.com/contact."},
  {app: "Gmail", releaseDate: "07.11.20", version: "6.0.201018", releaseNotes: "Thanks for using Gmail! This release brings you a new Gmail icon and bug fixes that improve our product to help you do more in one place."},
  {app: "Spotify", releaseDate: "10.11.20", version: "8.5.83", releaseNotes: "We’re always making changes and improvements to Spotify. To make sure you don’t miss a thing, just keep your Updates turned on. Bug fixes and improvements in this version include: - Fixed stability and performance issues"}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnDestroy {

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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
