# Robosnake Introduction

This is an implementation of a 4-player [Snake](https://en.wikipedia.org/wiki/Snake_(video_game_genre)) game, where each player is controlled by a different piece of AI code.


## Gameplay

There is no user input in the game: the keyboard and mouse do not do anything. All four players are controlled by AI agent code. The "Run game" button starts the game.

The game board is a square grid of square cells, drawn below the "Statistics" table. The cells on the grid are the "pixels" on the "screen" that displays the game.

Each player is represented by a different color on the board: A is green, B is blue, C is orange, and D is purple.

Each player starts in a different corner of the game board. On a player's turn, they are allowed to move into any cell adjacent to their current position.

The players take turns in order: A moves first, then B, C, D, and then A again (and so on). The game screen updates the position of every player simultaneously, but if two players try to move into the same cell, the "tie" is broken by turn order.

When a player moves into a cell, the player takes that cell. To indicate this, the cell changes to display the color of the player.

A cell may contain an apple, which is indicated by the color red. In the "Statistics" table, each player has a counter of how many apples they've taken. After each round of turns, new apples are added to the board in random unoccupied cells.

A player loses if they try to move into a cell that has already been taken, or if they try to move outside the boundaries of the game board. This includes if an AI agent tries to move "backwards" (in the opposite direction as its previous move).

The game is over when all players have lost. The "winner" is the player with the highest apples counter at the end of the game.

## Agents

Agent implementations are how players will participate in the game. Agent implementations are restricted in that they must implement the 'Agent' interface defined in Agent.ts.

The Agent Interface takes a ScreenPart object and needs to return a Motion. The ScreenPart object gives the player access to a 5x5 region that the current player can "see". Each agent can do whatever it wants with the region that it can "see": it may run any kind of algorithm over the data structure, or even ignore it altogether.

Users are encouraged to implement the Agent Interface through a Class. This class will give players the ability to have an isolated space to write their AI logic. Here is an example of a class implementing the Agent Interface...

```Typescript
export class AgentA implements Agent {
  agent(screenPart: ScreenPart): Motion {
    let motion = getMotion();
    return motion;
  }
  // ...
  // REST OF CLASS GOES HERE
  getMotion(): Motion {
    // ... 
    // STUFF HERE
  }
}
```

## The codebase

Users will interact with very little of the codebase. There are certain changes that will need to be made to Agent.ts in order to import the players classes. At the top of Agent.ts, Players will have to modify the 'import' statements to instead have their class name and their file name. For example ...

```Typescript
import { PlayerClass} from "./PlayerFile";
```

In addition, a modification will also need to be made in the 'InitializePlayerAgent' function at the bottom of Agent.ts. This is where instances of each Players Agent will be created. It is also important to note that this function is where it is decided which player gets assigned a Player 'type', ultimately deciding the starting position of each player. For example... 

```Typescript
export function initializePlayerAgent(player: Player): Agent{
  switch(player) {
    // case "A" return new PLAYER_CLASS_NAME;
    case "A": return new PlayerClass1; // PlayerClass1 gets Player type 'A' which corresponds to upper left starting position
    case "B": return new PlayerClass2; // PlayerClass2 gets Player type 'B' which corresponds to upper right starting position
    case "C": return new PlayerClass3; // PlayerClass3 gets Player type 'B' which corresponds to lower left starting position
    case "D": return new PlayerClass4; // PlayerClass4 gets Player type 'B' which corresponds to lower right starting position
  }
}
```

Users are allowed to make any imports they like within their respective files. Use of third-party libraries is working so long as the appropriate npm modules are loaded into the project. If your using third party libraries it is assumed that you know how to use npm to bring in the modules. 