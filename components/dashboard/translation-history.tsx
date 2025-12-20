"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TranslationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Translation History</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No translations yet</p>
      </CardContent>
    </Card>
  )
}
