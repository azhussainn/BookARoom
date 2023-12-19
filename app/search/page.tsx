import Search from "@/components/Search";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Search Rooms'
}

const SearchPage = () => {
    return (
        <Search />
    )
}

export default SearchPage