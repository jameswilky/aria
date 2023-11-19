import { z } from 'zod';
export const githubFormSchema = z.object({
	owner: z.string().min(2),
	repo: z.string().min(2)
});
export type GithubFormSchema = typeof githubFormSchema;
