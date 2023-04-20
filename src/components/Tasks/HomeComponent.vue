<template>
    <div class="home">
        <nav>
            <h2>Welcome {{ user.email }}</h2>
            <h3 @click="logout">Log Out</h3>
            <h3 @click="deleteAccount" class="delete-account">Delete Account</h3>
        </nav>
        <h1>Tasks</h1>

        <div class="add-task" id="post-task">
            <button @click="postNewTask" class="add-new-button" v-if="!showForm">Add a New Task</button>
            <form @submit.prevent="postTask" v-if="showForm || updateTask">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name"
                        v-model="name" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description" placeholder="Description" v-model="description"
                        required>
                </div>
                <div class="form-group">
                    <label for="due-date">Due Date</label>
                    <input type="date" class="form-control" id="due-date" placeholder="Due Date" v-model="due_date"
                        required>
                </div>
                <div class="form-group">
                    <label for="start-time">Start Time</label>
                    <input type="time" class="form-control" id="start-time" placeholder="Start Time" v-model="start_time"
                        required>
                </div>
                <div class="form-group">
                    <label for="end-time">End Time</label>
                    <input type="time" class="form-control" id="end-time" placeholder="End Time" v-model="end_time"
                        required>
                </div>
                <div class="form-group">
                    <label for="remarks">Remarks</label>
                    <input type="text" class="form-control" id="remarks" placeholder="Remarks" v-model="remarks" required>
                </div>
                <button type="submit" class="add-new-button" v-if="showForm">Add Task</button>
                <button type="submit" class="add-new-button" v-if="updateTask">Edit Task</button>
            </form>
            <div class="response" v-if="response || error">
                <p class="success" v-if="response">{{ response }}</p>
                <p class="error" v-if="error">{{ error }}</p>
            </div>
        </div>
        <div class="task-list">
            <div v-for="task in tasks" :key="task.id" class="task">
                <div v-if="task.is_completed === 1">
                    <h4 class="title done-task">Name: {{ task.name }}</h4>
                    <p class="due-date done-task"><span>Due Date: </span>{{ task.due_date }}</p>
                    <p class="end-time done-task"><span>End time:</span> {{ task.end_time }}</p>
                    <div class="buttons">
                        <button @click="deleteTask(task.id)" class="delete">Delete task</button>
                    </div>
                </div>
                <div v-else>
                    <div class="active-task">
                        <h4 class="title">Name:{{ task.name }}</h4>
                        <p class="description"><span>Description:</span> {{ task.description }}</p>
                        <p class="due-date"><span>Due Date:</span> {{ task.due_date }}</p>
                        <p class="start-time"><span>Start time:</span> {{ task.start_time }}</p>
                        <p class="end-time"><span>End time: </span>{{ task.end_time }}</p>
                        <p class="remarks"><span>Remarks:</span> {{ task.remarks }}</p>
                    </div>

                    <div class="buttons">
                        <button @click="deleteTask(task.id)" class="delete">Delete task</button>
                        <button @click="editTask(task.id)" class="edit">Edit task</button>
                        <button @click="isDone(task.id)" class="is_done">Mark as done</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../utils/api';
