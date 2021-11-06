const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const client_account = new Schema({
    matk: String,
    email: String,
    matkhau: String,
    ngaytao: {type: Date, default: Date.now},
    diem: Number,
    tinhtrang: String,
  });
  
module.exports = mogoose.model('client_accounts',client_account)