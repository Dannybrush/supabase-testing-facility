<script lang="ts">
    // The data prop is passed from the server-side load function in +layout.server.ts.
    export let data: { user: { email: string } };
    const { user } = data;
  </script>
  
  <h1>Profile Page</h1>
  <p>Welcome, {user.email}!</p>
  <p>This is a protected page accessible only to authenticated users.</p>
  