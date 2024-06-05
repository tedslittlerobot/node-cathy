export async function resolveResolvableString(input) {
    if (typeof input === 'string') {
        return input;
    }
    return input();
}
//# sourceMappingURL=utils.js.map