var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var IonRating = /** @class */ (function () {
    function IonRating() {
        this.numStars = 0;
        this.readOnly = true;
        this.value = 0;
        this.clicked = new EventEmitter();
        this.stars = [];
    }
    IonRating.prototype.ngAfterViewInit = function () {
        this.calc();
    };
    IonRating.prototype.calc = function () {
        var _this = this;
        setTimeout(function () {
            _this.stars = [];
            var tmp = _this.value;
            for (var i = 0; i < _this.numStars; i++, tmp--)
                if (tmp >= 1)
                    _this.stars.push("star");
                else if (tmp < 1 && tmp > 0)
                    _this.stars.push("star-half");
                else
                    _this.stars.push("star-outline");
        }, 0);
    };
    IonRating.prototype.starClicked = function (index) {
        if (!this.readOnly) {
            this.value = index + 1;
            this.calc();
            this.clicked.emit(this.value);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], IonRating.prototype, "numStars", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IonRating.prototype, "readOnly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], IonRating.prototype, "value", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], IonRating.prototype, "clicked", void 0);
    IonRating = __decorate([
        Component({
            selector: 'ion-rating',
            templateUrl: 'ion-rating.html'
        }),
        __metadata("design:paramtypes", [])
    ], IonRating);
    return IonRating;
}());
export { IonRating };
//# sourceMappingURL=ion-rating.js.map