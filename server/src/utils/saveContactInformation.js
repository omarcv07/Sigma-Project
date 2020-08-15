// Modulo requerido para conectar Node.js con MYSQL
const mysql = require ('mysql')

// Esta variable me permite conectar el servidor con la base de datos
const connection = mysql.createConnection({
    host     : '178.128.146.252',
    user     : 'admin_sigmauser',
    password : 'pfaDKIJyPF',
    database : 'admin_sigmatest'
})

// Cumple la funcion de detectar errores mas detallados rapidamente 
connection.connect(function(error) {
    if (error) {
        console.error('error connecting: ' + error.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
})

// Esta funcion guarda la informacion en la base de datos
const saveContactInformation = ({ departamento, ciudad, nombre, email }, callback) => {
    let saveContactInfoQuery = {
        sql: `INSERT INTO contacts (name, email, state, city) VALUES(?, ?, ?, ?)`,
        timeout: 40000,
        values: [`${nombre}`, `${email}`, `${departamento}`, `${ciudad}`]
    }
    let sqlResponse;

    connection.query(saveContactInfoQuery, function(error, results, fields) {
        if (error) {
            callback('Error')
        }
        sqlResponse = results;

        callback(undefined, {
            message: 'Contact information has been saved'
        })
    })
}

// Este interval no permite que caiga la conexion
setInterval(function () {
    connection.query('SELECT 1');
}, 5000);

module.exports = saveContactInformation