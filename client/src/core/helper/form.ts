import {FormGroup} from '@angular/forms';
import {IModel} from '../model/interface';

export class FormHelper {

  /*static confirmPassword(errorField: string, targetName: string): ValidateFn<any> {
    console.log('confirmPassword')
    return (control: AbstractControl): any => {
      if (!control.parent || !control) {
        return;
      }
      const password = control.parent.get(targetName);

      if (!password) {
        return;
      }

      if (password.value !== control.value) {
        const rs = {};
        rs[errorField] = true;
        return rs;
      }
    };
  }*/

  static confirmPassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  static setValueFromInstance (form: FormGroup, instance: IModel){
    const properties: string[] = Object.getOwnPropertyNames(form.controls);
    for (let i = 0; i < properties.length; i++){
      if (instance[properties[i]]) {
        form.get(properties[i]).setValue(instance[properties[i]]);
      }
    }
  }

  static formChangeHandler (form: FormGroup, errors: any): any {
    return form.valueChanges.subscribe(() => {
      for (const field in errors) {
        if (!errors.hasOwnProperty(field)) {
          continue;
        }
        // Clear previous errors
        errors[field] = {};
        // Get the control
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          errors[field] = control.errors;
        }
      }
    });
  }
}
