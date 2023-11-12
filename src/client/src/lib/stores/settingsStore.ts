// settingsStore.ts
import { writable, type Writable } from 'svelte/store';

// Define the settings interface
export interface Settings {
	githubApiKey: string;
	openAiApiKey: string;
}

// Define the initial settings using the Settings interface
const defaultSettings: Settings = {
	githubApiKey: '',
	openAiApiKey: ''
};

export function getSettings(): Settings {
	const settings = localStorage.getItem('settings');
	return settings ? JSON.parse(settings) : { githubApiKey: '', openAiApiKey: '' };
}

// Function to save settings to localStorage
export function saveSettings(settings: Settings): void {
	localStorage.setItem('settings', JSON.stringify(settings));
}
