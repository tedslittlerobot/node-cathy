import type { ExchangeLineDirection, ExchangeLogInterface, Line } from './types.js';
export default class ExchangeLog implements ExchangeLogInterface {
    readonly exchanges: Line[];
    add(input: string, type: ExchangeLineDirection, source: string): this;
    get latest(): Line | undefined;
    get latestReceived(): Line | undefined;
}
