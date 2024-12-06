import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAuth } from '../store';
import { useToast } from '@/hooks/use-toast';
import { LoginCredentials } from '../types';

export function useLogin() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard', { replace: true });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid email or password.',
      });
    },
  });
}