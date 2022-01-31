import { Component, Input, OnInit } from '@angular/core';
import { EducationData } from '../../../../services/user-api.service';

@Component({
  selector: 'app-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.scss'],
})
export class EducationInfoComponent implements OnInit {

  @Input() public data: EducationData;

  public constructor() {
  }

  public ngOnInit(): void {
  }

}
