
import { User } from '@/types';

export function requireAuth(user?: User | null) {
  if (!user) {
    throw new Error('Authentication required');
  }
}

export function requireAdmin(user?: User | null) {
  requireAuth(user);
  if (user?.role !== 'admin') {
    throw new Error('Admin access required');
  }
}
