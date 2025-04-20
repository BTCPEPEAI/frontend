import { Skeleton } from "@/components/ui/skeleton"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TokenManagementLoading() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Token Management</h1>
            <p className="text-muted-foreground">Manage tokens in different categories</p>
          </div>

          <Skeleton className="h-10 w-[120px]" />
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Token Categories</CardTitle>
            <CardDescription>Manage tokens that appear in different sections of the website</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full mb-6" />

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Skeleton className="h-10 flex-1" />
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>
                      <Skeleton className="h-4 w-16" />
                    </TableHead>
                    <TableHead>
                      <Skeleton className="h-4 w-24" />
                    </TableHead>
                    <TableHead className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableHead>
                    <TableHead className="text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </TableHead>
                    <TableHead className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableHead>
                    <TableHead className="text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-6 w-12" />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Skeleton className="w-8 h-8 rounded-full mr-2" />
                            <div>
                              <Skeleton className="h-5 w-24" />
                              <Skeleton className="h-4 w-32 mt-1" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-5 w-16 ml-auto" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-5 w-16 ml-auto" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-5 w-24 ml-auto" />
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
