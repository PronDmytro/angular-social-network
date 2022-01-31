import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../services/user-data.service';

@Pipe({
  name: 'credentials',
})
export class CredentialsPipe implements PipeTransform {

  public transform(value: User, ...args: unknown[]): unknown {
    return value?.name[0].toUpperCase() + value?.name.substring(1).toLowerCase() + ' ' + value?.surname[0].toUpperCase() + '.';
  }

}
