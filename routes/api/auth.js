const express = require('express');

const ctrl = require('../../controllers/auth');

const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

//signup
router.post('/register', validateBody(schemas.registerSchema),ctrl.register);


//signin
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
// const ctrl = require("../../controllers/auth");

// const { validateBody, authentificate, upload } = require("../../middlewares");



// router.get("/verify/:verificationToken", ctrl.verifyEmail);

// router.post(
//   "/verify",
//   validateBody(schemas.emailSchema),
//   ctrl.resendVerifyEmail
// );


// router.post("/current", authentificate, ctrl.getCurrent);

// router.post("/logout", authentificate, ctrl.logout);

// router.patch(
//   "/",
//   authentificate,
//   validateBody(schemas.updateSubscriptionSchema),
//   ctrl.updateUserSubscription
// );

// router.patch(
//   "/avatars",
//   authentificate,
//   upload.single("avatar"),
//   ctrl.updateAvatar
// );

