
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/en_US';
 import { FiChevronsLeft,FiChevronsRight} from "react-icons/fi";



const PaginationComponent = ({ currentPage, skip, list, onPageChange, limitPerPage, loading }) => {
    return (
        <ul className={`pagination`}>
            {list && list.length ? (
                <Pagination
                    onChange={onPageChange}
                    current={currentPage}
                    total={list.length}
                    pageSize={limitPerPage}
                    showLessItems
                    locale={localeInfo}
                    nextIcon={
                        <FiChevronsRight />
                        //  <div>Next</div>
                    }
                    prevIcon={
                        <FiChevronsLeft />
                        // <div> Previous</div>
                    }
                />
            ) : (
                !loading && <p className="text-center my-0">No Records Found.</p>
            )}
        </ul>
    );
};
export default PaginationComponent;