import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function ArtistRegistration() {
    const { publicKey, signMessage } = useWallet();
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        displayName: '',
        bio: '',
        socialLinks: {
            twitter: '',
            instagram: '',
            website: ''
        }
    });

    const handleWalletVerification = async () => {
        if (!publicKey || !signMessage) {
            alert('Please connect your wallet first');
            return;
        }

        try {
            const message = `Verify wallet ownership for Solana Art Gallery\nWallet: ${publicKey.toString()}\nTimestamp: ${Date.now()}`;
            const messageBytes = new TextEncoder().encode(message);
            const signature = await signMessage(messageBytes);

            const response = await fetch('/api/auth/verify-wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress: publicKey.toString(),
                    signature: Array.from(signature),
                    message
                })
            });

            const data = await response.json();
            
            if (data.verified) {
                setIsVerified(true);
                setToken(data.token);
                localStorage.setItem('authToken', data.token);
            }
        } catch (error) {
            console.error('Verification failed:', error);
            alert('Wallet verification failed');
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        
        if (!token) {
            alert('Please verify your wallet first');
            return;
        }

        try {
            const response = await fetch('/api/artists/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Registration successful!');
                // Redirect to artist dashboard
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Register as Artist</h2>
            
            {!publicKey ? (
                <div>
                    <p className="mb-4">Connect your wallet to get started:</p>
                    <WalletMultiButton />
                </div>
            ) : !isVerified ? (
                <div>
                    <p className="mb-4">Verify wallet ownership:</p>
                    <button 
                        onClick={handleWalletVerification}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Verify Wallet
                    </button>
                </div>
            ) : (
                <form onSubmit={handleRegistration} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username *</label>
                        <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Display Name</label>
                        <input
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            className="w-full p-2 border rounded h-20"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Twitter</label>
                        <input
                            type="text"
                            value={formData.socialLinks.twitter}
                            onChange={(e) => setFormData({
                                ...formData,
                                socialLinks: {...formData.socialLinks, twitter: e.target.value}
                            })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                        Complete Registration
                    </button>
                </form>
            )}
        </div>
    );
}