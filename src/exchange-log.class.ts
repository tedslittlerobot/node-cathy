import stripAnsi from 'strip-ansi';
import type {ExchangeLineDirection, ExchangeLogInterface, Line} from './types.js';

type ExchangeEventHandler = (line: Line) => void;

export default class ExchangeLog implements ExchangeLogInterface {
	public readonly exchanges: Line[] = [];
	public onExchange?: ExchangeEventHandler = undefined;

	add(input: string, type: ExchangeLineDirection, source: string) {
		const toAdd: Line[] = input.split('\n')
			.filter(Boolean)
			.map(content => ({
				type,
				content,
				source,
				cleanedContent: stripAnsi(content).trim(),
			}));

		for (const line of toAdd) {
			if (this.onExchange) {
				this.onExchange(line);
			}

			this.exchanges.push(line);
		}

		return this;
	}

	get latest(): Line | undefined {
		if (this.exchanges.length === 0) {
			return undefined;
		}

		return this.exchanges.at(-1);
	}

	get latestReceived(): Line | undefined {
		const pool = this.exchanges.filter(item => item.type === 'receive');

		if (pool.length === 0) {
			return undefined;
		}

		return pool.at(-1);
	}
}
