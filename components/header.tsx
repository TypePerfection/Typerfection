import Image from "next/image";

function Header() {
    const links: { title: string; url: string; }[] = [
        { title: "Google", url: "https://www.google.com" },
        { title: "Posts", url: "posts" },
        { title: "BYU-I", url: "https://www.BYUI.edu" },
    ]
    const image = "/keyboard.svg";


    const linkList = links.map(link =>
        <div className="hover:bg-slate-50 h-full flex w-20 text-white hover:text-violet-600">
            <a className="m-auto  text-xl font-mono" href={link.url}>{link.title}</a>
        </div>
    )
    return (
        <nav className='flex w-full bg-violet-600 top-0 sticky h-10 '>
            <a href="/">
                <img src={image} className="h-10"></img>
            </a>

            {linkList}
        </nav>
    )
}
export default Header;