<template>
    <nav>
        <div class="lg">
            <h2>Welcome {{ user.email }}</h2>
            <h3 @click="logout">Log Out</h3>
            <h3 @click="deleteAccount" class="delete-account">Delete Account</h3>
        </div>
        <div class="sm">
            <h2>Welcome {{ user.email }}</h2>
            <div>
                <h3 @click="logout">Log Out</h3>
                <h3 @click="deleteAccount" class="delete-account">Delete Account</h3>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    mounted() { },
};
</script>
<style scoped lang="css">
.home nav .lg {
    display: flex;
    flex-direction: row;
    gap: 4rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color);
    padding: .4rem 0;
    border-bottom: 1px groove var(--gray);
}

.home .sm {
    display: none;
}

.home nav h2 {
    font-size: 1.3rem;
    padding: 1rem;
}

.home nav h3 {
    font-size: 1rem;
    cursor: pointer;
    padding: .6rem 1rem;
}

.home nav h3:hover {
    background-color: var(--warning);
    border-radius: 5px;
    text-decoration: underline;
}

@media screen and (max-width: 800px) {
    .home nav .lg {
        display: none;
    }

    .home nav {
        display: flex;
        width: 100%;
        justify-content: space-between;

    }

    .home nav .sm {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;
        margin: 0 1rem;
        font-size: .8rem;
        align-items: center;
        background-color: var(--background-color);
        border-bottom: 1px groove var(--gray);
    }

    .home nav .sm div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .home .delete-account {
        font-size: 1rem;
        cursor: pointer;
        padding: .5rem 1rem;
        border-radius: 5px;
    }

    .home .delete-account:hover {
        background-color: var(--red);
        border-radius: 5px;
        text-decoration: underline;
    }

    .home nav h3 {
        padding: .5rem 1rem;
        margin-right: 1rem;
        font-size: 1rem;
    }

}

@media screen and (max-width: 600px) {
    .home nav .sm h2 {
        display: flex;
        font-size: 1.2rem;
    }
}

@media screen and (max-width:430px) {
    .home nav .sm h2 {
        display: flex;
        font-size: 1.2rem;
        text-align: center;
    }

    .home nav .sm h3 {
        display: flex;
        font-size: .9rem;
        text-align: center;
    }
}
</style>