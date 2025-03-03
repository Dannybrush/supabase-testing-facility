<script>
	export let title;
	export let username;
</script>

<header class="title-bar">
	<h1>{title}</h1>

	<h2> welcome {username}</h2> 
</header>

<style>
	.title-bar {
		width: 100%;
		background: #0077b6;
		color: white;
		padding: 1rem;
		text-align: center;
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>
