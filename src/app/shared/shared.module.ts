import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from './components/loader-component/loader.component';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [LoaderComponent, DropdownDirective],
  imports: [FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    DropdownDirective
  ]
})

export class SharedModule {}
