import type {SignalConstants} from 'node:os';
import type {CathyInterface, Line} from './types.js';

export default class ConversationKillerError<T> extends Error {
	constructor(
		public cathy: CathyInterface<T>,
		public line: Line,
		public reason: string,
		public signal: keyof SignalConstants | number,
	) {
		super(`Conversation killed [${reason}] in response to line: ${line.cleanedContent}`);
	}
}
