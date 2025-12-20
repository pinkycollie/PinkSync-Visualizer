"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AccessibilityReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No reports yet</p>
      </CardContent>
    </Card>
  )
}
