const mongoose = require('mongoose')

async function connect()
{
    try{
        await mongoose.connect('mongodb://localhost:27017/dabook_bookstores');
        console.log('Connect Database Successfull!!')
    } catch(error){
        console.log('Connect Database Failed !!')
    }
    
}

module.exports = {connect}