import fs from "fs/promises";
import path from "path";
import { MeenyBot } from "./backend/bot";

process.on("uncaughtException", (exception: Error) =>
{
	console.error(exception);
});

async function main(): Promise<void>
{
	try
	{
		await eliminateDCE();
		await MeenyBot.initialize();
	}
	catch (exc: any)
	{
		console.error(exc);
	}
}

/**
 * This imports all files into this file, effectively removing dead code elimination.
 */
async function eliminateDCE(): Promise<void>
{
	await importAllFiles(__dirname);
}

async function importAllFiles(dir: string)
{
	const currentFileExtension: string = path.extname(__filename);
	for (const file of await fs.readdir(dir))
	{
		const filePath = path.join(dir, file);
		const stat = await fs.stat(filePath);

		if (path.extname(file) == currentFileExtension)
		{
			await import(filePath);
		}
		else if (stat.isDirectory())
		{
			await importAllFiles(filePath);
		}
	}
}

void main();
