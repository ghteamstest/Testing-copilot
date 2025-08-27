import Head from 'next/head'
import { Button } from '@ui/components'

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>Admin Dashboard - Turborepo Monorepo</title>
        <meta name="description" content="Administrative interface" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Administrative interface for content and user management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">User Management</h3>
              <p className="text-gray-600 mb-4">Manage users and permissions</p>
              <Button>Manage Users</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Content Management</h3>
              <p className="text-gray-600 mb-4">Edit and publish content</p>
              <Button>Manage Content</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600 mb-4">View reports and analytics</p>
              <Button>View Reports</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}