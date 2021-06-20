<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          required
          v-model="user.firstName"
          name="v"
        />
      </div>

      <div class="form-group">
        <label for="description">Last Name</label>
        <input
          class="form-control"
          id="lastName"
          type="text"
          required
          v-model="user.lastName"
          name="lastName"
        />
      </div>

      <div class="form-group">
        <label for="description">Email</label>
        <input
          class="form-control"
          id="email"
          type="email"
          required
          v-model="user.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="description">Password</label>
        <input
          class="form-control"
          id="password"
          type="password"
          required
          v-model="user.password"
          name="password"
        />
      </div>

      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="neUser">Add</button>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        password: null
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        profile: {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email
        },
        credentials: {
          password: this.user.password
        }
      };

      UserService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px; 
  margin: auto;
}
</style>