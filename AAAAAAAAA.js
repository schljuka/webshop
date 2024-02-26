



// filter() {
    //     const queryCopy = { ...this.queryStr }; // Change this.queryStr to this.queryParams
    
    //     // Removing fields from the query
    //     const removeFields = ['keyword', 'limit', 'page']
    //     removeFields.forEach(el => delete queryCopy[el]);
    
    //     // Advanced filter for price, rating
    //     let queryStr = JSON.stringify(queryCopy)
    //     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    
    //     this.query = this.query.find(JSON.parse(queryStr));
    //     return this;
    // }