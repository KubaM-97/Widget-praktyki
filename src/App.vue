<template>
  <div style="max-width: 1200px; margin: auto; width: 100%;">
    <div id="layout-2" class="a44-widget layout" ref="container">
      <suspense>
        <template #default>
          <div>
            <main-component/>
          </div>
        </template>
      </suspense>

    </div>
  </div>
</template>

<script>

import Main from '@/components/Main.vue';

export default{
  components: {
    "main-component": Main,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');

.a44-widget {
    max-width: 1200px;
    width: 100%;
    margin: auto;
    font-family: "Open Sans";
    font-size: 10px;
    margin: auto;
}

.a44-widget * {
    box-sizing: border-box;
}

.a44-widget.a44-xs {
    max-width: 543px;
}

.a44-widget.a44-sm {
    max-width: 767px;
}

.a44-widget.a44-md {
    max-width: 991px;
}

.a44-widget.a44-lg {
    max-width: 1600px;
}

.a44-widget .aclr {
    clear: both;
}

.a44-widget .d-none {
    display: none;
}
</style>