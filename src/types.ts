import type {SignalConstants} from 'node:os';
import type {Socket} from 'node:net';
import type {Options, Result} from 'execa';

export type ResolvableString = string | StringResolver | AsyncStringResolver;
export type StringResolver = () => string;
export type AsyncStringResolver = () => Promise<string>;

export type ExchangeLineDirection = 'receive' | 'response';
export type Line = {
	type: ExchangeLineDirection;
	source: string;
	content: string;
	cleanedContent: string;
};

export type RawConversationalAssertion = {
	times?: number;
	when(exchange: ExchangeLogInterface): boolean;
	respond<T>(cathy: CathyInterface<T>): Promise<string[]>;
};

export type ExchangeLogInterface = {
	exchanges: Line[];
	latest?: Line;
	latestReceived?: Line;
	add(input: string, type: ExchangeLineDirection, source: string): ExchangeLogInterface;
};

export type CathyInterface<T> = {
	exchange: ExchangeLogInterface;
	stdin: Socket;
	stdout?: Socket;
	stderr?: Socket;
	sendMessage(message: string, newline?: boolean): void;
	converse(respondTo: string, withResponse: string | ResolvableString, times?: number): void;
	addRawAssertion(assertion: RawConversationalAssertion): void;
	run(): Promise<{exchange: ExchangeLogInterface; execa: Result<T & Options>}>;
	kill(line: Line, reason: string, signal?: keyof SignalConstants | number): void;
};
