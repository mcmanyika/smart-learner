import { Link } from 'react-router-dom';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { AuthLayout } from '@/features/auth/components/AuthLayout';

export function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary/90"
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}