import { Agent, Motion} from "./Agent";
import { ScreenPart } from "./GameRunner";


export class AgentC implements Agent {
  index: number ;
  motions: Motion[] = ["up", "up", "right", "down", "right"];

  constructor() {
    this.index = 0;
  }

  agent(screenPart: ScreenPart): Motion {
    return this.getMotion(screenPart);
  }

  getMotion(s: ScreenPart): Motion {
      const motion: Motion = this.motions[this.index];
      this.index++;
      this.index = this.index % this.motions.length;
      return motion;
  }
}