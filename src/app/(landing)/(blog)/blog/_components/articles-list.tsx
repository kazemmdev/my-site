"use client"

import React from "react"
import Image from "next/image"

import {Box, Boxes} from "@/components/ui/boxes"
import ListInfinite from "@/components/list-infinite"
import {DevToArticle, useGetBlogArticlesQuery} from "@/app/(landing)/(blog)/_api"
import {Skeleton} from "@/components/ui/skeleton";

const ArticlesList = () => {
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching} =
        useGetBlogArticlesQuery()

    return (
        <Boxes className="!grid-cols-1">
            <ListInfinite
                data={data}
                hasMore={hasNextPage}
                nextPage={fetchNextPage}
                loading={isFetchingNextPage || isFetching}
                className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
                renderItem={(article: DevToArticle) => (
                    <Box key={article.id} className="" url={`/blog/${article.id}`}>
                        <div className="">
                            <div className="w-full h-48 relative overflow-hidden">
                                <Image src={article.cover_image!} alt="post cover" fill className="object-cover"/>
                            </div>
                            <div className="px-5 pt-2 pb-3">
                                <h3 className="text-lg font-semibold">{article.title}</h3>
                            </div>
                        </div>
                    </Box>
                )}
                renderLoader={() => <Skeleton className="w-full h-52"/>}
            />
        </Boxes>

    )
}

export default ArticlesList
