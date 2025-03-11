<script lang="ts">
    let { data } = $props();
    const {blogPosts} = $derived(data);
</script>

<h1>Admin Blog Management</h1>

<!-- Form to add a new blog post -->
<form method="POST" action="?/create">
    <input type="text" name="title" placeholder="Title" required />
    <textarea name="content" placeholder="Content" required></textarea>
    <button type="submit">Add Post</button>
</form>

<h2>Existing Posts</h2>
{#if blogPosts.length === 0}
    <p>No blog posts found.</p>
{:else}
    <ul>
        {#each blogPosts as post}
            <li>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <form method="POST" action="?/delete">
                    <input type="hidden" name="post_id" value={post.id} />
                    <button type="submit">Delete</button>
                </form>
            </li>
        {/each}
    </ul>
{/if}
