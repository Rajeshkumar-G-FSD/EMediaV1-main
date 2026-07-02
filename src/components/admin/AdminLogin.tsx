import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { User, Lock, LogIn, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import { auth } from '../../lib/firebase.ts';

const ADMIN_EMAIL = 'emediaeventerode@gmail.com';

interface FieldErrors {
  username?: string;
  password?: string;
}

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBackToSite = () => {
    window.location.hash = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const nextFieldErrors: FieldErrors = {};
    if (!username.trim()) nextFieldErrors.username = 'Email is required.';
    if (!password.trim()) nextFieldErrors.password = 'Password is required.';
    setFieldErrors(nextFieldErrors);
    if (Object.keys(nextFieldErrors).length > 0) return;

    if (username.trim().toLowerCase() !== ADMIN_EMAIL) {
      setErrorMsg('Invalid username or password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
    } catch (err) {
      console.error('Admin sign-in failed', err);
      const code = (err as { code?: string })?.code;
      if (code === 'auth/operation-not-allowed' || code === 'auth/configuration-not-found') {
        setErrorMsg('Email/Password sign-in is not enabled yet in Firebase. Enable it under Authentication → Sign-in method.');
      } else if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
        setErrorMsg(`Admin account not found or password incorrect. Create it in Firebase Console → Authentication → Users with email "${ADMIN_EMAIL}".`);
      } else if (code === 'auth/too-many-requests') {
        setErrorMsg('Too many failed attempts. Please wait a moment and try again.');
      } else {
        setErrorMsg('Invalid username or password.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/5" />
      <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-primary/5" />

      <button
        onClick={handleBackToSite}
        className="absolute top-5 left-5 flex items-center gap-1.5 text-xs font-bold uppercase text-gray-400 hover:text-primary transition cursor-pointer"
        id="admin-back-to-site"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to website
      </button>

      <div className="relative w-full max-w-sm bg-white rounded-lg border border-primary/20 shadow-xl p-8">
        <div className="text-center mb-6">
          <img
            src="/images/emediaevents_logo.png"
            alt="EMediaEvent"
            className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-4 border-primary/10 shadow-sm"
          />
          <h1 className="font-elegant text-2xl font-bold text-primary">EMediaEvent Admin</h1>
          <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-primary/60" />
            Sign in to manage bookings and payments
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 text-xs text-red-700 mb-4" id="admin-login-error">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User className="h-4 w-4" />
              </span>
              <input
                type="email"
                className={`w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none ${
                  fieldErrors.username ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-primary'
                }`}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (fieldErrors.username) setFieldErrors((prev) => ({ ...prev, username: undefined }));
                }}
                id="admin-login-username"
                autoFocus
              />
            </div>
            {fieldErrors.username && (
              <p className="text-[11px] text-red-500 mt-1" id="admin-login-username-error">{fieldErrors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`w-full pl-9 pr-9 py-2 border rounded text-sm focus:outline-none ${
                  fieldErrors.password ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-primary'
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }}
                id="admin-login-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                id="admin-login-toggle-password"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-[11px] text-red-500 mt-1" id="admin-login-password-error">{fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-2.5 px-4 rounded text-sm uppercase flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-60"
            id="admin-login-submit"
          >
            <LogIn className="w-4 h-4" />
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
