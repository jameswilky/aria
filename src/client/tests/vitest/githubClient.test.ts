import { GitHubClient } from '$lib/github/GithubClient';
import { describe, expect, it, test } from 'vitest';

const path = process.env.GITHUB_TEST_URL || '';
const auth = process.env.GITHUB_TEST_API_KEY || '';

describe('GitHubClient', () => {
	it('should', async () => {
		const client = new GitHubClient(auth);
	});
});

test('adds 1 + 2 to equal 3', () => {
	expect(1 + 2).toBe(3);
});
