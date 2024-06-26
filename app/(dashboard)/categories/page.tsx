"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus } from 'lucide-react'
import React from 'react'
import { columns } from './columns'
import { DataTable } from '@/components/utils/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete-category'
import { useGetCategories } from '@/features/categories/api/use-get-categories'


const CategoriesPage = () => {
    const newCategory = useNewCategory();
    const deleteAccounts = useBulkDeleteCategories();
    const CategoryQuery = useGetCategories();
    const categories = CategoryQuery.data || [];
    const isDisabled = CategoryQuery.isLoading || deleteAccounts.isPending ;
    if(CategoryQuery.isLoading){
      return(
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm '>
              <CardHeader>
                  <Skeleton className='h-8 w-48' />
              </CardHeader>
              <CardContent>
             <div className='h-[500px] w-full flex items-center justify-center'>
              <Loader2 className='size-8 text-slate-300 animate-spin' />
             </div>
              </CardContent>
          </Card>
          </div>
      );
    }
  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm '>
            <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                <CardTitle className='text-xl line-clamp-1'>Categories Page</CardTitle>
                <Button onClick={newCategory.onOpen}>
                    <Plus className='size-4 mr-3'/>
                    Add new
                </Button>
            </CardHeader>
            <CardContent>
            <DataTable columns={columns} data={categories} filterKey='name' onDelete={(row) => {
              const ids = row.map(r => r.original.id);
              deleteAccounts.mutate({ids});
            }} disabled={isDisabled}/>
            </CardContent>
        </Card>
    </div>
  )
}

export default CategoriesPage