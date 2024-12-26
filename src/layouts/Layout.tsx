import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

function Layout(props: LayoutProps) {
  return (
    <main className="min-h-screen">
      {props.children}
    </main>
  )
}

export default Layout 