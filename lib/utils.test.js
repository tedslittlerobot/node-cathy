// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava';
import { resolveResolvableString } from './utils.js';
test('resolveResolvableString resolves string from string', async (t) => {
    t.is(await resolveResolvableString('foo'), 'foo');
});
test('resolveResolvableString resolves string from regular function', async (t) => {
    t.is(await resolveResolvableString(() => 'foo'), 'foo');
});
test('resolveResolvableString resolves string from async function', async (t) => {
    t.is(await resolveResolvableString(async () => 'foo'), 'foo');
});
//# sourceMappingURL=utils.test.js.map