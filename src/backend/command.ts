import { Interaction, SlashCommandBuilder } from "discord.js";

export class MeenyCommand
{
	public name: string;
	data: SlashCommandBuilder;

	constructor(name: string, data: SlashCommandBuilder)
	{
		this.name = name;
		this.data = data;

		this.data.setName(this.name);
	}

	async execute(_interaction_metadata: Interaction): Promise<void>
	{
		throw new Error("The `execute` function for " + this.name + " must be overriden!");
	}
}
