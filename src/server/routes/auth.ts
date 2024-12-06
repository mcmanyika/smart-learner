import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { statements } from '@/lib/db';
import { hashPassword, comparePasswords } from '../lib/password';
import { signJwt } from '../lib/jwt';
import { auth } from '../middleware/auth';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['student', 'teacher', 'parent', 'admin']),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post('/register', async (req, res) => {
  const { email, password, name, role } = registerSchema.parse(req.body);
  
  const existingUser = statements.findUserByEmail.get(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const hashedPassword = await hashPassword(password);
  
  const user = statements.createUser.get({
    id: randomUUID(),
    email,
    password: hashedPassword,
    name,
    role,
    avatar: null,
  });

  const token = signJwt({ userId: user.id });
  
  res.json({ user, token });
});

router.post('/login', async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = statements.findUserByEmail.get(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const validPassword = await comparePasswords(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = signJwt({ userId: user.id });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    },
    token,
  });
});

router.get('/me', auth, (req, res) => {
  const user = statements.findUserById.get(req.user!.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

export default router;