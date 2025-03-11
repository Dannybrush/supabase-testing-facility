<script lang="ts">
    let { data } = $props();
    const {blogPosts} = $derived(data);
</script>

<h1>Blog Posts</h1>
{#if blogPosts.length === 0}
    <p>No blog posts found.</p>
{:else}
    <ul>
        {#each blogPosts as post}
            <li>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <small>Published: {new Date(post.created_at).toLocaleString()}</small>
            </li>
        {/each}
    </ul>
{/if}
