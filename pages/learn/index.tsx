import React from "react"
import { GetStaticProps } from "next"
import prisma from '../../lib/prisma';
import Router from "next/router";
import Layout from "@/components/Layout/Layout";

export type LevelProps = {
    id: string;
    name: string;
    texts: Texts[];
};

export type Texts = {
    id: string;
    text: string;

}

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.level.findMany({
        include: {
            texts: {
                // select: { name: true },
            },
        },
    });
    return {
        props: { feed },
        revalidate: 10,
    };
}


type Props = {
    feed: LevelProps[]
}


const Blog: React.FC<Props> = (levels) => {
    let stupidCounter = 1;
    let output = levels.feed.map((level) => (
        <div className="border-t mx-2" key={level.id}>
            <div>{level.name}</div>
            <div className="flex gap-2">
                {level.texts.map((text) => (
                    <div key={text.id} className="post">
                        <div onClick={() => Router.push("/app/[id]", `/app/${text.id}`)}>
                            <div className="bg-gray-300 p-2 w-20 rounded-md border border-gray-400 text-center">
                                Stage {stupidCounter++}{/* I am the dumbest programmer ever */}
                            </div>
                        </div>
                    </div>))}
            </div>

        </div>
    )
    )


    return (
        <Layout>
            <div className="page">
                <h1 className="text-xl pb-5">Levels</h1>
                <main>
                    {output}
                </main>
            </div>
        </Layout>
    )
}
export default Blog