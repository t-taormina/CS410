import { ScreenPart } from "./GameRunner";

/* File names will need to be updated to import Player's files and Classes imported should also be changed in 
function 'initializePlayerAgent' below. */

// import { PLAYER_CLASS_NAME } from "./PLAYER_FILE"
import { AgentA } from "./RightAgent";
import { AgentB } from "./TuesdayAgent";
import { AgentC } from "./CyclesAgent";
import { AgentD } from "./StairAgent";

export type Player = "A" | "B" | "C" | "D";

export type Motion = "up" | "down" | "left" | "right";

/**
 * Agent Interface used to generate a {@link Motion}. This interface must be implemented by all players. It is the only requirement. 
 */
export interface Agent{
  /**
   * Obtains a {@link Motion}
   * @param {ScreenPart} screenPart
   * @returns {Motion}
   */
  agent(screenPart: ScreenPart): Motion;
}

/**
 * Generates an Agent based on the type of player. When Players bring in Agent classes with new 
 * names, this function must be altered to correctly generate the imported classes. This is also 
 * where it will be decided which Player Type is assigned to each Agent.
 * @param {Player} player 
 * @returns Agent
 */
export function initializePlayerAgent(player: Player): Agent{
  switch(player) {
    // case "A" return new PLAYER_CLASS_NAME;
    case "A": return new AgentA;
    case "B": return new AgentB;
    case "C": return new AgentC;
    case "D": return new AgentD;
  }
}