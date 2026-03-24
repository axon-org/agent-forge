# Discord Bot Identity Setup

Every agent must have their own Discord bot identity.

## Why Individual Bots Matter

| With Individual Bots | Without |
|---------------------|---------|
| Clear identity — "Devi 🧬" | All agents post as "Alim's Bot" |
| Professional appearance | Confusing who's speaking |
| Direct agent mentions work | Route through main bot |

## Setup Steps

### 1. Create Discord Bot Application
1. Go to Discord Developer Portal
2. "New Application" → Name with agent's name
3. Upload agent avatar
4. Navigate to "Bot" → "Add Bot"
5. Copy bot token

### 2. Invite Bot to Server
1. OAuth2 → URL Generator
2. Scopes: `bot`
3. Permissions: Read Messages, Send Messages, Embed Links, Attach Files, Read History, Add Reactions
4. Copy URL → invite to server

### 3. Configure OpenClaw Routing

Add account to `channels.discord.accounts`:
```json
{
  "<account-id>": {
    "botToken": "<BOT_TOKEN>"
  }
}
```

Add binding:
```json
{
  "agentId": "<agent-id>",
  "match": {
    "channel": "discord",
    "accountId": "<account-id>"
  }
}
```

### 4. Verify
- Agent responds from their own bot
- Avatar and name appear correctly

## Key Rule

> Discord is for HUMAN visibility. Internal tools (`sessions_spawn`, `sessions_send`) are for AGENT coordination. @tagging another agent in Discord does NOT reach them.
