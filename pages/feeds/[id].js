import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../../src/components/common/LazyLoader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { decodeData } from "../../src/helpers/auth";

export default function ContractsPage() {

    const ViewFeeds = dynamic(
        () => import('../../src/components/feeds/ViewFeeds'),
        {
            loading: () => <LazyLoader />
        })

    const router = useRouter();
    const { query } = router;
    const decodedItem = decodeData(query?.id?.replace('viewfeeds=', ''))
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        !ViewFeeds ?
            setLoading(true)
            :
            setTimeout(() => {
                setLoading(false);
            }, 100);
    })

    return (

        <Layout title={`View Blogs | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Blogs`}>
            <div className="container pt-4">
                {
                    !loading && decodedItem ?
                        <ViewFeeds query={decodedItem} />
                        :
                        <LazyLoader />
                }
            </div>
        </Layout>
    );
}
