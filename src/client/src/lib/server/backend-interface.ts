export * from '../../../../backend-interface/ariaClient.generated';
export * from '../../../../backend-interface/ariaClient.types';

import { createAriaClient } from '../../../../backend-interface/ariaClient';
import { ARIA_CLIENT_URL } from '$env/static/private';

export const { createUser, getProfile, login } = createAriaClient(ARIA_CLIENT_URL);
