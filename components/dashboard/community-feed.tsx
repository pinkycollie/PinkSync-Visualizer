export function CommunityFeed() {
  return <div>Community Feed - Coming Soon</div>;
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

export function CommunityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Community Feed
        </CardTitle>
        <CardDescription>Latest updates from the deaf community</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">No recent posts</p>
      </CardContent>
    </Card>
  )
}
