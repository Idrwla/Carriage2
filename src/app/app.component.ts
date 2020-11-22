import {Component, ViewChild} from '@angular/core';
import {AddAndEditComponent} from './add-and-edit/add-and-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(AddAndEditComponent) private addAndEditComp: AddAndEditComponent;
  setEditMode(railway): void{
    this.addAndEditComp.oldRailway = railway;
    this.addAndEditComp.setFormStates(railway);
    this.addAndEditComp.editMode = true;;
  }
}
