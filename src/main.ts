import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    appConfig.providers,
    provideToastr({
          timeOut: 4000,
          closeButton: true,
          progressBar: true
        })
    ]
}).catch((err) => console.error(err));
