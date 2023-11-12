import { z } from 'zod';
export const githubFormSchema = z.object({
	url: z
		.string()
		.url()
		.regex(/https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/)
});
export type GithubFormSchema = typeof githubFormSchema;
