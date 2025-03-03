<script>
    let { data, children } = $props()
    let { supabase } = $derived(data) //unpacking the supabase instance - if the original chasnges this is updated. 
    import  TitleBar  from '$lib/components/TitleBar.svelte';
    import SideNav from '$lib/components/SideNav.svelte';
    
    const logout = async () => {
      console.log("signing out")
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error(error)
      }
    }
  </script>
  
  <div class="layout">
    <TitleBar title="My Application" username={data.username}/>
    <div class="main-container">
      <SideNav {logout}/>
      <main>
        {@render children()}
      </main>
    </div>
  </div>
  <style>
    .layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
  
    .main-container {
      display: flex;
      flex: 1;
    }
  
    main {
      flex-grow: 1;
      padding: 2rem;
      background: #f5f5f5;
      overflow-y: auto;
    }
  </style>