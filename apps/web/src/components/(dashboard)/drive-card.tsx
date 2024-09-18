'use client';

import { FileSchema } from "@repo/drizzle/schema/files";
import { BirdIcon, CloudUpload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export type DriveCardProps = {
  files: FileSchema[]
}

export const DriveCard = ({ files }: DriveCardProps) => {
  const router = useRouter();
  return (
    <Card className="lg:col-span-2  transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between  bg-primary/10">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/drive')}>
          <CloudUpload className="h-6 w-6 text-sky-500" />
          <div>
            <CardTitle className="text-xl font-semibold">Drive</CardTitle>
            <p className="text-sm text-muted-foreground">Recents</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] mt-4">
          <div className="space-y-4">
            {files.length === 0 &&
              <Alert className="mt-2 max-w-md">
                <BirdIcon className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Empty Drive!</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  You don&apos;t have any files yet. Upload one <span className="text-primary cursor-pointer" onClick={() => router.push('/drive')}>here</span>
                </AlertDescription>
              </Alert>
            }
            {files.map((file) => {
              return (
                <div key={file.id} className="flex items-center mb-6 cursor-pointer">
                  <Link href={file.url} target="_blank" className="flex items-center">
                    <div className="w-10 h-10 rounded overflow-hidden mr-2">
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.type}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}


