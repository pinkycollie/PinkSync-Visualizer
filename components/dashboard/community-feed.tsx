"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CommunityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No posts yet</p>
      </CardContent>
    </Card>
  )
}
