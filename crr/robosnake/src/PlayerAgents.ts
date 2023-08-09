import { AgentMotion, Motion} from "./Agent";
import { ScreenPart, MaybeCell} from "./GameRunner";

export class AgentA implements AgentMotion {
  move(screenPart: ScreenPart): Motion {
    return "down";
  }
}

export class AgentB implements AgentMotion {
  move(screenPart: ScreenPart): Motion {
    return this.randomMotion(screenPart);
  }

  randomMotion(screenPart: ScreenPart): Motion {
    const rnd: number = Math.random() * 4; // random float in the half-open range [0, 4)

    let x: Motion;
    if (rnd < 1) x = "up";
    else if (rnd < 2) x = "down";
    else if (rnd < 3) x = "left";
    else x = "right";

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
  } 

  tryMove(m: Motion, p: ScreenPart): MaybeCell {
    // the snake is positioned in the center at p[2][2]
    switch (m) {
      case "left": return p[2][1];
      case "right": return p[2][3];
      case "up": return p[1][2];
      case "down": return p[3][2];
    }
  }
}

export class AgentC implements AgentMotion {
  // C uses these moves in order, repeatedly
  private Cycle: Motion[] = ["up", "up", "right", "down", "right"];
  private Index: number = 0;

  move(screenPart: ScreenPart): Motion {
    const m: Motion = this.Cycle[this.Index];
    this.Index++;
    this.Index = this.Index % this.Cycle.length;
    return m;
  }
}

export class AgentD implements AgentMotion {
  move(screenPart: ScreenPart): Motion {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (screenPart[j][i] == "apple") {
          if (i > 3) return "right";
          else if (i < 3) return "left";
          else if (j > 3) return "down";
          else if (j < 3) return "up";
        }
      }
    }
    return this.randomMotion(screenPart);
  }

  randomMotion(part: ScreenPart): Motion {
    const rnd: number = Math.random() * 4; // random float in the half-open range [0, 4)

    let x: Motion;
    if (rnd < 1) x = "up";
    else if (rnd < 2) x = "down";
    else if (rnd < 3) x = "left";
    else x = "right";

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
  }

  tryMove(m: Motion, p: ScreenPart): MaybeCell {
    // the snake is positioned in the center at p[2][2]
    switch (m) {
      case "left": return p[2][1];
      case "right": return p[2][3];
      case "up": return p[1][2];
      case "down": return p[3][2];
    }
  }
}