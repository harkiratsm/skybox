'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadButton } from "@/lib/uploadthing";
import { TabsContent } from "@radix-ui/react-tabs";
import { trpc } from "@repo/trpc/react";
import "@uploadthing/react/styles.css";
import { Clock, File, Folder, Trash2, UploadIcon } from "lucide-react";
import { useState } from "react";



  
export const DrivePageView = () => {
    // const { mutateAsync: uploadFiles } = trpc.files.createFiles.useMutation()
    const [files, setFiles] = useState([
        { id: '162133104', name: '162133104', kind: 'PNG image', size: '9 KB', date: '16/9/2024, 07:01', shared: false },
        { id: 'das', name: 'das', kind: 'Folder', size: '--', date: '--', shared: false },
      ]);
    
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const newFile = {
            id: Date.now().toString(),
            name: file.name,
            kind: file.type,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            date: new Date().toLocaleString(),
            shared: false,
          };
          setFiles([...files, newFile]);
        }
      };
    
      return (
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Input type="file" className="hidden" id="file-upload" onChange={handleFileUpload} />
              <label htmlFor="file-upload">
              <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        
                    }}
                    onUploadError={(error: Error) => {
                    }}
                    className="text-primary"
                />
              </label>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Kind</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Shared</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">
                    {file.kind === 'Folder' ? (
                      <Folder className="inline mr-2 h-4 w-4" />
                    ) : (
                      <File className="inline mr-2 h-4 w-4" />
                    )}
                    {file.name}
                  </TableCell>
                  <TableCell>{file.kind}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.date}</TableCell>
                  <TableCell>{file.shared ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
}