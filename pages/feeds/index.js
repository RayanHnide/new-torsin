import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../../src/components/common/LazyLoader";
import { useEffect, useState } from "react";

export default function ContractsPage() {

    const Feeds = dynamic(
        () => import('../../src/components/feeds/index'),
        {
            loading: () => <LazyLoader />
        })

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        !Feeds ?
            setLoading(true)
            :
            setTimeout(() => {
                setLoading(false);
            }, 100);
    })

    return (

        <Layout title={`My Blogs | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Blogs`}>
            <div className="pt-4 container">
                {
                    !loading ?
                        <Feeds />
                        :
                        <LazyLoader />
                }
            </div>
        </Layout>
    );
}