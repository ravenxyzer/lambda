import { Listener } from '@sapphire/framework';
import { Client, ExcludeEnum } from 'discord.js';
import { ActivityTypes } from 'discord.js/typings/enums';

export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready'
    })
  }
  
  public run(client: Client) {
    const { username, id } = client.user!;
    this.container.logger.info(`Successfully logged in as ${username}`);
    const IPresence = [
      {
        name: "Masa Lalu",
        type: "WATCHING"
      },
      {
        name: "Nyanyian Indahnya",
        type: "LISTENING"
      }
    ]

    let counter = 0;
    const updateStatus = () => {
      client.user?.setPresence({
        status: "online",
        activities: [
          {
            name: IPresence[counter].name,
            type: IPresence[counter].type as ExcludeEnum<typeof ActivityTypes, 'CUSTOM'>
          }
        ]
      })
      if (++counter >= IPresence.length) {
        counter = 0
      }
      setTimeout(updateStatus, 1000 * 10)
    }
    updateStatus()
  }
}