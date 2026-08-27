import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ open, onClose }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signup');

  if (!open) return null;

  const enterApp = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-surface border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-[slide-up_0.3s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-on-surface-variant hover:bg-white/5 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>

        <div className="px-8 pt-8 pb-2">
          <div className="text-[28px] font-black text-primary-container tracking-tighter mb-1">CineVerse</div>
          <p className="text-on-surface-variant text-[14px]">Join the community that breathes cinema.</p>
        </div>

        <div className="px-8 mt-4">
          <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setTab('signup')}
              className={`py-2.5 rounded-lg text-[14px] font-bold transition-all ${
                tab === 'signup'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setTab('create')}
              className={`py-2.5 rounded-lg text-[14px] font-bold transition-all ${
                tab === 'create'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        <form onSubmit={enterApp} className="px-8 py-6 space-y-4">
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              {tab === 'signup' ? 'Email' : 'Full Name'}
            </label>
            <input
              type={tab === 'signup' ? 'email' : 'text'}
              placeholder={tab === 'signup' ? 'you@example.com' : 'Your name'}
              className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-primary-container transition-colors placeholder:text-on-surface-variant/40"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-primary-container transition-colors placeholder:text-on-surface-variant/40"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-primary-container text-on-primary-container font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {tab === 'signup' ? 'Start Watching' : 'Create My Account'}
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          <p className="text-[12px] text-on-surface-variant/70 text-center pt-1">
            {tab === 'signup'
              ? 'New here? Continue with the same email next time.'
              : 'New account with your details. Welcome aboard!'}
            <br />Backend coming soon — this part is frontend only.
          </p>
        </form>
      </div>
    </div>
  );
}
