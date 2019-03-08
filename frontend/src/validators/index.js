import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import rules from './rules'

Vue.use(VeeValidate)

export default {
    register: () => {
        Object.keys(rules).forEach(rule => {
            Validator.extend(rule, rules[rule])
        });
    }
}