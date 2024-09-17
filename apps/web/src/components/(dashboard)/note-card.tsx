'use client';

import { CloudIcon, FileText, FileTextIcon, PenSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'

import {NotesSchema} from "@repo/drizzle/schema/notes"

export type NotesCardsProps = {
    notes: NotesSchema[]
}

export const NotesCards  = ({notes}:NotesCardsProps) => {
    const router = useRouter();
  return (
    <Card className="lg:col-span-2  transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between  bg-primary/10">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-yellow-500" />
          <div>
            <CardTitle className="text-xl font-semibold">Notes</CardTitle>
            <p className="text-sm text-muted-foreground">All Notes</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={
            ()=>{
                router.push('/notes')
            }
        }>
            <PenSquare className="h-5 w-5 " />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4 mt-4">
          <div className="space-y-4">
            {notes.map((note) => {
                return (
                    <div key={note.id} className="pb-2 cursor-pointer" 
                    onClick={() => {
                        router.push(`/notes/note/${note.id}`)
                    }}>
                    <h4 className="text-base font-semibold">{note.title}</h4>
                    <p className="text-sm text-muted-foreground">{format(new Date(note.createdAt), 'PPP')}</p>
                    <hr className="my-1" />
                    </div>
                )
                })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}