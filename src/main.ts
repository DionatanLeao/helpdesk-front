import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors  } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    appConfig.providers,
    provideToastr({
          timeOut: 4000,
          closeButton: true,
          progressBar: true
        })
    ]
}).catch((err) => console.error(err));
