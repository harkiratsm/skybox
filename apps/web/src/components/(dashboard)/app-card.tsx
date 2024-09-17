'use client';

import { CloudIcon, FileTextIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link";

export const AppCard = () => {
  const apps = [
    { name: "Cloud Drive", icon: CloudIcon, link: "/drive" },
    { name: "Notes", icon: FileTextIcon, link: "/notes" },
  ]

  return (
    <Card className="lg:col-span-1">
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-xl font-semibold text-primary">Quick Access Apps</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {apps.map((app) => {
            const IconComponent = app.icon
            return (
              <Button
                key={app.name}
                onClick={() => {
                  // router.push(app.link)
                }}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
              >

                
                <IconComponent className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">{app.name}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}