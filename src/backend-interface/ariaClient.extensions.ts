export class IConfig {
	authToken!: string | undefined | null;
}

export class ApiClientBase {
	private readonly config: IConfig;

	protected constructor(config: IConfig) {
		this.config = config;
	}

	protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
		options.headers = {
			...options.headers,
			...(this.config.authToken ? { Authorization: this.config.authToken } : {})
		};
		return Promise.resolve(options);
	};
}
