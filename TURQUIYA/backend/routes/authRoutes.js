import express from 'express';
import { registrarUsuario } from '../controlers/authController.js';

const router = express.Router();

router.post('/registro', registrarUsuario);

export default router;