import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private minutes = 5;

  constructor(private swUpdate: SwUpdate) {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.checkForUpdate();

    // Poll for updates
    interval(this.minutes * 60 * 1000).subscribe(() =>
      swUpdate.checkForUpdate().catch((error: any) => {
        console.log(`Error checking for update: ${error}`);
      }),
    );

    // Listen for updates
    this.swUpdate.versionUpdates.subscribe((event: any) => {
      if (event.type === 'VERSION_READY') {
        this.promptUpdate();
      }
    });
  }

  private promptUpdate() {
    if (confirm('A new version is available. Reload now?')) {
      this.swUpdate
        .activateUpdate()
        .then(() => document.location.reload())
        .catch((error: any) => {
          console.log(`Error activating update: ${error}`);
        });
    }
  }
}