export default {
    components: {},
    props: {},
    data() {
        return {
            showForm: false,
            updateTask: false,
            user: {
                email: ''
            },
            name: '',
            description: '',
            due_date: '',
            start_time: '',
            end_time: '',
            remarks: '',
            is_done: false,
            deleted_at: '',
            tasks: [],
            response: '',
            error: '',
            taskID: null
        };
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.user = user
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            this.$router.push('/login');
        },
        postTask() {
            if (this.showForm) {
                axios.post('api/create-task', {
                    user_id: this.user.id,
                    name: this.name,
                    description: this.description,
                    due_date: this.due_date,
                    start_time: this.start_time,
                    end_time: this.end_time,
                    remarks: this.remarks,
                    is_done: this.is_done,
                    deleted_at: this.deleted_at
                })
                    .then(response => {
                        this.tasks.unshift(response.data.task);
                        this.response = response.data.message;
                        this.showForm = false;
                        setTimeout(() => {
                            this.response = '';
                        }, 5000);
                        this.name = '';
                        this.description = '';
                        this.due_date = '';
                        this.start_time = '';
                        this.end_time = '';
                        this.remarks = '';

                    })
                    .catch(error => {
                        console.log(error);
                        this.error = error.response.data.message;
                        setTimeout(() => {
                            this.error = '';
                        }, 5000);
                    });
            }
            else {
                axios.put(`api/update-task/${this.taskID}`,
                    {
                        id: this.taskID,
                        user_id: this.user.id,
                        name: this.name,
                        description: this.description,
                        due_date: this.due_date,
                        start_time: this.start_time,
                        end_time: this.end_time,
                        remarks: this.remarks,
                        is_completed: false,
                        deleted_at: this.deleted_at
                    })
                    .then(response => {
                        const index = this.tasks.findIndex(task => task.id === response.data.task.id);
                        if (index !== -1) {
                            this.tasks.splice(index, 1, response.data.task);
                        }
                        this.response = response.data.message;
                        this.updateTask = false;
                        setTimeout(() => {
                            this.response = '';
                        }, 5000);
                        this.name = '';
                        this.description = '';
                        this.due_date = '';
                        this.start_time = '';
                        this.end_time = '';
                        this.remarks = '';

                    })
                    .catch(error => {
                        console.log(error.response.data.message);
                    });
            }
        },
        postNewTask() {
            this.updateTask = false,
                this.showForm = true
        },
        editTask(id) {
            this.taskID = id
            console.log(this.taskID)
            this.updateTask = true;
            this.showForm = false;
            const postForm = document.getElementById('post-task');
            postForm.scrollIntoView();
            this.name = this.tasks.find(task => task.id === id).name;
            this.description = this.tasks.find(task => task.id === id).description;
            this.due_date = this.tasks.find(task => task.id === id).due_date;
            this.start_time = this.tasks.find(task => task.id === id).start_time;
            this.end_time = this.tasks.find(task => task.id === id).end_time;
            this.remarks = this.tasks.find(task => task.id === id).remarks;

            console.log(this.name)
        },
        getTasks() {
            axios.get('api/get-tasks', {
                params: {
                    user_id: this.user.id
                }
            })
                .then(response => {
                    this.tasks = response.data.tasks;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteTask(id) {
            axios.delete(`api/delete-task/${id}`,
                {
                    params: { user_id: this.user.id }
                })
                .then(response => {
                    const index = this.tasks.findIndex(task => task.id === id);
                    this.tasks.splice(index, 1);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        isDone(id) {
            axios.put(`api/isdone-task/${id}`,
                {
                    user_id: this.user.id
                })
                .then(response => {
                    this.tasks.find(task => task.id === id).is_completed = 1;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteAccount() {
            const confirmationText = "Are you sure you want to delete your account? This action cannot be undone.";
            const userConfirmation = window.confirm(confirmationText);

            if (userConfirmation) {
                axios.delete(`api/delete-account/${this.user.id}`)
                    .then(response => {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('user');
                        this.$router.push('/login');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                console.log('Account deletion cancelled');
            }

        }

    },
    mounted() {
        this.getTasks()
    },
};
</script>
<style scoped lang="css">
.home {
    display: flex;
    flex-direction: column;
    width: 60%;
    align-items: center;
    margin: auto;
    background-color: #f1f1f1;
}

.home nav {
    display: flex;
    flex-direction: row;
    gap: 4rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #f1f1f1;
    padding: .4rem 0;
    border-bottom: 1px groove gray;
}

.home nav h2 {
    font-size: 1.5rem;
    padding: 1rem;
}

.home nav h3 {
    font-size: 1.3rem;
    cursor: pointer;
    padding: .6rem 1rem;
}

.home nav h3:hover {
    background-color: rgb(206, 151, 151);
    border-radius: 5px;
    text-decoration: underline;
}

.home h1 {
    text-align: center;
    font-size: 2rem;
    padding: .4rem;
    text-decoration: underline;
}

.home .delete-account {
    font-size: 1rem;
    cursor: pointer;
    padding: .6rem 1rem;
    border-radius: 5px;
}

.home .delete-account:hover {
    background-color: rgb(255, 0, 0);
    border-radius: 5px;
    text-decoration: underline;
}

.home .add-task {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin: auto;
    background-color: #f1f1f1;
}

.home .add-task form {
    display: flex;
    flex-direction: column;
}

.home .add-task .add-new-button {
    padding: 0.6rem 1rem;
    margin-top: 1rem;
    border-radius: 5px;
    border: 1px solid gray;
    cursor: pointer;
}

.home .add-task .add-new-button:hover {
    border-radius: 5px;
    background-color: gray;
    color: white;
}

.home .add-task form .form-group {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 1rem;
}

.home .add-task form .form-group label {
    flex-basis: 70px;
}

.home .add-task form input {
    width: 250px;
    padding: 0.4rem 1rem;
    border-radius: 5px;
    border: 1px solid gray;

}

.home .add-task form button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid gray;
    cursor: pointer;
    width: 150px;
    margin: 1rem auto 0;
}

.home .task-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0 2rem;
    width: 80%;
    align-items: center;

}

.home .task-list .task {
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    padding: 1rem;
    width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
}

.home .task-list span {
    font-size: 1.3rem;
    font-weight: 600;
}

.home .task-list .task h4 {
    font-size: 1.5rem;
    padding: .5rem 0;
    text-decoration: underline;
}

.home .task-list .task p {
    font-size: 1.2rem;
    padding: .2rem 0;
}



.home .task-list .task .buttons {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;

}

.home .task-list .task button {
    padding: 0.4rem 1rem;
    border-radius: 5px;
    border: 1px solid gray;
    margin-top: 1rem;
    cursor: pointer;

}

.response {
    padding: 1rem;
}

.delete:hover {
    background-color: rgb(236, 146, 146);
    color: white;
    text-decoration: none;
}

.is_done:hover {
    background-color: rgb(146, 236, 146);
    color: white;
}

.edit:hover {
    background-color: rgb(146, 146, 236);
    color: white;
}

.done-task {
    text-decoration: line-through;
    color: gray;
}



.error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
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
</style>