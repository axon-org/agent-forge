# Discord Bot Identity Setup

**Every agent must have their own Discord bot identity.** This is core infrastructure.

## Why Individual Bots

| With Individual Bots | Without (Shared Bot) |
|---------------------|---------------------|
| Clear identity — Devi posts as "Devi 🧬" | All agents post as "Alim's Bot" |
| Professional appearance | Confusing who's speaking |
| Direct agent mentions work | Have to route through main bot |
| Scalable to 100+ agents | Bottleneck on single identity |

## Step-by-Step Setup

### Step 1: Create Discord Bot Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. **Name:** Use agent's name (e.g., "Devi" or "Idris - Architect")
4. **Avatar:** Upload agent's avatar
5. Navigate to "Bot" section → Click "Add Bot"
6. **Copy bot token**

### Step 2: Invite Bot to Server

1. OAuth2 → URL Generator → Scopes: `bot`
2. **Bot Permissions:**
   - Read Messages/View Channels
   - Send Messages
   - Embed Links
   - Attach Files
   - Read Message History
   - Add Reactions
3. Copy generated URL and invite bot

### Step 3: Configure OpenClaw Routing

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

### Step 4: Verify

1. Restart gateway
2. Mention agent in Discord
3. Verify response comes from agent's bot (correct name and avatar)

## Discord Communication Rules (CRITICAL)

**Discord is for HUMAN visibility. Internal tools are for AGENT coordination.**

- ✅ Posting updates, status reports, results for human visibility
- ✅ Reacting to messages with emoji
- ✅ Reading messages from humans who @mention you
- ❌ @tagging another agent does NOT reach them
- ❌ Assigning tasks via Discord messages

**To reach another agent:** Use `sessions_spawn` or `sessions_send`.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Bot doesn't respond | Check binding matches `accountId` exactly |
| Bot shows "offline" | Verify `botToken` is correct, restart gateway |
| Messages from wrong bot | Check binding and restart gateway |
| Permission errors | Re-invite with correct scopes |
