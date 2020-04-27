<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    #tab-bar{
        display: flex;
        position: fixed;
        left: 0;
        right: 0;
        background: #f6f6f6;
        bottom: 0;
        box-shadow: 0 -2px 1px rgba(219, 217, 217, 0.5);
    }
</style>