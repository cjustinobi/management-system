<template>
  <div>
    <label>{{label}}</label>
    <select :multiple="multi" :value="value" @input="$emit('input', $event.target.value)">
      <option>{{ placeholder }}</option>
      <option v-for="option in options" :key="option">{{option}}</option>
    </select>
  </div>
</template>
<script>
export default {
  props: ['multi', 'options', 'name', 'label', 'value', 'placeholder']
}
</script>