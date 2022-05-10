import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';
import { AuthService } from './@services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yaka vaqef';

  constructor(
    // swUpdate: SwUpdate,
              private authService: AuthService,
              private router: Router) {
    // const updatesAvailable = swUpdate.versionUpdates.pipe(
    //   filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    //   map(evt => ({
    //   type: 'UPDATE_AVAILABLE',
    //   current: evt.currentVersion,
    //   available: evt.latestVersion,
    //   })));
    //   updatesAvailable.subscribe(res => {
    //     if(res.available) {
    //       window.location.reload();
    //     }
    //   })
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }
  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if(token) {
      this.authService.loadCurrentUser(token as string).subscribe();
    } else {
      this.router.navigate(['auth']);
    }
  }
}
