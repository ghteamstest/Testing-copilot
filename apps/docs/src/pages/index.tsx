import Head from 'next/head'
import { Button } from '@ui/components'

export default function DocsHome() {
  return (
    <>
      <Head>
        <title>Documentation - Turborepo Monorepo</title>
        <meta name="description" content="Comprehensive documentation site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Documentation Site
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive documentation for our Turborepo monorepo with live examples and guides.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
              <p className="text-gray-600 mb-4">Learn how to set up and use this monorepo</p>
              <Button>Read Guide</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Component Library</h3>
              <p className="text-gray-600 mb-4">Explore our shared UI components</p>
              <Button>View Components</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">API Reference</h3>
              <p className="text-gray-600 mb-4">Complete API documentation</p>
              <Button>Browse API</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Architecture Overview</h2>
            <p className="text-gray-600 mb-4">
              This monorepo is structured with clear separation between applications and shared packages,
              leveraging Turborepo for optimized build performance and development workflow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Applications</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Web - Main customer-facing app</li>
                  <li>Admin - Administrative dashboard</li>
                  <li>Docs - This documentation site</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Shared Packages</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>UI - Reusable React components</li>
                  <li>Utils - Common utility functions</li>
                  <li>Config - Shared configurations</li>
                  <li>Database - Schema and utilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}