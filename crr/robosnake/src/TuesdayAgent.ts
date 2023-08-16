import { LocalDate, DayOfWeek, Clock } from "@js-joda/core";
import { Agent, Motion} from "./Agent";
import { ScreenPart } from "./GameRunner";


export class AgentB implements Agent {
    agent(screenPart: ScreenPart): Motion {
        return this.getMotion(screenPart);
    }

    getMotion(s: ScreenPart): Motion {
        let motion: Motion;
        const c: Clock = Clock.systemDefaultZone();
        const l: LocalDate = LocalDate.now(c);

        const d: DayOfWeek = l.dayOfWeek();
        if (d.compareTo(DayOfWeek.TUESDAY) == 0){
            motion = "left";
        } else {
            motion = "down";
        }
        return motion;
    }
}