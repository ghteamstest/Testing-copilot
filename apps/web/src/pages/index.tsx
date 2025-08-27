import Head from 'next/head'
import { Button } from '@ui/components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Web App - Turborepo Monorepo</title>
        <meta name="description" content="Main web application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to the Web App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This is the main web application in our Turborepo monorepo.
          </p>
          <Button>Get Started</Button>
        </div>
      </main>
    </>
  )
}