import type {ExchangeLineDirection, ExchangeLogInterface, Line} from './types.js';

export default class ExchangeLog implements ExchangeLogInterface {
	public readonly exchanges: Line[] = [];

	add(input: string, type: ExchangeLineDirection, source: string) {
		this.exchanges.push(
			...input.split('\n')
				.filter(Boolean)
				.map(content => ({type, content, source})),
		);

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
