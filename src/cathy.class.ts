import type {Socket} from 'node:net';
import type {Options, ResultPromise} from 'execa';
import {type RawConversationalAssertion, type StringResolver} from './types.js';
import ExchangeLog from './exchange-log.class.js';
import {resolveResolvableString} from './utils.js';

export default class Cathy<T> {
	private readonly assertions: RawConversationalAssertion[] = [];

	constructor(
		private readonly command: ResultPromise<T & Options>,
		public readonly exchange = new ExchangeLog(),
	) {}

	get stdin(): Socket {
		if (!this.command.stdin) {
			throw new Error('Cannot run Cathy with an Execa with no stdin');
		}

		return this.command.stdin as unknown as Socket;
	}

	get stdout(): Socket | undefined {
		if (!this.command.stdout) {
			return undefined;
		}

		return this.command.stdout as unknown as Socket;
	}

	get stderr(): Socket | undefined {
		if (!this.command.stderr) {
			return undefined;
		}

		return this.command.stderr as unknown as Socket;
	}

	converse(respondTo: string, withResponse: string | StringResolver, times?: number) {
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

	async receiveLine(line: string, source: string) {
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
			['stdout', this.stdout] as const,
			['stderr', this.stderr] as const,
		].filter(([_, socket]) => Boolean(socket));

		if (streams.length === 0) {
			throw new Error('Cannot run Cathy with an Execa with no stdout OR stderr');
		}

		for (const [name, stream] of streams) {
			stream!.on('data', (line: Uint8Array) => {
				void this.receiveLine(line.toString(), name);
			});
		}

		return {exchange: this.exchange, execa: await this.command};
	}
}
