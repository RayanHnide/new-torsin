import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../../src/components/common/LazyLoader";
import { useRouter } from "next/router";
import { useState } from "react";
import { decodeData } from "../../src/helpers/auth";

const AllTalents = dynamic(() => import('../../src/components/client-dashboard/AllTalents'), {
    loading: () => <LazyLoader />
})

const ViewTalent = dynamic(() => import('../../src/components/client-dashboard/AllTalents'), {
    loading: () => <LazyLoader />
})

export default function DashboardPage() {

    const router = useRouter();
    const { query } = router;
    const queryContain = query.id;

    return (
        <Layout title={`Dashboard | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4 mx-0">
                {
                    queryContain && queryContain?.includes('all-talents') && <AllTalents />
                }
                {
                    queryContain && queryContain?.includes('view-talent') &&
                    <ViewTalent
                        query={decodeData(queryContain.replace('view-talent=', ''))}
                    />
                }
            </div>
        </Layout>
    );
}