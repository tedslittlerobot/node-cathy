// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava';
import Cathy from './index.js';
test('testing main export', t => {
    t.is(typeof Cathy, 'function');
    t.true(Cathy.toString().startsWith('class Cathy'));
});
//# sourceMappingURL=index.test.js.map