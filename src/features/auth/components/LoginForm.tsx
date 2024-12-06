import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from './PasswordInput';
import { loginSchema } from '../schemas';
import { useLogin } from '../hooks/useLogin';
import type { LoginCredentials } from '../types';

export function LoginForm() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => login.mutate(data))} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          {...register('password')}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary"
        disabled={login.isPending}
      >
        {login.isPending ? 'Signing in...' : 'Sign in'}
      </Button>

      <div className="text-sm text-center text-gray-600">
        <p>Demo Credentials:</p>
        <p>Email: teacher@smartlearner.com</p>
        <p>Password: password123</p>
      </div>
    </form>
  );
}