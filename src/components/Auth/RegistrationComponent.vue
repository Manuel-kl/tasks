<template>
    <div class="register">
        <h1>Register</h1>
        <div class="response">
            <p v-if="error">{{ error }}</p>
        </div>
        <form @submit.prevent="signUp">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                    v-model="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
            </div>
            <button type="submit">Register</button>
        </form>
        <router-link to="/login" class="login-link">Login with an existing account</router-link>
    </div>
</template>
<script>
import axios from '../../utils/api';
export default {
    components: {},
    props: {},
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    created() {

    },
    methods: {
        signUp() {
            axios.post('api/sign-up', {
                email: this.email,
                password: this.password
            })
                .then((response) => {
                    if (response.data.access_token) {
                        localStorage.setItem('access_token', response.data.access_token);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        this.$router.push('/');
                    }
                    else {
                        this.error = response.data.message
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    },
    mounted() { },
};
</script>
<style lang="css">
.register {
    display: flex;
    flex-direction: column;
    height: 70vh;
    justify-content: center;
    margin: auto;
    align-items: center;

}

.register h1 {
    text-align: center;
    padding: 1rem;
}

.register form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.register form .form-group {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

.register form .form-group label {
    width: 70px;
}

.register form .form-group input {
    width: 200px;
    padding: .4rem;
    border-radius: 4px;
    border: 1px solid black;
}

.register form button {
    margin: auto;
    padding: .4rem 1.3rem;
    border-radius: 5px;
    border: 1px solid gray;
    cursor: pointer;
}

.register .login-link {
    margin-top: 1.5rem;
    text-decoration: underline;
    color: black;
}

.response {
    padding: 1rem;
}
</style>