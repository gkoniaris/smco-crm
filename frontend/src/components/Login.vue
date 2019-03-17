<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title text-center">Είσοδος</h4>
            <hr>
            <form @submit.prevent="login($event, loginInfo.email, loginInfo.password)"  novalidate>
                <div class="alert alert-danger" v-show="error">
                    {{error}}
                </div>
                <div class="form-group mt-4">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                        </div>
                        <input v-validate="{ required: true, email: true }" :class="{ 'is-invalid': errors.has('email') }" v-model="loginInfo.email" type="email" name="email" class="form-control" id="email" aria-describedby="email" placeholder="Enter email">
                        <small class="invalid-feedback">{{ errors.first('email') }}</small>
                    </div>
                </div>
                <div class="form-group mt-4">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                        </div>
                        <input v-validate="{ required: true, password: true }" v-model="loginInfo.password" :class="{ 'is-invalid': errors.has('password') }" type="password" name="password" class="form-control" id="password" placeholder="Enter password">
                        <small class="invalid-feedback">{{ errors.first('password') }}</small>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block mt-4">Είσοδος</button>
            </form>
        </div>
    </div>
</template>

<script>
import router from '../router.js'
import AuthService from '../services/AuthService.js'

export default {
  name: 'Login',
  data: () => {
      return {
          submitted: false,
          error: false,
          loginInfo: {
              email: '',
              password: ''
          }
      }
  },
  methods: {
    login: function (event, email, password) {
        this.submitted = true
        this.$validator.validate()
        .then(valid => {
            if (!valid) return
            AuthService.login(email, password)
            .then(() => {
                router.push('dashboard')
            }).catch(err => {
                this.error = err
            })
        });

    }
  }
}
</script>