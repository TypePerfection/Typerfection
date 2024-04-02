import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import Layout from "@/components/Layout/Layout";
import { GetServerSideProps } from "next"
import prisma from '../../lib/prisma';
import { GetStaticProps } from "next"





function Account() {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;
    const { data: session, status } = useSession();

    return (
        <Layout>
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
        </Layout>
    )
}


export default Account;