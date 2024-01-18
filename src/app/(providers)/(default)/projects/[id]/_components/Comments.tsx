import { Tables } from "@/types/supabase"
import formatDate from "@/utils/formatDate"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import Image from "next/image"
import React, { SetStateAction, useEffect, useState } from "react"
import { getComments } from "../../api"
import Spacer from "@/components/ui/Spacer"
import CommentForm from "./CommentForm"
import ReCommentForm from "./ReCommentForm"

type Props = {
  project: Tables<"projects">
  isWriter: boolean
}

type Comments = {
  formattedData: Tables<"comments">
}

const Comments = ({ project, isWriter }: Props) => {
  const [commentData, setCommentData] = useState<Comments[]>([])
  const { data: comments, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(project.id),
  })

  // const commentWriter = comments?.filter(
  //   (comment) => comment.user_id === usersId,
  // )

  console.log(comments, "댓글목록")

  if (commentsIsLoading || !comments) return <div>is Loading...</div>

  return (
    <>
      <section>
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="">
              <Image
                width={48}
                height={48}
                src={`${comment.user?.avatar_url}`}
                alt="댓글 작성자 이미지"
                className="w-12 h-12 rounded-full object-cover inline-block"
              />
              <span className="mr-2 pl-2 font-semibold">
                {comment.user?.user_nickname}
              </span>
              <span className="text-xs">
                {dayjs(comment.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </span>
              <div className="flex flex-col pl-14 min-h-28 border-b-2">
                <div className="h-auto font-semibold">{comment.content}</div>
                <Spacer y={10} />
                {comment.user && <ReCommentForm user={comment.user} />}
              </div>
              <Spacer y={30} />
              <CommentForm comment={comment} user={comment.user} />
            </div>
          )
        })}
      </section>
    </>
  )
}

export default Comments
