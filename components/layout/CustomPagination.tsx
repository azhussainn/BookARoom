'use client'

import Pagination from "react-js-pagination";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { type FC } from "react";

type CustomPaginationProps = {
    resPerPage: number;
    filteredRoomCount: number;
}

const CustomPagination: FC<CustomPaginationProps> = ({ resPerPage, filteredRoomCount }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const page = Number(searchParams.get('page')) || 1;

    const handlePageChange = (currentPage: number) => {
        if(typeof window !== 'undefined'){
            const queryParams = new URLSearchParams(window.location.search);
            if(queryParams.has("page")){
                queryParams.set("page", currentPage.toString());
            }else{
                queryParams.append('page', currentPage.toString())
            }
            router.push(pathname + "?" + queryParams.toString());
        }
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            {resPerPage < filteredRoomCount &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={filteredRoomCount}
                    onChange={handlePageChange}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            }
        </div>
    )
}

export default CustomPagination