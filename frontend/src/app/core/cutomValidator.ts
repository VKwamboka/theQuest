import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(controlName);
    const confirmPasswordControl = control.get(matchingControlName);

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  };
}
