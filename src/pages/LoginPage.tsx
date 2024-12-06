import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { AuthLayout } from '@/features/auth/components/AuthLayout';

export function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Or{' '}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary/90"
          >
            create a new account
          </Link>
        </>
      }
    >
      <LoginForm />

      <div className="mt-4 text-center">
        <Link
          to="/forgot-password"
          className="font-medium text-sm text-primary hover:text-primary/90"
        >
          Forgot your password?
        </Link>
      </div>
    </AuthLayout>
  );
}