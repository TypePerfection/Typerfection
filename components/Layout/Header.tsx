import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';

const Header: React.FC = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;
    const { data: session, status } = useSession();

    const links: { title: string; url: string; }[] = [
        { title: "Posts", url: "/posts" },
        { title: "Components", url: "/compShowcase" },
        { title: "App", url: "/app" },
        { title: "SignUp", url: "/signUp" },
    ]
    const image = "/keyboard.svg";

    const linkList = links.map(link =>
        <div key={link.title} className="hover:bg-slate-50 h-full flex text-white hover:text-violet-600">
            <Link className="m-auto text-xl font-mono" href={link.url}>{link.title}</Link>
        </div>
    )

    let right = null

    if (status === 'loading') {
        right = (
            <div>
                loading user...
            </div>
        )
    }
    if (!session) {
        right = (
            <div>
                <Link href="/api/auth/signin" className="hover:bg-slate-50 h-full flex text-white hover:text-violet-600 mr-4 pt-1 m-auto text-xl font-mono">
                    Login
                </Link>
            </div>
        )
    }
    if (session) {
        right = (
            <div className="flex">
                <Link href="/account" className="h-full hover:bg-slate-50 w-full flex text-white hover:text-violet-600 mr-4 pt-1 m-auto text-xl font-mono">
                    {session.user?.name}
                </Link>
            </div>
        )
    }

    return (
        <nav className='flex w-full bg-violet-600 top-0 sticky justify-around h-12'>
            <div className="flex w-full gap-2">
                <Link href="/">
                    <img src={image} className="h-10"></img>
                </Link>

                {linkList}
            </div>
            <div className="flex mx-auto">
                {right}

            </div>
        </nav>
    )
}
export default Header;