import chalk from "chalk";
import dotenv from "dotenv";
import { resolve } from "path";

const DEFAULT_BAN_MESSAGE: string = "You are on the ban list, request cannot continue.";

export class MeenyEnvironment
{
	id: string;
	token: string;
	watchList: string[];
	banList: string[];

	banMessage: string;

	constructor()
	{
		dotenv.config();

		this.id = process.env.botIDBETA;
		this.token = process.env.tokenBETA;
		this.watchList = MeenyEnvironment.parseEnvList(process.env.watchList);
		this.banList = MeenyEnvironment.parseEnvList(process.env.banList);

		this.banMessage = process.env.banMessage ?? DEFAULT_BAN_MESSAGE;
	}

	public static parseEnvList(text: string): string[]
	{
		try
		{
			var runtime: Function = Function(`return ${text};`);
			return runtime();
		}
		catch (e)
		{
			console.log(chalk.redBright(`Error parsing ${text} as an environment list!`));
			return [];
		}
	}
}
