# **Meeny BETA**
Meeny is a Discord Bot made by CrusherNotDrip out of boredom

also made with discord.js and node.js and whatever
## **Creating A Bot**
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) then Login if you haven;t akready
2. Click/Tap on **New Application** located in the top right
3. Name your application anything you want and accept the **Discord Developer TOS and Developer Policy** then click create
4. Click/Tap Bot Located at the middle left
5. Click/Tap Add Bot
6. Done!

## **Adding the Bot to your server**
1. After creating the bot you should now go to **OAuth2 > URL Generator**
2. Click **Bot**
3. Set up any Permissions your bot may need, If you need then the Default Permissions are: ![image](https://user-images.githubusercontent.com/90648119/204411506-260999cd-ebc4-4c09-aa9d-f909363a729b.png)
4. Copy The URL
5. Paste it in a browser then add it to a server you can put it in (You might have to sign in)

## **Building**
### **Required things:**
- [Node.js](https://nodejs.org/en/)
- [discord.js](https://discord.js.org/#/)
- An IDE (For Example: [Visual Studio Code](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com)) (Optional)

### **Running the Bot:**
**If you haven't already then get the code from this github**
1. Create a New File named **.env**
2. Type `tokenBETA=` and then Paste the Bot Token (from your bot's application on the [Discord Developer Portal](https://discord.com/developers/applications))
3. Open **config.json** and replace the `clientId` with your bots client id (You can get it by opening up the [Discord Developer Portal](https://discord.com/developers/applications) and going to your Bot Application then copy `APPLICATION ID`)
4. Open up Command Prompt or something like that then run `node deploy-commands.js` (You will know if its successful if it says `Successfully registered application commands.`)
5. Run `node .` and it should return `Ready!` in the console log, the bot will also be online