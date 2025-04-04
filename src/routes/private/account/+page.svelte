<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { enhance } from '$app/forms';
	import type { Server, SubmitFunction } from '@sveltejs/kit';
	import Avatar from '$lib/components/Avatar.svelte';

	export let data; // this export tells the page to inherit the data from props/locals of the parent.
	export let form; // means that form is a prop that is passed into the component. It allows the component to receive data from its parent or from SvelteKit's load functions
	// form is often populated by load functions in +page.server.ts/js or +page.ts/js.
	// Specifically, when handling forms, it usually holds validation messages, errors, or any other data returned from a load function.

	let { session, profile } = data;
	$: ({ session, profile } = data); // this is a reactive statement, meaning that this line will re run whenever there is a change to data
	// in theory if the session changes or if the profile changes, this should refresh automatically.

	let profileForm: HTMLFormElement;
	let loading = false; // simple variable to store whether  the page is stillloading
	let fullName: string = profile?.full_name ?? ''; // if profile exists, and profile.full_name exists use that - otherwise ''
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let avatarUrl: string = profile?.avatar_url ?? ''; // could replace with the url for a stock image here.

	const handleSubmit: SubmitFunction = () => {
		//This type is imported from ./$types.js or ./$types.ts, which is auto-generated by SvelteKit.
		//It represents the function signature used for handling form submissions with progressive enhancement.
		loading = true;
		return async () => {
			loading = false;
		};
	};
	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="form-container">
	<h2>Profile</h2>
	<div class="form-widget">
		<!-- 
        class - predefined css for the 
        method Post - sends the data via a post request , entered data will be sent in request body rather than being appended to url parameters
        action="?/update" - "?/update" means the post req will be sent to the current url with /update as the query. Handled under the update action in +page.server.ts
        use:enhance - intercepts submission and enhances it with Javascript, allowing real-time validation and ui updates
        bind: - binds to a variable, to give direct access to the form inside the script eg. myform.reset()
    -->

		<form
			class="form-widget"
			method="post"
			action="?/update"
			use:enhance={handleSubmit}
			bind:this={profileForm}
		>
			<div class="avatar">
				<Avatar
					{supabase}
					bind:url={avatarUrl}
					size={10}
					on:upload={() => {
						profileForm.requestSubmit();
					}}
				/>
			</div>

			<div>
				<label for="email">Email</label>
				<input id="email" type="text" value={session.user.email} disabled />
				<!-- disable prevents the user from changing this-->
			</div>

			<div>
				<label for="fullName">Full Name</label>
				<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
			</div>

			<div>
				<label for="username">Username</label>
				<input id="username" name="username" type="text" value={form?.username ?? username} />
			</div>

			<div>
				<label for="website">Website</label>
				<input id="website" name="website" type="url" value={form?.website ?? website} />
			</div>
            <div class="button-group"> <!-- CHANGED: Wrapped buttons in div for better styling -->
				<input
					type="submit"
					class="button primary block"
					value={loading ? 'Loading...' : 'Update'}
					disabled={loading}
				/>
			</div>
		</form>

		<form method="post" action="?/signout" use:enhance={handleSignOut}>
			<div class="button-group"> <!-- CHANGED: Styled button separately -->
				<button class="button block" disabled={loading}>Sign Out</button>
			</div>
		</form>
	</div>
</div>

<style>
	.form-container {
		max-width: 500px;
		margin: 2rem auto;
		padding: 2rem;
		background: linear-gradient(135deg, #0077b6, #00b4d8); /* CHANGED: Added gradient background */
		border-radius: 12px;
		box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* CHANGED: More pronounced shadow */
		color: white;
		text-align: center;
	}

	.form-container h2 {
		margin-bottom: 1rem;
		font-size: 2rem; /* CHANGED: Slightly larger heading */
		font-weight: bold;
	}

	.form-widget {
		display: flex;
		flex-direction: column;
		gap: 1.5rem; /* CHANGED: Increased spacing */
	}

	.input-group {
		text-align: left; /* CHANGED: Left-align labels */
	}

	label {
		font-size: 1rem;
		font-weight: bold;
		display: block;
		margin-bottom: 0.5rem;
	}

	input {
		width: 100%;
		padding: 0.8rem;
		border-radius: 8px; /* CHANGED: Rounded corners */
		border: none;
		font-size: 1rem;
	}

	.button-group {
		display: flex;
		justify-content: center;
		gap: 1rem; /* CHANGED: Added spacing between buttons */
	}

	.button {
		width: 100%;
		padding: 0.8rem;
		font-size: 1rem;
		font-weight: bold;
		border: none;
		border-radius: 8px; /* CHANGED: More rounded buttons */
		cursor: pointer;
		transition: background 0.3s, transform 0.2s;
	}

	.button.primary:hover {
		background: #90e0ef;
		transform: scale(1.05); /* CHANGED: Subtle hover effect */
	}

	.avatar-container {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}
</style>