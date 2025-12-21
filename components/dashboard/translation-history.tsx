"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
export function TranslationHistory() {
  return <div>Translation History - Coming Soon</div>;
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export function TranslationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Translation History</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No translations yet</p>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Translation History
        </CardTitle>
        <CardDescription>Your recent sign language translations</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">No recent translations</p>
      </CardContent>
    </Card>
  )
}
