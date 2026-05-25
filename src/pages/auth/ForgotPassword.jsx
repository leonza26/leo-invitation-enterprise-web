import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setStatus(null);
        try {
            const { default: api } = await import('../../services/api');
            const data = await api.auth.forgotPassword(email);
            setStatus(data.status || 'Password reset link sent successfully');
        } catch (err) {
            setError(err.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 blur opacity-25" />
                
                <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">
                            Reset Password
                        </h2>
                        <p className="text-gray-400 mt-2">Enter your email to receive a reset link</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
                            {error}
                        </div>
                    )}
                    
                    {status && (
                        <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold hover:from-amber-400 hover:to-yellow-500 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Remember your password?{' '}
                        <Link to="/login" className="text-amber-500 hover:text-amber-400 font-medium">
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
