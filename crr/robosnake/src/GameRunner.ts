import { initializePlayerAgent, Motion, Agent, Player } from "./Agent";
import { scheduleNextUpdate, updateApples, updateLost } from "./DrawingLibrary";
import { Cell, draw, GameScreen } from "./GameScreen";

// a MaybeCell is either a Cell or the string "outside"
export type MaybeCell = Cell | "outside";

// a ScreenPart is a 5x5 array of MaybeCell arrays
export type ScreenPart = MaybeCell[][];

export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class SnakeState extends Point {
  public apples: number;
  public lost: boolean;

  constructor(x: number, y: number) {
    super(x, y); // call Point constructor to set x and y
    this.apples = 0;
    this.lost = false;
  }

  public setPoint(p: Point): void {
    this.x = p.x;
    this.y = p.y;
  }
}

// x and y are the left and top coordinate of a 5x5 square region.
// cells outside the bounds of the board are represented with "outside"
export function getScreenPart(screen: GameScreen, s: SnakeState): ScreenPart {
  const part: ScreenPart = new Array<MaybeCell[]>(5);
  for (let j = 0; j < 5; j++) {
    part[j] = new Array<MaybeCell>(5);
    for (let i = 0; i < 5; i++) {
      if (s.x+i-2 >= 0 && s.y-2 + j >= 0 && s.x-2 + i < screen.length && s.y-2 + j < screen.length)
        part[j][i] = screen[s.y+j-2][s.x+i-2];
      else
        part[j][i] = "outside";
    }
  }
  return part;
}

export function outOfBounds(point: Point, screen: GameScreen): boolean {
  if (point.x < 0 || point.y < 0 || point.x >= screen.length || point.y >= screen.length) // hit the edge of the screen
    return true;
  else
    return false;
}

export function makeMove(snake: SnakeState, screen: GameScreen, point: Point, player: Player): void {
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
export function run(stepTime: number, newApplesEachStep: number, screen: GameScreen): void {
  // create instances of player implemented Agents
  const aA: Agent = initializePlayerAgent("A");
  const aB: Agent = initializePlayerAgent("B");
  const aC: Agent = initializePlayerAgent("C");
  const aD: Agent = initializePlayerAgent("D");

  // player initial positions
  const sA = new SnakeState(0,0);
  const sB = new SnakeState(screen.length - 1, 0);
  const sC = new SnakeState(0, screen.length - 1);
  const sD = new SnakeState(screen.length - 1, screen.length - 1);

  // draw starting screen
  screen[sA.y][sA.x] = "A";
  screen[sB.y][sB.x] = "B";
  screen[sC.y][sC.x] = "C";
  screen[sD.y][sD.x] = "D";
  draw(screen);

  // this will wait for stepTime milliseconds and then call step with these arguments
  scheduleNextUpdate(stepTime, () => step(stepTime, newApplesEachStep, screen, sA, sB, sC, sD, aA, aB, aC, aD));
  // the "() =>" part is important!
  // without it, step will get called immediately instead of waiting
}

function locationAfterMotion(motion: Motion, snake: SnakeState): Point {
  switch (motion) {
    case "left" : return new Point(snake.x-1, snake.y);
    case "right": return new Point(snake.x+1, snake.y);
    case "up"   : return new Point(snake.x, snake.y-1);
    case "down" : return new Point(snake.x, snake.y+1);
  }
}

export function step(
  stepTime:          number,
  newApplesEachStep: number,
  screen: GameScreen,
  snakeA: SnakeState,
  snakeB: SnakeState,
  snakeC: SnakeState,
  snakeD: SnakeState, 
  agentA: Agent,
  agentB: Agent,
  agentC: Agent,
  agentD: Agent
): void {
  // generate new apples
  for (let i = 0; i < newApplesEachStep; i++) {
    // random integers in the closed range [0, screen.length]
    const x = Math.floor(Math.random() * screen.length);
    const y = Math.floor(Math.random() * screen.length);
    // if we generated coordinates that aren't empty, skip this apple
    if (screen[y][x] == "empty")
      screen[y][x] = "apple";
  }

  // players take turns in order: A -> B -> C -> D -> A -> B -> C -> D -> ...
  if (!snakeA.lost) {
    const temp  = locationAfterMotion(agentA.move(getScreenPart(screen, snakeA)), snakeA);
    if (!outOfBounds(temp, screen)) makeMove(snakeA, screen, temp, "A");
    else snakeA.lost = true;
  }

  if (!snakeB.lost) {
    const temp  = locationAfterMotion(agentB.move(getScreenPart(screen, snakeB)), snakeB);
    if (!outOfBounds(temp, screen)) makeMove(snakeB, screen, temp, "B");
    else snakeB.lost = true;
  }

  if (!snakeC.lost) {
    const temp  = locationAfterMotion(agentC.move(getScreenPart(screen, snakeC)), snakeC);
    if (!outOfBounds(temp, screen)) makeMove(snakeC, screen, temp, "C");
    else snakeC.lost = true;
  }

  if (!snakeD.lost) {
    const temp  = locationAfterMotion(agentD.move(getScreenPart(screen, snakeD)), snakeD);
    if (!outOfBounds(temp, screen)) makeMove(snakeD, screen, temp, "D");
    else snakeD.lost = true;
  }

  // update game screen
  draw(screen);

  // update snake statistics
  updateLost("A", snakeA.lost); updateApples("A", snakeA.apples);
  updateLost("B", snakeB.lost); updateApples("B", snakeB.apples);
  updateLost("C", snakeC.lost); updateApples("C", snakeC.apples);
  updateLost("D", snakeD.lost); updateApples("D", snakeD.apples);

  // run again unless everyone has lost
  if (!snakeA.lost || !snakeB.lost || !snakeC.lost || !snakeD.lost)
    scheduleNextUpdate(stepTime, () => step(stepTime, newApplesEachStep, screen, snakeA, snakeB, snakeC, snakeD, agentA, agentB, agentC, agentD));
}