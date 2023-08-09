import { ScreenPart } from "./GameRunner";
import { AgentA, AgentB, AgentC, AgentD } from "./PlayerAgents";

export type Player = "A" | "B" | "C" | "D";

export type Agent = AgentA | AgentB | AgentC | AgentD;

export type Motion = "up" | "down" | "left" | "right";

export interface AgentMotion {
  move(screenPart: ScreenPart): Motion;
}

export function initializePlayerAgent(player: Player): Agent{
  switch(player) {
    case "A": return new AgentA;
    case "B": return new AgentB;
    case "C": return new AgentC;
    case "D": return new AgentD;
  }
}