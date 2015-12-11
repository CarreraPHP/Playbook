var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var angular2_1 = require('angular2/angular2');
// import {bootstrap} from 'angular2/bootstrap'; // version > 47 should have bootstrap barrel reference.
var Viewport_1 = require('./components/viewport/Viewport');
var ChartService_1 = require('./services/ChartService');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'pb-app',
            templateUrl: 'app/app.html',
            directives: [Viewport_1.Viewport]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
angular2_1.bootstrap(AppComponent, [ChartService_1.ChartService]);
//# sourceMappingURL=app.js.map