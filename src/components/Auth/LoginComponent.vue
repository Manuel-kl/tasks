<template>
    <div class="login">
        <h1>Login</h1>
        <div class="response">
            <p v-if="response">{{ response }}</p>
            <p v-if="error">{{ error }}</p>
        </div>
        <form @submit.prevent="submitLoginForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email" required v-model="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password"
                    required>
            </div>
            <button type="submit" v-if="!loading">Login</button>
        </form>
        <div class="loading" v-if="loading">
            <img src="../../assets/loading.gif" alt="loading gif">
        </div>
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
            loading: false,
            email: '',
            password: '',
            error: '',
            response: '',

        };
    },
    created() {

    },
    methods: {
        submitLoginForm() {
            this.loading = true;
            axios.post('/api/sign-in', {
                email: this.email,
                password: this.password,
            }).then((response) => {
                if (response.data.access_token) {
                    this.loading = false;
                    this.response = response.data.message;
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    this.$router.push('/');
                } else {
                    this.loading = false;
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
    justify-content: center;
    margin: auto;
    height: 100vh;
    align-items: center;
    background-color: var(--background-color);
    font-family: var(--font-family-base);


}

.response {
    padding: 1rem;
    font-family: var(--font-family-base);
}

.login h1 {
    text-align: center;
    font-family: var(--font-family-base);
    padding: 1rem;
    text-decoration: underline;
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
    align-items: center;
    font-size: 1rem;
}

.login form .form-group label {
    font-family: var(--font-family-base);
    width: 70px;
}

.login form .form-group input {
    width: 250px;
    padding: .4rem;
    font-family: var(--font-family-base);
    border-radius: 4px;
    border: 1px solid var(--gray);
    font-size: 1rem;

}

.login form button {
    margin: auto;
    padding: .5rem 1.3rem;
    border-radius: 5px;
    cursor: pointer;
    font-family: var(--font-family-base);
    border: 1px solid var(--gray);
    font-size: 1rem;
}

.login form button:hover {
    background-color: var(--background-color-buttons);
    color: var(--white);
}

.login .register-link {
    margin-top: 1.4rem;
    font-size: 1rem;
    font-family: var(--font-family-base);
    text-decoration: underline;
    color: var(--black);
    ;
}

.loading img {
    width: 30px;
    height: 30px;
    padding-top: 1rem;
}

.error {
    color: #721c24;
    background-color: var(--warning);
    border-color: var(--warning);
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

@media (max-width: 768px) {
    .login form .form-group {
        flex-direction: column;
    }
}
</style>