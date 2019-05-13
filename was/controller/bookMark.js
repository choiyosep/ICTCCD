const bookMark = require("../service/Bookmark"),
    Response = require('../core/Response'),
    DB = require('../core/Database')

module.exports = {

    BookmarkCreate:(buyerId, sellerId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const isBookmarked = await bookMark.isBookMarked(buyerId, sellerId);
                if (isBookmarked) {
                    throw Response.get(Response.type.ALREADY_BOOKMARKED, {});
                } else {
                    rs = bookMark.bookmarkObject(buyerId, sellerId);            
                    resolve (rs);
                    
                }
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })  
    },
    BookmarkDelete: (buyerId, sellerId) =>{
        return new Promise(async (resolve, reject) => {
            try {
                const isBookmarked = await bookMark.isBookMarked(buyerId, sellerId);
                DB.conn.getConnection((err, conn) => {
                    const query = `DELETE FROM bookmark WHERE buyerId = '${buyerId}' and sellerId = '${sellerId}'`;
                    conn.query(query, null, (err, results, fields) => {
                        
                        if (!isBookmarked) {
                            reject(Response.get(Response.type.HAVE_NO_BOOKMARK,{} ));
                        } else {
                            conn.release();
                            resolve(results);
                        }
                    });
                });
            } catch (err) {
                console.log(err);
                reject(Response.get(Response.type.FAILED_GET_DB, err.message));
            }
        });

    }
}
