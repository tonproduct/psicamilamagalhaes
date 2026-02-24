import { Sidebar } from "./_components/sidebar"

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-60 min-h-screen">
        <div className="max-w-4xl px-10 py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
