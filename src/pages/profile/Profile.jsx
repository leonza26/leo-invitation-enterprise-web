import React from 'react';
import { useAuthStore } from '../../stores/authStore';

export default function Profile() {
    const { user } = useAuthStore();

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500 mb-6">
                        User Profile
                    </h1>
                    
                    <div className="space-y-4 text-gray-300">
                        <div>
                            <span className="text-gray-500 text-sm block">Full Name</span>
                            <span className="text-lg">{user?.name}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm block">Email Address</span>
                            <span className="text-lg">{user?.email}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm block">Role</span>
                            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 mt-1 capitalize">
                                {user?.roles?.[0]?.name || 'Client'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
