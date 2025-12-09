"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Traveler", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Organizer", status: "inactive" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Traveler", status: "active" },
]

export default function Manageuser({ onSelectUser }) {
  return (
    <div className="container mx-auto px-4  pb-12">
        <h1 className="text-4xl text-blue-400 font-bold mb-2">Users</h1>
        <p className="text-muted-foreground mb-8">Manage and view your data</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle className="text-lg">{user.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="text-foreground">{user.role}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-muted-foreground">Status:</p>
              <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
            </div>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => onSelectUser && onSelectUser(user)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  )
}
