<!-- 
	Email Address
	User Name
	Password
	Sign up button
	'Already have an account? Log in' button
 -->
<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { formSchema, type FormSchema } from './schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<FormSchema>;
	import * as Card from '$lib/components/ui/card';
	import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>Create your account</Card.Title>
		<Card.Description>Enter your details below to setup your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root method="POST" {form} schema={formSchema} let:config>
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
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="password">
				<Form.Item>
					<Form.Label>Password</Form.Label>
					<Form.Input />
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
	</Card.Content>
	<Card.Footer class="flex justify-between" />
</Card.Root>
