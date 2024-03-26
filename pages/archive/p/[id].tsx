import React from "react"
import { GetServerSideProps } from "next"
import prisma from '../../../lib/prisma';

export type PostProps = {
    id: string;
    title: string;
    author: {
      name: string;
      email: string;
    } | null;
    content: string;
    published: boolean;
  };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const post = await prisma.post.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
    return {
        props: post,
    };
}

const Post: React.FC<PostProps> = (props) => {
    let title = props.title
    if (!props.published) {
        title = `${title} (Draft)`
    }

    return (
        <div>
            <h2>{title}</h2>
            <p>By {props?.author?.name || "Unknown author"}</p>
            {props.content}
        </div>
    )
}

export default Post
