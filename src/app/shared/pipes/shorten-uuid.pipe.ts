import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenUuid'
})
export class ShortenUuidPipe implements PipeTransform {

  transform(uuid: string): string {
    if (!uuid || uuid.length < 12) {
      return uuid;
    }
    const start = uuid.substring(0, 8);
    const end = uuid.substring(uuid.length - 4);
    return `${start}...${end}`;
  }

}
