utils = {
    getQueryGenerator: function(query) {
        let count =1;
        let offset = null;
        if(query.offset && query.offset != 'null'){
            offset = query.offset;
        }
        delete query.offset;
        let fetchSize = null;
        if(query.fetchSize && query.fetchSize != 'null'){
            fetchSize = query.fetchSize;
        }
        delete query.fetchSize;
        let a = Object.keys(query);
        let params = Object.values(query);
        let qry = "";
        if(a.length>0)
            qry += " WHERE "
        a.map(function(item) {
             qry += (count > 1 && count <= a.length ? " AND " : "") + item + " = ? ";
             count ++;
        })
        qry += ' ALLOW FILTERING ';
        let options = {prepare : true};
        if(offset != null){
            options.pageState = offset;
        }
        if(fetchSize != null){
            options.fetchSize = fetchSize;
        }
        let data = {
            qry : qry,
            params : params,
            options : options
        }
        return data;
    }
}
module.exports = utils