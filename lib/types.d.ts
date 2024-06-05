/// <reference types="node" />
import type { Socket } from 'node:net';
export type ResolvableString = string | StringResolver | AsyncStringResolver;
export type StringResolver = () => string;
export type AsyncStringResolver = () => Promise<string>;
export type ExchangeLineDirection = 'receive' | 'response';
export type Line = {
    type: ExchangeLineDirection;
    source: string;
    content: string;
};
export type RawConversationalAssertion = {
    times?: number;
    when(exchange: ExchangeLogInterface): boolean;
    respond(socket: Socket): Promise<string[]>;
};
export type ExchangeLogInterface = {
    exchanges: Line[];
    latest?: Line;
    latestReceived?: Line;
    add(input: string, type: ExchangeLineDirection, source: string): ExchangeLogInterface;
};
