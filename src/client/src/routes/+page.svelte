<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<div
	class="min-h-screen flex items-center justify-center bg-gradient-to-r from-background to-accent text-primary"
>
	<div class="w-2/5 h-screen bg-background bg-opacity-50 flex items-center justify-center">
		<h1 class="scroll-m-20 text-8xl font-extrabold tracking-tight lg:text-8xl">Aria</h1>
	</div>
	<div class=" w-3/5 h-screen flex justify-center items-center">
		<Card.Root class="w-[350px]">
			<Card.Header>
				<Card.Title>Get Started</Card.Title>
				<Card.Description>
					Sign up to create and manage your own autonomous AI agents.
				</Card.Description>
			</Card.Header>
			<Card.Content />
			<Card.Footer class="flex justify-between">
				<Button variant="outline" href="/auth/login">Login</Button>
				<Button variant="outline" href="/auth/signup">Signup</Button>
				<Button variant="secondary" href="/dashboard">Skip</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
