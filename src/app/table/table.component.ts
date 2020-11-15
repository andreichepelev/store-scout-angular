import { Component, OnInit } from '@angular/core';


//table data model:
export interface Report {
  app: string;
  releaseDate: string;
  version: string;
  releaseNotes: string;
}

//table data:
const reportData: Report[] = [
  {app: "Skype for iPhone 12+", releaseDate: "9 Nov 2020", version: "8.66", releaseNotes: "We're listening to your feedback and working hard to improve Skype. Here's what's new: - Customised message reactions - Raise your hand during a group call - Smart share suggestions - Bug fixes and stability improvements Visit https://go.skype.com/whatsnew for more details."},
  {app: "Pinterest: Lifestyle Ideas 12+", releaseDate: "12 Nov 2020", version: "8.41", releaseNotes: "Every week, we polish up the Pinterest app. This update includes: - Introducing the Pinterest iMessage extension! Now you can search and share pins with your friends directly in iMessage - Bug fixes - Performance improvements Tell us if you like this latest version at https://help.pinterest.com/contact."},
  {app: "Gmail - Email by Google 4+", releaseDate: "7 Nov 2020", version: "6.0.201018", releaseNotes: "Thanks for using Gmail! This release brings you a new Gmail icon and bug fixes that improve our product to help you do more in one place."},
  {app: "Spotify New Music and Podcasts 12+", releaseDate: "10 Nov 2020", version: "8.5.83", releaseNotes: "We’re always making changes and improvements to Spotify. To make sure you don’t miss a thing, just keep your Updates turned on. Bug fixes and improvements in this version include: - Fixed stability and performance issues"}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    //table column names
    col_names: string[] = ['app', 'releaseDate', 'version', 'releaseNotes'];
    //table data exported:
    table_data = reportData;

  constructor() { }

  ngOnInit(): void {
  }

}
