'use client'
import { useEffect, useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Folder, Plus, FileIcon, User, MoreVertical, Check, X, PenTool, Trash2, PlusCircleIcon } from "lucide-react"
import dynamic from 'next/dynamic'
import { trpc } from '@repo/trpc/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { ReloadIcon } from '@radix-ui/react-icons'
import { useToast } from '@/hooks/use-toast'

export default function NotesPageView({folder} :any) {
  const [folders, setFolders] = useState(folder || [])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [selectedNote, setSelectedNote] = useState<any | null>(null)
  const [isExpanded, setIsExpanded] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const {toast } = useToast()
  
  const [isRenamingFolder, setIsRenamingFolder] = useState(false)
  const [renamingFolderId, setRenamingFolderId] = useState<string | null>(null)
  const [renameFolderName, setRenameFolderName] = useState('')

  // New state for renaming notes
  const [isRenamingNote, setIsRenamingNote] = useState(false)
  const [renamingNoteId, setRenamingNoteId] = useState<string | null>(null)
  const [renameNoteName, setRenameNoteName] = useState('')

  const fetchNotes = trpc.note.getNotes.useQuery(
    { folderId: selectedFolder || '' },
    { enabled: !!selectedFolder }
  )

  const [notes, setNotes] = useState<any[]>(fetchNotes.data || [])
  const Editor = useMemo(
    () => dynamic(() => import("@/components/(dashboard)/notes/Editor"), { ssr: false }),
    []
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

  const { mutateAsync: createFolder, isLoading: isCreatingFolder } = trpc.folder.createFolder.useMutation({
    onSuccess: () => {
      toast({
        description: 'folder created successfully',
        duration: 3000,
      });
    },
  });

  const {mutateAsync: createNote, isLoading: isCreatingNote} = trpc.note.createNote.useMutation({
    onSuccess: () => {
      toast({
        description: 'note created successfully',
        duration: 3000,
      });
    },
  })

  // New mutation for updating notes
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
    if (folders.length > 0 && !selectedFolder) {
      setSelectedFolder(folders[0].id)
    }
  }, [folders, selectedFolder])

  useEffect(() => {
    if (fetchNotes.data) {
      setNotes(fetchNotes.data)
    }
  }, [fetchNotes.data])

  const handleCreateNote = async () => {
    try {
      const note = await createNote({
        title: 'New Note',
        content: '',
        folderId: selectedFolder || ''
      })
      if (note) {
        setNotes([...notes, note[0]])
        setSelectedNote(note)
        setSearchQuery('')
      }
    } catch (error) {
      toast({
        description: 'Failed to create note',
        variant: 'destructive',
        duration: 3000,
      });
      console.error('Failed to create note:', error)
    }
  }

  const handleCreateFolder = async () => {
      try {
        const nfolder = await createFolder({ name: "New Folder" })
        if (nfolder && nfolder.length > 0) {
          setFolders([...folders, nfolder[0]])
        } 
      } catch (error) {
        toast({
          description: 'Failed to create folder',
          variant: 'destructive',
          duration: 3000,
        });
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
        setFolders(folders.map((f: any) => 
          f.id === renamingFolderId ? { ...f, name: renameFolderName } : f
        ))
        await updateFolder({ id: renamingFolderId, name: renameFolderName })
        setRenamingFolderId(null)
        setRenameFolderName('')
        setIsRenamingFolder(false)
      } catch (error) {
        toast({
          description: 'Failed to update folder',
          variant: 'destructive',
          duration: 3000,
        });
        console.error('Failed to update folder:', error)
      }
    }
  }

  const handleDeleteFolder = async(folderId: string) => {
    try {
      await deleteFolder({ id: folderId })
      setFolders(folders.filter(f => f.id !== folderId))
    } catch (error) {
      toast({
        description: 'Failed to delete folder',
        variant: 'destructive',
        duration: 3000,
      });
      console.error('Failed to delete folder:')
    }
  }

  const handleRenameNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId)
    if (note) {
      setRenamingNoteId(noteId)
      setRenameNoteName(note.title)
    }
  }

  const handleDeleteNote = async (noteId: string) => { 
    try {
      await deleteNote({ id: noteId, folderId: selectedFolder || '' })
      setNotes(notes.filter(n => n.id !== noteId))
      setSelectedNote(null)
    } catch (error) {
      toast({
        description: 'Failed to delete note',
        variant: 'destructive',
        duration: 3000,
      });
      console.error('Failed to delete note:', error)
    }
  }

  const handleRenameNoteConfirm = async () => {
    setIsRenamingNote(true)
    if (renamingNoteId && renameNoteName.trim()) {
      try {
        setNotes(notes.map(n => 
          n.id === renamingNoteId ? { ...n, title: renameNoteName } : n
        ))
        await updateNote({ id: renamingNoteId, title: renameNoteName, folderId: selectedFolder || '' })
        setRenamingNoteId(null)
        setRenameNoteName('')
        setIsRenamingNote(false)
      } catch (error) {
        toast({
          description: 'Failed to update note',
          variant: 'destructive',
          duration: 3000,
        });
        console.error('Failed to update note:', error)
      }
    }
  }

  const handleEditorChange = async(content: string) => {
    if (selectedNote) {
      try {
        await updateNote({
          id: selectedNote.id,
          title: selectedNote.title,
          content: content,
          folderId: selectedFolder || ''
        })
      } catch (error) {
        toast({
          description: 'Failed to update note',
          variant: 'destructive',
          duration: 3000,
        });
        console.error('Failed to update note:', error)
      }
    }
  }

  const filteredNotes = notes.filter(note => 
    (selectedFolder === null || note.folderId === selectedFolder) &&
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex bg-background text-xs">
      <div className="w-1/6 p-6 border-r border-t flex flex-col h-[calc(100vh-100px)]">
        {isExpanded && (
          <>
            <ScrollArea className="flex-grow">
              <div className="flex flex-col w-full">
                {folders.map((folder: any) => (
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
                       <Button
                          variant={selectedFolder === folder.id ? 'secondary' : 'outline'}
                          className="justify-between px-2 rounded-xl flex-grow group"
                          onClick={() => setSelectedFolder(folder.id)}
                        >
                          <div className='flex items-center space-x-2'>
                            <Folder className="h-4 w-4 text-primary" />
                            <span className="font-normal text-xs">{folder.name}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger >
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
                        </Button>
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
          </>
        )}
      </div>
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
              {
                isCreatingNote ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />
              }
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {notes.map((note) => (
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
                      className="flex-grow justify-start px-2 space-x-2 rounded-xl"
                      onClick={() => setSelectedNote(note)}
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
                        <DropdownMenuItem onClick={()=> handleDeleteNote(note.id)}>
                          <Trash2 className="h-2 w-2 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="flex-1 p-6 w-full border-t ">
          {selectedNote ? (
            <Editor onChange={handleEditorChange} initialContent={selectedNote.content} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-muted-foreground">Select a note to view or create a new note</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}