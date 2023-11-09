import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RegisterRequestInterface } from 'src/app/auth/types/register-request.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';

    return this.http.post<AuthResponseInterface>(url, data).pipe(
      map((response: AuthResponseInterface) => {
        return response.user;
      })
    );
  }
}
