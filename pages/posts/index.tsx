import React from "react"
import { GetStaticProps } from "next"
import prisma from '../../lib/prisma';
import Router from "next/router";

// Made following this tutorial 
// https://vercel.com/guides/nextjs-prisma-postgres#step-5.-update-the-existing-views-to-load-data-from-the-database

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.post.findMany({
        where: { published: true },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
    return {
        props: { feed },
        revalidate: 10,
    };
}

type Props = {
    feed: PostProps[]
}


const Blog: React.FC<Props> = (props) => {
    return (
        <div className="page">
            <h1>Public Feed</h1>
            <main>
                {props.feed.map((post) => (
                    <div key={post.id} className="post">
                        <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
                            {post.title}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )
}
export default Blog