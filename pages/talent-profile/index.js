// import EditProfile from "../../src/components/TalentProfile/EditProfile";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
import dynamic from "next/dynamic";
import {LazyLoader} from "../../src/components/common/LazyLoader";
const EditProfile = dynamic(() => import('../../src/components/TalentProfile/EditProfile'), {
    loading: () => <LazyLoader />
})
export default function TalentProfile(){
    return(
        <>
        
        <Layout title="Profile | Torsin" data={{ layoutType: "HOME" }} description="Torsin Dashboard">
            <div className="container pt-4">

                 <EditProfile/>

            </div>
        </Layout>
        </>
    )
}
