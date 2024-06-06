// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava';
import Cathy, {ConversationKillerError} from './index.js';

test('testing main export', t => {
	t.is(typeof Cathy, 'function');
	t.true(Cathy.toString().startsWith('class Cathy'));
});

test('testing error export', t => {
	t.is(typeof ConversationKillerError, 'function');
	t.true(ConversationKillerError.toString().startsWith('class ConversationKillerError'));
});
