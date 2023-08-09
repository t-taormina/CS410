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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsQ0FBQyxDQUFDO0lBQzlCLGdEQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0FnZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9EcmF3aW5nTGlicmFyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVJ1bm5lci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVNjcmVlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyQWdlbnRzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjcmVlblBhcnQgfSBmcm9tIFwiLi9HYW1lUnVubmVyXCI7XG5pbXBvcnQgeyBBZ2VudEEsIEFnZW50QiwgQWdlbnRDLCBBZ2VudEQgfSBmcm9tIFwiLi9QbGF5ZXJBZ2VudHNcIjtcblxuZXhwb3J0IHR5cGUgUGxheWVyID0gXCJBXCIgfCBcIkJcIiB8IFwiQ1wiIHwgXCJEXCI7XG5cbmV4cG9ydCB0eXBlIEFnZW50ID0gQWdlbnRBIHwgQWdlbnRCIHwgQWdlbnRDIHwgQWdlbnREO1xuXG5leHBvcnQgdHlwZSBNb3Rpb24gPSBcInVwXCIgfCBcImRvd25cIiB8IFwibGVmdFwiIHwgXCJyaWdodFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFnZW50TW90aW9uIHtcbiAgbW92ZShzY3JlZW5QYXJ0OiBTY3JlZW5QYXJ0KTogTW90aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZVBsYXllckFnZW50KHBsYXllcjogUGxheWVyKTogQWdlbnR7XG4gIHN3aXRjaChwbGF5ZXIpIHtcbiAgICBjYXNlIFwiQVwiOiByZXR1cm4gbmV3IEFnZW50QTtcbiAgICBjYXNlIFwiQlwiOiByZXR1cm4gbmV3IEFnZW50QjtcbiAgICBjYXNlIFwiQ1wiOiByZXR1cm4gbmV3IEFnZW50QztcbiAgICBjYXNlIFwiRFwiOiByZXR1cm4gbmV3IEFnZW50RDtcbiAgfVxufSIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1pbXBsaWVkLWV2YWwgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cblxubGV0IHRpbWVvdXRJZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVOZXh0VXBkYXRlKG1pbGxpc2Vjb25kczogbnVtYmVyLCB1cGRhdGU6ICgpID0+IGFueSk6IHZvaWQge1xuICBpZiAodGltZW91dElkKSBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgdGltZW91dElkID0gc2V0VGltZW91dCg8VGltZXJIYW5kbGVyPiB1cGRhdGUsIG1pbGxpc2Vjb25kcyk7XG59XG5cbmV4cG9ydCBjb25zdCBjYW52YXM6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9XG4gICg8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZVNjcmVlblwiKSkuZ2V0Q29udGV4dChcIjJkXCIpITtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0Q2FudmFzKCk6IHZvaWQge1xuICBpZiAodGltZW91dElkKSBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgY2FudmFzLnNjYWxlKDEsIDEpO1xuICBjYW52YXMuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICBjYW52YXMuZmlsbFJlY3QoMCwgMCwgNTAwLCA1MDApO1xufVxuXG5jb25zdCBDRUxMX1NJWkUgPSAxMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxDZWxsKFxuICBjb2xvcjogc3RyaW5nLFxuICBsZWZ0OiBudW1iZXIsXG4gIHRvcDogbnVtYmVyXG4pOiB2b2lkIHtcbiAgY2FudmFzLmZpbGxTdHlsZSA9IGNvbG9yO1xuICBjYW52YXMuZmlsbFJlY3QobGVmdCpDRUxMX1NJWkUsIHRvcCpDRUxMX1NJWkUsIENFTExfU0laRSwgQ0VMTF9TSVpFKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUxvc3QoXG4gIHBsYXllcjogXCJBXCIgfCBcIkJcIiB8IFwiQ1wiIHwgXCJEXCIsXG4gIGxvc3Q6IGJvb2xlYW5cbik6IHZvaWQge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvc3RcIiArIHBsYXllcikhLmlubmVyVGV4dCA9IGxvc3QudG9TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFwcGxlcyhcbiAgcGxheWVyOiBcIkFcIiB8IFwiQlwiIHwgXCJDXCIgfCBcIkRcIixcbiAgYXBwbGVzOiBudW1iZXJcbik6IHZvaWQge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcGxlc1wiICsgcGxheWVyKSEuaW5uZXJUZXh0ID0gYXBwbGVzLnRvU3RyaW5nKCk7XG59XG4iLCJpbXBvcnQgeyBpbml0aWFsaXplUGxheWVyQWdlbnQsIE1vdGlvbiwgQWdlbnQsIFBsYXllciB9IGZyb20gXCIuL0FnZW50XCI7XG5pbXBvcnQgeyBzY2hlZHVsZU5leHRVcGRhdGUsIHVwZGF0ZUFwcGxlcywgdXBkYXRlTG9zdCB9IGZyb20gXCIuL0RyYXdpbmdMaWJyYXJ5XCI7XG5pbXBvcnQgeyBDZWxsLCBkcmF3LCBHYW1lU2NyZWVuIH0gZnJvbSBcIi4vR2FtZVNjcmVlblwiO1xuXG4vLyBhIE1heWJlQ2VsbCBpcyBlaXRoZXIgYSBDZWxsIG9yIHRoZSBzdHJpbmcgXCJvdXRzaWRlXCJcbmV4cG9ydCB0eXBlIE1heWJlQ2VsbCA9IENlbGwgfCBcIm91dHNpZGVcIjtcblxuLy8gYSBTY3JlZW5QYXJ0IGlzIGEgNXg1IGFycmF5IG9mIE1heWJlQ2VsbCBhcnJheXNcbmV4cG9ydCB0eXBlIFNjcmVlblBhcnQgPSBNYXliZUNlbGxbXVtdO1xuXG5leHBvcnQgY2xhc3MgUG9pbnQge1xuICBwdWJsaWMgeDogbnVtYmVyO1xuICBwdWJsaWMgeTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbmFrZVN0YXRlIGV4dGVuZHMgUG9pbnQge1xuICBwdWJsaWMgYXBwbGVzOiBudW1iZXI7XG4gIHB1YmxpYyBsb3N0OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgc3VwZXIoeCwgeSk7IC8vIGNhbGwgUG9pbnQgY29uc3RydWN0b3IgdG8gc2V0IHggYW5kIHlcbiAgICB0aGlzLmFwcGxlcyA9IDA7XG4gICAgdGhpcy5sb3N0ID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2V0UG9pbnQocDogUG9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLnggPSBwLng7XG4gICAgdGhpcy55ID0gcC55O1xuICB9XG59XG5cbi8vIHggYW5kIHkgYXJlIHRoZSBsZWZ0IGFuZCB0b3AgY29vcmRpbmF0ZSBvZiBhIDV4NSBzcXVhcmUgcmVnaW9uLlxuLy8gY2VsbHMgb3V0c2lkZSB0aGUgYm91bmRzIG9mIHRoZSBib2FyZCBhcmUgcmVwcmVzZW50ZWQgd2l0aCBcIm91dHNpZGVcIlxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcmVlblBhcnQoc2NyZWVuOiBHYW1lU2NyZWVuLCBzOiBTbmFrZVN0YXRlKTogU2NyZWVuUGFydCB7XG4gIGNvbnN0IHBhcnQ6IFNjcmVlblBhcnQgPSBuZXcgQXJyYXk8TWF5YmVDZWxsW10+KDUpO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IDU7IGorKykge1xuICAgIHBhcnRbal0gPSBuZXcgQXJyYXk8TWF5YmVDZWxsPig1KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgaWYgKHMueCtpLTIgPj0gMCAmJiBzLnktMiArIGogPj0gMCAmJiBzLngtMiArIGkgPCBzY3JlZW4ubGVuZ3RoICYmIHMueS0yICsgaiA8IHNjcmVlbi5sZW5ndGgpXG4gICAgICAgIHBhcnRbal1baV0gPSBzY3JlZW5bcy55K2otMl1bcy54K2ktMl07XG4gICAgICBlbHNlXG4gICAgICAgIHBhcnRbal1baV0gPSBcIm91dHNpZGVcIjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhcnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvdXRPZkJvdW5kcyhwb2ludDogUG9pbnQsIHNjcmVlbjogR2FtZVNjcmVlbik6IGJvb2xlYW4ge1xuICBpZiAocG9pbnQueCA8IDAgfHwgcG9pbnQueSA8IDAgfHwgcG9pbnQueCA+PSBzY3JlZW4ubGVuZ3RoIHx8IHBvaW50LnkgPj0gc2NyZWVuLmxlbmd0aCkgLy8gaGl0IHRoZSBlZGdlIG9mIHRoZSBzY3JlZW5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgZWxzZVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VNb3ZlKHNuYWtlOiBTbmFrZVN0YXRlLCBzY3JlZW46IEdhbWVTY3JlZW4sIHBvaW50OiBQb2ludCwgcGxheWVyOiBQbGF5ZXIpOiB2b2lkIHtcbiAgc3dpdGNoIChzY3JlZW5bcG9pbnQueV1bcG9pbnQueF0pIHtcbiAgICBjYXNlIFwiZW1wdHlcIjogeyAvLyBtYWtlIHRoZSBtb3ZlXG4gICAgICBzbmFrZS5zZXRQb2ludChwb2ludCk7XG4gICAgICBzY3JlZW5bcG9pbnQueV1bcG9pbnQueF0gPSBwbGF5ZXI7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImFwcGxlXCI6IHsgLy8gbWFrZSB0aGUgbW92ZSBhbmQgZWF0IHRoZSBhcHBsZVxuICAgICAgc25ha2Uuc2V0UG9pbnQocG9pbnQpO1xuICAgICAgc25ha2UuYXBwbGVzKys7XG4gICAgICBzY3JlZW5bcG9pbnQueV1bcG9pbnQueF0gPSBwbGF5ZXI7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDogeyAvLyBsb3NlXG4gICAgICBzbmFrZS5sb3N0ID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG4vLyBzdGVwVGltZSBpcyBhIG51bWJlciBvZiBtaWxsaXNlY29uZHNcbmV4cG9ydCBmdW5jdGlvbiBydW4oc3RlcFRpbWU6IG51bWJlciwgbmV3QXBwbGVzRWFjaFN0ZXA6IG51bWJlciwgc2NyZWVuOiBHYW1lU2NyZWVuKTogdm9pZCB7XG4gIC8vIGNyZWF0ZSBpbnN0YW5jZXMgb2YgcGxheWVyIGltcGxlbWVudGVkIEFnZW50c1xuICBjb25zdCBhQTogQWdlbnQgPSBpbml0aWFsaXplUGxheWVyQWdlbnQoXCJBXCIpO1xuICBjb25zdCBhQjogQWdlbnQgPSBpbml0aWFsaXplUGxheWVyQWdlbnQoXCJCXCIpO1xuICBjb25zdCBhQzogQWdlbnQgPSBpbml0aWFsaXplUGxheWVyQWdlbnQoXCJDXCIpO1xuICBjb25zdCBhRDogQWdlbnQgPSBpbml0aWFsaXplUGxheWVyQWdlbnQoXCJEXCIpO1xuXG4gIC8vIHBsYXllciBpbml0aWFsIHBvc2l0aW9uc1xuICBjb25zdCBhID0gbmV3IFNuYWtlU3RhdGUoMCwwKTtcbiAgY29uc3QgYiA9IG5ldyBTbmFrZVN0YXRlKHNjcmVlbi5sZW5ndGggLSAxLCAwKTtcbiAgY29uc3QgYyA9IG5ldyBTbmFrZVN0YXRlKDAsIHNjcmVlbi5sZW5ndGggLSAxKTtcbiAgY29uc3QgZCA9IG5ldyBTbmFrZVN0YXRlKHNjcmVlbi5sZW5ndGggLSAxLCBzY3JlZW4ubGVuZ3RoIC0gMSk7XG5cbiAgLy8gZHJhdyBzdGFydGluZyBzY3JlZW5cbiAgc2NyZWVuW2EueV1bYS54XSA9IFwiQVwiO1xuICBzY3JlZW5bYi55XVtiLnhdID0gXCJCXCI7XG4gIHNjcmVlbltjLnldW2MueF0gPSBcIkNcIjtcbiAgc2NyZWVuW2QueV1bZC54XSA9IFwiRFwiO1xuICBkcmF3KHNjcmVlbik7XG5cbiAgLy8gdGhpcyB3aWxsIHdhaXQgZm9yIHN0ZXBUaW1lIG1pbGxpc2Vjb25kcyBhbmQgdGhlbiBjYWxsIHN0ZXAgd2l0aCB0aGVzZSBhcmd1bWVudHNcbiAgc2NoZWR1bGVOZXh0VXBkYXRlKHN0ZXBUaW1lLCAoKSA9PiBzdGVwKHN0ZXBUaW1lLCBuZXdBcHBsZXNFYWNoU3RlcCwgc2NyZWVuLCBhLCBiLCBjLCBkLCBhQSwgYUIsIGFDLCBhRCkpO1xuICAvLyB0aGUgXCIoKSA9PlwiIHBhcnQgaXMgaW1wb3J0YW50IVxuICAvLyB3aXRob3V0IGl0LCBzdGVwIHdpbGwgZ2V0IGNhbGxlZCBpbW1lZGlhdGVseSBpbnN0ZWFkIG9mIHdhaXRpbmdcbn1cblxuZnVuY3Rpb24gbG9jYXRpb25BZnRlck1vdGlvbihtb3Rpb246IE1vdGlvbiwgc25ha2U6IFNuYWtlU3RhdGUpOiBQb2ludCB7XG4gIHN3aXRjaCAobW90aW9uKSB7XG4gICAgY2FzZSBcImxlZnRcIiA6IHJldHVybiBuZXcgUG9pbnQoc25ha2UueC0xLCBzbmFrZS55KTtcbiAgICBjYXNlIFwicmlnaHRcIjogcmV0dXJuIG5ldyBQb2ludChzbmFrZS54KzEsIHNuYWtlLnkpO1xuICAgIGNhc2UgXCJ1cFwiICAgOiByZXR1cm4gbmV3IFBvaW50KHNuYWtlLngsIHNuYWtlLnktMSk7XG4gICAgY2FzZSBcImRvd25cIiA6IHJldHVybiBuZXcgUG9pbnQoc25ha2UueCwgc25ha2UueSsxKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RlcChcbiAgc3RlcFRpbWU6ICAgICAgICAgIG51bWJlcixcbiAgbmV3QXBwbGVzRWFjaFN0ZXA6IG51bWJlcixcbiAgc2NyZWVuOiBHYW1lU2NyZWVuLFxuICBzbmFrZUE6IFNuYWtlU3RhdGUsXG4gIHNuYWtlQjogU25ha2VTdGF0ZSxcbiAgc25ha2VDOiBTbmFrZVN0YXRlLFxuICBzbmFrZUQ6IFNuYWtlU3RhdGUsIFxuICBhZ2VudEE6IEFnZW50LFxuICBhZ2VudEI6IEFnZW50LFxuICBhZ2VudEM6IEFnZW50LFxuICBhZ2VudEQ6IEFnZW50XG4pOiB2b2lkIHtcbiAgLy8gZ2VuZXJhdGUgbmV3IGFwcGxlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0FwcGxlc0VhY2hTdGVwOyBpKyspIHtcbiAgICAvLyByYW5kb20gaW50ZWdlcnMgaW4gdGhlIGNsb3NlZCByYW5nZSBbMCwgc2NyZWVuLmxlbmd0aF1cbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2NyZWVuLmxlbmd0aCk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNjcmVlbi5sZW5ndGgpO1xuICAgIC8vIGlmIHdlIGdlbmVyYXRlZCBjb29yZGluYXRlcyB0aGF0IGFyZW4ndCBlbXB0eSwgc2tpcCB0aGlzIGFwcGxlXG4gICAgaWYgKHNjcmVlblt5XVt4XSA9PSBcImVtcHR5XCIpXG4gICAgICBzY3JlZW5beV1beF0gPSBcImFwcGxlXCI7XG4gIH1cblxuICAvLyBwbGF5ZXJzIHRha2UgdHVybnMgaW4gb3JkZXI6IEEgLT4gQiAtPiBDIC0+IEQgLT4gQSAtPiBCIC0+IEMgLT4gRCAtPiAuLi5cbiAgaWYgKCFzbmFrZUEubG9zdCkge1xuICAgIGNvbnN0IHRlbXAgID0gbG9jYXRpb25BZnRlck1vdGlvbihhZ2VudEEubW92ZShnZXRTY3JlZW5QYXJ0KHNjcmVlbiwgc25ha2VBKSksIHNuYWtlQSk7XG4gICAgaWYgKCFvdXRPZkJvdW5kcyh0ZW1wLCBzY3JlZW4pKSBtYWtlTW92ZShzbmFrZUEsIHNjcmVlbiwgdGVtcCwgXCJBXCIpO1xuICAgIGVsc2Ugc25ha2VBLmxvc3QgPSB0cnVlO1xuICB9XG5cbiAgaWYgKCFzbmFrZUIubG9zdCkge1xuICAgIGNvbnN0IHRlbXAgID0gbG9jYXRpb25BZnRlck1vdGlvbihhZ2VudEIubW92ZShnZXRTY3JlZW5QYXJ0KHNjcmVlbiwgc25ha2VCKSksIHNuYWtlQik7XG4gICAgaWYgKCFvdXRPZkJvdW5kcyh0ZW1wLCBzY3JlZW4pKSBtYWtlTW92ZShzbmFrZUIsIHNjcmVlbiwgdGVtcCwgXCJCXCIpO1xuICAgIGVsc2Ugc25ha2VCLmxvc3QgPSB0cnVlO1xuICB9XG5cbiAgaWYgKCFzbmFrZUMubG9zdCkge1xuICAgIGNvbnN0IHRlbXAgID0gbG9jYXRpb25BZnRlck1vdGlvbihhZ2VudEMubW92ZShnZXRTY3JlZW5QYXJ0KHNjcmVlbiwgc25ha2VDKSksIHNuYWtlQyk7XG4gICAgaWYgKCFvdXRPZkJvdW5kcyh0ZW1wLCBzY3JlZW4pKSBtYWtlTW92ZShzbmFrZUMsIHNjcmVlbiwgdGVtcCwgXCJDXCIpO1xuICAgIGVsc2Ugc25ha2VDLmxvc3QgPSB0cnVlO1xuICB9XG5cbiAgaWYgKCFzbmFrZUQubG9zdCkge1xuICAgIGNvbnN0IHRlbXAgID0gbG9jYXRpb25BZnRlck1vdGlvbihhZ2VudEQubW92ZShnZXRTY3JlZW5QYXJ0KHNjcmVlbiwgc25ha2VEKSksIHNuYWtlRCk7XG4gICAgaWYgKCFvdXRPZkJvdW5kcyh0ZW1wLCBzY3JlZW4pKSBtYWtlTW92ZShzbmFrZUQsIHNjcmVlbiwgdGVtcCwgXCJEXCIpO1xuICAgIGVsc2Ugc25ha2VELmxvc3QgPSB0cnVlO1xuICB9XG5cbiAgLy8gdXBkYXRlIGdhbWUgc2NyZWVuXG4gIGRyYXcoc2NyZWVuKTtcblxuICAvLyB1cGRhdGUgc25ha2Ugc3RhdGlzdGljc1xuICB1cGRhdGVMb3N0KFwiQVwiLCBzbmFrZUEubG9zdCk7IHVwZGF0ZUFwcGxlcyhcIkFcIiwgc25ha2VBLmFwcGxlcyk7XG4gIHVwZGF0ZUxvc3QoXCJCXCIsIHNuYWtlQi5sb3N0KTsgdXBkYXRlQXBwbGVzKFwiQlwiLCBzbmFrZUIuYXBwbGVzKTtcbiAgdXBkYXRlTG9zdChcIkNcIiwgc25ha2VDLmxvc3QpOyB1cGRhdGVBcHBsZXMoXCJDXCIsIHNuYWtlQy5hcHBsZXMpO1xuICB1cGRhdGVMb3N0KFwiRFwiLCBzbmFrZUQubG9zdCk7IHVwZGF0ZUFwcGxlcyhcIkRcIiwgc25ha2VELmFwcGxlcyk7XG5cbiAgLy8gcnVuIGFnYWluIHVubGVzcyBldmVyeW9uZSBoYXMgbG9zdFxuICBpZiAoIXNuYWtlQS5sb3N0IHx8ICFzbmFrZUIubG9zdCB8fCAhc25ha2VDLmxvc3QgfHwgIXNuYWtlRC5sb3N0KVxuICAgIHNjaGVkdWxlTmV4dFVwZGF0ZShzdGVwVGltZSwgKCkgPT4gc3RlcChzdGVwVGltZSwgbmV3QXBwbGVzRWFjaFN0ZXAsIHNjcmVlbiwgc25ha2VBLCBzbmFrZUIsIHNuYWtlQywgc25ha2VELCBhZ2VudEEsIGFnZW50QiwgYWdlbnRDLCBhZ2VudEQpKTtcbn0iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9BZ2VudFwiO1xuaW1wb3J0IHsgZmlsbENlbGwgfSBmcm9tIFwiLi9EcmF3aW5nTGlicmFyeVwiO1xuXG4vLyBhIENlbGwgaXMgZWl0aGVyIGEgUGxheWVyIG9yIHRoZSBzdHJpbmcgXCJlbXB0eVwiIG9yIFwiYXBwbGVcIlxuZXhwb3J0IHR5cGUgQ2VsbCA9IFBsYXllciB8IFwiZW1wdHlcIiB8IFwiYXBwbGVcIjtcblxuLy8gYSBHYW1lU2NyZWVuIGlzIGFuIGFycmF5IG9mIENlbGwgYXJyYXlzXG5leHBvcnQgdHlwZSBHYW1lU2NyZWVuID0gQ2VsbFtdW107IC8vIHJvdy1tYWpvciBvcmRlciwgc2hvdWxkIGFsd2F5cyBoYXZlIHNxdWFyZSBkaW1lbnNpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKHNpemU6IG51bWJlcik6IEdhbWVTY3JlZW4ge1xuICBjb25zdCBzY3JlZW4gPSBuZXcgQXJyYXk8Q2VsbFtdPihzaXplKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspXG4gICAgc2NyZWVuW2ldID0gbmV3IEFycmF5PENlbGw+KHNpemUpLmZpbGwoXCJlbXB0eVwiKTtcbiAgcmV0dXJuIHNjcmVlbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXcoc2NyZWVuOiBHYW1lU2NyZWVuKTogdm9pZCB7XG4gIGZvciAobGV0IHkgPSAwOyB5IDwgc2NyZWVuLmxlbmd0aDsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzY3JlZW4ubGVuZ3RoOyB4KyspIHtcbiAgICAgIHN3aXRjaCAoc2NyZWVuW3ldW3hdKSB7XG4gICAgICAgIGNhc2UgXCJlbXB0eVwiOlxuICAgICAgICAgIGZpbGxDZWxsKFwid2hpdGVcIiwgeCwgeSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcImFwcGxlXCI6XG4gICAgICAgICAgZmlsbENlbGwoXCJyZWRcIiwgeCwgeSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIkFcIjpcbiAgICAgICAgICBmaWxsQ2VsbChcImdyZWVuXCIsIHgsIHkpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJCXCI6XG4gICAgICAgICAgZmlsbENlbGwoXCJibHVlXCIsIHgsIHkpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJDXCI6XG4gICAgICAgICAgZmlsbENlbGwoXCJvcmFuZ2VcIiwgeCwgeSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIkRcIjpcbiAgICAgICAgICBmaWxsQ2VsbChcInB1cnBsZVwiLCB4LCB5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBBZ2VudE1vdGlvbiwgTW90aW9ufSBmcm9tIFwiLi9BZ2VudFwiO1xuaW1wb3J0IHsgU2NyZWVuUGFydCwgTWF5YmVDZWxsfSBmcm9tIFwiLi9HYW1lUnVubmVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBZ2VudEEgaW1wbGVtZW50cyBBZ2VudE1vdGlvbiB7XG4gIG1vdmUoc2NyZWVuUGFydDogU2NyZWVuUGFydCk6IE1vdGlvbiB7XG4gICAgcmV0dXJuIFwiZG93blwiO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZ2VudEIgaW1wbGVtZW50cyBBZ2VudE1vdGlvbiB7XG4gIG1vdmUoc2NyZWVuUGFydDogU2NyZWVuUGFydCk6IE1vdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMucmFuZG9tTW90aW9uKHNjcmVlblBhcnQpO1xuICB9XG5cbiAgcmFuZG9tTW90aW9uKHNjcmVlblBhcnQ6IFNjcmVlblBhcnQpOiBNb3Rpb24ge1xuICAgIGNvbnN0IHJuZDogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIDQ7IC8vIHJhbmRvbSBmbG9hdCBpbiB0aGUgaGFsZi1vcGVuIHJhbmdlIFswLCA0KVxuXG4gICAgbGV0IHg6IE1vdGlvbjtcbiAgICBpZiAocm5kIDwgMSkgeCA9IFwidXBcIjtcbiAgICBlbHNlIGlmIChybmQgPCAyKSB4ID0gXCJkb3duXCI7XG4gICAgZWxzZSBpZiAocm5kIDwgMykgeCA9IFwibGVmdFwiO1xuICAgIGVsc2UgeCA9IFwicmlnaHRcIjtcblxuICAgIC8vIHRyeSBub3QgdG8gaGl0IGFueXRoaW5nXG4gICAgaWYgKHRoaXMudHJ5TW92ZSh4LCBzY3JlZW5QYXJ0KSAhPSBcImFwcGxlXCIgJiYgdGhpcy50cnlNb3ZlKHgsIHNjcmVlblBhcnQpICE9IFwiZW1wdHlcIikge1xuICAgICAgc3dpdGNoICh4KSB7XG4gICAgICAgIGNhc2UgXCJ1cFwiOiByZXR1cm4gXCJkb3duXCI7XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOiByZXR1cm4gXCJsZWZ0XCI7XG4gICAgICAgIGNhc2UgXCJkb3duXCI6IHJldHVybiBcInVwXCI7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6IHJldHVybiBcInJpZ2h0XCI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4O1xuICB9IFxuXG4gIHRyeU1vdmUobTogTW90aW9uLCBwOiBTY3JlZW5QYXJ0KTogTWF5YmVDZWxsIHtcbiAgICAvLyB0aGUgc25ha2UgaXMgcG9zaXRpb25lZCBpbiB0aGUgY2VudGVyIGF0IHBbMl1bMl1cbiAgICBzd2l0Y2ggKG0pIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6IHJldHVybiBwWzJdWzFdO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6IHJldHVybiBwWzJdWzNdO1xuICAgICAgY2FzZSBcInVwXCI6IHJldHVybiBwWzFdWzJdO1xuICAgICAgY2FzZSBcImRvd25cIjogcmV0dXJuIHBbM11bMl07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZ2VudEMgaW1wbGVtZW50cyBBZ2VudE1vdGlvbiB7XG4gIC8vIEMgdXNlcyB0aGVzZSBtb3ZlcyBpbiBvcmRlciwgcmVwZWF0ZWRseVxuICBwcml2YXRlIEN5Y2xlOiBNb3Rpb25bXSA9IFtcInVwXCIsIFwidXBcIiwgXCJyaWdodFwiLCBcImRvd25cIiwgXCJyaWdodFwiXTtcbiAgcHJpdmF0ZSBJbmRleDogbnVtYmVyID0gMDtcblxuICBtb3ZlKHNjcmVlblBhcnQ6IFNjcmVlblBhcnQpOiBNb3Rpb24ge1xuICAgIGNvbnN0IG06IE1vdGlvbiA9IHRoaXMuQ3ljbGVbdGhpcy5JbmRleF07XG4gICAgdGhpcy5JbmRleCsrO1xuICAgIHRoaXMuSW5kZXggPSB0aGlzLkluZGV4ICUgdGhpcy5DeWNsZS5sZW5ndGg7XG4gICAgcmV0dXJuIG07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFnZW50RCBpbXBsZW1lbnRzIEFnZW50TW90aW9uIHtcbiAgbW92ZShzY3JlZW5QYXJ0OiBTY3JlZW5QYXJ0KTogTW90aW9uIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA1OyBqKyspIHtcbiAgICAgICAgaWYgKHNjcmVlblBhcnRbal1baV0gPT0gXCJhcHBsZVwiKSB7XG4gICAgICAgICAgaWYgKGkgPiAzKSByZXR1cm4gXCJyaWdodFwiO1xuICAgICAgICAgIGVsc2UgaWYgKGkgPCAzKSByZXR1cm4gXCJsZWZ0XCI7XG4gICAgICAgICAgZWxzZSBpZiAoaiA+IDMpIHJldHVybiBcImRvd25cIjtcbiAgICAgICAgICBlbHNlIGlmIChqIDwgMykgcmV0dXJuIFwidXBcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yYW5kb21Nb3Rpb24oc2NyZWVuUGFydCk7XG4gIH1cblxuICByYW5kb21Nb3Rpb24ocGFydDogU2NyZWVuUGFydCk6IE1vdGlvbiB7XG4gICAgY29uc3Qgcm5kOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogNDsgLy8gcmFuZG9tIGZsb2F0IGluIHRoZSBoYWxmLW9wZW4gcmFuZ2UgWzAsIDQpXG5cbiAgICBsZXQgeDogTW90aW9uO1xuICAgIGlmIChybmQgPCAxKSB4ID0gXCJ1cFwiO1xuICAgIGVsc2UgaWYgKHJuZCA8IDIpIHggPSBcImRvd25cIjtcbiAgICBlbHNlIGlmIChybmQgPCAzKSB4ID0gXCJsZWZ0XCI7XG4gICAgZWxzZSB4ID0gXCJyaWdodFwiO1xuXG4gICAgLy8gdHJ5IG5vdCB0byBoaXQgYW55dGhpbmdcbiAgICBpZiAodGhpcy50cnlNb3ZlKHgsIHBhcnQpICE9IFwiYXBwbGVcIiAmJiB0aGlzLnRyeU1vdmUoeCwgcGFydCkgIT0gXCJlbXB0eVwiKSB7XG4gICAgICBzd2l0Y2ggKHgpIHtcbiAgICAgICAgY2FzZSBcInVwXCI6IHJldHVybiBcImRvd25cIjtcbiAgICAgICAgY2FzZSBcInJpZ2h0XCI6IHJldHVybiBcImxlZnRcIjtcbiAgICAgICAgY2FzZSBcImRvd25cIjogcmV0dXJuIFwidXBcIjtcbiAgICAgICAgY2FzZSBcImxlZnRcIjogcmV0dXJuIFwicmlnaHRcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICB0cnlNb3ZlKG06IE1vdGlvbiwgcDogU2NyZWVuUGFydCk6IE1heWJlQ2VsbCB7XG4gICAgLy8gdGhlIHNuYWtlIGlzIHBvc2l0aW9uZWQgaW4gdGhlIGNlbnRlciBhdCBwWzJdWzJdXG4gICAgc3dpdGNoIChtKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOiByZXR1cm4gcFsyXVsxXTtcbiAgICAgIGNhc2UgXCJyaWdodFwiOiByZXR1cm4gcFsyXVszXTtcbiAgICAgIGNhc2UgXCJ1cFwiOiByZXR1cm4gcFsxXVsyXTtcbiAgICAgIGNhc2UgXCJkb3duXCI6IHJldHVybiBwWzNdWzJdO1xuICAgIH1cbiAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVzZXRDYW52YXMsIHVwZGF0ZUFwcGxlcywgdXBkYXRlTG9zdCB9IGZyb20gXCIuL0RyYXdpbmdMaWJyYXJ5XCI7XG5pbXBvcnQgeyBydW4gfSBmcm9tIFwiLi9HYW1lUnVubmVyXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplIH0gZnJvbSBcIi4vR2FtZVNjcmVlblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcGxheSgpOiB2b2lkIHtcbiAgcmVzZXRDYW52YXMoKTtcbiAgdXBkYXRlTG9zdChcIkFcIiwgZmFsc2UpOyB1cGRhdGVBcHBsZXMoXCJBXCIsIDApO1xuICB1cGRhdGVMb3N0KFwiQlwiLCBmYWxzZSk7IHVwZGF0ZUFwcGxlcyhcIkJcIiwgMCk7XG4gIHVwZGF0ZUxvc3QoXCJDXCIsIGZhbHNlKTsgdXBkYXRlQXBwbGVzKFwiQ1wiLCAwKTtcbiAgdXBkYXRlTG9zdChcIkRcIiwgZmFsc2UpOyB1cGRhdGVBcHBsZXMoXCJEXCIsIDApO1xuICBjb25zdCBzY3JlZW4gPSBpbml0aWFsaXplKDUwKTtcbiAgcnVuKDEwMDAsIDEwLCBzY3JlZW4pO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==