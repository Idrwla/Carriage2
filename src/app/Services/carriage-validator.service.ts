import {Injectable} from '@angular/core';
import {AsyncValidatorFn, FormControl} from '@angular/forms';
import {CarriageService} from './carriage.service';
import {Railway} from '../Shared/railway';

@Injectable()
export class CarriageValidatorService {
  constructor(private carriage: CarriageService) {
  }

  isExist(carriageService, oldRailway?: Railway): AsyncValidatorFn {
    return (control: FormControl): Promise<any> => {
      return new Promise((resolve) => {
        let checkList: Railway[];
        if (oldRailway !== null) {
          checkList = carriageService.getRailways().filter(
            (item) => {
              return item !== oldRailway;
            }
          );
          console.log('iam here');
          console.log(oldRailway);
        } else {
          checkList = carriageService.getRailways();
        }
        const check = checkList.filter(
          (item) => {
            return item.id === control.value;
          });
        if (check.length > 0) {
          resolve({
            railwayWithThisIdIsExist: true
          });
        } else {
          resolve(null);
        }
      });
    };
  }

  checkSum(control: FormControl): Promise<any> {
    return new Promise((resolve) => {
      const product: number[] = [];
      let sum = 0;
      let controlSum = 0;
      Array.from(control.value).forEach((item: string, index) => {
        if (index === 7) {
          return 0;
        } else if (index % 2 !== 0) {
          product.push(parseInt(item, 10));
        } else {
          product.push(parseInt(item, 10) * 2);
        }
      });
      product.forEach((item) => {
        if (item >= 10) {
          sum += item - 10;
          sum += 1;
        } else {
          sum += item;
        }
      });
      if (sum % 10 !== 0) {
        while ((sum + controlSum) % 10 !== 0) {
          controlSum++;
        }
      }
      if (controlSum !== parseInt(control.value[7], 10)) {
        resolve({invalidCheckSum: true});
      } else {
        resolve(null);
      }
    });
  }
}
