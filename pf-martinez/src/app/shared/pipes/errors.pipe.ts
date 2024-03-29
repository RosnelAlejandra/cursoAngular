import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorsValidation'
})
export class ErrorsPipe implements PipeTransform {

  transform(errors?: ValidationErrors | null, ...args: unknown[]): unknown {
    if (!!errors) {
      let messages = [];

      if (errors['required']) messages.push('Este campo es requerido');
      if (errors['email']) messages.push('No es un email valido');
      if (errors['maxlength'])
        messages.push(
          `No puede tener mas de ${errors['maxlength']?.requiredLength} caracteres`
        );

      return messages.join('. ') + '.';
    }
    return null;
  }

}
