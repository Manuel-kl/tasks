<template >
    <div class="register">
        <h1>Register</h1>
        <div class="response">
            <p v-if="response" class="response">{{ response }}</p>
            <p v-if="error" class="error">{{ error }}</p>
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
            <button type="submit" v-if="!loading">Register</button>
        </form>
        <div class="loading" v-if="loading">
            <img src="../../assets/loading.gif" alt="loading gif">
        </div>
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
        signUp() {
            this.loading = true;
            axios.post('api/sign-up', {
                email: this.email,
                password: this.password
            })
                .then((response) => {
                    if (response.data.access_token) {
                        this.response = response.data.message;
                        setTimeout(() => {
                            this.$router.push('/login');
                        }, 2000);
                        this.loading = false;
                        localStorage.setItem('access_token', response.data.access_token);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        this.$router.push('/');
                    }
                    else {
                        this.loading = false;
                        this.error = response.data.message
                        setTimeout(() => {
                            this.error = '';
                        }, 2000);
                    }
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                    setTimeout(() => {
                        this.error = '';
                    }, 2000);
                    this.loading = false;
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
    justify-content: center;
    margin: auto;
    height: 100vh;
    align-items: center;
    background-color: var(--background-color);
    font-family: var(--font-family-base);

}

.register h1 {
    text-align: center;
    padding: 1rem;
    font-family: var(--font-family-base);
    text-decoration: underline;
}

.register form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: var(--font-family-base);
    width: 50%;
    align-items: center;
}

.register form .form-group {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    font-size: 1rem;
}

.register form .form-group label {
    width: 70px;
    font-family: var(--font-family-base);
}

.register form .form-group input {
    width: 250px;
    padding: .5rem;
    border-radius: 4px;
    font-size: 1rem;
    font-family: var(--font-family-base);
    border: 1px solid var(--gray);
}

.register form button {
    margin: auto;
    padding: .5rem 1.3rem;
    border-radius: 5px;
    border: 1px solid var(--gray);
    font-family: var(--font-family-base);
    font-size: 1rem;
    cursor: pointer;
}

.register form button:hover {
    background-color: var(--background-color-buttons);
    color: var(--white);
}

.register .login-link {
    margin-top: 1.5rem;
    text-decoration: underline;
    font-family: var(--font-family-base);
    color: var(--black);
}

.response {
    padding: 1rem;
    font-family: var(--font-family-base);
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
    padding: 0.4rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    padding: 0.4rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

@media (max-width: 768px) {
    .register form .form-group {
        flex-direction: column;
    }
}
</style>