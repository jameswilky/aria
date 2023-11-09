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
		<Card.Title>Create your account</Card.Title>
		<Card.Description>Enter your details below to setup your account</Card.Description>
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
			<Form.Field {config} name="email">
				<Form.Item>
					<Form.Label>Email</Form.Label>
					<Form.Input type="email" />
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
		<p class="text-center">
			Already have an account? <a class="underline" href="/auth/login"> Log In</a>
		</p>
		<p class="text-center">
			Or just contiue as a <a class="underline" href="/dashboard">Guest</a>
		</p>
	</Card.Content>
	<Card.Footer class="flex justify-between" />
</Card.Root>
