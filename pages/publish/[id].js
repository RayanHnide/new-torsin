import Layout from "../../src/components/common/MainHeaderFooterLayout";
import { useRouter } from "next/router";
import { decodeData } from "../../src/helpers/auth";
import dynamic from "next/dynamic";
import { LazyLoader } from "../../src/components/common/LazyLoader";

export default function DashboardPage() {

    const Publish = dynamic(
        () => import('../../src/components/publish'),
        {
            loading: () => <LazyLoader />
        })

    const ViewJob = dynamic(
        () => import('../../src/components/publish/ViewJob'),
        {
            loading: () => <LazyLoader />
        })

    const router = useRouter();
    const { query } = router;
    const decodedToken = decodeData(query?.id?.replace('editjob=', ''))?.editData;
    const viewDecodedToken = decodeData(query?.id?.replace('viewjob', ''))

    return (
        <Layout title={` ${decodedToken ? 'Edit Job' : viewDecodedToken && 'View Job'} | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Publish Job`}>
            <div className="container pt-4 mx-0">
                {decodedToken && <Publish query={decodedToken} />}
                {/* {viewDecodedToken && <ViewJob query={viewDecodedToken} />} */}
            </div>
        </Layout>
    );
}