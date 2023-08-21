import { Agent, Motion} from "./Agent";
import { ScreenPart} from "./GameRunner";

/**
 * Agent that always obtains a "right" Motion
 */
export class AgentA implements Agent {
  agent(screenPart: ScreenPart): Motion {
    return "right";
  }
}