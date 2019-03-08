const fs = require('fs')
const path = require('path')
const mysqldump = require('mysqldump')
const compressing = require('compressing')

class BackupService {
    constructor ({host, port, username, password, database}) {
        this.host = host
        this.port = port
        this.username = username
        this.password = password
        this.database = database
    }  
    
    backup () {
        const filename = new Date().getTime() + '.sql'
        await mysqldump({
            connection: {
                host: this.host,
                port: this.port || 3306,
                user: this.username,
                password: this.password,
                database: this.database,
            },
            dumpToFile: path.resolve('./' + filename)
        })
        return filename
    }
}

module.exports = BackupService
