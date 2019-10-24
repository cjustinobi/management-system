<template>
  <div>
    <Component v-for="(field, index) in schema"
               :key="index"
               :is="field.fieldType"
               :value="formData[field.name]"
               @input="updateForm(field.name, $event)"
               v-bind="field"
    />
  </div>
</template>

<script>
  import SelectList from './SelectList'
  import TextInput from './TextInput'
  export default {
    components: { SelectList, TextInput },
    props: ['schema', 'value'],
    data() {
      return {
        formData: this.value || {}
      }
    },
    methods: {
      updateForm(fieldName, value) {
        this.$set(this.formData, fieldName, value)
        this.$emit("input", this.formData)
      }
    },
    mounted() {
      this.$bus.$on('editItem', item => {
        this.formData = item
      })
    }
  }
</script>
