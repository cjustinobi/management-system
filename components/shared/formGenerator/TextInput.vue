<template>
  <div>
    <label>{{label}}</label>

    <input :type="type ? type : 'text'"
           :name="name"
           :value="value"
           @input="$emit('input',$event.target.value)"
           :placeholder="placeholder"
           :class="name"
    />

  </div>
</template>
<script>
export default {
  name: 'TextInput',
  props: ['placeholder', 'label', 'name', 'value', 'type']
}
</script>