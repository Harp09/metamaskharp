import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EthereumService } from './services/ethereum.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [EthereumService], // Asegúrate de que el servicio esté incluido aquí si no usa @Injectable({ providedIn: 'root' })
  bootstrap: [AppComponent]
})
export class AppModule { }
