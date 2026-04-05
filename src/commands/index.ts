import { MeenyCommand } from "../backend/command";
import { EightBallCommand } from "./8ball";
import { AchievementCommand } from "./achievement";
import { ChancesOfCommand } from "./chancesof";
import { CreditsCommand } from "./credits";
import { FlipACoinCommand } from "./flipacoin";
import { KillCommand } from "./kill";
import { MeterCommand } from "./meter";
import { PingCommand } from "./ping";
import { SayCommand } from "./say";
import { ServerInfoCommand } from "./serverinfo";
import { SocialCommand } from "./socials";
import { UpdatesCommand } from "./updates";

const commandClasses: (typeof MeenyCommand)[] = [
	EightBallCommand,
	AchievementCommand,
	ChancesOfCommand,
	CreditsCommand,
	FlipACoinCommand,
	KillCommand,
	MeterCommand,
	PingCommand,
	SayCommand,
	ServerInfoCommand,
	SocialCommand,
	UpdatesCommand,
];

export default commandClasses;
