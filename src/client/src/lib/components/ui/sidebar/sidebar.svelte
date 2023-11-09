<script lang="ts">
	import { Text, MessageSquarePlus } from 'lucide-svelte';
</script>

<aside class="h-screen flex flex-col w-64 fixedborder-r pt-16 border-secondary border-r-2">
	<div
		class="p-4 border-b border-slate-200 dark:border-slate-700 hover:primary dark:hover:bg-primary-foreground"
	>
		<a class="flex items-center space-x-3 text-primary dark:primary text-lg" href="/">
			<MessageSquarePlus />
			<span>New Conversation</span>
		</a>
	</div>

	<nav class="flex-grow overflow-y-auto p-4 border-b border-secondary">
		<ul>
			<li class="rounded-md hover:primary dark:hover:bg-primary-foreground pt-2 pb-2">
				<a class="flex items-center space-x-3 text-primary dark:primary text-m" href="/">
					<Text />
					<span>Conversation 1</span>
				</a>
			</li>
			<li class="rounded-md hover:primary dark:hover:bg-primary-foreground pt-2 pb-2">
				<a class="flex items-center space-x-3 text-primary dark:primary text-m" href="/">
					<Text />
					<span>Conversation 2</span>
				</a>
			</li>
		</ul>
	</nav>
	<div class="p-4 border-t border-slate-200 dark:border-slate-700">
		<slot name="settings" />
	</div>
</aside>
