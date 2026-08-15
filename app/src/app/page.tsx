'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [trenches, setTrenches] = useState<string[]>([]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Trenches Factory</h1>
            <p className="text-slate-400">Create and manage your Solana trenches</p>
          </div>
          <WalletMultiButton />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Trench Section */}
          <div className="bg-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Create a Trench</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-600 rounded border border-slate-500 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter trench name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 bg-slate-600 rounded border border-slate-500 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter trench description"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition"
                disabled={!publicKey}
              >
                {publicKey ? 'Create Trench' : 'Connect Wallet First'}
              </button>
            </form>
          </div>

          {/* Your Trenches Section */}
          <div className="bg-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Trenches</h2>
            {publicKey ? (
              <div className="space-y-2">
                {trenches.length === 0 ? (
                  <p className="text-slate-400">No trenches created yet</p>
                ) : (
                  trenches.map((trench, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-600 p-3 rounded flex justify-between items-center"
                    >
                      <span>{trench}</span>
                      <button className="text-red-400 hover:text-red-600">Delete</button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-slate-400">Connect your wallet to see your trenches</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
