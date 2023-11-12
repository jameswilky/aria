import { Octokit } from 'octokit';

export async function getRepoFiles(repoUrl: string, auth: string): Promise<string[]> {
	// Create a new Octokit instance
	const octokit = new Octokit({ auth });

	// Extract owner and repo from URL
	const urlSegments = new URL(repoUrl).pathname.split('/');
	const owner = urlSegments[1];
	const repo = urlSegments[2];

	try {
		// Fetch the repository data
		const response = await octokit.request('GET /repos/{owner}/{repo}/contents', {
			owner,
			repo,
			ref: 'master'
		});

		// Filter and map the response to get file paths
		return response.data.filter((item) => item.type === 'file').map((file) => file.path);
	} catch (error) {
		console.error('Error fetching repository data:', error);
		return [];
	}
}
