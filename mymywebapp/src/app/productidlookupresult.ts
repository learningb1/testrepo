import { ResourceLoader } from '@angular/compiler';

export class ProductIdLookupResults {
  result: string = "";

  constructor(rawProductIdLookupResults) {
    this.result = rawProductIdLookupResults.result;
  }

    public getResult(): string {
      console.log("retrieving val - " + this.result);
      return this.result;
    }
  }