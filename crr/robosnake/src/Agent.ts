import { ScreenPart } from "./GameRunner";
import { AgentA } from "./RightAgent";
import { AgentB } from "./TuesdayAgent";
import { AgentC } from "./CyclesAgent";
import { AgentD } from "./StairAgent";

export type Player = "A" | "B" | "C" | "D";

export type Motion = "up" | "down" | "left" | "right";

export interface Agent{
  agent(screenPart: ScreenPart): Motion;
}

export function initializePlayerAgent(player: Player): Agent{
  switch(player) {
    case "A": return new AgentA;
    case "B": return new AgentB;
    case "C": return new AgentC;
    case "D": return new AgentD;
  }
}