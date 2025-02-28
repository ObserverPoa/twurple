Getting data from the Twitch API is sadly split into many systems. Here's some handy tables on which library you can and
should use for which use case.

## Current state & actions

| Operation                                     | `@twurple/api`           | `@twurple/chat`                |
|-----------------------------------------------|--------------------------|--------------------------------|
| Start an ad                                   | Yes                      | Yes                            |
| Get Bits leaderboard                          | Yes                      | No                             |
| Get available Cheermotes                      | Yes                      | No                             |
| Get Extension transactions                    | Yes                      | No                             |
| Get channel category/title                    | Yes                      | No                             |
| Set channel category/title                    | Yes                      | No                             |
| Get channel editors                           | Yes                      | No                             |
| Manage custom rewards & redemptions           | Yes                      | No                             |
| Get available emotes & badges                 | Yes                      | No                             |
| Get & create clips                            | Yes                      | No                             |
| Manage drops                                  | No (supported by Twitch) | No                             |
| Manage extensions                             | Yes                      | No                             |
| Get category info                             | Yes                      | No                             |
| Manage polls & predictions                    | Yes                      | No                             |
| Get banned users                              | Yes                      | No                             |
| Ban/unban/timeout users                       | Yes                      | Yes                            |
| Get & manage schedules                        | Yes                      | No                             |
| Search categories                             | Yes                      | No                             |
| Search channels                               | Yes                      | No                             |
| Get stream key                                | Yes                      | No                             |
| Get info about streams                        | Yes                      | No                             |
| Manage stream markers                         | Yes                      | No                             |
| Get list of subscribers                       | Yes                      | No                             |
| Check subscription                            | Yes                      | Only when they write a message |
| Get list of VIPs                              | Yes                      | Yes                            |
| Check VIP                                     | Yes                      | Only when they write a message |
| Manage VIPs                                   | Yes                      | Yes                            |
| Get list of moderators                        | Yes                      | Yes                            |
| Manage moderators                             | Yes                      | Yes                            |
| Get & manage stream tags                      | Yes                      | No                             |
| Get team info                                 | Yes                      | No                             |
| Get user info                                 | Yes                      | Login, display name, ID only   |
| Get & manage follows                          | Yes                      | No                             |
| Get & manage VODs                             | Yes                      | No                             |
| Raid users                                    | Yes                      | Yes                            |
| Send chat messages                            | No                       | Yes                            |
| Send chat announcements                       | Yes                      | Yes                            |
| Send whispers                                 | Yes                      | Yes                            |
| Remove chat messages                          | Yes                      | Yes                            |
| Set chat modes (e.g. emote/sub/follower only) | Yes                      | Yes                            |
| Get & manage AutoMod settings                 | Yes                      | No                             |
| Fetch currently playing Soundtrack track      | No (supported by Twitch) | No                             |
| Get current Creator Goals state               | Yes                      | No                             |

## Events

| Event type                        | `@twurple/chat`              | `@twurple/pubsub`         | `@twurple/eventsub-*`     |
|-----------------------------------|------------------------------|---------------------------|---------------------------|
| Chat messages                     | Yes                          | Sub & cheer messages only | Sub & cheer messages only |
| Chat mode (e.g. sub only) changes | Yes                          | No                        | No                        |
| Whispers                          | Yes                          | Yes                       | No                        |
| Cheers                            | Yes                          | Yes                       | Yes                       |
| Channel points                    | Redemptions w/ messages only | Redemptions only          | Yes                       |
| Subscriptions                     | Published only               | Published only            | Yes                       |
| AutoMod                           | No                           | Yes                       | No                        |
| Live / offline / stream changes   | No                           | No                        | Yes                       |
| Follows                           | No                           | No                        | Yes                       |
| Raids                             | Yes                          | No                        | Yes                       |
| Bans                              | Yes                          | Yes                       | Yes                       |
| Mod add/remove                    | No                           | Yes                       | Yes                       |
| Polls & predictions               | No                           | No                        | Yes                       |
| Extension transactions            | No                           | No                        | Yes                       |
| Hype Trains                       | No                           | No                        | Yes                       |
| Authorization grant/revoke        | No                           | No                        | Yes                       |
| Drops                             | No                           | No                        | No (supported by Twitch)  |
