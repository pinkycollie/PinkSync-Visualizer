export function InterpreterBookings() {
  return <div>Interpreter Bookings - Coming Soon</div>;
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export function InterpreterBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Interpreter Bookings
        </CardTitle>
        <CardDescription>Your scheduled interpreter sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">No upcoming bookings</p>
      </CardContent>
    </Card>
  )
}
