<template>
    <div class="row">
        <div class="login-form d-table">
            <div class="col-6 justify-content-center d-table-cell align-middle login-form-container">
                <Login/>
            </div>
        </div>
        <div class="signup-form d-table">
            <div class="col-6 justify-content-center d-table-cell align-middle signup-form-container" v-bind:class="{'disable-signup': hideSignup}">
                <Signup/>
            </div>
        </div>
    </div>
</template>

<script>
import Login from './Login'
import Signup from './Signup'

export default {
    components: {Login, Signup},
    data: () => {
        return {
            hideSignup: process.env.VUE_APP_DISABLE_SIGNUP === 'true'
        }
    }
}
</script>

<style scoped>
.login-form,
.signup-form {
    height: 100%;
    position: fixed;
    margin: 0;
    width:50%;
    display: table !important;
}
.login-form {
    background-color: #2196F3 !important;
    left: 0;
}
.signup-form {
    left: 50%;
}
.disable-signup {
    pointer-events: none;
    opacity: 0.5;
}
.login-form-container,
.signup-form-container {
    display: table-cell !important;
    vertical-align: middle !important;
    justify-content: center !important;
}
.login-form-container > div,
.signup-form-container > div
{
    width: 50%;
    margin: auto;
    margin-top: -120px;
}
</style>