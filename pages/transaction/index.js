import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../../src/components/common/LazyLoader";
import Transaction from '../../src/components/transaction/index'
// const TransactionElement = dynamic(
//     () => import('../../src/components/transaction/index'),
//     {
//         loading: () => <LazyLoader />
//     }
// )

export default function DashboardPage() {
    return (

        <Layout title={`Payment | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4">
                <Transaction />
            </div>
        </Layout>
    );
}