import { MainLayout } from "@/components/layouts/main-layout"
import { ProjectOwnerDashboard } from "@/components/project-owner/dashboard"

export default function ProjectOwnerPage({ params }: { params: { address: string } }) {
  const address = params.address

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Project Owner Dashboard</h1>
        <ProjectOwnerDashboard address={address} />
      </div>
    </MainLayout>
  )
}
