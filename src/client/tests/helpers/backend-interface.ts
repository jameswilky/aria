export * from '../../../backend-interface/ariaClient.generated';
export * from '../../../backend-interface/ariaClient.types';

import { createAriaClient } from '../../../backend-interface/ariaClient';

export const { createUser, getProfile, login } = createAriaClient(
	'http://host.docker.internal:5156'
);
