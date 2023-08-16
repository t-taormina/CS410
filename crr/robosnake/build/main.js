var main;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Agent.ts":
/*!**********************!*\
  !*** ./src/Agent.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializePlayerAgent: () => (/* binding */ initializePlayerAgent)
/* harmony export */ });
/* harmony import */ var _PlayerAgents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerAgents */ "./src/PlayerAgents.ts");

function initializePlayerAgent(player) {
    switch (player) {
        case "A": return new _PlayerAgents__WEBPACK_IMPORTED_MODULE_0__.AgentA;
        case "B": return new _PlayerAgents__WEBPACK_IMPORTED_MODULE_0__.AgentB;
        case "C": return new _PlayerAgents__WEBPACK_IMPORTED_MODULE_0__.AgentC;
        case "D": return new _PlayerAgents__WEBPACK_IMPORTED_MODULE_0__.AgentD;
    }
}


/***/ }),

/***/ "./src/DrawingLibrary.ts":
/*!*******************************!*\
  !*** ./src/DrawingLibrary.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canvas: () => (/* binding */ canvas),
/* harmony export */   fillCell: () => (/* binding */ fillCell),
/* harmony export */   resetCanvas: () => (/* binding */ resetCanvas),
/* harmony export */   scheduleNextUpdate: () => (/* binding */ scheduleNextUpdate),
/* harmony export */   updateApples: () => (/* binding */ updateApples),
/* harmony export */   updateLost: () => (/* binding */ updateLost)
/* harmony export */ });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var timeoutId = null;
function scheduleNextUpdate(milliseconds, update) {
    if (timeoutId)
        clearTimeout(timeoutId);
    timeoutId = setTimeout(update, milliseconds);
}
var canvas = document.getElementById("gameScreen").getContext("2d");
function resetCanvas() {
    if (timeoutId)
        clearTimeout(timeoutId);
    canvas.scale(1, 1);
    canvas.fillStyle = "white";
    canvas.fillRect(0, 0, 500, 500);
}
var CELL_SIZE = 10;
function fillCell(color, left, top) {
    canvas.fillStyle = color;
    canvas.fillRect(left * CELL_SIZE, top * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
function updateLost(player, lost) {
    document.getElementById("lost" + player).innerText = lost.toString();
}
function updateApples(player, apples) {
    document.getElementById("apples" + player).innerText = apples.toString();
}


/***/ }),

/***/ "./src/GameRunner.ts":
/*!***************************!*\
  !*** ./src/GameRunner.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Point: () => (/* binding */ Point),
/* harmony export */   SnakeState: () => (/* binding */ SnakeState),
/* harmony export */   getScreenPart: () => (/* binding */ getScreenPart),
/* harmony export */   makeMove: () => (/* binding */ makeMove),
/* harmony export */   outOfBounds: () => (/* binding */ outOfBounds),
/* harmony export */   run: () => (/* binding */ run),
/* harmony export */   step: () => (/* binding */ step)
/* harmony export */ });
/* harmony import */ var _Agent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Agent */ "./src/Agent.ts");
/* harmony import */ var _DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DrawingLibrary */ "./src/DrawingLibrary.ts");
/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameScreen */ "./src/GameScreen.ts");
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



var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());

var SnakeState = /** @class */ (function (_super) {
    __extends(SnakeState, _super);
    function SnakeState(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.apples = 0;
        _this.lost = false;
        return _this;
    }
    SnakeState.prototype.setPoint = function (p) {
        this.x = p.x;
        this.y = p.y;
    };
    return SnakeState;
}(Point));

