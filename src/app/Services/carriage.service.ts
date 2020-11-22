import {Injectable} from '@angular/core';
import {Railway, RailwaysList} from '../Shared/railway';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CarriageService {
  constructor(private logger: LoggerService) {
  }

  append(newRailway: Railway): void {
    RailwaysList.railways.push(newRailway);
    this.logger.log('append', {paramName: 'newRailway', paramValue: newRailway});
  }

  remove(railwayToRemove: Railway): void {
    RailwaysList.railways = RailwaysList.railways.filter(
      (railway) => {
        return railway !== railwayToRemove;
      }
    );
    this.logger.log('remove', {paramName: 'railwayToRemove', paramValue: railwayToRemove});
  }

  getRailways(): Railway[] {
    this.logger.log('getRailways');
    return RailwaysList.railways;
  }

  edit(oldRailway: Railway, newRailway: Railway): void {
    RailwaysList.railways.forEach((currentRailway) => {
      if (oldRailway === currentRailway) {
        currentRailway = newRailway;
      }
    });
    this.logger.log('edit', {paramName: 'oldRailway', paramValue: oldRailway},
      {
        paramName: 'newRailway', paramValue: newRailway
      });
  }

  setType(id): string {
    this.logger.log('setType', {paramName: 'id', paramValue: id});
    let types: string;
    switch (id[0]) {
      case '2':
        types = 'Крытый грузовой вагон';
        break;
      case '4':
        types = 'Платформа';
        break;
      case '6':
        types = 'Полувагон';
        break;
      case '7':
        types = 'Цистерна';
        break;
      case '8':
        types = 'Изотермические вагон';
        break;
      case '5':
        types = 'Собственные';
        break;
      case '9' || '3':
        types = 'Прочие';
        break;
      default:
        types = 'Неизвестно';
        break;
    }
    return types;
  }
}
