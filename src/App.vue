<template>
    <suspense>
      <template #default>
        <div>
          <main-component :offerId='offerId'/>
        </div>
      </template>
    </suspense>
</template>

<script>

import Main from '@/components/Main.vue';

export default{
  components: {
    "main-component": Main,
  },
  props: ['offerId']
}
</script>

