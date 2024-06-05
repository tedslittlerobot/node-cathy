/// <reference types="node" />
import type { Socket } from 'node:net';
import type { Options, ResultPromise } from 'execa';
import { type StringResolver } from './types.js';
import ExchangeLog from './exchange-log.class.js';
export default class Cathy<T> {
    private readonly command;
    readonly exchange: ExchangeLog;
    private readonly assertions;
    constructor(command: ResultPromise<T & Options>, exchange?: ExchangeLog);
    get stdin(): Socket;
    get stdout(): Socket | undefined;
    get stderr(): Socket | undefined;
    converse(respondTo: string, withResponse: string | StringResolver, times?: number): this;
    receiveLine(line: string, source: string): Promise<void>;
    run(): Promise<{
        exchange: ExchangeLog;
        execa: import("execa").Result<T & Options>;
    }>;
}
