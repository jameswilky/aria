import { Octokit } from 'octokit';

export class GitHubClient {
	private octokit: Octokit;

	constructor(auth: string) {
		this.octokit = new Octokit({ auth });
	}

	async getRepoFiles(repoUrl: string): Promise<string[]> {
		const urlSegments = new URL(repoUrl).pathname.split('/');
		const owner = urlSegments[1];
		const repo = urlSegments[2];

		try {
			const response = await this.octokit.request('GET /repos/{owner}/{repo}/contents', {
				owner,
				repo,
				ref: 'master'
			});

			return response.data.filter((item) => item.type === 'file').map((file) => file.path);
		} catch (error) {
			console.error('Error fetching repository data:', error);
			return [];
		}
	}
}
