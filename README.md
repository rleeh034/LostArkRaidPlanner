# LostArkRaidPlanner

A Discord Bot to plan and organize ingame events known as raids in the game Lost Ark.


## Getting Started

### Prerequisites

Node.js is required and can be downloaded from the official website [here](https://nodejs.org/en/download/).

The additional libraries required can be installed in the terminal via the command lines below:

#### Discord.js, Dotenv, crypto-js, moment

```
npm install discord.js
npm install dotenv
npm install crypto-js
npm install moment
```

### Creating the Bot

Create a new application from the [Discord Developer Portal](https://discord.com/developers/applications) and invite the bot to the required Discord server.

Generate and insert the bot token into the .env file. 

```
BOT_TOKEN = "<insert token here>"
```

## Starting the Bot

Run the command below to start the bot.

```
node bot.js
```

If successful the console log will show 'Connected' and the status of the bot should be shown as 'Online' in the Discord server.

![image](https://user-images.githubusercontent.com/103243606/173297805-bd20182e-1419-4b26-a6ad-82c28ca5f2b5.png)

## Usage

#### Create raid event

```
!create <raidType> <YYYY:MM:DD> <HH:MM:ss>
```

![image](https://user-images.githubusercontent.com/103243606/173298675-09537421-2f48-4687-b161-ad5ee09c0eeb.png)

#### List raid events

*raidId* can be obtained here

```
!list
```

![image](https://user-images.githubusercontent.com/103243606/173299686-b74faf15-02f7-4282-8b66-6412f7220d49.png)

#### Show raid event

```
!show <raidId>
```

![image](https://user-images.githubusercontent.com/103243606/173299822-a8fd9b7c-d00d-416e-8cc5-210a4be3ecd9.png)

#### Delete raid event

```
!delete <raidId>
```

![image](https://user-images.githubusercontent.com/103243606/173299920-4e6abc30-9cef-425f-9747-72a2e5db3aa7.png)

#### Join raid event

```
!join <raidId> <gameName> <gameRole>
```

![image](https://user-images.githubusercontent.com/103243606/173299453-9b33f9dd-e630-4a67-b6f6-bdb6b66b201e.png)

#### Leave raid event

```
!leave <raidId> <gameName>
```

![image](https://user-images.githubusercontent.com/103243606/173299606-da2b11d2-4f69-433f-8b49-af3cfb53b770.png)

#### Help

To view all available commands and required arguments

```
!help
```
