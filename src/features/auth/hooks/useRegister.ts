import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAuth } from '../store';
import { useToast } from '@/hooks/use-toast';
import { RegisterData } from '../types';

export function useRegister() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast({
        title: 'Welcome to Smart Learner!',
        description: 'Your account has been created successfully.',
      });
      navigate('/dashboard');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not create your account. Please try again.',
      });
    },
  });
}