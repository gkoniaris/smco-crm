const rules = {
    'password': {
        getMessage: field => 'The ' + field + ' value must be at least 8 characters long, and it should contain at least one letter and one number',
        validate: value => /^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/.test(value)
    }
}

export default rules
