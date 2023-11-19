import { Octokit } from 'octokit';
import type { Endpoints, OctokitResponse } from '@octokit/types';
import type { Result } from '../results/results';
import { success, error } from '../results/results';
import type { FileEntityData, FileSystemEntityData } from '../filesystem/filesystem';

type GithubContents = Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data'];

export class GitHubClient {
	private octokit: Octokit;

	constructor(auth: string) {
		this.octokit = new Octokit({ auth });
	}

	getFileContents(
		owner: string,
		repo: string,
		branch: string = 'master'
	): (entity: FileEntityData) => Promise<Result<string>> {
		return async (entity: FileSystemEntityData) => {
			const response = await this.octokit.rest.repos.getContent({
				owner: owner,
				repo: repo,
				path: entity.path,
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
	}

	getDirectoryContents(
		owner: string,
		repo: string,
		branch: string = 'master'
	): (entity: FileSystemEntityData) => Promise<Result<FileSystemEntityData[]>> {
		// @ts-ignore
		return async (entity: FileSystemEntityData) => {
			try {
				const response = await this.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
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
								getFileContents: this.getFileContents(owner, repo, branch)
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
	}

	async getRepoContents(
		owner: string,
		repo: string,
		branch: string = 'master'
	): Promise<Result<FileSystemEntityData[]>> {
		try {
			const response = await this.octokit.request('GET /repos/{owner}/{repo}/contents', {
				owner,
				repo,
				ref: branch
			});
			return success(response.data);
		} catch (e) {
			return error(e);
		}
	}
}
