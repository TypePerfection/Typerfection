import Layout from "@/components/Layout/Layout";
import Link from "next/link";


export default function Page(){
    return (
        <Layout>
            <div className="mx-auto text-center">
                <h1 className="pt-10 text-4xl font-mono">
                    Homepage
                </h1>
                <div className="mt-5 ">
                <Link className=" bg-violet-600 text-white p-2 rounded-md font-mono text-xl hover:shadow-xl hover:p-3" href="/learn"> Begin</Link>

                </div>
            </div>
        </Layout>
    )
}