// x and y are the left and top coordinate of a 5x5 square region.
// cells outside the bounds of the board are represented with "outside"
function getScreenPart(screen, s) {
    var part = new Array(5);
    for (var j = 0; j < 5; j++) {
        part[j] = new Array(5);
        for (var i = 0; i < 5; i++) {
            if (s.x + i - 2 >= 0 && s.y - 2 + j >= 0 && s.x - 2 + i < screen.length && s.y - 2 + j < screen.length)
                part[j][i] = screen[s.y + j - 2][s.x + i - 2];
            else
                part[j][i] = "outside";
        }
    }
    return part;
}
function outOfBounds(point, screen) {
    if (point.x < 0 || point.y < 0 || point.x >= screen.length || point.y >= screen.length) // hit the edge of the screen
        return true;
    else
        return false;
}
function makeMove(snake, screen, point, player) {
    switch (screen[point.y][point.x]) {
        case "empty": { // make the move
            snake.setPoint(point);
            screen[point.y][point.x] = player;
            break;
        }
        case "apple": { // make the move and eat the apple
            snake.setPoint(point);
            snake.apples++;
            screen[point.y][point.x] = player;
            break;
        }
        default: { // lose
            snake.lost = true;
            break;
        }
    }
}
// stepTime is a number of milliseconds
function run(stepTime, newApplesEachStep, screen) {
    // create instances of player implemented Agents
    var aA = (0,_Agent__WEBPACK_IMPORTED_MODULE_0__.initializePlayerAgent)("A");
    var aB = (0,_Agent__WEBPACK_IMPORTED_MODULE_0__.initializePlayerAgent)("B");
    var aC = (0,_Agent__WEBPACK_IMPORTED_MODULE_0__.initializePlayerAgent)("C");
    var aD = (0,_Agent__WEBPACK_IMPORTED_MODULE_0__.initializePlayerAgent)("D");
    // player initial positions
    var a = new SnakeState(0, 0);
    var b = new SnakeState(screen.length - 1, 0);
    var c = new SnakeState(0, screen.length - 1);
    var d = new SnakeState(screen.length - 1, screen.length - 1);
    // draw starting screen
    screen[a.y][a.x] = "A";
    screen[b.y][b.x] = "B";
    screen[c.y][c.x] = "C";
    screen[d.y][d.x] = "D";
    (0,_GameScreen__WEBPACK_IMPORTED_MODULE_2__.draw)(screen);
    // this will wait for stepTime milliseconds and then call step with these arguments
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.scheduleNextUpdate)(stepTime, function () { return step(stepTime, newApplesEachStep, screen, a, b, c, d, aA, aB, aC, aD); });
    // the "() =>" part is important!
    // without it, step will get called immediately instead of waiting
}
function locationAfterMotion(motion, snake) {
    switch (motion) {
        case "left": return new Point(snake.x - 1, snake.y);
        case "right": return new Point(snake.x + 1, snake.y);
        case "up": return new Point(snake.x, snake.y - 1);
        case "down": return new Point(snake.x, snake.y + 1);
    }
}
function step(stepTime, newApplesEachStep, screen, snakeA, snakeB, snakeC, snakeD, agentA, agentB, agentC, agentD) {
    // generate new apples
    for (var i = 0; i < newApplesEachStep; i++) {
        // random integers in the closed range [0, screen.length]
        var x = Math.floor(Math.random() * screen.length);
        var y = Math.floor(Math.random() * screen.length);
        // if we generated coordinates that aren't empty, skip this apple
        if (screen[y][x] == "empty")
            screen[y][x] = "apple";
    }
    // players take turns in order: A -> B -> C -> D -> A -> B -> C -> D -> ...
    if (!snakeA.lost) {
        var temp = locationAfterMotion(agentA.move(getScreenPart(screen, snakeA)), snakeA);
        if (!outOfBounds(temp, screen))
            makeMove(snakeA, screen, temp, "A");
        else
            snakeA.lost = true;
    }
    if (!snakeB.lost) {
        var temp = locationAfterMotion(agentB.move(getScreenPart(screen, snakeB)), snakeB);
        if (!outOfBounds(temp, screen))
            makeMove(snakeB, screen, temp, "B");
        else
            snakeB.lost = true;
    }
    if (!snakeC.lost) {
        var temp = locationAfterMotion(agentC.move(getScreenPart(screen, snakeC)), snakeC);
        if (!outOfBounds(temp, screen))
            makeMove(snakeC, screen, temp, "C");
        else
            snakeC.lost = true;
    }
    if (!snakeD.lost) {
        var temp = locationAfterMotion(agentD.move(getScreenPart(screen, snakeD)), snakeD);
        if (!outOfBounds(temp, screen))
            makeMove(snakeD, screen, temp, "D");
        else
            snakeD.lost = true;
    }
    // update game screen
    (0,_GameScreen__WEBPACK_IMPORTED_MODULE_2__.draw)(screen);
    // update snake statistics
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateLost)("A", snakeA.lost);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateApples)("A", snakeA.apples);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateLost)("B", snakeB.lost);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateApples)("B", snakeB.apples);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateLost)("C", snakeC.lost);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateApples)("C", snakeC.apples);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateLost)("D", snakeD.lost);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateApples)("D", snakeD.apples);
    // run again unless everyone has lost
    if (!snakeA.lost || !snakeB.lost || !snakeC.lost || !snakeD.lost)
        (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.scheduleNextUpdate)(stepTime, function () { return step(stepTime, newApplesEachStep, screen, snakeA, snakeB, snakeC, snakeD, agentA, agentB, agentC, agentD); });
}


/***/ }),

/***/ "./src/GameScreen.ts":
/*!***************************!*\
  !*** ./src/GameScreen.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   draw: () => (/* binding */ draw),
/* harmony export */   initialize: () => (/* binding */ initialize)
/* harmony export */ });
/* harmony import */ var _DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrawingLibrary */ "./src/DrawingLibrary.ts");

function initialize(size) {
    var screen = new Array(size);
    for (var i = 0; i < size; i++)
        screen[i] = new Array(size).fill("empty");
    return screen;
}
function draw(screen) {
    for (var y = 0; y < screen.length; y++) {
        for (var x = 0; x < screen.length; x++) {
            switch (screen[y][x]) {
                case "empty":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("white", x, y);
                    break;
                case "apple":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("red", x, y);
                    break;
                case "A":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("green", x, y);
                    break;
                case "B":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("blue", x, y);
                    break;
                case "C":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("orange", x, y);
                    break;
                case "D":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("purple", x, y);
                    break;
            }
        }
    }
}


/***/ }),

/***/ "./src/PlayerAgents.ts":
/*!*****************************!*\
  !*** ./src/PlayerAgents.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AgentA: () => (/* binding */ AgentA),
/* harmony export */   AgentB: () => (/* binding */ AgentB),
/* harmony export */   AgentC: () => (/* binding */ AgentC),
/* harmony export */   AgentD: () => (/* binding */ AgentD)
/* harmony export */ });
var AgentA = /** @class */ (function () {
    function AgentA() {
    }
    AgentA.prototype.move = function (screenPart) {
        return "down";
    };
    return AgentA;
}());

var AgentB = /** @class */ (function () {
    function AgentB() {
    }
    AgentB.prototype.move = function (screenPart) {
        return this.randomMotion(screenPart);
    };
    AgentB.prototype.randomMotion = function (screenPart) {
        var rnd = Math.random() * 4; // random float in the half-open range [0, 4)
        var x;
        if (rnd < 1)
            x = "up";
        else if (rnd < 2)
            x = "down";
        else if (rnd < 3)
            x = "left";
        else
            x = "right";
        // try not to hit anything
        if (this.tryMove(x, screenPart) != "apple" && this.tryMove(x, screenPart) != "empty") {
            switch (x) {
                case "up": return "down";
                case "right": return "left";
                case "down": return "up";
                case "left": return "right";
            }
        }
        return x;
    };
    AgentB.prototype.tryMove = function (m, p) {
        // the snake is positioned in the center at p[2][2]
        switch (m) {
            case "left": return p[2][1];
            case "right": return p[2][3];
            case "up": return p[1][2];
            case "down": return p[3][2];
        }
    };
    return AgentB;
}());

