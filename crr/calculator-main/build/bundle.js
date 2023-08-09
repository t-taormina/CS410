/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Calculator.ts":
/*!***************************!*\
  !*** ./src/Calculator.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Calculator: () => (/* binding */ Calculator),
/* harmony export */   Op: () => (/* binding */ Op)
/* harmony export */ });
/**
 * The binary operations supported by the calculator.
 */
var Op;
(function (Op) {
    /**
     * Addition.
     */
    Op[Op["Add"] = 0] = "Add";
    /**
     * Subtraction.
     */
    Op[Op["Sub"] = 1] = "Sub";
    /**
     * Multiplication.
     */
    Op[Op["Mul"] = 2] = "Mul";
    /**
     * Division.
     */
    Op[Op["Div"] = 3] = "Div";
    /**
     * Modular Division.
     */
    Op[Op["Mod"] = 4] = "Mod";
})(Op || (Op = {}));
/**
 * A basic four-function calculator. UI logic is handled separately in
 * {@link CalculatorUI}.
 */
var Calculator = /** @class */ (function () {
    /**
     * In its initial state, the calculator's screen shows `0`, there is no
     * previous result or operation, and overwrite mode is enabled.
     */
    function Calculator() {
        this.lcd = '0';
        this.arg = null;
        this.lastOp = null;
        this.overwrite = true;
        this.repeat = false;
    }
    /**
     * Input a single digit.
     * @param x a single digit, 0-9
     */
    Calculator.prototype.digit = function (x) {
        if (this.overwrite) {
            this.lcd = x.toString();
            this.overwrite = false;
        }
        else {
            this.lcd += x;
        }
    };
    /**
     * Input a decimal point.
     */
    Calculator.prototype.decimal = function () {
        if (this.overwrite) {
            this.lcd = '0.';
            this.overwrite = false;
        }
        else if (this.lcd.indexOf('.') === -1) { // don't allow more than one '.'
            this.lcd += '.';
        }
    };
    Calculator.prototype.negate = function () {
        if (this.overwrite) {
            this.lcd = '0';
            this.overwrite = false;
        }
        else if (this.lcd !== '0') { // don't negate '0'
            if (this.lcd.charAt(0) === '-')
                this.lcd = this.lcd.substring(1);
            else
                this.lcd = '-' + this.lcd;
        }
    };
    Calculator.prototype.squareRoot = function () {
        if (this.overwrite) {
            this.lcd = '0';
            this.overwrite = false;
        }
        else {
            this.lcd = Math.sqrt(parseFloat(this.lcd)).toString();
        }
    };
    /**
     * Input a binary operator. If there is a pending operation whose result has
     * not yet been displayed, update the screen to display that result. For
     * example, when a user inputs 2 + 4 + 8, the screen is updated to display 6
     * on the second + input.
     */
    Calculator.prototype.op = function (o) {
        this.overwrite = true;
        if (this.arg === null || this.repeat) { // if this is the first argument
            this.lastOp = o;
            this.arg = parseFloat(this.lcd);
        }
        else { // if this is the second argument
            switch (this.lastOp) {
                case Op.Add:
                    this.lcd = (this.arg + parseFloat(this.lcd)).toString();
                    break;
                case Op.Sub:
                    this.lcd = (this.arg - parseFloat(this.lcd)).toString();
                    break;
                case Op.Mul:
                    this.lcd = (this.arg * parseFloat(this.lcd)).toString();
                    break;
                case Op.Div:
                    this.lcd = (this.arg / parseFloat(this.lcd)).toString();
                    break;
                case Op.Mod:
                    this.lcd = (this.arg % parseFloat(this.lcd)).toString();
                    break;
            }
            this.lastOp = o;
            this.arg = parseFloat(this.lcd);
        }
        this.repeat = false;
    };
    /**
     * If the calculator is not in repeat mode, compute the result of the pending
     * expression if there is one. If the calculator is in repeat mode,
     * re-execute the previous operation.
     *
     * @see {@link repeat}
     */
    Calculator.prototype.equals = function () {
        // If `repeat` is disabled, this press of = will enable it. In that case,
        // the value currently on screen is the second argument, the one that's used
        // when repeating the operation.
        var oldLcd = parseFloat(this.lcd);
        // If `repeat` is disabled, then `this.arg` is the first argument to the
        // operation; if `repeat` is enabled, then it's the second argument.
        // This doesn't matter in the + and * cases because the result is the same
        // either way.
        switch (this.lastOp) {
            case Op.Add:
                this.lcd = (this.arg + parseFloat(this.lcd)).toString();
                break;
            case Op.Sub:
                if (this.repeat)
                    this.lcd = (parseFloat(this.lcd) - this.arg).toString();
                else
                    this.lcd = (this.arg - parseFloat(this.lcd)).toString();
                break;
            case Op.Mul:
                this.lcd = (this.arg * parseFloat(this.lcd)).toString();
                break;
            case Op.Div:
                if (this.repeat)
                    this.lcd = (parseFloat(this.lcd) / this.arg).toString();
                else
                    this.lcd = (this.arg / parseFloat(this.lcd)).toString();
                break;
            case Op.Mod:
                if (this.repeat)
                    this.lcd = (parseFloat(this.lcd) % this.arg).toString();
                else
                    this.lcd = (this.arg % parseFloat(this.lcd)).toString();
                break;
        }
        // If `repeat` is disabled, we need to save the previous value of the screen
        // to use it as the second argument when repeating the operation.
        if (!this.repeat)
            this.arg = oldLcd;
        this.repeat = true;
        this.overwrite = true;
    };
    /**
     * Clear the screen, resetting it to 0. If in overwrite mode, reset the
     * entire calculator to its initial state.
     */
    Calculator.prototype.clear = function () {
        if (this.overwrite) {
            this.arg = null;
            this.lastOp = null;
            this.repeat = false;
        }
        this.lcd = '0';
        this.overwrite = true;
    };
    return Calculator;
}());



