import Image from "next/image";
import Link from "next/link";

function Header() {
    const links: { title: string; url: string; }[] = [
        { title: "Google", url: "https://www.google.com" },
        { title: "Posts", url: "posts" },
        { title: "BYU-I", url: "https://www.BYUI.edu" },
    ]
    const image = "/keyboard.svg";


    const linkList = links.map(link =>
        <div key={link.title} className="hover:bg-slate-50 h-full flex w-20 text-white hover:text-violet-600">
            <Link className="m-auto  text-xl font-mono" href={link.url}>{link.title}</Link>
        </div>
    )
    return (
        <nav className='flex w-full bg-violet-600 top-0 sticky h-10 '>
            <Link href="/">
                <img src={image} className="h-10"></img>
            </Link>

            {linkList}
        </nav>
    )
}
export default Header;