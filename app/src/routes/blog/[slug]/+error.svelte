<script lang='ts'>
  import {page} from '$app/stores'
</script>

<div class="error">
  <h1>
    {$page.status}
  </h1>
  <p>
    {$page.error?.message}
  </p>
</div>

<style lang="postcss">
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 162.5px);
  }
</style>