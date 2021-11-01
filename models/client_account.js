const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const client_account = new Schema({
    MaTK: String,
    Matkhau: String,
  });
  
module.exports = mogoose.model('client_accounts',client_account)