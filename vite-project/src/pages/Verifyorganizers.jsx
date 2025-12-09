import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

const verifications = [
  { id: 1, name: "John Doe", submitted_at: "2025-11-18", status: "pending" },
  { id: 2, name: "Jane Smith", submitted_at: "2025-11-17", status: "approved" },
  { id: 3, name: "Bob Johnson", submitted_at: "2025-11-16", status: "rejected" },
]

const getStatusBadge = (status) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-500 text-white">Approved</Badge>
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>
    default:
      return <Badge variant="outline">Pending</Badge>
  }
}

export default function Verifyorganizers() {
  return (
    <div className="container mx-auto px-4  pb-12">
        <h1 className="text-4xl text-blue-400 font-bold mb-2">Verifications</h1>
        <p className="text-muted-foreground mb-8">Manage and view your data</p>
    <div className="space-y-4">
      {verifications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No verification requests
          </CardContent>
        </Card>
      ) : (
        verifications.map((v) => (
          <Card key={v.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{v.name}</h3>
                      <p className="text-sm text-muted-foreground">Submitted: {v.submitted_at}</p>
                    </div>
                  </div>
                  {getStatusBadge(v.status)}
                  {v.status === "pending" && (
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" className="gap-2">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
    </div>
  )
}
