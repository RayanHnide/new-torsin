import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../../src/components/common/LazyLoader";
import { useRouter } from "next/router";
import { decodeData } from "../../src/helpers/auth";

export default function ContractsPage() {

    const ViewQuery = dynamic(
        () => import('../../src/components/support/ViewQueries'),
        {
            loading: () => <LazyLoader />
        })

    const RaiseQuery = dynamic(
        () => import('../../src/components/support/RaiseQuery'),
        {
            loading: () => <LazyLoader />
        })

    const SupportChat = dynamic(
        () => import('../../src/components/support/SupportChat'),
        {
            loading: () => <LazyLoader />
        })


    const router = useRouter();
    const { query } = router;
    const content = query?.id

    return (

        <Layout title={`Help & Support | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Blogs`}>
            <div className="container pt-4">
                {
                    content && content?.includes('view-detail') &&
                    <ViewQuery query={decodeData(query?.id?.replace('view-detail=', ''))} />
                }
                {
                    content && content?.includes('raise-query') &&
                    <RaiseQuery />
                }
                {
                    content && content?.includes('chat') &&
                    <SupportChat query={decodeData(query?.id?.replace('chat=', ''))} />
                }
            </div>
        </Layout>
    );
}
