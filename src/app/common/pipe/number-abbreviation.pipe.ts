import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberAbbreviation'
})
export class NumberAbbreviationPipe implements PipeTransform {

  transform(number: number, args?: any): any {
    if (isNaN(number) || number === null || number === 0) {
      return null;
    }

    let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    const isNegative = number < 0;
    let key = '';

    const powers = [
      { key: ' Qua', value: Math.pow(10, 15) },
      { key: ' Tri', value: Math.pow(10, 12) },
      { key: ' Bi', value: Math.pow(10, 9) },
      { key: ' Mi', value: Math.pow(10, 6) },
      { key: ' K', value: 1000 }
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + abs + key;
  }

}
