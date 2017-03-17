import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MessagesModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DialogModule, PanelModule,DropdownModule, 
         ConfirmDialogModule , GrowlModule, 
         ConfirmationService,
         MultiSelectModule,
         TooltipModule,TabViewModule, CheckboxModule } from 'primeng/primeng';

import { StockBufferService } from './service/stock-buffer.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    MessagesModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    PanelModule,
    DropdownModule,
    ConfirmDialogModule,
    GrowlModule,
    MultiSelectModule,
    TooltipModule,
    TabViewModule,
    CheckboxModule
  ],
  providers: [ StockBufferService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