var AgentC = /** @class */ (function () {
    function AgentC() {
        // C uses these moves in order, repeatedly
        this.Cycle = ["up", "up", "right", "down", "right"];
        this.Index = 0;
    }
    AgentC.prototype.move = function (screenPart) {
        var m = this.Cycle[this.Index];
        this.Index++;
        this.Index = this.Index % this.Cycle.length;
        return m;
    };
    return AgentC;
}());

var AgentD = /** @class */ (function () {
    function AgentD() {
    }
    AgentD.prototype.move = function (screenPart) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if (screenPart[j][i] == "apple") {
                    if (i > 3)
                        return "right";
                    else if (i < 3)
                        return "left";
                    else if (j > 3)
                        return "down";
                    else if (j < 3)
                        return "up";
                }
            }
        }
        return this.randomMotion(screenPart);
    };
    AgentD.prototype.randomMotion = function (part) {
        var rnd = Math.random() * 4; // random float in the half-open range [0, 4)
        var x;
        if (rnd < 1)
            x = "up";
        else if (rnd < 2)
            x = "down";
        else if (rnd < 3)
            x = "left";
        else
            x = "right";
        // try not to hit anything
        if (this.tryMove(x, part) != "apple" && this.tryMove(x, part) != "empty") {
            switch (x) {
                case "up": return "down";
                case "right": return "left";
                case "down": return "up";
                case "left": return "right";
            }
        }
        return x;
    };
    AgentD.prototype.tryMove = function (m, p) {
        // the snake is positioned in the center at p[2][2]
        switch (m) {
            case "left": return p[2][1];
            case "right": return p[2][3];
            case "up": return p[1][2];
            case "down": return p[3][2];
        }
    };
    return AgentD;
}());



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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   play: () => (/* binding */ play)
/* harmony export */ });
/* harmony import */ var _DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrawingLibrary */ "./src/DrawingLibrary.ts");
/* harmony import */ var _GameRunner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameRunner */ "./src/GameRunner.ts");
/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameScreen */ "./src/GameScreen.ts");



function play() {
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.resetCanvas)();
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateLost)("A", false);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateApples)("A", 0);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateLost)("B", false);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateApples)("B", 0);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateLost)("C", false);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateApples)("C", 0);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateLost)("D", false);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateApples)("D", 0);
    var screen = (0,_GameScreen__WEBPACK_IMPORTED_MODULE_2__.initialize)(50);
    (0,_GameRunner__WEBPACK_IMPORTED_MODULE_1__.run)(1000, 10, screen);
}

})();

main = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsQ0FBQyxDQUFDO0lBQzlCLGdEQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0FnZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9EcmF3aW5nTGlicmFyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVJ1bm5lci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVNjcmVlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyQWdlbnRzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjcmVlblBhcnQgfSBmcm9tIFwiLi9HYW1lUnVubmVyXCI7XG5pbXBvcnQgeyBBZ2VudEEsIEFnZW50QiwgQWdlbnRDLCBBZ2VudEQgfSBmcm9tIFwiLi9QbGF5ZXJBZ2VudHNcIjtcblxuZXhwb3J0IHR5cGUgUGxheWVyID0gXCJBXCIgfCBcIkJcIiB8IFwiQ1wiIHwgXCJEXCI7XG5cbmV4cG9ydCB0eXBlIE1vdGlvbiA9IFwidXBcIiB8IFwiZG93blwiIHwgXCJsZWZ0XCIgfCBcInJpZ2h0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWdlbnR7XG4gIG1vdmUoc2NyZWVuUGFydDogU2NyZWVuUGFydCk6IE1vdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVQbGF5ZXJBZ2VudChwbGF5ZXI6IFBsYXllcik6IEFnZW50e1xuICBzd2l0Y2gocGxheWVyKSB7XG4gICAgY2FzZSBcIkFcIjogcmV0dXJuIG5ldyBBZ2VudEE7XG4gICAgY2FzZSBcIkJcIjogcmV0dXJuIG5ldyBBZ2VudEI7XG4gICAgY2FzZSBcIkNcIjogcmV0dXJuIG5ldyBBZ2VudEM7XG4gICAgY2FzZSBcIkRcIjogcmV0dXJuIG5ldyBBZ2VudEQ7XG4gIH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8taW1wbGllZC1ldmFsICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG5cbmxldCB0aW1lb3V0SWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlTmV4dFVwZGF0ZShtaWxsaXNlY29uZHM6IG51bWJlciwgdXBkYXRlOiAoKSA9PiBhbnkpOiB2b2lkIHtcbiAgaWYgKHRpbWVvdXRJZCkgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoPFRpbWVySGFuZGxlcj4gdXBkYXRlLCBtaWxsaXNlY29uZHMpO1xufVxuXG5leHBvcnQgY29uc3QgY2FudmFzOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPVxuICAoPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVTY3JlZW5cIikpLmdldENvbnRleHQoXCIyZFwiKSE7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldENhbnZhcygpOiB2b2lkIHtcbiAgaWYgKHRpbWVvdXRJZCkgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gIGNhbnZhcy5zY2FsZSgxLCAxKTtcbiAgY2FudmFzLmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgY2FudmFzLmZpbGxSZWN0KDAsIDAsIDUwMCwgNTAwKTtcbn1cblxuY29uc3QgQ0VMTF9TSVpFID0gMTA7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxsQ2VsbChcbiAgY29sb3I6IHN0cmluZyxcbiAgbGVmdDogbnVtYmVyLFxuICB0b3A6IG51bWJlclxuKTogdm9pZCB7XG4gIGNhbnZhcy5maWxsU3R5bGUgPSBjb2xvcjtcbiAgY2FudmFzLmZpbGxSZWN0KGxlZnQqQ0VMTF9TSVpFLCB0b3AqQ0VMTF9TSVpFLCBDRUxMX1NJWkUsIENFTExfU0laRSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMb3N0KFxuICBwbGF5ZXI6IFwiQVwiIHwgXCJCXCIgfCBcIkNcIiB8IFwiRFwiLFxuICBsb3N0OiBib29sZWFuXG4pOiB2b2lkIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb3N0XCIgKyBwbGF5ZXIpIS5pbm5lclRleHQgPSBsb3N0LnRvU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBcHBsZXMoXG4gIHBsYXllcjogXCJBXCIgfCBcIkJcIiB8IFwiQ1wiIHwgXCJEXCIsXG4gIGFwcGxlczogbnVtYmVyXG4pOiB2b2lkIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBsZXNcIiArIHBsYXllcikhLmlubmVyVGV4dCA9IGFwcGxlcy50b1N0cmluZygpO1xufVxuIiwiaW1wb3J0IHsgaW5pdGlhbGl6ZVBsYXllckFnZW50LCBNb3Rpb24sIEFnZW50LCBQbGF5ZXIgfSBmcm9tIFwiLi9BZ2VudFwiO1xuaW1wb3J0IHsgc2NoZWR1bGVOZXh0VXBkYXRlLCB1cGRhdGVBcHBsZXMsIHVwZGF0ZUxvc3QgfSBmcm9tIFwiLi9EcmF3aW5nTGlicmFyeVwiO1xuaW1wb3J0IHsgQ2VsbCwgZHJhdywgR2FtZVNjcmVlbiB9IGZyb20gXCIuL0dhbWVTY3JlZW5cIjtcblxuLy8gYSBNYXliZUNlbGwgaXMgZWl0aGVyIGEgQ2VsbCBvciB0aGUgc3RyaW5nIFwib3V0c2lkZVwiXG5leHBvcnQgdHlwZSBNYXliZUNlbGwgPSBDZWxsIHwgXCJvdXRzaWRlXCI7XG5cbi8vIGEgU2NyZWVuUGFydCBpcyBhIDV4NSBhcnJheSBvZiBNYXliZUNlbGwgYXJyYXlzXG5leHBvcnQgdHlwZSBTY3JlZW5QYXJ0ID0gTWF5YmVDZWxsW11bXTtcblxuZXhwb3J0IGNsYXNzIFBvaW50IHtcbiAgcHVibGljIHg6IG51bWJlcjtcbiAgcHVibGljIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU25ha2VTdGF0ZSBleHRlbmRzIFBvaW50IHtcbiAgcHVibGljIGFwcGxlczogbnVtYmVyO1xuICBwdWJsaWMgbG9zdDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIHN1cGVyKHgsIHkpOyAvLyBjYWxsIFBvaW50IGNvbnN0cnVjdG9yIHRvIHNldCB4IGFuZCB5XG4gICAgdGhpcy5hcHBsZXMgPSAwO1xuICAgIHRoaXMubG9zdCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNldFBvaW50KHA6IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy54ID0gcC54O1xuICAgIHRoaXMueSA9IHAueTtcbiAgfVxufVxuXG4vLyB4IGFuZCB5IGFyZSB0aGUgbGVmdCBhbmQgdG9wIGNvb3JkaW5hdGUgb2YgYSA1eDUgc3F1YXJlIHJlZ2lvbi5cbi8vIGNlbGxzIG91dHNpZGUgdGhlIGJvdW5kcyBvZiB0aGUgYm9hcmQgYXJlIHJlcHJlc2VudGVkIHdpdGggXCJvdXRzaWRlXCJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JlZW5QYXJ0KHNjcmVlbjogR2FtZVNjcmVlbiwgczogU25ha2VTdGF0ZSk6IFNjcmVlblBhcnQge1xuICBjb25zdCBwYXJ0OiBTY3JlZW5QYXJ0ID0gbmV3IEFycmF5PE1heWJlQ2VsbFtdPig1KTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCA1OyBqKyspIHtcbiAgICBwYXJ0W2pdID0gbmV3IEFycmF5PE1heWJlQ2VsbD4oNSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgIGlmIChzLngraS0yID49IDAgJiYgcy55LTIgKyBqID49IDAgJiYgcy54LTIgKyBpIDwgc2NyZWVuLmxlbmd0aCAmJiBzLnktMiArIGogPCBzY3JlZW4ubGVuZ3RoKVxuICAgICAgICBwYXJ0W2pdW2ldID0gc2NyZWVuW3MueStqLTJdW3MueCtpLTJdO1xuICAgICAgZWxzZVxuICAgICAgICBwYXJ0W2pdW2ldID0gXCJvdXRzaWRlXCI7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXJ0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3V0T2ZCb3VuZHMocG9pbnQ6IFBvaW50LCBzY3JlZW46IEdhbWVTY3JlZW4pOiBib29sZWFuIHtcbiAgaWYgKHBvaW50LnggPCAwIHx8IHBvaW50LnkgPCAwIHx8IHBvaW50LnggPj0gc2NyZWVuLmxlbmd0aCB8fCBwb2ludC55ID49IHNjcmVlbi5sZW5ndGgpIC8vIGhpdCB0aGUgZWRnZSBvZiB0aGUgc2NyZWVuXG4gICAgcmV0dXJuIHRydWU7XG4gIGVsc2VcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTW92ZShzbmFrZTogU25ha2VTdGF0ZSwgc2NyZWVuOiBHYW1lU2NyZWVuLCBwb2ludDogUG9pbnQsIHBsYXllcjogUGxheWVyKTogdm9pZCB7XG4gIHN3aXRjaCAoc2NyZWVuW3BvaW50LnldW3BvaW50LnhdKSB7XG4gICAgY2FzZSBcImVtcHR5XCI6IHsgLy8gbWFrZSB0aGUgbW92ZVxuICAgICAgc25ha2Uuc2V0UG9pbnQocG9pbnQpO1xuICAgICAgc2NyZWVuW3BvaW50LnldW3BvaW50LnhdID0gcGxheWVyO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJhcHBsZVwiOiB7IC8vIG1ha2UgdGhlIG1vdmUgYW5kIGVhdCB0aGUgYXBwbGVcbiAgICAgIHNuYWtlLnNldFBvaW50KHBvaW50KTtcbiAgICAgIHNuYWtlLmFwcGxlcysrO1xuICAgICAgc2NyZWVuW3BvaW50LnldW3BvaW50LnhdID0gcGxheWVyO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHsgLy8gbG9zZVxuICAgICAgc25ha2UubG9zdCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuLy8gc3RlcFRpbWUgaXMgYSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzXG5leHBvcnQgZnVuY3Rpb24gcnVuKHN0ZXBUaW1lOiBudW1iZXIsIG5ld0FwcGxlc0VhY2hTdGVwOiBudW1iZXIsIHNjcmVlbjogR2FtZVNjcmVlbik6IHZvaWQge1xuICAvLyBjcmVhdGUgaW5zdGFuY2VzIG9mIHBsYXllciBpbXBsZW1lbnRlZCBBZ2VudHNcbiAgY29uc3QgYUE6IEFnZW50ID0gaW5pdGlhbGl6ZVBsYXllckFnZW50KFwiQVwiKTtcbiAgY29uc3QgYUI6IEFnZW50ID0gaW5pdGlhbGl6ZVBsYXllckFnZW50KFwiQlwiKTtcbiAgY29uc3QgYUM6IEFnZW50ID0gaW5pdGlhbGl6ZVBsYXllckFnZW50KFwiQ1wiKTtcbiAgY29uc3QgYUQ6IEFnZW50ID0gaW5pdGlhbGl6ZVBsYXllckFnZW50KFwiRFwiKTtcblxuICAvLyBwbGF5ZXIgaW5pdGlhbCBwb3NpdGlvbnNcbiAgY29uc3QgYSA9IG5ldyBTbmFrZVN0YXRlKDAsMCk7XG4gIGNvbnN0IGIgPSBuZXcgU25ha2VTdGF0ZShzY3JlZW4ubGVuZ3RoIC0gMSwgMCk7XG4gIGNvbnN0IGMgPSBuZXcgU25ha2VTdGF0ZSgwLCBzY3JlZW4ubGVuZ3RoIC0gMSk7XG4gIGNvbnN0IGQgPSBuZXcgU25ha2VTdGF0ZShzY3JlZW4ubGVuZ3RoIC0gMSwgc2NyZWVuLmxlbmd0aCAtIDEpO1xuXG4gIC8vIGRyYXcgc3RhcnRpbmcgc2NyZWVuXG4gIHNjcmVlblthLnldW2EueF0gPSBcIkFcIjtcbiAgc2NyZWVuW2IueV1bYi54XSA9IFwiQlwiO1xuICBzY3JlZW5bYy55XVtjLnhdID0gXCJDXCI7XG4gIHNjcmVlbltkLnldW2QueF0gPSBcIkRcIjtcbiAgZHJhdyhzY3JlZW4pO1xuXG4gIC8vIHRoaXMgd2lsbCB3YWl0IGZvciBzdGVwVGltZSBtaWxsaXNlY29uZHMgYW5kIHRoZW4gY2FsbCBzdGVwIHdpdGggdGhlc2UgYXJndW1lbnRzXG4gIHNjaGVkdWxlTmV4dFVwZGF0ZShzdGVwVGltZSwgKCkgPT4gc3RlcChzdGVwVGltZSwgbmV3QXBwbGVzRWFjaFN0ZXAsIHNjcmVlbiwgYSwgYiwgYywgZCwgYUEsIGFCLCBhQywgYUQpKTtcbiAgLy8gdGhlIFwiKCkgPT5cIiBwYXJ0IGlzIGltcG9ydGFudCFcbiAgLy8gd2l0aG91dCBpdCwgc3RlcCB3aWxsIGdldCBjYWxsZWQgaW1tZWRpYXRlbHkgaW5zdGVhZCBvZiB3YWl0aW5nXG59XG5cbmZ1bmN0aW9uIGxvY2F0aW9uQWZ0ZXJNb3Rpb24obW90aW9uOiBNb3Rpb24sIHNuYWtlOiBTbmFrZVN0YXRlKTogUG9pbnQge1xuICBzd2l0Y2ggKG1vdGlvbikge1xuICAgIGNhc2UgXCJsZWZ0XCIgOiByZXR1cm4gbmV3IFBvaW50KHNuYWtlLngtMSwgc25ha2UueSk7XG4gICAgY2FzZSBcInJpZ2h0XCI6IHJldHVybiBuZXcgUG9pbnQoc25ha2UueCsxLCBzbmFrZS55KTtcbiAgICBjYXNlIFwidXBcIiAgIDogcmV0dXJuIG5ldyBQb2ludChzbmFrZS54LCBzbmFrZS55LTEpO1xuICAgIGNhc2UgXCJkb3duXCIgOiByZXR1cm4gbmV3IFBvaW50KHNuYWtlLngsIHNuYWtlLnkrMSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0ZXAoXG4gIHN0ZXBUaW1lOiAgICAgICAgICBudW1iZXIsXG4gIG5ld0FwcGxlc0VhY2hTdGVwOiBudW1iZXIsXG4gIHNjcmVlbjogR2FtZVNjcmVlbixcbiAgc25ha2VBOiBTbmFrZVN0YXRlLFxuICBzbmFrZUI6IFNuYWtlU3RhdGUsXG4gIHNuYWtlQzogU25ha2VTdGF0ZSxcbiAgc25ha2VEOiBTbmFrZVN0YXRlLCBcbiAgYWdlbnRBOiBBZ2VudCxcbiAgYWdlbnRCOiBBZ2VudCxcbiAgYWdlbnRDOiBBZ2VudCxcbiAgYWdlbnREOiBBZ2VudFxuKTogdm9pZCB7XG4gIC8vIGdlbmVyYXRlIG5ldyBhcHBsZXNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdBcHBsZXNFYWNoU3RlcDsgaSsrKSB7XG4gICAgLy8gcmFuZG9tIGludGVnZXJzIGluIHRoZSBjbG9zZWQgcmFuZ2UgWzAsIHNjcmVlbi5sZW5ndGhdXG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNjcmVlbi5sZW5ndGgpO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzY3JlZW4ubGVuZ3RoKTtcbiAgICAvLyBpZiB3ZSBnZW5lcmF0ZWQgY29vcmRpbmF0ZXMgdGhhdCBhcmVuJ3QgZW1wdHksIHNraXAgdGhpcyBhcHBsZVxuICAgIGlmIChzY3JlZW5beV1beF0gPT0gXCJlbXB0eVwiKVxuICAgICAgc2NyZWVuW3ldW3hdID0gXCJhcHBsZVwiO1xuICB9XG5cbiAgLy8gcGxheWVycyB0YWtlIHR1cm5zIGluIG9yZGVyOiBBIC0+IEIgLT4gQyAtPiBEIC0+IEEgLT4gQiAtPiBDIC0+IEQgLT4gLi4uXG4gIGlmICghc25ha2VBLmxvc3QpIHtcbiAgICBjb25zdCB0ZW1wICA9IGxvY2F0aW9uQWZ0ZXJNb3Rpb24oYWdlbnRBLm1vdmUoZ2V0U2NyZWVuUGFydChzY3JlZW4sIHNuYWtlQSkpLCBzbmFrZUEpO1xuICAgIGlmICghb3V0T2ZCb3VuZHModGVtcCwgc2NyZWVuKSkgbWFrZU1vdmUoc25ha2VBLCBzY3JlZW4sIHRlbXAsIFwiQVwiKTtcbiAgICBlbHNlIHNuYWtlQS5sb3N0ID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICghc25ha2VCLmxvc3QpIHtcbiAgICBjb25zdCB0ZW1wICA9IGxvY2F0aW9uQWZ0ZXJNb3Rpb24oYWdlbnRCLm1vdmUoZ2V0U2NyZWVuUGFydChzY3JlZW4sIHNuYWtlQikpLCBzbmFrZUIpO1xuICAgIGlmICghb3V0T2ZCb3VuZHModGVtcCwgc2NyZWVuKSkgbWFrZU1vdmUoc25ha2VCLCBzY3JlZW4sIHRlbXAsIFwiQlwiKTtcbiAgICBlbHNlIHNuYWtlQi5sb3N0ID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICghc25ha2VDLmxvc3QpIHtcbiAgICBjb25zdCB0ZW1wICA9IGxvY2F0aW9uQWZ0ZXJNb3Rpb24oYWdlbnRDLm1vdmUoZ2V0U2NyZWVuUGFydChzY3JlZW4sIHNuYWtlQykpLCBzbmFrZUMpO1xuICAgIGlmICghb3V0T2ZCb3VuZHModGVtcCwgc2NyZWVuKSkgbWFrZU1vdmUoc25ha2VDLCBzY3JlZW4sIHRlbXAsIFwiQ1wiKTtcbiAgICBlbHNlIHNuYWtlQy5sb3N0ID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICghc25ha2VELmxvc3QpIHtcbiAgICBjb25zdCB0ZW1wICA9IGxvY2F0aW9uQWZ0ZXJNb3Rpb24oYWdlbnRELm1vdmUoZ2V0U2NyZWVuUGFydChzY3JlZW4sIHNuYWtlRCkpLCBzbmFrZUQpO1xuICAgIGlmICghb3V0T2ZCb3VuZHModGVtcCwgc2NyZWVuKSkgbWFrZU1vdmUoc25ha2VELCBzY3JlZW4sIHRlbXAsIFwiRFwiKTtcbiAgICBlbHNlIHNuYWtlRC5sb3N0ID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBnYW1lIHNjcmVlblxuICBkcmF3KHNjcmVlbik7XG5cbiAgLy8gdXBkYXRlIHNuYWtlIHN0YXRpc3RpY3NcbiAgdXBkYXRlTG9zdChcIkFcIiwgc25ha2VBLmxvc3QpOyB1cGRhdGVBcHBsZXMoXCJBXCIsIHNuYWtlQS5hcHBsZXMpO1xuICB1cGRhdGVMb3N0KFwiQlwiLCBzbmFrZUIubG9zdCk7IHVwZGF0ZUFwcGxlcyhcIkJcIiwgc25ha2VCLmFwcGxlcyk7XG4gIHVwZGF0ZUxvc3QoXCJDXCIsIHNuYWtlQy5sb3N0KTsgdXBkYXRlQXBwbGVzKFwiQ1wiLCBzbmFrZUMuYXBwbGVzKTtcbiAgdXBkYXRlTG9zdChcIkRcIiwgc25ha2VELmxvc3QpOyB1cGRhdGVBcHBsZXMoXCJEXCIsIHNuYWtlRC5hcHBsZXMpO1xuXG4gIC8vIHJ1biBhZ2FpbiB1bmxlc3MgZXZlcnlvbmUgaGFzIGxvc3RcbiAgaWYgKCFzbmFrZUEubG9zdCB8fCAhc25ha2VCLmxvc3QgfHwgIXNuYWtlQy5sb3N0IHx8ICFzbmFrZUQubG9zdClcbiAgICBzY2hlZHVsZU5leHRVcGRhdGUoc3RlcFRpbWUsICgpID0+IHN0ZXAoc3RlcFRpbWUsIG5ld0FwcGxlc0VhY2hTdGVwLCBzY3JlZW4sIHNuYWtlQSwgc25ha2VCLCBzbmFrZUMsIHNuYWtlRCwgYWdlbnRBLCBhZ2VudEIsIGFnZW50QywgYWdlbnREKSk7XG59IiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vQWdlbnRcIjtcbmltcG9ydCB7IGZpbGxDZWxsIH0gZnJvbSBcIi4vRHJhd2luZ0xpYnJhcnlcIjtcblxuLy8gYSBDZWxsIGlzIGVpdGhlciBhIFBsYXllciBvciB0aGUgc3RyaW5nIFwiZW1wdHlcIiBvciBcImFwcGxlXCJcbmV4cG9ydCB0eXBlIENlbGwgPSBQbGF5ZXIgfCBcImVtcHR5XCIgfCBcImFwcGxlXCI7XG5cbi8vIGEgR2FtZVNjcmVlbiBpcyBhbiBhcnJheSBvZiBDZWxsIGFycmF5c1xuZXhwb3J0IHR5cGUgR2FtZVNjcmVlbiA9IENlbGxbXVtdOyAvLyByb3ctbWFqb3Igb3JkZXIsIHNob3VsZCBhbHdheXMgaGF2ZSBzcXVhcmUgZGltZW5zaW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShzaXplOiBudW1iZXIpOiBHYW1lU2NyZWVuIHtcbiAgY29uc3Qgc2NyZWVuID0gbmV3IEFycmF5PENlbGxbXT4oc2l6ZSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKVxuICAgIHNjcmVlbltpXSA9IG5ldyBBcnJheTxDZWxsPihzaXplKS5maWxsKFwiZW1wdHlcIik7XG4gIHJldHVybiBzY3JlZW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3KHNjcmVlbjogR2FtZVNjcmVlbik6IHZvaWQge1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IHNjcmVlbi5sZW5ndGg7IHkrKykge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2NyZWVuLmxlbmd0aDsgeCsrKSB7XG4gICAgICBzd2l0Y2ggKHNjcmVlblt5XVt4XSkge1xuICAgICAgICBjYXNlIFwiZW1wdHlcIjpcbiAgICAgICAgICBmaWxsQ2VsbChcIndoaXRlXCIsIHgsIHkpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJhcHBsZVwiOlxuICAgICAgICAgIGZpbGxDZWxsKFwicmVkXCIsIHgsIHkpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJBXCI6XG4gICAgICAgICAgZmlsbENlbGwoXCJncmVlblwiLCB4LCB5KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwiQlwiOlxuICAgICAgICAgIGZpbGxDZWxsKFwiYmx1ZVwiLCB4LCB5KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwiQ1wiOlxuICAgICAgICAgIGZpbGxDZWxsKFwib3JhbmdlXCIsIHgsIHkpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgICAgZmlsbENlbGwoXCJwdXJwbGVcIiwgeCwgeSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgQWdlbnQsIE1vdGlvbn0gZnJvbSBcIi4vQWdlbnRcIjtcbmltcG9ydCB7IFNjcmVlblBhcnQsIE1heWJlQ2VsbH0gZnJvbSBcIi4vR2FtZVJ1bm5lclwiO1xuXG5leHBvcnQgY2xhc3MgQWdlbnRBIGltcGxlbWVudHMgQWdlbnQge1xuICBtb3ZlKHNjcmVlblBhcnQ6IFNjcmVlblBhcnQpOiBNb3Rpb24ge1xuICAgIHJldHVybiBcImRvd25cIjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWdlbnRCIGltcGxlbWVudHMgQWdlbnQge1xuICBtb3ZlKHNjcmVlblBhcnQ6IFNjcmVlblBhcnQpOiBNb3Rpb24ge1xuICAgIHJldHVybiB0aGlzLnJhbmRvbU1vdGlvbihzY3JlZW5QYXJ0KTtcbiAgfVxuXG4gIHJhbmRvbU1vdGlvbihzY3JlZW5QYXJ0OiBTY3JlZW5QYXJ0KTogTW90aW9uIHtcbiAgICBjb25zdCBybmQ6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiA0OyAvLyByYW5kb20gZmxvYXQgaW4gdGhlIGhhbGYtb3BlbiByYW5nZSBbMCwgNClcblxuICAgIGxldCB4OiBNb3Rpb247XG4gICAgaWYgKHJuZCA8IDEpIHggPSBcInVwXCI7XG4gICAgZWxzZSBpZiAocm5kIDwgMikgeCA9IFwiZG93blwiO1xuICAgIGVsc2UgaWYgKHJuZCA8IDMpIHggPSBcImxlZnRcIjtcbiAgICBlbHNlIHggPSBcInJpZ2h0XCI7XG5cbiAgICAvLyB0cnkgbm90IHRvIGhpdCBhbnl0aGluZ1xuICAgIGlmICh0aGlzLnRyeU1vdmUoeCwgc2NyZWVuUGFydCkgIT0gXCJhcHBsZVwiICYmIHRoaXMudHJ5TW92ZSh4LCBzY3JlZW5QYXJ0KSAhPSBcImVtcHR5XCIpIHtcbiAgICAgIHN3aXRjaCAoeCkge1xuICAgICAgICBjYXNlIFwidXBcIjogcmV0dXJuIFwiZG93blwiO1xuICAgICAgICBjYXNlIFwicmlnaHRcIjogcmV0dXJuIFwibGVmdFwiO1xuICAgICAgICBjYXNlIFwiZG93blwiOiByZXR1cm4gXCJ1cFwiO1xuICAgICAgICBjYXNlIFwibGVmdFwiOiByZXR1cm4gXCJyaWdodFwiO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geDtcbiAgfSBcblxuICB0cnlNb3ZlKG06IE1vdGlvbiwgcDogU2NyZWVuUGFydCk6IE1heWJlQ2VsbCB7XG4gICAgLy8gdGhlIHNuYWtlIGlzIHBvc2l0aW9uZWQgaW4gdGhlIGNlbnRlciBhdCBwWzJdWzJdXG4gICAgc3dpdGNoIChtKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOiByZXR1cm4gcFsyXVsxXTtcbiAgICAgIGNhc2UgXCJyaWdodFwiOiByZXR1cm4gcFsyXVszXTtcbiAgICAgIGNhc2UgXCJ1cFwiOiByZXR1cm4gcFsxXVsyXTtcbiAgICAgIGNhc2UgXCJkb3duXCI6IHJldHVybiBwWzNdWzJdO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWdlbnRDIGltcGxlbWVudHMgQWdlbnQge1xuICAvLyBDIHVzZXMgdGhlc2UgbW92ZXMgaW4gb3JkZXIsIHJlcGVhdGVkbHlcbiAgcHJpdmF0ZSBDeWNsZTogTW90aW9uW10gPSBbXCJ1cFwiLCBcInVwXCIsIFwicmlnaHRcIiwgXCJkb3duXCIsIFwicmlnaHRcIl07XG4gIHByaXZhdGUgSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgbW92ZShzY3JlZW5QYXJ0OiBTY3JlZW5QYXJ0KTogTW90aW9uIHtcbiAgICBjb25zdCBtOiBNb3Rpb24gPSB0aGlzLkN5Y2xlW3RoaXMuSW5kZXhdO1xuICAgIHRoaXMuSW5kZXgrKztcbiAgICB0aGlzLkluZGV4ID0gdGhpcy5JbmRleCAlIHRoaXMuQ3ljbGUubGVuZ3RoO1xuICAgIHJldHVybiBtO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZ2VudEQgaW1wbGVtZW50cyBBZ2VudCB7XG4gIG1vdmUoc2NyZWVuUGFydDogU2NyZWVuUGFydCk6IE1vdGlvbiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNTsgaisrKSB7XG4gICAgICAgIGlmIChzY3JlZW5QYXJ0W2pdW2ldID09IFwiYXBwbGVcIikge1xuICAgICAgICAgIGlmIChpID4gMykgcmV0dXJuIFwicmlnaHRcIjtcbiAgICAgICAgICBlbHNlIGlmIChpIDwgMykgcmV0dXJuIFwibGVmdFwiO1xuICAgICAgICAgIGVsc2UgaWYgKGogPiAzKSByZXR1cm4gXCJkb3duXCI7XG4gICAgICAgICAgZWxzZSBpZiAoaiA8IDMpIHJldHVybiBcInVwXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmFuZG9tTW90aW9uKHNjcmVlblBhcnQpO1xuICB9XG5cbiAgcmFuZG9tTW90aW9uKHBhcnQ6IFNjcmVlblBhcnQpOiBNb3Rpb24ge1xuICAgIGNvbnN0IHJuZDogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDQ7IC8vIHJhbmRvbSBmbG9hdCBpbiB0aGUgaGFsZi1vcGVuIHJhbmdlIFswLCA0KVxuXG4gICAgbGV0IHg6IE1vdGlvbjtcbiAgICBpZiAocm5kIDwgMSkgeCA9IFwidXBcIjtcbiAgICBlbHNlIGlmIChybmQgPCAyKSB4ID0gXCJkb3duXCI7XG4gICAgZWxzZSBpZiAocm5kIDwgMykgeCA9IFwibGVmdFwiO1xuICAgIGVsc2UgeCA9IFwicmlnaHRcIjtcblxuICAgIC8vIHRyeSBub3QgdG8gaGl0IGFueXRoaW5nXG4gICAgaWYgKHRoaXMudHJ5TW92ZSh4LCBwYXJ0KSAhPSBcImFwcGxlXCIgJiYgdGhpcy50cnlNb3ZlKHgsIHBhcnQpICE9IFwiZW1wdHlcIikge1xuICAgICAgc3dpdGNoICh4KSB7XG4gICAgICAgIGNhc2UgXCJ1cFwiOiByZXR1cm4gXCJkb3duXCI7XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOiByZXR1cm4gXCJsZWZ0XCI7XG4gICAgICAgIGNhc2UgXCJkb3duXCI6IHJldHVybiBcInVwXCI7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6IHJldHVybiBcInJpZ2h0XCI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4O1xuICB9XG5cbiAgdHJ5TW92ZShtOiBNb3Rpb24sIHA6IFNjcmVlblBhcnQpOiBNYXliZUNlbGwge1xuICAgIC8vIHRoZSBzbmFrZSBpcyBwb3NpdGlvbmVkIGluIHRoZSBjZW50ZXIgYXQgcFsyXVsyXVxuICAgIHN3aXRjaCAobSkge1xuICAgICAgY2FzZSBcImxlZnRcIjogcmV0dXJuIHBbMl1bMV07XG4gICAgICBjYXNlIFwicmlnaHRcIjogcmV0dXJuIHBbMl1bM107XG4gICAgICBjYXNlIFwidXBcIjogcmV0dXJuIHBbMV1bMl07XG4gICAgICBjYXNlIFwiZG93blwiOiByZXR1cm4gcFszXVsyXTtcbiAgICB9XG4gIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlc2V0Q2FudmFzLCB1cGRhdGVBcHBsZXMsIHVwZGF0ZUxvc3QgfSBmcm9tIFwiLi9EcmF3aW5nTGlicmFyeVwiO1xuaW1wb3J0IHsgcnVuIH0gZnJvbSBcIi4vR2FtZVJ1bm5lclwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZSB9IGZyb20gXCIuL0dhbWVTY3JlZW5cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBsYXkoKTogdm9pZCB7XG4gIHJlc2V0Q2FudmFzKCk7XG4gIHVwZGF0ZUxvc3QoXCJBXCIsIGZhbHNlKTsgdXBkYXRlQXBwbGVzKFwiQVwiLCAwKTtcbiAgdXBkYXRlTG9zdChcIkJcIiwgZmFsc2UpOyB1cGRhdGVBcHBsZXMoXCJCXCIsIDApO1xuICB1cGRhdGVMb3N0KFwiQ1wiLCBmYWxzZSk7IHVwZGF0ZUFwcGxlcyhcIkNcIiwgMCk7XG4gIHVwZGF0ZUxvc3QoXCJEXCIsIGZhbHNlKTsgdXBkYXRlQXBwbGVzKFwiRFwiLCAwKTtcbiAgY29uc3Qgc2NyZWVuID0gaW5pdGlhbGl6ZSg1MCk7XG4gIHJ1bigxMDAwLCAxMCwgc2NyZWVuKTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=