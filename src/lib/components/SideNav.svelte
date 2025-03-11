<script>
    //let { logout } =$props()
	const links = [
		{ name: 'Profile', href: '/profile' },
		{ name: 'Settings', href: '/settings' },
		{ name: 'Logout', href: '/logout' }
	];

    async function logout() {
        const response = await fetch('/auth/logout', { method: 'POST' });

        if (response.ok) {
            location.reload();
        } else {
            console.error('Logout failed');
        }
    }
</script>

<nav class="side-nav">
	<ul>
		{#each links as link}
			<li><a href={link.href}>{link.name}</a></li>
		{/each}
	</ul>
    <button onclick={logout}>Logout here</button>
</nav>

<style>
	.side-nav {
		width: 250px;
		background: #03045e;
		color: white;
		padding: 1rem;
	}

	.side-nav ul {
		list-style: none;
		padding: 0;
	}

	.side-nav li {
		margin-bottom: 1rem;
	}

	.side-nav a {
		color: white;
		text-decoration: none;
		font-weight: bold;
	}
</style>
