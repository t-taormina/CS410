import { Agent, Motion} from "./Agent";
import { ScreenPart} from "./GameRunner";

export class AgentA implements Agent {
  agent(screenPart: ScreenPart): Motion {
    return "right";
  }
}