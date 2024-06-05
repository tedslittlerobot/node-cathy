import ExchangeLog from './exchange-log.class.js';
import { resolveResolvableString } from './utils.js';
export default class Cathy {
    command;
    exchange;
    assertions = [];
    constructor(command, exchange = new ExchangeLog()) {
        this.command = command;
        this.exchange = exchange;
    }
    get stdin() {
        if (!this.command.stdin) {
            throw new Error('Cannot run Cathy with an Execa with no stdin');
        }
        return this.command.stdin;
    }
    get stdout() {
        if (!this.command.stdout) {
            return undefined;
        }
        return this.command.stdout;
    }
    get stderr() {
        if (!this.command.stderr) {
            return undefined;
        }
        return this.command.stderr;
    }
    converse(respondTo, withResponse, times) {
        this.assertions.push({
            times,
            when(exchange) {
                return exchange.latestReceived?.content.trim() === respondTo;
            },
            async respond(socket) {
                const response = await resolveResolvableString(withResponse);
                socket.write(`${response}\n`);
                return [response];
            },
        });
        return this;
    }
    async receiveLine(line, source) {
        this.exchange.add(line, 'receive', source);
        for (const item of this.assertions.filter(item => item.times === undefined || item.times > 0)) {
            if (item.when(this.exchange)) {
                // eslint-disable-next-line no-await-in-loop
                const responses = await item.respond(this.stdin);
                if (item.times !== undefined) {
                    item.times -= 1;
                }
                for (const response of responses) {
                    this.exchange.add(response, 'response', 'cathy');
                }
            }
        }
    }
    async run() {
        if (!this.command.stderr) {
            throw new Error('Cannot run Cathy with an Execa with no stderr');
        }
        const streams = [
            ['stdout', this.stdout],
            ['stderr', this.stderr],
        ].filter(([_, socket]) => Boolean(socket));
        if (streams.length === 0) {
            throw new Error('Cannot run Cathy with an Execa with no stdout OR stderr');
        }
        for (const [name, stream] of streams) {
            stream.on('data', (line) => {
                void this.receiveLine(line.toString(), name);
            });
        }
        return { exchange: this.exchange, execa: await this.command };
    }
}
//# sourceMappingURL=cathy.class.js.map