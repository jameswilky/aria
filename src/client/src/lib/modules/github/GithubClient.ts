import { Octokit } from 'octokit';
import type { Endpoints, OctokitResponse } from '@octokit/types';
import type { Result } from '../results/results';
import { success, error } from '../results/results';
import type {
	DirectoryEntityData,
	FileEntityData,
	FileSystemEntityData
} from '../filesystem/filesystem';

type GithubContents = Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data'];

export const githubClient = (auth: string) => {
	const octokit = new Octokit({ auth });

	const getFileContents = (
		owner: string,
		repo: string,
		branch: string = 'master'
	): ((path: string) => Promise<Result<string>>) => {
		return async (path: string) => {
			const response = await octokit.rest.repos.getContent({
				owner,
				repo,
				path,
				ref: branch
			});
			try {
				if ('type' in response.data && response.data.type === 'file') {
					return success(Buffer.from(response.data.content, 'base64').toString('utf-8'));
				} else {
					return error('Path does not point to a file.');
				}
			} catch (e) {
				return error(e);
			}
		};
	};

	const validateApiKey = async (): Promise<Result<boolean>> => {
		try {
			const result = await octokit.rest.users.getAuthenticated();
			return success(true);
		} catch (e) {
			if (e instanceof Error) {
				if (e.message === 'Not Found') return error('Not Found');
				if (e.message === 'Bad credentials') return success(false);
			}
			return error(e);
		}
	};

	const validateRepoExists = async (owner: string, repo: string): Promise<Result<boolean>> => {
		try {
			const result = await octokit.rest.repos.get({ owner, repo });
			console.log(result);
			return success(true);
		} catch (e) {
			if (e instanceof Error) {
				if (e.message === 'Not Found') return success(false);
				if (e.message === 'Bad credentials') return error('Bad credentials');
			}
			return error(e);
		}
	};

	const getDirectoryContents = (
		owner: string,
		repo: string,
		branch: string = 'master'
	): ((entity: DirectoryEntityData) => Promise<Result<any>>) => {
		return async (entity: DirectoryEntityData) => {
			try {
				const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
					owner,
					repo,
					path: entity.path,
					ref: branch
				});

				if (Array.isArray(response.data)) {
					const result = response.data
						.filter((content) => content.type === 'dir' || content.type === 'file')
						.map((content) => {
							return {
								name: content.name,
								path: content.path,
								type: content.type,
								size: content.size,
								getFileContents: getFileContents(owner, repo, branch)
							};
						});

					return success(result);
				} else {
					return error('Path does not point to a directory.');
				}
			} catch (e) {
				return error(e);
			}
		};
	};

	const getRepoContents = async (
		owner: string,
		repo: string,
		branch: string = 'master'
	): Promise<Result<FileSystemEntityData[]>> => {
		try {
			const response = await octokit.request('GET /repos/{owner}/{repo}/contents', {
				owner,
				repo,
				ref: branch
			});
			return success(response.data);
		} catch (e) {
			return error(e);
		}
	};

	return {
		getRepoContents,
		getDirectoryContents,
		validateRepoExists,
		validateApiKey
	};
};
