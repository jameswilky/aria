import type { IAddUser } from './backend-interface';
import { faker } from '@faker-js/faker';

const numberToLetters = (num: number): string => {
	let letters = '';
	num += 1;
	while (num > 0) {
		let remainder = (num - 1) % 26;
		letters = String.fromCharCode(remainder + 65) + letters; // 65 is the ASCII code for 'A'
		num = Math.floor((num - 1) / 26);
	}
	return letters;
};

const workerId = parseInt(process.env.TEST_WORKER_INDEX || '0', 10);
const workerPrefix = numberToLetters(workerId);
const generatedUsernames = new Set();
const generatedEmails = new Set();

export const nextUser = (): IAddUser => {
	let username;
	do {
		username = `${workerPrefix}_${faker.internet.userName()}`;
	} while (generatedUsernames.has(username));
	generatedUsernames.add(username);

	let email;
	do {
		email = `${workerPrefix}_${faker.internet.email()}`;
	} while (generatedEmails.has(email));
	generatedEmails.add(email);

	const user = {
		username,
		email,
		password: faker.internet.password()
	};

	return user;
};
