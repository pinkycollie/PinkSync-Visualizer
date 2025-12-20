"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function InterpreterBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interpreter Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No bookings yet</p>
      </CardContent>
    </Card>
  )
}
