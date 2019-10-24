<template>
    <div>
        Hello world
        <!--<div v-for="user in users.data">
            <span>{{ user.first_name }}</span>
            <span>{{ user.last_name }}</span> ({{ user.username }})
        </div>-->
    </div>
</template>

<script>

    import fetchUsers from '~/apollo/queries/fetchUsers.gql'

    export default {
        apollo: {
            users: {
                prefetch: true,
                query: fetchUsers
            }
        }
    }

</script>
