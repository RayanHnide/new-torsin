import dynamic from "next/dynamic";
import Layout from "../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../src/components/common/LazyLoader";
// import Notifications from "../src/components/notifications/index";

const Notifications = dynamic(
    () => import('../src/components/notifications/index'),
    {
        loading: () => <LazyLoader />
    }
)

export default function DashboardPage() {
    return (

        <Layout title={`Notifications | Torsin `} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4">
                <Notifications />
            </div>
        </Layout>
    );
}