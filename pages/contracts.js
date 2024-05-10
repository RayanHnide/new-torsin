import Layout from "../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../src/components/common/LazyLoader";
import dynamic from "next/dynamic";

const Contracts = dynamic(() => import('../src/components/contracts'), {
    loading: () => <LazyLoader />
})

export default function ContractsPage() {
    return (
        <Layout title={`My Contracts | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Contracts`}>
            <div className="container pt-4">
                <Contracts />
            </div>
        </Layout>
    );
}