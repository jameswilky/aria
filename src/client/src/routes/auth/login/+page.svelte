<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { formSchema } from './schema';
	import * as Card from '$lib/components/ui/card';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { message } = superForm(data.form);
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>Welcome Back</Card.Title>
		<Card.Description>Enter your details to sign back in</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if $message}
			<p class="text-destructive pb-4">{$message}</p>
		{/if}
		<Form.Root method="POST" form={data.form} schema={formSchema} let:config>
			<Form.Field {config} name="username">
				<Form.Item>
					<Form.Label>Username</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="password">
				<Form.Item>
					<Form.Label>Password</Form.Label>
					<Form.Input type="password" />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<div class="flex">
				<Form.Button class="w-full my-2">Continue</Form.Button>
			</div>
		</Form.Root>
		<Separator class="my-2 " />
		<p class="text-center text-m">
			Dont have an account? <a class="underline" href="/auth/signup"> Sign Up</a>
		</p>
		<p class="text-center text-xs">
			Or just continue as a <a class="underline" href="/dashboard">guest</a>
		</p>
	</Card.Content>
	<Card.Footer class="flex justify-between" />
</Card.Root>
