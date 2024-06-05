import {type ResolvableString} from './types.js';

export async function resolveResolvableString(input: ResolvableString): Promise<string> {
	if (typeof input === 'string') {
		return input;
	}

	return input();
}
