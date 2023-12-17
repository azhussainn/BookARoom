class ApiFilters {
    query: any;
    queryStr: any;

    constructor(query: any, queryStr: any){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(): ApiFilters {
        const location = this.queryStr?.location ? {
            address: {
                $regex: this.queryStr.location,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({ ...location })
        return this;
    }

    filter(): ApiFilters {
        const queryCopy = {...this.queryStr};
        const removedFields = [ 'location', 'page' ];
        removedFields.forEach(el => {
            if(el in queryCopy){
                delete queryCopy[el];
            }
        })
        this.query = this.query.find(queryCopy);
        return this;
    }
    pagination(resPerPage: number): ApiFilters {
        const currentPageNo = Number(this.queryStr?.page) || 1;
        const skip = resPerPage * ( currentPageNo - 1 );
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

export default ApiFilters;