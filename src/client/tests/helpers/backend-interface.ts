import { createAriaClient } from '../../../backend-interface/ariaClient';
import 'dotenv/config';

export * from '../../../backend-interface/ariaClient.generated';
export * from '../../../backend-interface/ariaClient.types';

export const { createUser, getProfile, login } = createAriaClient(
	process.env.ARIA_SERVER_URL || ''
);
