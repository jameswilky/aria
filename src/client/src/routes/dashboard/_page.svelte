<!-- <script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { githubFormSchema } from './githubFormSchema';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { message } = superForm(data.form, { id: 'test' });
</script>

<div class="flex w-[100%] justify-center items-center">
	<Card.Root class="justify-around w-[600px] mb-40">
		<Card.Header>
			<Card.Title>Specify a GitHub Repository</Card.Title>
			<Card.Description>
				Enter a Github URL to load that repository and provide it as context
			</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if $message}
				<p class="text-destructive text-sm">{$message}</p>
			{/if}
			<Form.Root method="POST" form={data.form} schema={githubFormSchema} let:config>
				<Form.Field {config} name="owner">
					<Form.Item>
						<Form.Label>Repository Owner</Form.Label>
						<Form.Input type="text" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="repo">
					<Form.Item>
						<Form.Label>Repository Name</Form.Label>
						<Form.Input type="text" />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<div class="flex justify-end mt-4">
					<Form.Button>Start</Form.Button>
				</div>
			</Form.Root>
		</Card.Content>
	</Card.Root>
</div> -->
