import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Railway} from '../Shared/railway';
import {CarriageService} from '../Services/carriage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  railways: Railway[];
  @Output() editMode: EventEmitter<Railway> = new EventEmitter<Railway>();
  constructor(private carriage: CarriageService) { }

  ngOnInit(): void {
    this.railways = this.carriage.getRailways();
  }
  show(): void{
    console.log(this.railways);
    console.log(this.carriage.getRailways());
  }
  remove(railway): void{
    this.carriage.remove(railway);
    this.railways = this.carriage.getRailways();
  }
  edit(railway): void{
    this.editMode.emit(railway);
  }
}
