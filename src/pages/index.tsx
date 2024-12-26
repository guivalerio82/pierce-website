import Layout from '@/layouts/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-bold">Welcome to Pierce</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your app description here
        </p>
      </div>
    </Layout>
  )
} 