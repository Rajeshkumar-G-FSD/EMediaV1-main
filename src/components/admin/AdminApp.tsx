import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../lib/firebase.ts';
import AdminLogin from './AdminLogin.tsx';
import AdminDashboard from './AdminDashboard.tsx';

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  return user ? <AdminDashboard onLogout={() => setUser(null)} /> : <AdminLogin />;
}
