"use client"

import * as React from "react"
import { type InfiniteData } from "@tanstack/query-core"
import { useInView } from "react-intersection-observer"

import { cn } from "@/lib/utils"

interface ListInfiniteProps<T> {
  data: InfiniteData<{ items: T[] }, unknown> | undefined
  renderItem: (item: T) => React.ReactNode
  renderLoader?: () => React.ReactNode
  renderEmpty?: () => React.ReactNode
  nextPage: () => void
  hasMore: boolean
  loading: boolean
  className?: string
}

const ListInfinite = <T,>({
  data,
  loading,
  hasMore,
  nextPage,
  renderItem,
  renderLoader,
  renderEmpty,
  className
}: ListInfiniteProps<T>) => {
  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView && hasMore && !loading) nextPage()
  }, [nextPage, inView, hasMore, loading])

  const isEmpty = !loading && (!data || data.pages.every(page => !page?.items?.length))

  return (
    <div className={cn("relative w-full", className)}>
      {data?.pages?.map((page, index) => (
        <React.Fragment key={index}>{page?.items?.map(item => renderItem(item))}</React.Fragment>
      ))}
      {isEmpty && renderEmpty ? renderEmpty() : null}
      {loading && renderLoader ? renderLoader() : null}
      <div ref={ref}></div>
    </div>
  )
}

export default ListInfinite
