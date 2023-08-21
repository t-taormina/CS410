import { Agent, Motion} from "./Agent";
import { ScreenPart } from "./GameRunner";

/**
 * Agent that alternates increasing amounts of steps going either "up" or "left" making use of 
 * members and methods
 */
export class AgentD implements Agent {
  lastMotion: Motion ;
  stepCounter: number ;
  currentSteps: number;

  constructor() {
    this.stepCounter = 0;
    this.lastMotion = "up";
    this.currentSteps = 1;
  }

  agent(screenPart: ScreenPart): Motion {
    return this.getMotion(screenPart);
  }

  getMotion(s: ScreenPart): Motion {
    if (this.stepCounter == this.currentSteps) {
        this.stepCounter = 0;
        if (this.lastMotion == "left") {
            this.lastMotion = "up";
            this.currentSteps++;
        } else {
            this.lastMotion = "left";
        }
    }
    this.stepCounter++;
    return this.lastMotion;
  }
}