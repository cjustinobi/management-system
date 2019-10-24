<template>
  <div>
    <TableGenerator :items="users.data"/>
  </div>
</template>

<script>
  import users from '~/apollo/queries/fetchUsers.gql'
  import TableGenerator from '~/components/shared/TableGenerator'
  export default {
    components: { TableGenerator },
    apollo: {
      users: {
        prefetch: true,
        query: users
      }
    },
  }
</script>