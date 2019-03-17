<template>
    <div class="card ">
        <div class="card-body">
            <h4 class="card-title text-center">Εγγραφή</h4>
            <hr>
            <form @submit.prevent="signup($event, signupInfo.email, signupInfo.password, signupInfo.firstName, signupInfo.lastName)" novalidate>
                <div class="alert alert-danger" v-show="error">
                    {{error}}
                </div>
                <div class="alert alert-success" v-show="message">
                    {{message}}
                </div>
                <div class="form-group">
                    <label for="firstName">Όνομα</label>
                    <input v-validate="{ required: true }" :class="{ 'is-invalid': errors.has('firstName') }" v-model="signupInfo.firstName" firstName="firstName" name="firstName" class="form-control" id="firstName" aria-describedby="firstName" placeholder="Enter first name">
                    <small class="invalid-feedback">{{ errors.first('firstName') }}</small>
                </div>
                <div class="form-group">
                    <label for="lastName">Επώνυμο</label>
                    <input v-validate="{ required: true }" :class="{ 'is-invalid': errors.has('lastName') }" v-model="signupInfo.lastName" type="lastName" name="lastName" class="form-control" id="lastName" aria-describedby="lastName" placeholder="Enter last name">
                    <small class="invalid-feedback">{{ errors.first('lastName') }}</small>
                </div>
                <div class="form-group">
                    <label for="email">Διεύθυνση email</label>
                    <input v-validate="{ required: true, email: true }" :class="{ 'is-invalid': errors.has('email') }" v-model="signupInfo.email" type="email" name="email" class="form-control" id="email" aria-describedby="email" placeholder="Enter email">
                    <small class="invalid-feedback">{{ errors.first('email') }}</small>
                </div>
                <div class="form-group">
                    <label for="password">Κωδικός πρόσβασης</label>
                    <input v-validate="{ required: true, password: true }" v-model="signupInfo.password" :class="{ 'is-invalid': errors.has('password') }" type="password" name="password" class="form-control" id="password" placeholder="Enter password">
                    <small class="invalid-feedback">{{ errors.first('password') }}</small>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Εγγραφή</button>
            </form>
        </div>
    </div>
</template>

<script>
import AuthService from '../services/AuthService.js'

export default {
  name: 'Login',
  data: () => {
      return {
          submitted: false,
          error: false,
          message: false,
          signupInfo: {
              email: '',
              password: '',
              firstName: '',
              lastName: ''
          }
      }
  },
  methods: {
    signup: function (event, email, password, firstName, lastName) {
        this.submitted = true
        this.$validator.validate()
        .then(valid => {
            if (!valid) return
            AuthService.signup(email, password, firstName, lastName)
            .then(() => {
                this.message = "You have successfully signed up"
            }).catch(err => {
                this.error = err
            })
        });
    }
  }
}
</script>