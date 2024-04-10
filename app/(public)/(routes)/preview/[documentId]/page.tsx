'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import Cover from '@/components/Cover'
import Toolbar from '@/components/Toolbar'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import React from 'react'

interface PageProps {
  params: {
    documentId: Id<"documents">
  }
}

const Page = ({ params } : PageProps) => {
  const Editor = useMemo(() => 
    dynamic(() => import('@/components/Editor'), { ssr: false })
  , [])

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  })

  const update = useMutation(api.documents.update)

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    })
  }

  if (document === undefined) {
    return (
      <div className="">
        loading...
      </div>
    )
  }

  if (!document) {
    return (
      <div className="">
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className='h-14 w-[50%]' />
            <Skeleton className='h-4 w-[80%]' />
            <Skeleton className='h-4 w-[40%]' />
            <Skeleton className='h-4 w-[60%]' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='pb-40'>
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor 
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  )
}

export default Page