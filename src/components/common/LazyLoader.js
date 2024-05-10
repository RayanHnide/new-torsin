import { Oval } from "react-loader-spinner";
import styles from '../../stylesheet/paymentMethods.module.scss';

export const LazyLoader = (props) => {
    return (
        // <Container className="lazy-loader position-relative">
        //     <Oval
        //         as="span"
        //         animation="grow"
        //         size="sm"
        //         role="status"
        //         aria-hidden="true"
        //         className={`mt-4 me-2 loader`}
        //     />
        // </Container>
        <div className={`position-relative`}>
            <div className={`loaderOverlay`}>
                <Oval
                    height={50}
                    width={50}
                    color="#0E184D"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#e0e0e0"
                    strokeWidth={8}
                    strokeWidthSecondary={5}
                />
            </div>
        </div>
    );
};