import Image from "next/image";
import Link from "next/link";

function NavBar() {
    const links: { title: string; url: string; }[] = [
        { title: "Posts", url: "/posts" },
        { title: "Components", url: "/compShowcase" },
        { title: "App", url: "/app" },
    ]
    const image = "/keyboard.svg";

    const linkList = links.map(link =>
        <div key={link.title} className="hover:bg-slate-50 h-full flex text-white hover:text-violet-600">
            <Link className="m-auto text-xl font-mono" href={link.url}>{link.title}</Link>
        </div>
    )
    return (
        <nav className='flex w-full bg-violet-600 top-0 sticky h-10 gap-2'>
            <Link href="/">
                <img src={image} className="h-10"></img>
            </Link>
            
            {linkList}
        </nav>
    )
}
export default NavBar;