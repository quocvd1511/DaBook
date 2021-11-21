const express= require('express')
const route =  express.Router()
const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy
const { session } = require('passport')
const { Strategy } = require('passport-facebook')
const client_Control = require('../controllers/client_control')
// const id_facebook = require('../id_facebook')

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

passport.use(
  new FacebookStrategy(
    {
      clientID: "751828025807001",
      clientSecret: "c83b94a3bba48d441d700ecd5c6766c6",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    }
  )
)
route.get("/facebook", passport.authenticate("facebook"))
route.get("/facebook/callback",
passport.authenticate("facebook", { failureRedirect: "/" }),client_Control.auth_facebook_callback)

module.exports = route