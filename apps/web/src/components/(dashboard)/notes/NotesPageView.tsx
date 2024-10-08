// File: components/NotesPageView.tsx

'use client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FolderSchema, NotesSchema } from '@repo/drizzle/schema/type'
import { trpc } from '@repo/trpc/react'
import { Check, FileIcon, Folder, MoreVertical, PenTool, Plus, PlusCircleIcon, RocketIcon, Trash2, X } from "lucide-react"
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function NotesPageView({ initialFolders, children }: { initialFolders: FolderSchema[], children: React.ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const folderId = params?.folderId as string
  const noteId = params?.id as string

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [folders, setFolders] = useState<FolderSchema[]>(initialFolders)
  const [notes, setNotes] = useState<NotesSchema[]>([])
  const { toast } = useToast()

  const [isRenamingFolder, setIsRenamingFolder] = useState(false)
  const [renamingFolderId, setRenamingFolderId] = useState<string | null>(null)
  const [renameFolderName, setRenameFolderName] = useState('')

  const [isRenamingNote, setIsRenamingNote] = useState(false)
  const [renamingNoteId, setRenamingNoteId] = useState<string | null>(null)
  const [renameNoteName, setRenameNoteName] = useState('')

  const { data: updatedNotes, isLoading: isLoadingNotes } = trpc.note.getNotes.useQuery(
    { folderId: selectedFolder || '' },
    { enabled: !!selectedFolder }
  )


  const { data: noteData } = trpc.note.getNotesByID.useQuery(
    { id: noteId },
    { enabled: !!noteId }
  )

  const { mutateAsync: deleteFolder } = trpc.folder.deleteFolder.useMutation({
    onSuccess: () => {
      toast({
        description: 'folder deleted successfully',
        duration: 3000,
      });
    },
  });

  const { mutateAsync: updateFolder } = trpc.folder.updateFolder.useMutation({
    onSuccess: () => {
      toast({
        description: 'folder updated successfully',
        duration: 3000,
      });
    },
  });

  const { mutateAsync: createFolder } = trpc.folder.createFolder.useMutation({
    onSuccess: () => {
      toast({
        description: 'folder created successfully',
        duration: 3000,
      });
    },
  });

  const { mutateAsync: createNote, isLoading: isCreatingNote } = trpc.note.createNote.useMutation({
    onSuccess: () => {
      toast({
        description: 'note created successfully',
        duration: 3000,
      });
    },
  })

  const { mutateAsync: updateNote } = trpc.note.updateNote.useMutation({
    onSuccess: () => {

    },
  });

  const { mutateAsync: deleteNote } = trpc.note.deleteNote.useMutation({
    onSuccess: () => {
      toast({
        description: 'note deleted successfully',
        duration: 3000,
      });
    },
  });

  useEffect(() => {
    if (updatedNotes) {
      setNotes(updatedNotes)
    }
  }, [updatedNotes])

  useEffect(() => {
    if (folders && folders.length > 0) {
      if (pathname.startsWith('/notes/folder/')) {
        setSelectedFolder(folderId)
      } else if (pathname.startsWith('/notes/note/')) {
        setSelectedFolder(noteData?.folderId || folders[0].id)
      } else if (!selectedFolder) {
        setSelectedFolder(folders[0].id)
      }
    }
  }, [folders, folderId, noteId, noteData, pathname, selectedFolder])

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId)
    router.push(`/notes/folder/${folderId}`)
  }

  const handleCreateFolder = async () => {
    try {
      const newFolder = await createFolder({ name: "New Folder" })
      if (newFolder && newFolder.id !== '') {
        setFolders([...folders, newFolder])
        router.push(`/notes/folder/${newFolder.id}`)
      }
    } catch (error) {
      toast({
        description: 'Failed to create folder',
        variant: 'destructive',
        duration: 3000,
      })
      console.error('Failed to create folder:', error)
    }
  }

  const handleRenameFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId)
    if (folder) {
      setRenamingFolderId(folderId)
      setRenameFolderName(folder.name)
    }
  }

  const handleRenameFolderConfirm = async () => {
    setIsRenamingFolder(true)
    if (renamingFolderId && renameFolderName.trim()) {
      try {
        await updateFolder({ id: renamingFolderId, name: renameFolderName })
        setRenamingFolderId(null)
        setRenameFolderName('')
        setIsRenamingFolder(false)
      } catch (error) {
        toast({
          description: 'Failed to update folder',
          variant: 'destructive',
          duration: 3000,
        })
        console.error('Failed to update folder:', error)
      }
    }
  }

  const handleDeleteFolder = async (folderId: string) => {
    try {
      await deleteFolder({ id: folderId })
      setFolders(folders.filter(f => f.id !== folderId))
      setNotes(notes.filter(n => n.folderId !== folderId))
      if (selectedFolder === folderId) {
        const remainingFolders = folders.filter(f => f.id !== folderId)
        if (remainingFolders.length > 0) {
          router.push(`/notes/folder/${remainingFolders[0].id}`)
        } else {
          router.push('/notes')
        }
      }
    } catch (error) {
      toast({
        description: 'Failed to delete folder',
        variant: 'destructive',
        duration: 3000,
      })
      console.error('Failed to delete folder:', error)
    }
  }

  const handleCreateNote = async () => {
    if (!selectedFolder) return

    try {
      const note = await createNote({
        title: 'New Note',
        content: '',
        folderId: selectedFolder
      })
      if (note && note.length > 0) {
        setNotes([...notes, note[0]])
        router.push(`/notes/note/${note[0].id}`)
        setSearchQuery('')
      }
    } catch (error) {
      toast({
        description: 'Failed to create note',
        variant: 'destructive',
        duration: 3000,
      })
      console.error('Failed to create note:', error)
    }
  }

  const handleNoteClick = (noteId: string) => {
    router.push(`/notes/note/${noteId}`)
    router.refresh()
  }

  const handleRenameNote = (noteId: string) => {
    const note = notes?.find(n => n.id === noteId)
    if (note) {
      setRenamingNoteId(noteId)
      setRenameNoteName(note.title)
    }
  }

  const handleRenameNoteConfirm = async () => {
    setIsRenamingNote(true)
    if (renamingNoteId && renameNoteName.trim() && selectedFolder) {
      try {
        await updateNote({ id: renamingNoteId, title: renameNoteName, folderId: selectedFolder })
        setNotes(notes.map(n => n.id === renamingNoteId ? { ...n, title: renameNoteName } : n))
        setRenamingNoteId(null)
        setRenameNoteName('')
        setIsRenamingNote(false)

      } catch (error) {
        toast({
          description: 'Failed to update note',
          variant: 'destructive',
          duration: 3000,
        })
        console.error('Failed to update note:', error)
      }
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    if (!selectedFolder) return

    try {
      await deleteNote({ id: noteId, folderId: selectedFolder })
      setNotes(notes.filter(n => n.id !== noteId))
      if (noteId === params?.id) {
        router.push(`/notes/folder/${selectedFolder}`)
      }
    } catch (error) {
      toast({
        description: 'Failed to delete note',
        variant: 'destructive',
        duration: 3000,
      })
      console.error('Failed to delete note:', error)
    }
  }
  
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => note.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
  }, [notes, searchQuery])

  return (
    <div className="flex bg-background text-xs h-[calc(100vh-110px)]">
      <div className="w-1/6 p-6 border-r border-t flex bg-zinc-50 flex-col">
        <ScrollArea className="flex-grow">
          <div className="flex flex-col w-full">
            {folders?.length === 0 && (
              <Alert className="mt-2 max-w-md">
                <RocketIcon className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">Heads up!</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  You don&apos;t have any folders yet. Create one <span className="text-primary cursor-pointer" onClick={handleCreateFolder}>here</span>
                </AlertDescription>
              </Alert>
            )}
            {folders?.map((folder: FolderSchema) => (
              <div key={folder.id} className="flex items-center mb-2">
                {renamingFolderId === folder.id ? (
                  <div className="flex items-center w-full">
                    <Input
                      value={renameFolderName}
                      onChange={(e) => setRenameFolderName(e.target.value)}
                      className='text-xs ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0'
                      autoFocus
                    />
                    <Button onClick={handleRenameFolderConfirm} size="icon" variant="ghost">
                      {isRenamingFolder ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <Button onClick={() => setRenamingFolderId(null)} size="icon" variant="ghost">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div
                      className={`flex items-center w-full group justify-between px-2 py-2 rounded-xl cursor-pointer ${selectedFolder === folder.id ? 'bg-primary/10' : 'bg-background hover:bg-accent'
                        }`}
                      onClick={() => handleFolderClick(folder.id)}
                    >
                      <div className='flex items-center space-x-2'>
                        <Folder className="h-4 w-4 text-primary" />
                        <span className="font-normal text-xs">{folder.name}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div className="cursor-pointer hidden group-hover:block">
                            <MoreVertical className="h-4 w-4" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='font-light text-xs'>
                          <DropdownMenuItem onClick={() => handleRenameFolder(folder.id)}>
                            <PenTool className="h-2 w-2 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteFolder(folder.id)}>
                            <Trash2 className="h-2 w-2 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4">
          <Button
            onClick={handleCreateFolder}
            className="w-full justify-center space-x-2 border-primary"
            variant="outline"
          >
            <PlusCircleIcon className="h-4 w-4 text-primary" />
            <span className="text-primary">New Folder</span>
          </Button>
        </div>
      </div>

      {/* Notes section */}
      <div className="flex-1 flex">
        <div className="w-1/5 p-6 border-r border-t">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder='Search notes... '
              className='w-full mr-2'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="ghost" size="icon" onClick={handleCreateNote}>
              {isCreatingNote ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            </Button>
          </div>
          <ScrollArea>
            {isLoadingNotes ?
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              : <>
                {filteredNotes.map((note) => (
                  <div key={note.id} className="flex items-center mb-1">
                    {renamingNoteId === note.id ? (
                      <div className="flex items-center w-full">
                        <Input
                          value={renameNoteName}
                          onChange={(e) => setRenameNoteName(e.target.value)}
                          className='text-xs ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0'
                          autoFocus
                        />
                        <Button onClick={handleRenameNoteConfirm} size="icon" variant="ghost">
                          {isRenamingNote ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        </Button>
                        <Button onClick={() => setRenamingNoteId(null)} size="icon" variant="ghost">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center w-full">
                        <Button
                          variant='ghost'
                          className={`flex-grow justify-start px-2 space-x-2 rounded-xl ${noteId === note.id ? 'bg-primary/10' : ''}`}
                          onClick={() => handleNoteClick(note.id)}
                        >
                          <FileIcon className="h-4 w-4 text-primary" />
                          <span className="font-normal text-xs">{note.title}</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="cursor-pointer">
                              <MoreVertical className="h-4 w-4" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='font-light text-xs'>
                            <DropdownMenuItem onClick={() => handleRenameNote(note.id)}>
                              <PenTool className="h-2 w-2 mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteNote(note.id)}>
                              <Trash2 className="h-2 w-2 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                ))}
              </>
            }
          </ScrollArea>
        </div>
        <div className="flex-1 p-6 w-full border-t">
          {children}
        </div>
      </div>
    </div>
  )
}