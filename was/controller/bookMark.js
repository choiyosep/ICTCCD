const bookMark = require("../service/Bookmark"),
    Store = require('../service/Store'),
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
                //rs = bookMark.bookmarkObject(buyerId, sellerId);
                const isBookmarked = await bookMark.isBookMarked(buyerId,sellerId);
                DB.conn.getConnection((err, conn) => {
                    const query = `DELETE FROM bookmark WHERE buyerId = '${buyerId}' and sellerId = '${sellerId}'`;
                    //console.log(rs);
                    conn.query(query, null, (err, results, fields) => {

                        if (!isBookmarked) {
                            reject(Response.get(Response.type.HAVE_NO_BOOKMARK, {}));
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

    },
    BookmarkedList: (buyerId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const hasBookmark = await bookMark.hasBookmark(buyerId);

                if (!hasBookmark) {
                    reject(Response.get(Response.type.HAVE_NO_BOOKMARK, {}));
                } else {
                    const stores = await Store.getBookmarkedStoreList(buyerId);
                    for (let i = 0; i < stores.length; i++) {

                        //사진 정보
                        const images = await Store.getPicturesById(stores[i].sellerId);
                        stores[i].images = [];
                        //첫번째 사진
                        stores[i].images.push(images[0].pic_src);
                    }

                    resolve(stores);
                }

            } catch (err) {
                console.log(err);
                reject(err);
            }

        })
    }
}
