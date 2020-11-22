import { Injectable } from '@angular/core';


@Injectable()
export class LoggerService {
  constructor() { }
  log(nameOfFunction: string, ...args: {paramName: string, paramValue: any}[]): void{
    if (args.length !== 0){
      console.log('The function ' + nameOfFunction + ' invoked with parameters ');
      console.log(args);
    }else{
      console.log('The function ' + nameOfFunction + ' invoked with parameters ');
    }
  }
}
