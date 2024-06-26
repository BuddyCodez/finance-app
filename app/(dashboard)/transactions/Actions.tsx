"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useConfirm } from '@/hooks/user-confirm';
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction';
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction';
type ActionProps =  {
    id: string;
}
const Actions = ({id}: ActionProps) => {
    const { onOpen }= useOpenTransaction();
    const deleteMutation = useDeleteTransaction(id);
    const [ConfimDailog, confrim] = useConfirm("Are you Sure?", "This action cannot be undone.");
    const handleDelete = async() => {
        const ok = await confrim();
        if(!ok) return;
        deleteMutation.mutate();
    }
  return (
    <>
        <ConfimDailog />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='size-8 p-0 '>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)}>
                    <Edit className='size-4 mr-2' />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
                    <Trash className='size-4 mr-2' />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default Actions