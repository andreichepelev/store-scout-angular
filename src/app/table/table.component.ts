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
  {app: "Instagram", releaseDate: "May 28th 2020", version: "4.2.45", releaseNotes: "Kick-start your Material Design project with this customizable UI kit, complete with components and styles"},
  {app: "Facebook", releaseDate: "June 7th 2020", version: "12.3.1", releaseNotes: "A free UI Kit to quickly design mockups and (high fidelity) prototypes with hundreds of responsive components & widgets – based on Figmas component system."},
  {app: "Airbnb", releaseDate: "May 10th 2020", version: "1.38.9", releaseNotes: "Gallery. Share, upload, and present design iterations with your team ... kit for Figma. Create dark theme Material layouts with this component library for Figma "},
  {app: "Turo", releaseDate: "April 30th 2020", version: "6.11.2", releaseNotes: "Lorem ipsum Carfago delendam est"}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
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
