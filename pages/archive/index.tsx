import Layout from "@/components/Layout/Layout";
import Link from "next/link";

export default function ArchiveHome() {
    return (

        <Layout>
            <div>
                <Link href="./archive/posts">
                    Posts
                </Link>
            </div>
            <div>
                <Link href="./archive/component-showcase">
                    Components
                </Link>
            </div>
            <div>
                <Link href="./archive/sign-up">
                    Sign up
                </Link>
            </div>
            <div>
                <Link href="./archive/old-homepage">
                    Old Homepage
                </Link>
            </div>
        </Layout>
    )
}