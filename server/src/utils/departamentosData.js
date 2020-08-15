const request = require('request');

const departamentosJSON = new Promise((resolve, reject) => {

    const url = 'https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json';
    
    request(url, (error, response) => {
        if (error) return reject(error);
        try {
            resolve(response);
        } catch(error) {
            reject(error);
        }
    })

})

module.exports = departamentosJSON;