"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export function AccessibilityReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Accessibility Reports
        </CardTitle>
        <CardDescription>Your website accessibility scans</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">No recent scans</p>
      </CardContent>
    </Card>
  )
}
