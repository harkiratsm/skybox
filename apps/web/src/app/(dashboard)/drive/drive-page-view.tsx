/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { FileSchema } from "@repo/drizzle/schema/files";
import { trpc } from "@repo/trpc/react";
import "@uploadthing/react/styles.css";
import { format } from 'date-fns';
import { Upload } from "lucide-react";
import { useState } from "react";

export type DrivePageViewProps = {
  initialFiles: FileSchema[]
}

export const DrivePageView = ({ initialFiles }: DrivePageViewProps) => {
  const { toast } = useToast()


  const [files, setFiles] = useState<FileSchema[]>(initialFiles)


  const { mutateAsync: uploadFiles } = trpc.files.createFiles.useMutation()

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      handleFileUpload(res);
    },
    onUploadError: () => {
      toast({
        description: "Failed to upload file, please try again",
        variant: 'destructive',
        duration: 3000,
      })
    }
  });


  const handleFileUpload = async (res: any) => {
    try {
      const file = await uploadFiles({
        name: res[0].name,
        url: res[0].url,
        size: String(res[0].size),
        type: res[0].type
      })

      if (file && file.length > 0) {
        setFiles([...files, file[0]])
        toast({
          description: "File uploaded successfully",
          duration: 3000,
        })
      } else {
        toast({
          description: "Failed to upload file, please try again",
          variant: 'destructive',
          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        description: "Failed to upload file, please try again",
        variant: 'destructive',
        duration: 3000,
      })
    }
  };

  const formatFileSize = (bytes: string) => {
    const size = parseInt(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="p-12 sm:p-8 space-y-8 mx-auto w-11/12">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-primary">
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              className="sr-only"
              onChange={(e) => {
                if (e.target.files) {
                  startUpload(Array.from(e.target.files));
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload File
            </label>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Kind</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className=" flex items-center">
                <div className="w-10 h-10 rounded overflow-hidden mr-2">
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                </div>
                {file.name}
              </TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell>{formatFileSize(file.size)}</TableCell>
              <TableCell>{format(new Date(file.createdAt), 'PPP')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}