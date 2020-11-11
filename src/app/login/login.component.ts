import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { environment as config } from '../../environments/environment'
import _ from 'lodash-es'
import * as dayjs from 'dayjs'
declare var $

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {
  resultSuccessCode = config.response.successCode
  resultSuccessDescription = config.response.successDescription
  resultFailed = config.response.failed

  currentUser: any = ''
  loading: any = false

  login: any = {
    username: config.login.username,
    password: config.login.password
  }

  username: any
  password: any

  dataDisplay: any = {
    disableBtnLogin: false,
    disableField: false
  }

  constructor(
    private router: Router
  ) { }


  async ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser')
    this.loading = true
  }

  async ngAfterViewInit() {
    setTimeout(() => {
      if (this.currentUser) {
        this.onGohome()
      }
      this.loading = false
    }, 500)
  }

  onLogin(e) {
    e.preventDefault()

    const { username, password } = this.login

    this.dataDisplay.disableField = true
    this.dataDisplay.disableBtnLogin = true

    $('#username').removeClass('is-invalid')
    $('#password').removeClass('is-invalid')

    setTimeout(() => {
      if ((this.username && (this.username === username))
        && (this.password && (this.password === password))) {
        localStorage.setItem('currentUser', btoa(this.username + this.password))
        this.onGohome()
      }
      this.checkValid()
      this.dataDisplay.disableField = false
      this.dataDisplay.disableBtnLogin = false
    }, 500)
  }

  checkValid() {
    const { username, password } = this.login

    if (!this.username || this.username === '') {
      $('#username').addClass('is-invalid')
    } else {
      $('#username').removeClass('is-invalid')
    }

    if (!this.password || this.password === '') {
      $('#password').addClass('is-invalid')
    } else {
      $('#password').removeClass('is-invalid')
    }

    if (this.username !== username || this.password !== password) {
      $('#username').addClass('is-invalid')
      $('#password').addClass('is-invalid')
      this.password = ''
    } else {
      $('#username').removeClass('is-invalid')
      $('#password').removeClass('is-invalid')
    }
  }

  onGohome() {
    this.router.navigate(['home'])
  }
}
