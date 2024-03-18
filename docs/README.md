# **Meeny BETA**
Meeny is a Discord App made by CrusherNotDrip out of boredom

also made with discord.js and node.js and whatever
## **Creating an App**
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) then Login if you haven't already
2. Click/Tap on `New Application` located in the top right
3. Name your application anything you want and accept the **Discord Developer TOS and Developer Policy** then click create
4. When you click on `Bot` one should be generated for you
5. Click on `Reset Token` and it should give you another one. Keep that token somewhere as we are gonna put it in a secret file
6. Also copy the `Application ID` from the `General Information` tab as we will also need that later
7. Done!

## **Setting up a bot**
1. In the [Discord Developer Portal](https://discord.com/developers/applications) in your App there should be an `Installation` button
2. This one uses `User Install` and `Guild Install` so make sure to click on both of them
3. These are the permissions used since im too lazy to list them all off but make sure these permissions are on

## **Building**
### **Required things:**
- [Node.js](https://nodejs.org/en/)
- [discord.js](https://discord.js.org/#/)
- An IDE (For Example: [Visual Studio Code](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com)) (Optional)

### **Running the Bot:**
**If you haven't already then get the code from this github**
1. Create a New File named `.env`
2. Put all of this stuff inside the `.env` file

```
# BETA
tokenBETA="YOURBOTTOKENHERE" # Refer to step 5 in the Creating an App section of the README
botIDBETA="YOURBOTIDHERE" # Refer to step 6 in the Creating an App section of the README

# Other Stuff
blockList=[] # These go by Discord User IDS
```

3. Open up Command Prompt or something like that then run `node deploy-commands.js` (You will know if its successful if it says `Successfully registered application commands.`)
4. Run `node .` and it should return `YourBotsName#0000 is now online!` in the console log, the bot will also be online