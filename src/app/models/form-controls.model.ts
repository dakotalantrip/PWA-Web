import { FormControl } from '@angular/forms';

export type FormControls<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
