import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import Layout from "@/components/Layout/Layout";
import XButton from "@/components/Inputs/XButton";
import { GetServerSideProps } from "next"
import prisma from '../../lib/prisma';
import { GetStaticProps } from "next"




export const getStaticProps: GetStaticProps = async () => {

    const input = await prisma.completedTestingText.findMany({
        select: {
            user: true,
            accuracy: true,
            wpm: true,
            createdAt: true,
            
        }
    });
    let feed = [];
    //I LOVE STUPID TYPECASTING!!!!!!!!!!!
    for (let item of input) {
        feed.push({
            name: item.user.name,
            accuracy: item.accuracy.toString(),
            wpm: item.wpm.toString(),
            date: item.createdAt.toUTCString(),
        }
        )
    }

    return {
        props: { feed },
        revalidate: 10,
    };
}

// I LOVE BOILERPLATE!!!!
export type timeProps = {
    name: string,
    accuracy: string,
    wpm: string,
    date: string,
}

type Props = {
    feed: timeProps[]
}

function Account() {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;
    const { data: session, status } = useSession();

    return (
        <div>
            <div className="flex gap-1">
                <div className="border-r-2 border-t-2 w-20">
                    Name:
                </div>
                <h1>{session?.user?.name}</h1>
            </div>
            <div className="flex gap-1">
                <div className="border-r-2 border-t-2 w-20">
                    Email:
                </div>
                <h1>{session?.user?.email}</h1>
            </div>
            <div className="pt-2">
                <XButton onClick={() => signOut()} text="Log Out" />
            </div>
        </div>
    )
}

const App: React.FC<Props> = (list) => {
    let row = list.feed.map((thing) => (
        <tr>
            <td className="border-r-2 border-t-2 w-20">
                {thing.date}
            </td>
            <td className="border-r-2 border-t-2 w-20">
                {thing.accuracy}
            </td>
            <td className="border-r-2 border-t-2 w-20">
                {thing.wpm}
            </td>

        </tr>
    ))


    let table = (
        <div>
            <table>
                <tr>
                    <th>Dates</th>
                    <th>Accuracy</th>
                    <th>WPM</th>
                </tr>
                {row}
            </table>
        </div>
    )
    return (
        <div>
            <Layout>
                <div>
                    {table}
                </div>
                <div className="pt-5">
                    <Account />
                </div>
            </Layout>
        </div>
    )
}



export default App;