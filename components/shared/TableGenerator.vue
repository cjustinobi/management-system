<template>
  <div>
    <label>Select column to remove</label>
    <span v-for="(col, i) in cols">
      <label :for="col">{{ col }}</label>
      <input type="checkbox" :id="col" :value="col" @click="addRemoveColumn(col)" :key="i"/>
    </span>
    <table>
      <thead>
      <tr>
        <th v-for="(column, index) in columns" :class="column" :key="index"> {{ column | columnHead }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in source" :key="index">
        <td v-for="(column, i) in columns" :class="column" :ref="`${column}${index}`" :key="i">{{ customColumns(item, column, index) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: ['items'],
    data() {
      return {
        cols: [],
        clonedItems: []
      }
    },
    methods: {
      addRemoveColumn(column) {
        const elements = document.querySelectorAll(`.${column}`)
        elements.forEach(element => {
          if (element.style.display === 'none') {
            element.style.display = ''
          } else {
            element.style.display = 'none'
          }
        })
      },
      customColumns(item, column, itemsIndex) {
        const vm = this
        let elements = vm.$refs[`${column}${itemsIndex}`]

          if (column === 'actions' && vm.$refs[`${column}${itemsIndex}`]) {

            // View element.
            const viewElement = document.createElement('button');
            viewElement.textContent = 'View';
            viewElement.addEventListener('click', () => vm.viewItem(item))

            // Delete element.
            const deleteElement = document.createElement('button');
            deleteElement.textContent = 'Delete';
            deleteElement.addEventListener('click', () => vm.deleteItem(item.id))

            // Edit Element.
            const editElement = document.createElement('button');
            editElement.textContent = 'Edit';
            editElement.addEventListener('click', () => vm.editItem(item))

            elements.forEach(el => {
              el.append(viewElement, editElement, deleteElement)
            })
          }

        if (column !== 'actions') {
          if (process.client) {
            const input = document.createElement('input')
            input.setAttribute('type', column === 'S/N' ? 'hidden' : 'text') // Hide the ID values.
            input.setAttribute('data', item[column])
            input.setAttribute('value', item[column])
            input.setAttribute('readonly', 'readonly')
            input.setAttribute('title', 'Click to edit')
            input.setAttribute('style', 'transition: .4s ease; background: transparent; border: none; cursor: pointer; outline: none')
            input.addEventListener('click', () => vm.editColumn(item.id, column, input))
            input.addEventListener('mouseleave', () => vm.makeReadOnly(input))
            if (elements) {
              elements.forEach(el => {
                el.append(input)
              })
            }
          }
        }
      },
      deleteItem(id) {
        this.$emit('deleteItem', id)
      },
      editItem(item) {
        this.$bus.$emit('editItem', item)
      },
      viewItem(item) {
        console.log(item)
      },
      editColumn(id, column, input) {
        // Needs id to perform this operation.
        if (id) {
          input.removeAttribute('readonly')
          input.setAttribute('style', 'transition: .4s ease-in-out; border: 1px solid #eee; padding: 5px;')

          input.onkeypress = e => {
            if (!e) e = window.event
            let keyCode = e.keyCode || e.which
            if (keyCode === 13) {
              this.$emit('updateField', {id, column, value: input.value})
              // Make the field read only.
              input.setAttribute('readonly', 'readonly')
              input.setAttribute('style', 'transition: .4s ease; background: transparent; border: none; cursor: pointer; outline: none')
              this.$bus.$on('fieldUpdated', value => {
                if (value) {
                  this.$store.dispatch('notifications/setStatus', {
                    messages: ['Field updated successfully'],
                    success: true
                  })
                } else {
                  // Replace the old value.
                  input.value = input.getAttribute('data')
                  this.$store.dispatch('notifications/setStatus', {messages: ['Field not updated'], success: false})
                }
              })
              return false // To prevent bubble.
            }
          }
        }
      },
      makeReadOnly(input) {
        setTimeout(() => {
          if (!input.attributes.readonly) {
            // Get the old value, replace and lock up.
            input.value = input.getAttribute('data')
            input.setAttribute('readonly', 'readonly')
            input.setAttribute('style', 'transition: .4s ease-in-out; background: transparent; border: none; cursor: pointer; outline: none')
          }
        }, 2500)
      }
    },
    filters: {
      columnHead(value) {
        const result = value.split('_').join(' ')
        return result.charAt(0).toUpperCase() + result.slice(1)
      }
    },
    computed: {
      columns() {
        for (let i = 0; i < this.source.length; i++){
          // Get the table head from the model's field name.
          // Remove the typename field.
          const cols = Object.keys(this.items[i]).filter(item => !item.includes('typename'))
          // Replace Id field with intuitive name.
          if (cols.includes('id')) {
            const idIndex = cols.findIndex(item => item === 'id')
            cols[idIndex] = 'S/N'
          } else {
            cols.unshift('S/N')
          }
          // Clone the column to enable column configuration.
          this.cols = cols
          return cols
        }
      },
      source() {
        this.items.forEach(item => {
          // Add action column to the data.
          item.actions = 'actions'
        })
        return this.items
      }
    }
  }
</script>

<style lang="scss" scoped>
  table{
    width: 100%;
    /*display: block;*/
    overflow-x: auto;
    white-space: nowrap;
    span{
      background: #e1e1e1;
      padding: 2px;
      margin: 2px;
    }
    thead{
      background: #ccc;
      tr{
        display: flex;
        padding: 5px 0;
        th{
          text-align: left;
          flex: 1;
          padding: 0 4px;
        }
      }
    }
    tbody{
      tr{
        display: flex;
        padding: 5px 0;
        transition: 1s ease-in-out;
        border-bottom: 1px solid #eee;
        td{
          flex: 1;
        }
      }
      tr:hover{
        background: #f5f5f5;
      }
    }
  }

  table {
    counter-reset: rowNumber + 1;
  }

  table tr {
    counter-increment: rowNumber;
  }

  table tr td:first-child::before {
    content: counter(rowNumber);
    min-width: 1em;
    margin-right: 0.5em;
  }
</style>