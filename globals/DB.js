require('dotenv').config();

//Server=tcp:gamef5.database.windows.net,1433;Initial Catalog=GameF5;Persist Security Info=False;User ID=k4m4;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;

const mssql = require('mssql')

//#SQL connection config
var config = {
    user: process.env.SQL_SERVER_USER,          //# set [username] to login
    password: process.env.SQL_SERVER_PASSWORD,  //# set [password] to login
    database: process.env.SQL_SERVER_DB_NAME,   //# set [Database] name we are entering into
    server: process.env.SQL_SERVER_NAME,        //# set name of the server we are connecting to to login (note: beware of different formats of server name)
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000                //#request time out
    },
    options: {
        // encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev self-signed certs
    }
}

//object with fucntions to connect and request things from SQL
var DB = {
        sql: {
            // to check status and get server description
            status: async function (){
                var result = ''
                try {
                        // make sure that any items are correctly URL encoded in the connection string
                        await mssql.connect(config)
                        const result = await mssql.query`SELECT @@version`

                        return {response: result, status: 'connection success'}

                    } catch (err) {
                        // ... error checks
                        return {response: result, status: err}
                    }
                
            },
            //give custom sql querry to run and get results
            request: async function (q){
                var result = ''
                try {
                        // make sure that any items are correctly URL encoded in the connection string
                        await mssql.connect(config)
                        
                        result = await mssql.query(q)

                        return {response: result.recordset, status: 'query success'}

                    } catch (err) {
                        // ... error checks
                        return {response: result, status: err+""}
                    }
            },
        }
  }



module.exports = DB