/***/ }),

/***/ "./src/CalculatorUI.ts":
/*!*****************************!*\
  !*** ./src/CalculatorUI.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalculatorUI: () => (/* binding */ CalculatorUI)
/* harmony export */ });
/* harmony import */ var _Calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Calculator */ "./src/Calculator.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * The UI logic for the calculator interface, which just updates the HTML
 * element representing the display every time the calculator's state changes.
 * Button actions are bound in {@link Main}.
 */
var CalculatorUI = /** @class */ (function (_super) {
    __extends(CalculatorUI, _super);
    function CalculatorUI(id) {
        var _this = _super.call(this) || this;
        _this.lcdDisplay = document.getElementById(id);
        _this.lcdDisplay.innerHTML = _this.lcd;
        return _this;
    }
    CalculatorUI.prototype.digit = function (x) {
        _super.prototype.digit.call(this, x);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.decimal = function () {
        _super.prototype.decimal.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.negate = function () {
        _super.prototype.negate.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.squareRoot = function () {
        _super.prototype.squareRoot.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.op = function (o) {
        _super.prototype.op.call(this, o);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.equals = function () {
        _super.prototype.equals.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    CalculatorUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.lcdDisplay.innerHTML = this.lcd.toString();
    };
    return CalculatorUI;
}(_Calculator__WEBPACK_IMPORTED_MODULE_0__.Calculator));



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CalculatorUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalculatorUI */ "./src/CalculatorUI.ts");
/* harmony import */ var _Calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Calculator */ "./src/Calculator.ts");


window.onload = function () {
    var calcUI = new _CalculatorUI__WEBPACK_IMPORTED_MODULE_0__.CalculatorUI('lcd');
    document.getElementById('1').onclick = function () { return calcUI.digit(1); };
    document.getElementById('2').onclick = function () { return calcUI.digit(2); };
    document.getElementById('3').onclick = function () { return calcUI.digit(3); };
    document.getElementById('4').onclick = function () { return calcUI.digit(4); };
    document.getElementById('5').onclick = function () { return calcUI.digit(5); };
    document.getElementById('6').onclick = function () { return calcUI.digit(6); };
    document.getElementById('7').onclick = function () { return calcUI.digit(7); };
    document.getElementById('8').onclick = function () { return calcUI.digit(8); };
    document.getElementById('9').onclick = function () { return calcUI.digit(9); };
    document.getElementById('0').onclick = function () { return calcUI.digit(0); };
    document.getElementById('+-').onclick = function () { return calcUI.negate(); };
    document.getElementById('sqrt').onclick = function () { return calcUI.squareRoot(); };
    document.getElementById('.').onclick = function () { return calcUI.decimal(); };
    document.getElementById('+').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Add); };
    document.getElementById('-').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Sub); };
    document.getElementById('*').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Mul); };
    document.getElementById('/').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Div); };
    document.getElementById('%').onclick = function () { return calcUI.op(_Calculator__WEBPACK_IMPORTED_MODULE_1__.Op.Mod); };
    document.getElementById('=').onclick = function () { return calcUI.equals(); };
    document.getElementById('C').onclick = function () { return calcUI.clear(); };
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxPQUFPLEdBQUcsY0FBTSxhQUFNLENBQUMsVUFBVSxFQUFFLEVBQW5CLENBQW1CLENBQUM7SUFDcEUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsY0FBTSxhQUFNLENBQUMsT0FBTyxFQUFFLEVBQWhCLENBQWdCLENBQUM7SUFDOUQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsY0FBTSxhQUFNLENBQUMsRUFBRSxDQUFDLDJDQUFFLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQUM7SUFDL0QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsY0FBTSxhQUFNLENBQUMsRUFBRSxDQUFDLDJDQUFFLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQUM7SUFDL0QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsY0FBTSxhQUFNLENBQUMsRUFBRSxDQUFDLDJDQUFFLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQUM7SUFDL0QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsY0FBTSxhQUFNLENBQUMsRUFBRSxDQUFDLDJDQUFFLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQUM7SUFDL0QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsY0FBTSxhQUFNLENBQUMsRUFBRSxDQUFDLDJDQUFFLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQUM7SUFDL0QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsY0FBTSxhQUFNLENBQUMsTUFBTSxFQUFFLEVBQWYsQ0FBZSxDQUFDO0lBQzdELFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLGNBQU0sYUFBTSxDQUFDLEtBQUssRUFBRSxFQUFkLENBQWMsQ0FBQztBQUM5RCxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ2FsY3VsYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FsY3VsYXRvclVJLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIGJpbmFyeSBvcGVyYXRpb25zIHN1cHBvcnRlZCBieSB0aGUgY2FsY3VsYXRvci5cbiAqL1xuZXhwb3J0IGVudW0gT3Age1xuICAvKipcbiAgICogQWRkaXRpb24uXG4gICAqL1xuICBBZGQsXG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0aW9uLlxuICAgKi9cbiAgU3ViLFxuXG4gIC8qKlxuICAgKiBNdWx0aXBsaWNhdGlvbi5cbiAgICovXG4gIE11bCxcblxuICAvKipcbiAgICogRGl2aXNpb24uXG4gICAqL1xuICBEaXYsXG5cbiAgLyoqXG4gICAqIE1vZHVsYXIgRGl2aXNpb24uXG4gICAqL1xuICBNb2Rcbn1cblxuLyoqXG4gKiBBIGJhc2ljIGZvdXItZnVuY3Rpb24gY2FsY3VsYXRvci4gVUkgbG9naWMgaXMgaGFuZGxlZCBzZXBhcmF0ZWx5IGluXG4gKiB7QGxpbmsgQ2FsY3VsYXRvclVJfS5cbiAqL1xuZXhwb3J0IGNsYXNzIENhbGN1bGF0b3Ige1xuICAvKipcbiAgICogVGhlIGNvbnRlbnRzIG9mIHRoZSBjYWxjdWxhdG9yJ3MgTENEIGRpc3BsYXkuXG4gICAqL1xuICBsY2Q6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBvcGVyYXRpb24gaWYgYHJlcGVhdGAgaXMgYGZhbHNlYCwgb3IgdGhlIHNlY29uZFxuICAgKiBhcmd1bWVudCBvZiB0aGUgbGFzdCBvcGVyYXRpb24gaWYgYHJlcGVhdGAgaXMgYHRydWVgLlxuICAgKi9cbiAgYXJnOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IG9wZXJhdGlvbiB0aGF0IHRoZSB1c2VyIGVudGVyZWQuXG4gICAqL1xuICBsYXN0T3A6IE9wO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBjYWxjdWxhdG9yIGlzIGluIFwib3ZlcndyaXRlIG1vZGVcIjsgaWYgYGZhbHNlYCwgdGhlXG4gICAqIGNhbGN1bGF0b3IgaXMgaW4gXCJhcHBlbmQgbW9kZVwiLiBJbiBvdmVyd3JpdGUgbW9kZSwgdGhlIG5leHQgaW5wdXQgcmVwbGFjZXNcbiAgICogdGhlIGN1cnJlbnQgc2NyZWVuIGNvbnRlbnRzOyBpbiBhcHBlbmQgbW9kZSwgdGhlIG5leHQgaW5wdXQgYXBwZW5kcyB0byB0aGVcbiAgICogY3VycmVudCBzY3JlZW4gY29udGVudHMuXG4gICAqL1xuICBvdmVyd3JpdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGNhbGN1bGF0b3IgaXMgaW4gXCJyZXBlYXQgbW9kZVwiLiBJbiByZXBlYXQgbW9kZSwgd2hlbiB0aGUgPVxuICAgKiBidXR0b24gaXMgcHJlc3NlZCwgdGhlIHNjcmVlbiBpcyB1cGRhdGVkIGJ5IHJlLWV4ZWN1dGluZyB0aGUgcHJldmlvdXNcbiAgICogb3BlcmF0aW9uIHdpdGggdGhlIHNhbWUgcmlnaHQtaGFuZCBhcmd1bWVudCBhcyBsYXN0IHRpbWUuIEZvciBleGFtcGxlLCBpZlxuICAgKiB0aGUgcHJldmlvdXMgb3BlcmF0aW9uIHdhcyAzICsgNSBhbmQgdGhlIGNhbGN1bGF0b3IgaXMgaW4gcmVwZWF0IG1vZGUsXG4gICAqIHByZXNzaW5nID0gd2lsbCB1cGRhdGUgdGhlIHNjcmVlbiB3aXRoIHRoZSBudW1iZXIgMTMuXG4gICAqL1xuICByZXBlYXQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEluIGl0cyBpbml0aWFsIHN0YXRlLCB0aGUgY2FsY3VsYXRvcidzIHNjcmVlbiBzaG93cyBgMGAsIHRoZXJlIGlzIG5vXG4gICAqIHByZXZpb3VzIHJlc3VsdCBvciBvcGVyYXRpb24sIGFuZCBvdmVyd3JpdGUgbW9kZSBpcyBlbmFibGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sY2QgPSAnMCc7XG4gICAgdGhpcy5hcmcgPSBudWxsO1xuICAgIHRoaXMubGFzdE9wID0gbnVsbDtcbiAgICB0aGlzLm92ZXJ3cml0ZSA9IHRydWU7XG4gICAgdGhpcy5yZXBlYXQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnB1dCBhIHNpbmdsZSBkaWdpdC5cbiAgICogQHBhcmFtIHggYSBzaW5nbGUgZGlnaXQsIDAtOVxuICAgKi9cbiAgZGlnaXQoeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcndyaXRlKSB7XG4gICAgICB0aGlzLmxjZCA9IHgudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMub3ZlcndyaXRlID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGNkICs9IHg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElucHV0IGEgZGVjaW1hbCBwb2ludC5cbiAgICovXG4gIGRlY2ltYWwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcndyaXRlKSB7XG4gICAgICB0aGlzLmxjZCA9ICcwLic7XG4gICAgICB0aGlzLm92ZXJ3cml0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sY2QuaW5kZXhPZignLicpID09PSAtMSkgeyAvLyBkb24ndCBhbGxvdyBtb3JlIHRoYW4gb25lICcuJ1xuICAgICAgdGhpcy5sY2QgKz0gJy4nO1xuICAgIH1cbiAgfVxuXG4gIG5lZ2F0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVyd3JpdGUpIHtcbiAgICAgIHRoaXMubGNkID0gJzAnO1xuICAgICAgdGhpcy5vdmVyd3JpdGUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGNkICE9PSAnMCcpIHsgLy8gZG9uJ3QgbmVnYXRlICcwJ1xuICAgICAgaWYgKHRoaXMubGNkLmNoYXJBdCgwKSA9PT0gJy0nKVxuICAgICAgICB0aGlzLmxjZCA9IHRoaXMubGNkLnN1YnN0cmluZygxKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5sY2QgPSAnLScgKyB0aGlzLmxjZDtcbiAgICB9XG4gIH1cblxuICBzcXVhcmVSb290KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJ3cml0ZSkge1xuICAgICAgdGhpcy5sY2QgPSAnMCc7XG4gICAgICB0aGlzLm92ZXJ3cml0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxjZCA9IE1hdGguc3FydChwYXJzZUZsb2F0KHRoaXMubGNkKSkudG9TdHJpbmcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5wdXQgYSBiaW5hcnkgb3BlcmF0b3IuIElmIHRoZXJlIGlzIGEgcGVuZGluZyBvcGVyYXRpb24gd2hvc2UgcmVzdWx0IGhhc1xuICAgKiBub3QgeWV0IGJlZW4gZGlzcGxheWVkLCB1cGRhdGUgdGhlIHNjcmVlbiB0byBkaXNwbGF5IHRoYXQgcmVzdWx0LiBGb3JcbiAgICogZXhhbXBsZSwgd2hlbiBhIHVzZXIgaW5wdXRzIDIgKyA0ICsgOCwgdGhlIHNjcmVlbiBpcyB1cGRhdGVkIHRvIGRpc3BsYXkgNlxuICAgKiBvbiB0aGUgc2Vjb25kICsgaW5wdXQuXG4gICAqL1xuICBvcChvOiBPcCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcndyaXRlID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5hcmcgPT09IG51bGwgfHwgdGhpcy5yZXBlYXQpIHsgLy8gaWYgdGhpcyBpcyB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICAgIHRoaXMubGFzdE9wID0gbztcbiAgICAgIHRoaXMuYXJnID0gcGFyc2VGbG9hdCh0aGlzLmxjZCk7XG4gICAgfSBlbHNlIHsgLy8gaWYgdGhpcyBpcyB0aGUgc2Vjb25kIGFyZ3VtZW50XG4gICAgICBzd2l0Y2ggKHRoaXMubGFzdE9wKSB7XG4gICAgICAgIGNhc2UgT3AuQWRkOiB0aGlzLmxjZCA9ICh0aGlzLmFyZyArIHBhcnNlRmxvYXQodGhpcy5sY2QpKS50b1N0cmluZygpOyBicmVhaztcbiAgICAgICAgY2FzZSBPcC5TdWI6IHRoaXMubGNkID0gKHRoaXMuYXJnIC0gcGFyc2VGbG9hdCh0aGlzLmxjZCkpLnRvU3RyaW5nKCk7IGJyZWFrO1xuICAgICAgICBjYXNlIE9wLk11bDogdGhpcy5sY2QgPSAodGhpcy5hcmcgKiBwYXJzZUZsb2F0KHRoaXMubGNkKSkudG9TdHJpbmcoKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgT3AuRGl2OiB0aGlzLmxjZCA9ICh0aGlzLmFyZyAvIHBhcnNlRmxvYXQodGhpcy5sY2QpKS50b1N0cmluZygpOyBicmVhaztcbiAgICAgICAgY2FzZSBPcC5Nb2Q6IHRoaXMubGNkID0gKHRoaXMuYXJnICUgcGFyc2VGbG9hdCh0aGlzLmxjZCkpLnRvU3RyaW5nKCk7IGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0T3AgPSBvO1xuICAgICAgdGhpcy5hcmcgPSBwYXJzZUZsb2F0KHRoaXMubGNkKTtcbiAgICB9XG4gICAgdGhpcy5yZXBlYXQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgY2FsY3VsYXRvciBpcyBub3QgaW4gcmVwZWF0IG1vZGUsIGNvbXB1dGUgdGhlIHJlc3VsdCBvZiB0aGUgcGVuZGluZ1xuICAgKiBleHByZXNzaW9uIGlmIHRoZXJlIGlzIG9uZS4gSWYgdGhlIGNhbGN1bGF0b3IgaXMgaW4gcmVwZWF0IG1vZGUsXG4gICAqIHJlLWV4ZWN1dGUgdGhlIHByZXZpb3VzIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgcmVwZWF0fVxuICAgKi9cbiAgZXF1YWxzKCk6IHZvaWQge1xuICAgIC8vIElmIGByZXBlYXRgIGlzIGRpc2FibGVkLCB0aGlzIHByZXNzIG9mID0gd2lsbCBlbmFibGUgaXQuIEluIHRoYXQgY2FzZSxcbiAgICAvLyB0aGUgdmFsdWUgY3VycmVudGx5IG9uIHNjcmVlbiBpcyB0aGUgc2Vjb25kIGFyZ3VtZW50LCB0aGUgb25lIHRoYXQncyB1c2VkXG4gICAgLy8gd2hlbiByZXBlYXRpbmcgdGhlIG9wZXJhdGlvbi5cbiAgICBjb25zdCBvbGRMY2QgPSBwYXJzZUZsb2F0KHRoaXMubGNkKTtcblxuICAgIC8vIElmIGByZXBlYXRgIGlzIGRpc2FibGVkLCB0aGVuIGB0aGlzLmFyZ2AgaXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgIC8vIG9wZXJhdGlvbjsgaWYgYHJlcGVhdGAgaXMgZW5hYmxlZCwgdGhlbiBpdCdzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgLy8gVGhpcyBkb2Vzbid0IG1hdHRlciBpbiB0aGUgKyBhbmQgKiBjYXNlcyBiZWNhdXNlIHRoZSByZXN1bHQgaXMgdGhlIHNhbWVcbiAgICAvLyBlaXRoZXIgd2F5LlxuICAgIHN3aXRjaCAodGhpcy5sYXN0T3ApIHtcbiAgICAgIGNhc2UgT3AuQWRkOiB0aGlzLmxjZCA9ICh0aGlzLmFyZyArIHBhcnNlRmxvYXQodGhpcy5sY2QpKS50b1N0cmluZygpOyBicmVhaztcbiAgICAgIGNhc2UgT3AuU3ViOlxuICAgICAgICBpZiAodGhpcy5yZXBlYXQpXG4gICAgICAgICAgdGhpcy5sY2QgPSAocGFyc2VGbG9hdCh0aGlzLmxjZCkgLSB0aGlzLmFyZykudG9TdHJpbmcoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMubGNkID0gKHRoaXMuYXJnIC0gcGFyc2VGbG9hdCh0aGlzLmxjZCkpLnRvU3RyaW5nKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBPcC5NdWw6IHRoaXMubGNkID0gKHRoaXMuYXJnICogcGFyc2VGbG9hdCh0aGlzLmxjZCkpLnRvU3RyaW5nKCk7IGJyZWFrO1xuICAgICAgY2FzZSBPcC5EaXY6XG4gICAgICAgIGlmICh0aGlzLnJlcGVhdClcbiAgICAgICAgICB0aGlzLmxjZCA9IChwYXJzZUZsb2F0KHRoaXMubGNkKSAvIHRoaXMuYXJnKS50b1N0cmluZygpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhpcy5sY2QgPSAodGhpcy5hcmcgLyBwYXJzZUZsb2F0KHRoaXMubGNkKSkudG9TdHJpbmcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9wLk1vZDpcbiAgICAgICAgaWYgKHRoaXMucmVwZWF0KVxuICAgICAgICAgIHRoaXMubGNkID0gKHBhcnNlRmxvYXQodGhpcy5sY2QpICUgdGhpcy5hcmcpLnRvU3RyaW5nKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0aGlzLmxjZCA9ICh0aGlzLmFyZyAlIHBhcnNlRmxvYXQodGhpcy5sY2QpKS50b1N0cmluZygpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBJZiBgcmVwZWF0YCBpcyBkaXNhYmxlZCwgd2UgbmVlZCB0byBzYXZlIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgc2NyZWVuXG4gICAgLy8gdG8gdXNlIGl0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgd2hlbiByZXBlYXRpbmcgdGhlIG9wZXJhdGlvbi5cbiAgICBpZiAoIXRoaXMucmVwZWF0KVxuICAgICAgdGhpcy5hcmcgPSBvbGRMY2Q7XG5cbiAgICB0aGlzLnJlcGVhdCA9IHRydWU7XG4gICAgdGhpcy5vdmVyd3JpdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBzY3JlZW4sIHJlc2V0dGluZyBpdCB0byAwLiBJZiBpbiBvdmVyd3JpdGUgbW9kZSwgcmVzZXQgdGhlXG4gICAqIGVudGlyZSBjYWxjdWxhdG9yIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuICAgKi9cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcndyaXRlKSB7XG4gICAgICB0aGlzLmFyZyA9IG51bGw7XG4gICAgICB0aGlzLmxhc3RPcCA9IG51bGw7XG4gICAgICB0aGlzLnJlcGVhdCA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmxjZCA9ICcwJztcbiAgICB0aGlzLm92ZXJ3cml0ZSA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbGN1bGF0b3IsIE9wIH0gZnJvbSAnLi9DYWxjdWxhdG9yJztcblxuLyoqXG4gKiBUaGUgVUkgbG9naWMgZm9yIHRoZSBjYWxjdWxhdG9yIGludGVyZmFjZSwgd2hpY2gganVzdCB1cGRhdGVzIHRoZSBIVE1MXG4gKiBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgZGlzcGxheSBldmVyeSB0aW1lIHRoZSBjYWxjdWxhdG9yJ3Mgc3RhdGUgY2hhbmdlcy5cbiAqIEJ1dHRvbiBhY3Rpb25zIGFyZSBib3VuZCBpbiB7QGxpbmsgTWFpbn0uXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWxjdWxhdG9yVUkgZXh0ZW5kcyBDYWxjdWxhdG9yIHtcbiAgLyoqXG4gICAqIFRoZSBIVE1MIGVsZW1lbnQgdGhhdCBzaG93cyB0aGUgY29udGVudHMgb2YgdGhlIGNhbGN1bGF0b3IncyBkaXNwbGF5LlxuICAgKi9cbiAgbGNkRGlzcGxheTogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5sY2REaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIHRoaXMubGNkRGlzcGxheS5pbm5lckhUTUwgPSB0aGlzLmxjZDtcbiAgfVxuXG4gIGRpZ2l0KHg6IG51bWJlcik6IHZvaWQge1xuICAgIHN1cGVyLmRpZ2l0KHgpO1xuICAgIHRoaXMubGNkRGlzcGxheS5pbm5lckhUTUwgPSB0aGlzLmxjZC50b1N0cmluZygpO1xuICB9XG5cbiAgZGVjaW1hbCgpOiB2b2lkIHtcbiAgICBzdXBlci5kZWNpbWFsKCk7XG4gICAgdGhpcy5sY2REaXNwbGF5LmlubmVySFRNTCA9IHRoaXMubGNkLnRvU3RyaW5nKCk7XG4gIH1cblxuICBuZWdhdGUoKTogdm9pZCB7XG4gICAgc3VwZXIubmVnYXRlKCk7XG4gICAgdGhpcy5sY2REaXNwbGF5LmlubmVySFRNTCA9IHRoaXMubGNkLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzcXVhcmVSb290KCk6IHZvaWQge1xuICAgIHN1cGVyLnNxdWFyZVJvb3QoKTtcbiAgICB0aGlzLmxjZERpc3BsYXkuaW5uZXJIVE1MID0gdGhpcy5sY2QudG9TdHJpbmcoKTtcbiAgfVxuXG4gIG9wKG86IE9wKTogdm9pZCB7XG4gICAgc3VwZXIub3Aobyk7XG4gICAgdGhpcy5sY2REaXNwbGF5LmlubmVySFRNTCA9IHRoaXMubGNkLnRvU3RyaW5nKCk7XG4gIH1cblxuICBlcXVhbHMoKTogdm9pZCB7XG4gICAgc3VwZXIuZXF1YWxzKCk7XG4gICAgdGhpcy5sY2REaXNwbGF5LmlubmVySFRNTCA9IHRoaXMubGNkLnRvU3RyaW5nKCk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICBzdXBlci5jbGVhcigpO1xuICAgIHRoaXMubGNkRGlzcGxheS5pbm5lckhUTUwgPSB0aGlzLmxjZC50b1N0cmluZygpO1xuICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDYWxjdWxhdG9yVUkgfSBmcm9tICcuL0NhbGN1bGF0b3JVSSc7XG5pbXBvcnQgeyBPcCB9IGZyb20gJy4vQ2FsY3VsYXRvcic7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGNvbnN0IGNhbGNVSSA9IG5ldyBDYWxjdWxhdG9yVUkoJ2xjZCcpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnMScpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkuZGlnaXQoMSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcyJykub25jbGljayA9ICgpID0+IGNhbGNVSS5kaWdpdCgyKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJzMnKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLmRpZ2l0KDMpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnNCcpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkuZGlnaXQoNCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCc1Jykub25jbGljayA9ICgpID0+IGNhbGNVSS5kaWdpdCg1KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJzYnKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLmRpZ2l0KDYpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnNycpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkuZGlnaXQoNyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCc4Jykub25jbGljayA9ICgpID0+IGNhbGNVSS5kaWdpdCg4KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJzknKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLmRpZ2l0KDkpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnMCcpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkuZGlnaXQoMCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcrLScpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkubmVnYXRlKCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcXJ0Jykub25jbGljayA9ICgpID0+IGNhbGNVSS5zcXVhcmVSb290KCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcuJykub25jbGljayA9ICgpID0+IGNhbGNVSS5kZWNpbWFsKCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcrJykub25jbGljayA9ICgpID0+IGNhbGNVSS5vcChPcC5BZGQpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnLScpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkub3AoT3AuU3ViKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJyonKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLm9wKE9wLk11bCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcvJykub25jbGljayA9ICgpID0+IGNhbGNVSS5vcChPcC5EaXYpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnJScpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkub3AoT3AuTW9kKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJz0nKS5vbmNsaWNrID0gKCkgPT4gY2FsY1VJLmVxdWFscygpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQycpLm9uY2xpY2sgPSAoKSA9PiBjYWxjVUkuY2xlYXIoKTtcbn07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9