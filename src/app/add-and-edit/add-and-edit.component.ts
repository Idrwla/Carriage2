import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarriageService} from '../Services/carriage.service';
import {CarriageValidatorService} from '../Services/carriage-validator.service';
import {Railway, RailwaysList} from '../Shared/railway';
import {LoggerService} from '../Services/logger.service';

@Component({
  selector: 'app-add-and-edit',
  templateUrl: './add-and-edit.component.html',
  styleUrls: ['./add-and-edit.component.css'],
  providers: [CarriageValidatorService, LoggerService]
})
export class AddAndEditComponent implements OnInit {
  oldRailway: Railway = undefined;
  editMode: boolean;
  railway = new FormGroup({
    id: new FormControl('', [Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8)],
      [this.customValidator.isExist(this.crudService, this.oldRailway),         // Works
        this.customValidator.checkSum]),                          // Works
    name: new FormControl('', [Validators.maxLength(50),
      Validators.required]),
    state: new FormControl('', Validators.required)
  });

  constructor(public crudService: CarriageService, private customValidator: CarriageValidatorService) {
  }

  ngOnInit(): void {
  }

  addNewRailway(): void {
    const railwayObj = {
      id: this.railway.value.id,
      name: this.railway.value.name,
      type: this.crudService.setType(this.railway.value.id),
      state: this.railway.value.state
    };
    if (this.editMode === true) {
      this.edit(this.oldRailway, railwayObj);
      this.editMode = false;
      this.oldRailway = undefined;
    } else {
      this.crudService.append(railwayObj);
    }
    this.railway.reset();
  }

  edit(railway, newRailway): void {
    this.crudService.edit(railway, newRailway);
  }
  setFormStates(railway: Railway): void{
    this.railway.controls.id.setValue(railway.id);
    this.railway.controls.name.setValue(railway.name);
    this.railway.controls.state.setValue(railway.state);
  }
  logErrors(): void{
    console.log(this.railway);
    console.log(this.oldRailway);
  }
}
