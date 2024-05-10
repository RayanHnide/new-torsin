import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '../../../src/components/common/mainpage/NavbarComponent';
import FooterComponent from '../../../src/components/common/mainpage/FooterComponent';
import AllJobs from '../../../src/components/guest/AllJobs';
import { useRouter } from 'next/router';
import { decodeData } from '../../../src/helpers/auth';
import { LazyLoader } from '../../../src/components/common/LazyLoader';

export default function Home() {

    const router = useRouter();
    const { query } = router;
    const { data } = query;
    const item = decodeData(data);

    return (
        <div>
            <Head>
                <title>Torsin Talent | All Jobs</title>
                <meta name="description" content="Torsin Talent Details" />
                <link rel="icon" href="/images/torsinLogo.png" />
            </Head>
            <main>
                <NavbarComponent />
                {!(query && data && item) ?
                    <LazyLoader />
                    :
                    <AllJobs query={item} />
                }
                {/* <FooterComponent /> */}
            </main>
        </div>
    )
}
