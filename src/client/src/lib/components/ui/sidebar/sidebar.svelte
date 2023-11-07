<script lang="ts">
	import Button from '../button/button.svelte';
	import { Home, Settings, MessageSquare, Text, MessageSquarePlus } from 'lucide-svelte';
</script>

<aside class="h-screen flex flex-col w-64 fixedborder-r pt-16 border-secondary border-r-2">
	<div
		class="p-4 border-b border-slate-200 dark:border-slate-700 hover:primary dark:hover:bg-primary-foreground"
	>
		<a class="flex items-center space-x-3 text-primary dark:primary text-m" href="#">
			<MessageSquarePlus />
			<span>New Conversation</span>
		</a>
	</div>

	<nav class="flex-grow overflow-y-auto p-4 border-b border-secondary">
		<ul class="space-y-2">
			<li class="rounded-md hover:primary dark:hover:bg-primary-foreground">
				<a class="flex items-center space-x-3 text-primary dark:primary text-sm" href="#">
					<Text />
					<span>Conversation 1</span>
				</a>
			</li>
		</ul>
	</nav>
	<div class="p-4 border-t border-slate-200 dark:border-slate-700">
		<a class="flex items-center space-x-3 text-m font-medium" href="#">
			<Settings />
			<span>Settings</span>
		</a>
	</div>
</aside>
