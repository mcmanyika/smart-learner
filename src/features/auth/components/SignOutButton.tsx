import { LogOut } from 'lucide-react';
import { useAuth } from '../store';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

export function SignOutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = () => {
    logout();
    toast({
      title: 'Signed out successfully',
      description: 'You have been signed out of your account.',
    });
    navigate('/login');
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sign Out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}