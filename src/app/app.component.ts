import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment as config } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'server-rcon';

  public constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle(config.serverName)
  }
}
