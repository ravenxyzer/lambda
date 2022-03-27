"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadyListener = void 0;
const framework_1 = require("@sapphire/framework");
class ReadyListener extends framework_1.Listener {
    constructor(context, options) {
        super(context, Object.assign(Object.assign({}, options), { once: true, event: 'ready' }));
    }
    run(client) {
        const { username, id } = client.user;
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
        ];
        let counter = 0;
        const updateStatus = () => {
            var _a;
            (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
                status: "online",
                activities: [
                    {
                        name: IPresence[counter].name,
                        type: IPresence[counter].type
                    }
                ]
            });
            if (++counter >= IPresence.length) {
                counter = 0;
            }
            setTimeout(updateStatus, 1000 * 10);
        };
        updateStatus();
    }
}
exports.ReadyListener = ReadyListener;
