module.exports = {
    type: {
        FAILED                  : { code: 0, msg: '요청에 실패하였습니다.'},
        SUCCESS                 : { code: 1, msg: '성공'},
        INVALID_PARAMETER       : { code: 2, msg: '잘못된 파라미터 입니다.'},
        DATABASE_ERROR          : { code: 3, msg: '데이터베이스 오류'},
        EXCEED_TRY_COUNT        : { code: 4, msg: '요청한도를 초과하였습니다. 잠시 후 이용해 주세요.'},
        TIME_EXCEED             : { code: 5, msg: '허용시간이 초과하였습니다.'},
        FAILED_GET_DB           : { code: 6, msg: '데이터베이스 연결을 가져오지 못했습니다.'},
        AWS_S3_FAILED           : { code: 7, msg: 'AWS S3 쿼리가 실패하였습니다.'},
        STORE_ALREADY_EXIST     : { code: 8, msg: '상점이 이미 존재합니다.'},
        STORE_NOT_FOUND         : { code: 9, msg: '해당 상점을 찾을 수 없습니다.'},
        PRODUCT_ALREADY_EXIST   : { code: 10, msg: '상품이 이미 존재합니다.'},
        PRODUCT_NOT_FOUND       : { code: 11, msg: '해당 상품을 찾을 수 없습니다.'},
        ALREADY_BOOKMARKED      : { code: 12, msg: '이미 즐겨찾기되어 있는 상점입니다.'},
        HAVE_NO_BOOKMARK        : { code: 13, msg: '즐겨찻기 되어 있는 상품이 아닙니다.'},
        IS_EXIST_OTHER_CART     : { code: 14, msg: '다른 상점의 장바구니가 존재합니다.'},
        USER_NOT_FOUND          : { code: 15, msg: '회원정보가 존재하지 않습니다.'},
        INTERNAL_ERROR          : { code: 99, msg: '서버 오류'},
        NOT_SUPPORT             : { code: 100, msg: '지원하지 않는 프로토콜 입니다.'}
    },
    get: (response, data) => {
        const rs = Object.assign({}, response);
        rs.data = data;
        return rs;
    }
};
