const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const admin_account = new Schema({
    MaTK: String,
    MatKhau: String,
  });
  
module.exports = mogoose.model('admin_accounts',admin_account)