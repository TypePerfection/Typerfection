// index.tsx for the homepage component

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react'; // Import signOut
import Layout from '@/components/Layout/Layout';
import XButton from '@/components/Inputs/XButton';

const HomePage: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-3xl font-bold mb-4">Welcome to Your App</h1>
          <p className="text-lg mb-8">This is the homepage of your application.</p>
          {/* Conditional rendering based on session (logged in or not) */}
          {session ? (
            <div className="text-center">
              <p className="mb-4">Hello, {session.user?.name}!</p> {/* Use optional chaining */}
              <p className="mb-8">You are logged in as {session.user?.email}.</p> {/* Use optional chaining */}
              <button onClick={() => signOut()} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Log Out
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">You're not logged in.</p>
              <Link href="/login" className="text-blue-500 hover:underline"> {/* Use href for Next.js Link */}
                Log in
              </Link>{' '}
              to access your account.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
