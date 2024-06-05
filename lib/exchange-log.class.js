export default class ExchangeLog {
    exchanges = [];
    add(input, type, source) {
        this.exchanges.push(...input.split('\n')
            .filter(Boolean)
            .map(content => ({ type, content, source })));
        return this;
    }
    get latest() {
        if (this.exchanges.length === 0) {
            return undefined;
        }
        return this.exchanges.at(-1);
    }
    get latestReceived() {
        const pool = this.exchanges.filter(item => item.type === 'receive');
        if (pool.length === 0) {
            return undefined;
        }
        return pool.at(-1);
    }
}
//# sourceMappingURL=exchange-log.class.js.map