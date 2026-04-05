import { MeenyBot } from "./backend/bot";

async function main(): Promise<void>
{
	try
	{
		await MeenyBot.initialize();
	}
	catch (exc: any)
	{
		console.error(exc);
	}
}

void main();
