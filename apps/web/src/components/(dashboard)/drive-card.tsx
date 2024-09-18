'use client';

import { CloudUpload, FileIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export const DriveCard = () => {
  // const router = useRouter();
  return (
    <Card className="lg:col-span-2  transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between  bg-primary/10">
        <div className="flex items-center space-x-2">
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
            <div className="flex items-center space-x-4">
              <FileIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              <div>
                <h4 className="text-sm font-semibold">apps</h4>
                <p className="text-xs text-muted-foreground">PNG</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FileIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              <div>
                <h4 className="text-sm font-semibold">162133104</h4>
                <p className="text-xs text-muted-foreground">PNG</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}


