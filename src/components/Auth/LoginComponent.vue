<template>
    <div class="login">
        <h1>Login</h1>
        <div class="response">
            <p v-if="error">{{ error }}</p>
        </div>
        <form @submit.prevent="submitLoginForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                    v-model="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
            </div>
            <button type="submit">Login</button>
        </form>
        <router-link to="/register" class="register-link">Or create a new account</router-link>
    </div>
</template>
<script>
import axios from "../../utils/api.js";
export default {
    components: {},
    props: {},
    data() {
        return {
            email: '',
            password: '',
            error: '',

        };
    },
    created() {

    },
    methods: {
        submitLoginForm() {
            axios.post('/api/sign-in', {
                email: this.email,
                password: this.password,
            }).then((response) => {
                if (response.data.access_token) {
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    this.$router.push('/');
                } else {
                    this.error = response.data.message;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    mounted() { },
};
</script>
<style lang="css">
.login {
    display: flex;
    flex-direction: column;
    height: 70vh;
    justify-content: center;
    margin: auto;
    align-items: center;

}

.response {
    padding: 1rem;
}

.login h1 {
    text-align: center;
    padding: 1rem;
}

.login form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.login form .form-group {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

.login form .form-group label {
    width: 70px;
}

.login form .form-group input {
    width: 200px;
    padding: .4rem;
    border-radius: 4px;
    border: 1px solid black;
}

.login form button {
    margin: auto;
    padding: .4rem 1.3rem;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid gray;
}

.login .register-link {
    margin-top: 1.4rem;
    font-size: 1rem;
    text-decoration: underline;
    color: black;
}
</style>