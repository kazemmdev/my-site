"use client"

import * as React from "react"
import { type InfiniteData } from "@tanstack/query-core"
import { useInView } from "react-intersection-observer"

import { cn } from "@/lib/utils"

interface ListInfiniteProps {
  data: InfiniteData<any, unknown> | undefined
  renderItem: (item: any) => React.ReactNode
  renderLoader?: () => React.ReactNode
  nextPage: () => void
  hasMore: boolean
  loading: boolean
  className?: string
}

const ListInfinite = ({
  data,
  loading,
  hasMore,
  nextPage,
  renderItem,
  renderLoader,
  className
}: ListInfiniteProps) => {
  console.log(data)
  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView && hasMore && !loading) nextPage()
  }, [nextPage, inView])

  return (
    <div className={cn("relative w-full", className)}>
      {data?.pages?.map((page, index) => (
        // @ts-ignore
        <React.Fragment key={index}>
          {page?.items?.map((item: any) => renderItem(item))}
        </React.Fragment>
      ))}
      {!loading && data && data?.pages?.at(0)?.data?.length == 0 && (
        <p className="my-10 w-full text-center opacity-50">موردی یافت نشد..</p>
      )}
      {loading && renderLoader ? renderLoader() : null}
      <div ref={ref}></div>
    </div>
  )
}

export default ListInfinite
