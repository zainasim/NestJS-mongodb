import express from 'express';
import { authorizeUser } from '../middleware/authorization';
import { createUserSessionHandler } from '../controller/sessionController';
import { createUserHandler, createOTPHandler, createResetPasswordHandler } from '../controller/userController';
import validateRequest from '../middleware/validateRequest';
import SchemaValidation from '../schema/userSchema';

const router = express.Router();

// To register user
router.post('/create', validateRequest(SchemaValidation.createUserSchema), createUserHandler);

//getAll users
// router.get('/users', getUsersHandler);

//To log in
router.post('/sessions', validateRequest(SchemaValidation.createUserSessionSchema), createUserSessionHandler);

router.post('/generateOTP', authorizeUser, validateRequest(SchemaValidation.createOTPSchema), createOTPHandler);

router.post('/resetPassword', authorizeUser, validateRequest(SchemaValidation.createResetPasswordSchema), createResetPasswordHandler);

export default router;
