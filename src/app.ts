/*
Need in angular beta7 due to breaking changes for es5.
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
*/ 

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {ChartService} from './app/services/ChartService';

import { PlaybookApp } from './app/pb-app';

bootstrap(PlaybookApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS, ChartService])
	.catch(err => console.error(err));