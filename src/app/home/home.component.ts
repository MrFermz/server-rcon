import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import { environment as config } from '../../environments/environment'
import { HttpService } from '../../services/http.services'
import { DomSanitizer } from '@angular/platform-browser'
import _ from 'lodash-es'
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
  resultSuccessCode = config.response.successCode
  resultSuccessDescription = config.response.successDescription
  resultFailed = config.response.failed

  currentUser: any = ''
  dataQuery: any = {}
  dataDisplay: any = {
    serverName: config.serverName,
    dataMotd: '',
    dataPlayerLength: 0,
    ping: '',
    disableSendBtn: false,
    queryError: false,
    connectRcon: false,
    connectQuery: false,
    connectPing: false,
    reloading: false
  }
  avatar = {
    baseUrl: 'https://crafatar.com/avatars/',
    size: '32'
  }
  loading = false
  command: any = ''
  version: any = ''

  constructor(
    private http: HttpService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }


  async ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser')
    this.loading = true
    this.version = config.version
    if (!this.currentUser) {
      this.onLogout()
    } else {
      this.onServerQuery()
    }
  }

  async ngAfterViewInit() {
    setInterval(async () => {
      this.onServerQuery()
    }, 60000) // every 1 minute
  }

  onReloading() {
    if (this.dataDisplay.reloading === false) {
      this.dataDisplay.reloading = true
      this.dataDisplay.disableSendBtn = false
      this.onServerQuery()
    }
    setTimeout(() => {
      this.dataDisplay.reloading = false
    }, 1000)
  }

  onServerQuery() {
    this.getServerQuery('ping')
      .then(ping => {
        this.dataDisplay.ping = ping
        this.dataDisplay.connectPing = true
        this.loading = false
      })
      .catch(error => {
        if (error === 'failed') {
          this.dataDisplay.queryError = true
        }
        this.checkRconConnect()
        this.loading = false
      })

    this.getServerQuery('status')
      .then(async (query) => {
        this.dataQuery = _.cloneDeep(query)
        let motd = await this.cleanMotd(this.dataQuery.description.descriptionText)
        this.dataDisplay.dataMotd = motd
        this.dataDisplay.dataPlayerLength = this.dataQuery.samplePlayers ? this.dataQuery.samplePlayers.length : 0

        if (this.dataQuery.favicon) {
          this.dataQuery.favicon = this.bypassBase64(this.dataQuery.favicon)
        }
        if (this.dataQuery.modInfo) {
          this.dataQuery.modsLists = _.sortBy(this.dataQuery.modInfo.modList, 'modid')
        }

        this.checkRconConnect()
        this.loading = false
        this.dataDisplay.connectQuery = true
      })
      .catch(error => {
        if (error === 'failed') {
          this.dataDisplay.queryError = true
        }
        this.checkRconConnect()
        this.loading = false
      })
  }

  getServerQuery(path) {
    return new Promise((resolve, reject) => {
      this.http.get(path).subscribe((data) => {
        if (data.resultCode === this.resultSuccessCode
          && data.resultDescription === this.resultSuccessDescription) {
          resolve(data.resultData)
        } else if (data.resultDescription === this.resultFailed) {
          reject(data.resultDescription)
        }
      })
    })
  }

  sendCommand(command) {
    return new Promise((resolve, reject) => {
      this.http.post('send-rcon', command).subscribe((data) => {
        if (data.resultCode === this.resultSuccessCode
          && data.resultDescription === this.resultSuccessDescription) {
          if (data.resultData.length === 0) {
            resolve(data.resultCode)
          } else {
            resolve(data.resultData)
          }
        } else if (data.resultCode === this.resultFailed) {
          resolve(data.resultCode)
        } else {
          reject()
        }
      })
    })
  }

  bypassBase64(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64)
  }

  onCammandChange(value) {
    this.command = value
  }

  async onSendCommand(e) {
    e.preventDefault()
    this.dataDisplay.disableSendBtn = true
    this.command = this.checkValidCommand(this.command)
    let response
    if (this.command === 'help' || this.command === '/help') {
      response = <string>config.helpCommand
    } else {
      response = <string>await this.sendCommand(this.command)
    }
    if (response) {
      if (response === 200) {
        let message = this.checkFormatMessage(this.command)
        let timeStamp = `<strong>[${dayjs().format('HH:mm:ss')}]:</strong>`
        let markup = document.createElement('li')
        markup.className = 'list-group-item list-group-item-info'
        markup.innerHTML = `${timeStamp} [Server] ${message}`
        document.getElementById('list-console').appendChild(markup)
        setTimeout(() => {
          this.dataDisplay.disableSendBtn = false
        }, 300)
        let consoleWindow = document.getElementById('console')
        consoleWindow.scrollTop = consoleWindow.scrollHeight
        this.command = ''
        return
      }
      if (response !== 'failed') {
        let message = this.checkFormatMessage(response)
        let timeStamp = `<strong>[${dayjs().format('HH:mm:ss')}]:</strong>`
        let concat = ''
        if (this.command === 'help') {
          let markup = document.createElement('li')
          markup.className = 'list-group-item list-group-item-info'
          message.forEach((ele, i) => {
            if (i === 0) {
              concat += `${timeStamp} /${ele}<br>`
            } else {
              concat += `/${ele}<br>`
            }
          })
          markup.innerHTML = concat
          document.getElementById('list-console').appendChild(markup)
        } else {
          let markup = document.createElement('li')
          if (message.search('error') !== -1) {
            markup.className = 'list-group-item list-group-item-warning'
          } else {
            markup.className = 'list-group-item list-group-item-info'
          }
          markup.innerHTML = `${timeStamp} ${message}`
          document.getElementById('list-console').appendChild(markup)
        }
        let consoleWindow = document.getElementById('console')
        consoleWindow.scrollTop = consoleWindow.scrollHeight
        this.dataDisplay.disableSendBtn = false
        this.command = ''
      } else {
        this.dataDisplay.disableSendBtn = true
        let markup = document.createElement('li')
        markup.className = 'list-group-item list-group-item-danger'
        markup.innerHTML = 'Cannot connect to API!'
        document.getElementById('list-console').appendChild(markup)
      }
      setTimeout(() => {
        this.dataDisplay.disableSendBtn = false
      }, 300)
    }
  }

  checkValidCommand(command) {
    return _.trim(command)
  }

  checkFormatMessage(message) {
    if (['help', '/help'].includes(this.command)) {
      message = message.replaceAll('<', '&lt;').split('/')
      message.shift()
      return message
    } else if (['say', '/say'].includes(this.command.split(' ')[0])) {
      message = message.replace('say', '')
      return message
    }
    return message
  }

  async checkRconConnect() {
    let response = <string>await this.sendCommand(this.command)
    if (response === 'failed') {
      this.dataDisplay.disableSendBtn = true
      let markup = document.createElement('li')
      markup.className = 'list-group-item list-group-item-danger'
      markup.innerHTML = 'Cannot connect to API!'
      document.getElementById('list-console').appendChild(markup)
    } else {
      this.dataDisplay.connectRcon = true
    }
  }

  async cleanMotd(motd) {
    let lists = config.motdCode.split(',')
    return new Promise((resolve, reject) => {
      let newMotd = motd.replaceAll('Â', '')
      for (let i = 0; i < lists.length; i++) {
        const ele = lists[i]
        newMotd = newMotd.replaceAll(ele, '')
      }
      resolve(newMotd)
    })
  }

  checkVersion() {
    return config.allowVersion.includes(this.dataQuery.version)
  }

  openNewTab(url) {
    window.open(url)
  }

  onLogout() {
    this.loading = true
    setTimeout(() => {
      localStorage.removeItem('currentUser')
      this.router.navigate([''])
      this.loading = false
    }, 500)
  }
}
