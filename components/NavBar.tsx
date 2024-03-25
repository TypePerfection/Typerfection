// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from 'next/router';
// import { signOut, useSession } from 'next-auth/react';

// const NavBar: React.FC = () => {
//     const router = useRouter();
//     const isActive: (pathname: string) => boolean = (pathname) =>
//       router.pathname === pathname;
  
//     const { data: session, status } = useSession();

//     const links: { title: string; url: string; }[] = [
//         { title: "Posts", url: "/posts" },
//         { title: "Components", url: "/compShowcase" },
//         { title: "App", url: "/app" },
//         { title: "SignUp", url: "/signUp" },
//     ]
//     const image = "/keyboard.svg";

//     const linkList = links.map(link =>
//         <div key={link.title} className="hover:bg-slate-50 h-full flex text-white hover:text-violet-600">
//             <Link className="m-auto text-xl font-mono" href={link.url}>{link.title}</Link>
//         </div>
//     )

//     return (
//         <nav className='flex w-full bg-violet-600 top-0 sticky h-10 justify-around'>
//             <div className="flex w-full gap-2">
//                 <Link href="/">
//                     <img src={image} className="h-10"></img>
//                 </Link>

//                 {linkList}
//             </div>
//             <div>
//                 <Link href="/api/auth/signin" className="hover:bg-slate-50 h-full flex text-white hover:text-violet-600 mr-4 pt-1 m-auto text-xl font-mono">
//                     Login
//                 </Link>
//             </div>
//         </nav>
//     )
// }
// export default NavBar;