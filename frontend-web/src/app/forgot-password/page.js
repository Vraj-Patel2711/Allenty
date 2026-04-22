"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Requesting reset for", email);
    alert("Reset instructions sent to " + email);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="hidden md:flex md:w-1/2 bg-blue-900 text-white flex-col justify-center p-16 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            ALLENTY INVENTORY<br/>MANAGEMENT SYSTEM
          </h1>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-8 font-medium transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Login
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Forgot Password?</h2>
            <p className="text-gray-500 leading-relaxed">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="your.email@company.com"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-colors shadow-md mt-4"
            >
              Send Reset Instructions
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
