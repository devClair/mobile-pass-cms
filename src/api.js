const { Api } = require("@psyrenpark/api");
// const axios = require("axios");

// const env = require("../env");
// var baseFileServerUrl = env.baseFileServerUrl;
// var projectName = env.projectName;
// var projectEnv = env.projectEnv;

var projectName = "kl";
var projectEnv = "dev";

var v1Api = `${projectName}-${projectEnv}-api-v1`;
var v1Cdn = `${projectName}-${projectEnv}-cdn-v1`;

exports.apiObject = {
  getTest: () => {
    return Api.getAxios().get("https://www.google.com");
  },

  getTest2: ({ test, test2 }) => {
    return Api.getAxios().get("https://www.naver.com");
  },

  //  banner

  /**
   * [CDN] 메인 배너 가져오기
   * @param {string} locale                     - 언어
   * @param {string} banner_type                - ["live", "main", "chat"]
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listBanners: ({ locale, banner_type }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/banner";
    var myInit = {
      headers: {},
      queryStringParameters: { locale, banner_type },
    };

    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  //  user
  getUser: ({ locale }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/users";
    var myInit = {
      headers: {},
      queryStringParameters: {},
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  getUserDetail: ({ locale }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/users/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {},
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  //  user
  /**
   * [API] 유저의 수강 신청 목록 가져오기 (인증 필요)
   * @param {string} order_column               - "lecture_no", "createdAt", "updatedAt"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} lecture_type               - "vod", "live" , "all"
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listUserLectures: (
    { order_column, order_type, lecture_type, next_token },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/api/users/lectures";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        lecture_type,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 유저의 수강 신청 상세 정보 가져오기 (인증 필요)
   * @param {int} lecture_no                    - 유저가 수강한 강의 번호
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  getUserLecture: ({ lecture_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/users/lectures/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        lecture_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  // lectures
  /**
   * [CDN] 강의 정보 가져오기
   * @param {int} lecture_department_no         - target_department_no
   * @param {int} lecture_faculty_no            - lecture_faculty_no
   * @param {string} order_column               - "user_name", "createdAt", "lecturer_status"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} search_department          - 검색할 과
   * @param {string} search_faculty             - 검색할 학부
   * @param {string} search_name                - 검색할 강사 이름
   * @param {string} search_title               - 검색할 강의 제목
   * @param {string} search_content             - 검색할 강의 내용
   * @param {string} current_page               - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listLectures: (
    {
      order_column,
      order_type,
      search_department,
      search_faculty,
      search_name,
      search_title,
      search_content,
      current_page,
      lecture_department_no,
      lecture_faculty_no,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Cdn;
    var path = "/cdn/lectures";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        lecture_department_no,
        lecture_faculty_no,
        order_column: "updatedAt",
        order_type: "DESC",
        search_department,
        search_faculty,
        search_name,
        search_title,
        search_content,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 메인화면 강사 정보 가쟈오기
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listLecturers: ({ locale, limit, target_department_no }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/lecturers";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        order_column: "updatedAt",
        order_type: "DESC",
        target_department_no,
        limit,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 메인화면의 best 순 강의 정보 가져오기
   * @param {int} lecture_department_no         - 검색할 과
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listLecturesByBestClass: ({ lecture_department_no }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/lectures/main";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        order_column: "best_bare_order_weight",
        order_type: "DESC",
        lecture_department_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 메인화면의 best 강의 하단 강의 정보 가져오기
   * @param {int} lecture_department_no         - 검색할 과
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listLecturesByAll: ({ lecture_department_no }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/lectures/all";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        // order_column: "best_bare_order_weight",
        // order_type: "DESC",
        lecture_department_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 메인화면의 class 조회수로 강의 정보 가져오기
   * @param {int} lecture_department_no         - 검색할 과
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listLecturesByClassViewCount: (
    { lecture_department_no },
    LoadingCallback
  ) => {
    var apiName = v1Cdn;
    var path = "/cdn/lectures/main";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        order_column: "view_count",
        order_type: "DESC",
        lecture_department_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 메인화면의 class create순 강의 정보 가져오기
   * @param {int} lecture_department_no         - 검색할 과
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listLecturesByCreateClass: ({ lecture_department_no }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/lectures/main";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        order_column: "createdAt",
        order_type: "ASC",
        lecture_department_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 메인화면의 class update순 강의 정보 가져오기
   * @param {int} lecture_department_no         - 검색할 과
   * @param {int} limit                         - 디폴트 5 , 최대 10
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listLecturesByClassUpdate: (
    { lecture_department_no, limit, next_token },
    LoadingCallback
  ) => {
    var apiName = v1Cdn;
    var path = "/cdn/lectures/upcoming";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        lecture_department_no,
        limit: limit,
        next_token: next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  getLectureDetail: ({ lecture_no }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/lectures/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        lecture_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 메인화면의 class update순 강의 정보 가져오기
   * @param {int[]} lecture_no_array        - 구매할 강의 번호 목록
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  payLectures: ({ lecture_no_array }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/payment/lectures";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        lecture_no_array,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 메인화면의 class update순 강의 정보 가져오기
   * @param {int[]} lecture_no_array        - 구매할 강의 번호 목록
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  payLecturesTest: ({ lecture_no_array }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/payment/lectures/test";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        lecture_no_array,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 강의 첫 재생 시작 할경우 (인증 필요)
   * @param {int} lecture_no                - [필수] 강의 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  updateuserLecture: ({ lecture_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/users/lectures";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        lecture_no,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 게시판 글 작성하기 (인증 필요)
   * @param {string} feed_type              - 임시 "IN"
   * @param {int} feed_department_no        - 과
   * @param {int} feed_faculty_no           - 학
   * @param {string} feed_title             - 제목
   * @param {string} feed_content           - 내용
   * @param {int} feed_img_no               - 업로드후 나온 이미지 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  createFeed: (
    {
      feed_type,
      feed_department_no,
      feed_faculty_no,
      feed_title,
      feed_content,
      feed_img_no,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/api/feeds";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        feed_type,
        feed_department_no,
        feed_faculty_no,
        feed_title,
        feed_content,
        feed_img_no,
      },
    };

    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 게시판의 게시물 중 게시글 변경 하기 (인증 필요)
   * @param {int} feed_no                   - [필수] 게시판 글 번호
   * @param {string} feed_type              - 임시 "IN"
   * @param {int} feed_department_no        - 과
   * @param {int} feed_faculty_no           - 학
   * @param {string} feed_title             - 제목
   * @param {string} feed_content           - 내용
   * @param {int} feed_img_no               - 업로드후 나온 이미지 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  updateFeed: (
    {
      feed_no,
      feed_type,
      feed_department_no,
      feed_faculty_no,
      feed_title,
      feed_content,
      feed_img_no,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/api/feeds";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        feed_no,
        feed_type,
        feed_department_no,
        feed_faculty_no,
        feed_title,
        feed_content,
        feed_img_no,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 게시판의 게시물 중 게시글 삭제하기 (인증 필요)
   * @param {int} feed_no                   - 게시판 글 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  deleteFeed: ({ feed_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/feeds";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        feed_no,
      },
    };
    return Api.del(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 게시판의 게시물 중 댓글 작성하기 (인증 필요)
   * @param {int} feed_no                   - [필수] 게시글 번호
   * @param {string} feed_comment_type      - 임시 "IN"
   * @param {string} feed_comment_content   - 내용
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  createFeedComment: (
    { feed_no, feed_comment_type, feed_comment_content },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/api/feeds/comments";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        feed_no,
        feed_comment_type,
        feed_comment_content,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 게시판의 게시물 중 게시글 변경 하기 (인증 필요)
   * @param {int} feed_no                   - [필수] 게시글 번호
   * @param {int} feed_comment_no           - [필수] 게시글 번호
   * @param {string} feed_comment_type      - 임시 "IN"
   * @param {string} feed_comment_content   - 내용
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  updateFeedComment: (
    { feed_no, feed_comment_no, feed_comment_type, feed_comment_content },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/api/feeds/comments";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        feed_no,
        feed_comment_no,
        feed_comment_type,
        feed_comment_content,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 게시판의 게시물 중 게시글 삭제 하기 (인증 필요)
   * @param {int} feed_comment_no           - [필수] 게시글 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  deleteFeedComment: ({ feed_comment_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/feeds/comments";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        feed_comment_no,
      },
    };
    return Api.del(apiName, path, myInit, LoadingCallback);
  },

  // carts

  /**
   * [API] 나의 장바구니 리스트 가져오기    (인증 필요)
   * @param {string} order_column               - "updatedAt"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} current_page               - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCarts: ({ order_column, order_type, current_page }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/carts";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        current_page,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 장바구니 등록하기    (인증 필요)
   * @param {int} lecture_no                - 강의 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  createCart: ({ lecture_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/carts";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        lecture_no,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 장바구니 선택한 목록 지우기 (인증 필요)
   * @param {int} cart_no                   - 장바구니 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  deleteCart: ({ cart_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/carts";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        cart_no,
      },
    };
    return Api.del(apiName, path, myInit, LoadingCallback);
  },

  // inquiry

  /**
   * [CDN] 문의 리스트 가져오기 (인증 필요)
   * @param {string} inquiry_type               - "lecture", "payment"
   * @param {string} order_column               - "updatedAt"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} search_department          - 검색할 과
   * @param {string} search_faculty             - 검색할 학부
   * @param {string} search_name                - 검색할 강사 이름
   * @param {string} search_title               - 검색할 강의 제목
   * @param {string} search_content             - 검색할 강의 내용
   * @param {string} current_page               - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listInquirys: (
    {
      inquiry_type,
      order_column,
      order_type,
      search_department,
      search_faculty,
      search_name,
      search_title,
      search_content,
      current_page,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/api/inquirys";
    var myInit = {
      headers: {},
      queryStringParameters: {
        inquiry_type,
        order_column,
        order_type,
        search_department,
        search_faculty,
        search_name,
        search_title,
        search_content,
        current_page,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 1-1 문의 정보 가져오기 (인증 필요)
   * @param {int} inquiry_no                -[필수] 문의 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  getInquiry: ({ inquiry_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/inquirys/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        inquiry_no,
      },
    };

    // return Api.get(apiName, path, myInit, LoadingCallback, {
    //   url: "http://18.177.73.69",
    //   port: 3006,
    //   version: "v1",
    // });

    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 1대1 문의 만들기 (인증 필요)
   * @param {string} inquiry_title          - [필수] 제목
   * @param {string} inquiry_content        - [필수] 내용
   * @param {string} inquiry_type           - [필수] 타입 (lecture, payment)
   * @param {int} relation_lecture_no       - [필수] 검색한 연관 강의
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  createInquiry: (
    { inquiry_title, inquiry_content, inquiry_type, relation_lecture_no },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/api/inquirys";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        inquiry_title,
        inquiry_content,
        inquiry_type,
        relation_lecture_no,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 1대1 문의 내용 변경 (인증 필요)
   * @param {int} inquiry_no                - [필수] 문의 번호
   * @param {string} inquiry_title          - 제목
   * @param {string} inquiry_content        - 내용
   * @param {string} inquiry_type           - 타입 (lecture, payment)
   * @param {string} lecture_no             - 강의 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  updateInquiry: (
    { inquiry_no, inquiry_title, inquiry_content, inquiry_type, lecture_no },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/api/inquirys";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        inquiry_no,
        inquiry_title,
        inquiry_content,
        inquiry_type,
        lecture_no,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  //----------------------------------------------------
  // CDN 인증 X

  /**
   * [CDN] department (과) 리스트 가져오기 (인증 X)
   * @param {string} search_text                - [필수] 제목과 내용중 검색 단어
   * @param {string} next_token                 - 현재 페이지
   * @param {Function} LoadingCallback          - 로딩 콜백
   */
  listSearchLecture: ({ search_text, next_token }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/search/lecture";
    var myInit = {
      headers: {},
      queryStringParameters: {
        // locale,
        search_text,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] department (과) 리스트 가져오기 (인증 X)
   * @param {Function} LoadingCallback          - 로딩 콜백
   */
  listSearchPopularTag: ({ locale }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/search/popular/tag";
    var myInit = {
      headers: {},
      queryStringParameters: {
        // next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 관련 태그 검색
   * @param {string} search_text                - [필수] tag 검색어
   * @param {Function} LoadingCallback          - 로딩 콜백
   */
  listSearchTag: ({ search_text }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/search/tag";
    var myInit = {
      headers: {},
      queryStringParameters: {
        search_text,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] department (과) 리스트 가져오기 (인증 X)
   * @param {string} search_text                - [필수] 제목과 내용중 검색 단어
   * @param {string} next_token                 - 현재 페이지
   * @param {Function} LoadingCallback          - 로딩 콜백
   */
  listSearchText: ({ search_text, next_token }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/search/text";
    var myInit = {
      headers: {},
      queryStringParameters: {
        search_text,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] locale
   */
  listLocales: ({ locale }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/locale";
    var myInit = {
      headers: {},
      queryStringParameters: {
        // locale,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] department (과) 리스트 가져오기 (인증 X)
   */
  listSearchType: ({ locale }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/search/type";
    var myInit = {
      headers: {},
      queryStringParameters: {
        // locale,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] bank관련된 (과) 리스트 가져오기 (인증 X)
   */
  listBanks: ({ locale }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/code";
    var myInit = {
      headers: {},
      queryStringParameters: {
        code_type: "bank_code",
      },
    };

    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] department (과) 리스트 가져오기 (인증 X)
   */
  listDepartments: ({ locale }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/code";
    var myInit = {
      headers: {},
      queryStringParameters: {
        code_type: "department",
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] faculty (학) 리스트 가져오기 (인증 X)
   * @param {int} department_code_no        - [필수] 게시글 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  listFacultys: ({ locale, department_code_no }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/code/faculty";
    var myInit = {
      headers: {},
      queryStringParameters: {
        code_type: "faculty",
        parent_code_no: department_code_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] s3에 업로드후 이미지를 디비에 반영할 api (인증 없이도 사용가능)
   * @param {string} file_path  - [필수] s3 key  "public/images/test.png"
   * @param {string} image_type - [필수] 미정 (임시 "IN")
   * @param {Function} LoadingCallback - 로딩 콜백
   */

  createImageToNotAuth: ({ file_path, image_type }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/images";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        file_path,
        image_type,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  // notices

  /**
   * [CDN] 공지 관련 정보 리스트 가져오기
   * @param {int} current_page                  - 현재 페이지
   * @param {string} search_text                - 제목과 내용중 검색 단어
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listNotices: ({ current_page, search_text }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/notices";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        current_page,
        search_text,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CDN] 선택된 공지 정보 가져오기
   * @param {int} notice_no                     - [필수] 공지 번호
   * @param {string} search_text                - 이전에 제목과 내용중 검색 단어가 있으면 포함
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  getNotice: ({ notice_no, search_text }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/notices/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        notice_no,
        search_text,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  // feed

  /**
   * [API] 게시판 리스트 가져오기 (인증 필요)
   * @param {string} order_column           - 추가 예장 예시 "createdAt", "view_count"
   * @param {string} order_type             - "DESC", "ASC"
   * @param {string} search_department      - 검색할 과
   * @param {string} search_faculty         - 검색할 학
   * @param {string} search_name            - 검색할 유저이름
   * @param {string} search_title           - 검색할 제목
   * @param {string} search_content         - 검색할 내용
   * @param {string} current_page           - 현재 페이지
   * @param {string} next_token             - 다음 토큰
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  listFeeds: (
    {
      order_column,
      order_type,
      search_department,
      search_faculty,
      search_name,
      search_title,
      search_content,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Cdn;
    var path = "/cdn/feeds";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        search_department,
        search_faculty,
        search_name,
        search_title,
        search_content,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 게시판 리스트 가져오기 (인증 필요)
   * @param {int} feed_no                   -[필수] 게시판 번호
   * @param {string} order_column           - 추가 예장 예시 "createdAt", "view_count"
   * @param {string} order_type             - "DESC", "ASC"
   * @param {string} search_department      - 검색할 과
   * @param {string} search_faculty         - 검색할 학
   * @param {string} search_name            - 검색할 유저이름
   * @param {string} search_title           - 검색할 제목
   * @param {string} search_content         - 검색할 내용
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  getFeed: (
    {
      feed_no,
      order_column,
      order_type,
      search_department,
      search_faculty,
      search_name,
      search_title,
      search_content,
    },
    LoadingCallback
  ) => {
    var apiName = v1Cdn;
    var path = "/cdn/feeds/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        feed_no,
        order_column,
        order_type,
        search_department,
        search_faculty,
        search_name,
        search_title,
        search_content,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 게시판 글의 댓글 리스트 가져오기 (인증 필요)
   * @param {int} feed_no                   - [필수] 검색할 게시판 번호
   * @param {string} order_column           - 추가 예장 예시 "createdAt", "updatedAt"
   * @param {string} order_type             - "DESC", "ASC"
   * @param {string} next_token             - 다음 토큰
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  listFeedComments: (
    { feed_no, order_column, order_type, next_token },
    LoadingCallback
  ) => {
    var apiName = v1Cdn;
    var path = "/cdn/feeds/comments";
    var myInit = {
      headers: {},
      queryStringParameters: {
        feed_no,
        order_column,
        order_type,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  //----------------------------------------------------
  // 공통

  /**
   * [API] 태그가 있으면 데이터를 가져오고 없으면 만든후 가져오는 api (인증 팔요)
   * @param {string} tag_name - [필수]  "아토피" , "천식"
   * @param {string} tag_type - [필수] 미정 (임시 "IN")
   * @param {Function} LoadingCallback - 로딩 콜백
   */

  getTag: ({ tag_name, tag_type }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/tags";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        tag_name,
        tag_type,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] s3에 업로드후 비디오 파일을 디비에 반영할 api (인증 팔요)
   * @param {string} file_path  - [필수] s3 key  "public/images/test.png"
   * @param {string} video_type - [필수] 미정 (임시 "IN")
   * @param {Function} LoadingCallback - 로딩 콜백
   */

  createVideo: ({ file_path, video_type }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/videos";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        file_path,
        video_type,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] s3에 업로드후 이미지를 디비에 반영할 api (인증 팔요)
   * @param {string} file_path  - [필수] s3 key  "public/images/test.png"
   * @param {string} image_type - [필수] 미정 (임시 "IN")
   * @param {Function} LoadingCallback - 로딩 콜백
   */

  createImage: ({ file_path, image_type }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/api/images";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        file_path,
        image_type,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  //----------------------------------------------------
  // faq

  /**
   * [CDN] faq 관련 정보를 가중치 순서대로 가져온다. (인증 팔요)
   * @param {Function} LoadingCallback - 로딩 콜백
   */

  listFaqs: ({ locale }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/faqs";
    var myInit = {
      headers: {},
      queryStringParameters: {},
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  //----------------------------------------------------
  // content

  /**
   * [CDN] 약관 내용 및 정책 내용 가져오기
   * @param {string} content_type   - [필수] "policy", "terms"
   * @param {string} content_locale - [필수]  "ko-KR", "en-US"
   * @param {Function} LoadingCallback - 로딩 콜백
   */

  getContent: ({ content_locale, content_type }, LoadingCallback) => {
    var apiName = v1Cdn;
    var path = "/cdn/content/detail";
    var myInit = {
      headers: {},
      queryStringParameters: { content_locale, content_type },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  //----------------------------------------------------
  // cms

  // users

  /**
   * [CMS] 가입된 유저 정보 가져오기 (인증 필요)
   * @param {string} order_column           - "user_name", "createdAt", "lecturer_status"
   * @param {string} order_type             - "DESC", "ASC"
   * @param {string} user_type              - 구분  "student", "doctor", "normal"
   * @param {date} filter_begin_dt          - 필터 시작일
   * @param {date} filter_end_dt            - 필터 종료일
   * @param {string} next_token             - 다음 토큰
   * @param {string} current_page               - 현재 페이지
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  listCmsUsers: (
    {
      order_column,
      order_type,
      user_type,
      filter_begin_dt,
      filter_end_dt,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/users";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        user_type,
        filter_begin_dt,
        filter_end_dt,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 유저 엑셀파이 저장하기 (인증 필요)
   * @param {string} order_column           - "user_name", "createdAt", "lecturer_status"
   * @param {string} order_type             - "DESC", "ASC"
   * @param {string} user_type              - 구분  "student", "doctor", "normal"
   * @param {date} filter_begin_dt          - 필터 시작일
   * @param {date} filter_end_dt            - 필터 종료일
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  saveCmsUsers: (
    {
      order_column,
      order_type,
      user_type,
      filter_begin_dt,
      filter_end_dt,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/users/excel";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        user_type,
        filter_begin_dt,
        filter_end_dt,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 가입된 유저 정보 가져오기 (인증 필요)
   * @param {int} user_no                   - 유저 번호
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  getCmsUser: ({ user_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/users/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        user_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 가입된 유저 정보 변경하기 (인증 필요)
   * @param {int} user_no                   - [필수] 변경할 유저 no
   * @param {string} user_name              - 유저 이름 변경
   * @param {string} mobile_no              - 전화 번호
   * @param {string} user_division          - 유저 소속
   * @param {string} user_department_no     - 유저 과 번호
   * @param {string} user_verify_img_no     - 유저 검증 이미지 번호
   * @param {int} lecturer_status           - 강사 권한 부여 ( 의사일 경우만 작동)
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  updateCmsUser: (
    {
      user_no,
      user_name,
      mobile_no,
      user_division,
      user_department_no,
      user_verify_img_no,
      lecturer_status,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/users";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: {
        user_no,
        user_name,
        mobile_no,
        user_division,
        user_department_no,
        user_verify_img_no,
        lecturer_status,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  // lectures

  /**
   * [CMS] 강의 정보 가져오기 (인증 필요)
   * @param {string} order_column               - "lecture_no","createdAt","updatedAt","live_begin_dt","best_bare_state","best_bare_order_weight","lecture_state",
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} search_department          - 검색할 과
   * @param {string} search_faculty             - 검색할 학부
   * @param {string} search_name                - 검색할 강사 이름
   * @param {string} search_title               - 검색할 강의 제목
   * @param {string} search_content             - 검색할 강의 내용
   * @param {string} current_page               - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsLectures: (
    {
      order_column,
      order_type,
      search_department,
      search_faculty,
      search_name,
      search_title,
      search_content,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/lectures";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        order_column,
        order_type,
        search_department,
        search_faculty,
        search_name,
        search_title,
        search_content,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 강의 정보 저장하기 (인증 필요)
   * @param {string} order_column               - "lecture_no","createdAt","updatedAt","live_begin_dt","best_bare_state","best_bare_order_weight","lecture_state",
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} search_department          - 검색할 과
   * @param {string} search_faculty             - 검색할 학부
   * @param {string} search_name                - 검색할 강사 이름
   * @param {string} search_title               - 검색할 강의 제목
   * @param {string} search_content             - 검색할 강의 내용
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  saveCmsLectures: (
    {
      order_column,
      order_type,
      search_department,
      search_faculty,
      search_name,
      search_title,
      search_content,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/lectures/excel";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        order_column,
        order_type,
        search_department,
        search_faculty,
        search_name,
        search_title,
        search_content,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 강의 상세 정보 가져오기 (인증 필요)
   * @param {int} lecture_no                    - 강의 번호
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  getCmsLectures: ({ lecture_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/lectures/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        lecture_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 강의 생성하기  (인증 필요)
   * @param {int} user_no                       - [필수] 강사 번호
   * @param {string} lecture_type               - [필수] 강의 타입 (live, vod)
   * @param {int} lecture_department_no         - [필수] 과 번호
   * @param {int} lecture_faculty_no            - [필수] 학부 번호
   * @param {date} live_begin_dt                - [필수] 강의 시작일
   * @param {string} lecture_title              - [필수] 강의 제목
   * @param {string} lecture_abstract_title     - [필수] 강의 소제목
   * @param {text} lecture_content              - 강의 내용
   * @param {text} lecture_abstract_content     - 겅의 소내용
   * @param {string} lecture_title_en           - 강의 영어 제목
   * @param {text} lecture_content_en           - 강의 영어 내용
   * @param {string} lecture_abstract_title_en  - 강의 영어 소제목
   * @param {text} lecture_abstract_content_en  - 겅의 영어 소내용
   * @param {int} lecture_video_preview_img_no  - 강의 미리보기 이미지
   * @param {string} lecture_vimeo_url          - 강의 비디오 url
   * @param {string} lecture_chat_url           - 강의 chat url
   * @param {int} best_bare_state               - 베스트 강의 여부
   * @param {int} best_bare_order_weight        - 베스트 강의 우선 순위 가중치
   * @param {int} best_bare_order_weight        - 베스트 강의 우선 순위 가중치
   * @param {int[]} tag_no_array                - 강의 태그 배열
   * @param {int[]} disease_no_array            - 강의 병증 배열
   * @param {int} original_price                - 기본 가격 (value > 0)
   * @param {int} real_price                    - 실제 가격 (value > 0)
   * @param {int} share_rate_to_lecturer        - 강사에게 분해할 퍼센트 (0~100)
   * @param {int} lecture_state                 - 강의 상태
   * @param {int} possible_date                 - 강의 유효 날짜
   * @param {int} play_time                     - 강의 플레이 타임
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  createCmsLecture: (
    {
      user_no,
      lecture_type,
      lecture_department_no,
      lecture_faculty_no,
      live_begin_dt,
      lecture_vimeo_url,
      lecture_chat_url,
      lecture_title,
      lecture_content,
      lecture_abstract_title,
      lecture_abstract_content,
      best_bare_state,
      best_bare_order_weight,
      tag_no_array,
      disease_no_array,
      lecture_video_preview_img_no,
      original_price,
      real_price,
      share_rate_to_lecturer,
      lecture_state,
      possible_date,
      play_time,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/lectures";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: {
        user_no,
        lecture_type,
        lecture_department_no,
        lecture_faculty_no,
        live_begin_dt,
        lecture_vimeo_url,
        lecture_chat_url,
        lecture_title,
        lecture_content,
        lecture_abstract_title,
        lecture_abstract_content,
        best_bare_state,
        best_bare_order_weight,
        tag_no_array,
        disease_no_array,
        lecture_video_preview_img_no,
        original_price,
        real_price,
        share_rate_to_lecturer,
        lecture_state,
        possible_date,
        play_time,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   *  [CMS] 강의 정보 변경하기  (인증 필요)
   * @param {int} lecture_no                    - [필수] 강의 고유 번호
   * @param {string} lecture_type               - 강의 타입 (live, vod)
   * @param {int} user_no                       - 강사 번호
   * @param {int} lecture_department_no         - 과 번호
   * @param {int} lecture_faculty_no            - 학부 번호
   * @param {date} live_begin_dt                - 강의 시작일
   * @param {string} lecture_title              - 강의 제목
   * @param {text} lecture_content              - 강의 내용
   * @param {string} lecture_abstract_title     - 강의 소제목
   * @param {text} lecture_abstract_content     - 겅의 소내용
   * @param {string} lecture_title_en           - 강의 영어 제목
   * @param {text} lecture_content_en           - 강의 영어 내용
   * @param {string} lecture_abstract_title_en  - 강의 영어 소제목
   * @param {text} lecture_abstract_content_en  - 겅의 영어 소내용
   * @param {int} lecture_video_preview_img_no  - 강의 미리보기 이미지
   * @param {string} lecture_vimeo_url          - 강의 비디오 url
   * @param {string} lecture_chat_url           - 강의 chat url
   * @param {int} best_bare_state               - 베스트 강의 여부
   * @param {int} best_bare_order_weight        - 베스트 강의 우선 순위 가중치
   * @param {int} original_price                - 기본 가격 (value > 0)
   * @param {int} real_price                    - 실제 가격 (value > 0)
   * @param {int} share_rate_to_lecturer        - 강사에게 분해할 퍼센트 (0~100)
   * @param {int[]} tag_no_array                - 강의 태그 배열
   * @param {int[]} disease_no_array            - 강의 병증 배열
   * @param {int} lecture_state                 - 강의 상태
   * @param {int} possible_date                 - 강의 유효 날짜
   * @param {int} play_time                     - 강의 플레이 타임
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  updateCmsLecture: (
    {
      lecture_no,
      lecture_type,
      user_no,
      lecture_department_no,
      lecture_faculty_no,
      live_begin_dt,
      lecture_vimeo_url,
      lecture_chat_url,
      lecture_title,
      lecture_content,
      lecture_abstract_title,
      lecture_abstract_content,
      best_bare_state,
      best_bare_order_weight,
      tag_no_array,
      disease_no_array,
      lecture_video_preview_img_no,
      original_price,
      real_price,
      share_rate_to_lecturer,
      lecture_state,
      possible_date,
      play_time,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/lectures";
    var myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL,
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: {
        lecture_no,
        lecture_type,
        user_no,
        lecture_department_no,
        lecture_faculty_no,
        live_begin_dt,
        lecture_vimeo_url,
        lecture_chat_url,
        lecture_title,
        lecture_content,
        lecture_abstract_title,
        lecture_abstract_content,
        best_bare_state,
        best_bare_order_weight,
        tag_no_array,
        disease_no_array,
        lecture_video_preview_img_no,
        original_price,
        real_price,
        share_rate_to_lecturer,
        lecture_state,
        possible_date,
        play_time,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 강사 자신 정보 또는 특정 강사 상세 정보  (인증 필요)
   * @param {int} user_no                     - 없으면 자기 자신, 있으면 다른 사람꺼 조회
   * @param {Function} LoadingCallback        - 로딩 콜백
   */

  getCmsLecturer: ({ user_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/lecturers/detail";
    var myInit = {
      headers: {},
      queryStringParameters: { user_no },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 강사 정보 조회 (인증 필요)
   * @param {string} order_column               - "user_no", "createdAt", "updatedAt", "best_lecturer_state"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} search_department          - 검색할 과       - 검색할 학부
   * @param {string} search_name                - 검색할 강사 이름
   * @param {string} search_title               - 검색할 강의 제목
   * @param {int} current_page                  - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsLecturers: (
    {
      order_column,
      order_type,
      search_department,
      search_name,
      search_title,
      current_page,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/lecturers";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        search_department,
        search_name,
        search_title,
        current_page,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 강사 엑셀파일 저장하기 (인증 필요)
   * @param {string} order_column               - "user_no", "createdAt", "updatedAt", "best_lecturer_state"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} search_department          - 검색할 과       - 검색할 학부
   * @param {string} search_name                - 검색할 강사 이름
   * @param {string} search_title               - 검색할 강의 제목
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  saveCmsLecturers: (
    { order_column, order_type, search_department, search_name, search_title },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/lecturers/excel";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        search_department,
        search_name,
        search_title,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 강사 자신 정보 추가 및 변경 (인증 필요)
   * @param {int} user_no                       - 강사 유저 번호
   * @param {int} lecturer_department_no        - 강사 과
   * @param {int} lecturer_introduction_img_no  - 강사 소개 이미지 s3 업로드 후, 이미지 api 호출후 나오는 이미지 번호 등록
   * @param {string} account_number             - 계좌번호 (010102020)
   * @param {string} bank_code_no               - 은행 코드
   * @param {int} best_lecturer_state           - 강사 메인 노출
   * @param {string} lecturer_title             - 강사 직책 또는 직위
   * @param {text} lecturer_career              - 강사 이력
   * @param {string} lecturer_division          - 강사 소속
   * @param {string} lecturer_abstract_title    - 강사 한줄 소개
   * @param {text} lecture_abstract_content     - 강사 상세 소개
   * @param {string} lecturer_name_en           - 강사 이름
   * @param {string} lecturer_title_en          - 강사 직책 또는 직위
   * @param {text} lecturer_career_en           - 강사 이력
   * @param {string} lecturer_division_en       - 강사 소속
   * @param {string} lecturer_abstract_title_en - 강사 한줄 소개
   * @param {text} lecture_abstract_content_en  - 강사 상세 소개
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  updateCmsLecturer: (
    {
      user_no,
      lecturer_introduction_img_no,
      lecturer_department_no,
      account_number,
      bank_code_no,
      best_lecturer_state,
      lecturer_name,
      lecturer_title,
      lecturer_career,
      lecturer_division,
      lecturer_abstract_title,
      lecture_abstract_content,
      lecturer_name_en,
      lecturer_title_en,
      lecturer_career_en,
      lecturer_division_en,
      lecturer_abstract_title_en,
      lecture_abstract_content_en,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/lecturers";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        user_no,
        lecturer_introduction_img_no,
        lecturer_department_no,
        account_number,
        bank_code_no,
        best_lecturer_state,
        lecturer_name,
        lecturer_title,
        lecturer_career,
        lecturer_division,
        lecturer_abstract_title,
        lecture_abstract_content,
        lecturer_name_en,
        lecturer_title_en,
        lecturer_career_en,
        lecturer_division_en,
        lecturer_abstract_title_en,
        lecture_abstract_content_en,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 강사 비활성  (인증 필요)
   * @param {int} user_no                     - [필수] 비활성할 강사 유저 번호
   * @param {Function} LoadingCallback        - 로딩 콜백
   */

  deleteCmsLecturer: ({ user_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/lecturers";
    var myInit = {
      headers: {},
      queryStringParameters: { user_no },
    };
    return Api.del(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 공지 리스트 가져오기 (인증 필요)
   * @param {string} order_column           - "notice_no", "createdAt", "view_count" , "notice_order_weight" , "notice_state"
   * @param {string} order_type             - "DESC", "ASC"
   * @param {date} filter_begin_dt          - 필터 기간별 시작
   * @param {date} filter_end_dt            - 필터 기간별 끝
   * @param {string} next_token             - 다음 토큰
   * @param {int} current_page              - 현재 페이지
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  listCmsNotices: (
    {
      order_column,
      order_type,
      filter_begin_dt,
      filter_end_dt,
      next_token,
      current_page,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/notices";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        filter_begin_dt,
        filter_end_dt,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 공지 리스트 저장하기 (인증 필요)
   * @param {string} order_column           - "notice_no", "createdAt", "view_count" , "notice_order_weight" , "notice_state"
   * @param {string} order_type             - "DESC", "ASC"
   * @param {date} filter_begin_dt          - 필터 기간별 시작
   * @param {date} filter_end_dt            - 필터 기간별 끝
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  saveCmsNotices: (
    { order_column, order_type, filter_begin_dt, filter_end_dt },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/notices/excel";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        filter_begin_dt,
        filter_end_dt,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 선택한 공지 가져오기
   * @param {int} notice_no                     - [필수] 선택한 공지 내용
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  getCmsNotice: ({ notice_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/notices/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        notice_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 공지 생성 (인증 필요)
   * @param {string} notice_type            - 공지 타입 미정 "IN"
   * @param {int} notice_state              - 공지 상태 0은 비활성 1은 활성
   * @param {string} notice_title           - 공지 제목
   * @param {text} notice_content           - 공지 내용
   * @param {int} notice_order_weight       - 공지 중요도 가중치 [0~100] 90 이상 공지
   * @param {int} notice_img_no             - 공지 이미지
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  createCmsNotice: (
    {
      notice_type,
      notice_state,
      notice_title,
      notice_content,
      notice_img_no,
      notice_order_weight,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/notices";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        notice_type,
        notice_state,
        notice_title,
        notice_content,
        notice_img_no,
        notice_order_weight,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 공지 변경 (인증 필요)
   * @param {int} notice_no                 - [필수] 공지 번호
   * @param {string} notice_type            - 공지 타입 미정 "IN"
   * @param {int} notice_state              - 공지 상태 0은 비활성 1은 활성
   * @param {string} notice_title           - 공지 제목
   * @param {text} notice_content           - 공지 내용
   * @param {int} notice_order_weight       - 공지 중요도 가중치 [0~100] 90 이상 공지
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  updateCmsNotice: (
    {
      notice_no,
      notice_type,
      notice_state,
      notice_title,
      notice_content,
      notice_order_weight,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/notices";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        notice_no,
        notice_type,
        notice_state,
        notice_title,
        notice_content,
        notice_order_weight,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 선택한 공지 삭제하기
   * @param {int} notice_no                     - [필수] 선택한 공지 내용
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  deleteCmsNotice: ({ notice_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/notices";
    var myInit = {
      headers: {},
      queryStringParameters: {
        notice_no,
      },
    };
    return Api.del(apiName, path, myInit, LoadingCallback);
  },

  // payments

  /**
   * [CMS] 결제 관리의 메인 화면 리스트  (선택한 달의 모든 강의 정보가 나옴)
   * @param {date} filter_begin_dt              - [필수] 필터 기간별 시작
   * @param {date} filter_end_dt                - [필수] 필터 기간별 끝
   * @param {string} order_column               - "lecture_no", "income_count", "sales_count", "current_real_price" , "reg_lecture_count" , "createdAt"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} search_name                - 검색할 강사 이름
   * @param {string} search_title               - 검색할 강의 제목
   * @param {string} search_content             - 검색할 강의 내용
   * @param {int} current_page                  - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsPayments: (
    {
      filter_begin_dt,
      filter_end_dt,
      order_column,
      order_type,
      search_name,
      search_title,
      search_content,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/payments";
    var myInit = {
      headers: {},
      queryStringParameters: {
        filter_begin_dt,
        filter_end_dt,
        order_column,
        order_type,
        search_name,
        search_title,
        search_content,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 결제 관리의 메인화면 다운로드  (선택한 달의 모든 강의 정보가 나옴)
   * @param {date} filter_begin_dt              - [필수] 필터 기간별 시작
   * @param {date} filter_end_dt                - [필수] 필터 기간별 끝
   * @param {string} order_column               - "lecture_no", "income_count", "sales_count", "current_real_price" , "reg_lecture_count" , "createdAt"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} search_name                - 검색할 강사 이름
   * @param {string} search_title               - 검색할 강의 제목
   * @param {string} search_content             - 검색할 강의 내용
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  saveCmsPayments: (
    {
      filter_begin_dt,
      filter_end_dt,
      order_column,
      order_type,
      search_name,
      search_title,
      search_content,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/payments/excel";
    var myInit = {
      headers: {},
      queryStringParameters: {
        filter_begin_dt,
        filter_end_dt,
        order_column,
        order_type,
        search_name,
        search_title,
        search_content,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 결제 관리의 정산 하기 버튼 눌렀을 경우  (선택한 달의 모든 강의 정보가 나옴)
   * @param {date} filter_begin_dt              - [필수] 필터 기간별 시작
   * @param {date} filter_end_dt                - [필수] 필터 기간별 끝
   * @param {int} current_page                  - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsAdjustments: (
    { filter_begin_dt, filter_end_dt, current_page, next_token },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/adjustments";
    var myInit = {
      headers: {},
      queryStringParameters: {
        filter_begin_dt,
        filter_end_dt,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 결제 관리에서 선택한 강의 정보
   * @param {int} lecture_no                    - [필수] 선택한 강의 번호
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  getCmsPayment: ({ lecture_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/payments/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        lecture_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 선택한 강의의 구매 유저 리스트  (선택한 달의 모든 강의 정보가 나옴)
   * @param {int} lecture_no                    - [필수] 선택한 강의 번호
   * @param {date} filter_begin_dt              - [필수] 필터 기간별 시작
   * @param {date} filter_end_dt                - [필수] 필터 기간별 끝
   * @param {string} order_column               - "user_no", "updatedAt", "real_price"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} user_type                  - 구분  "student", "doctor", "normal"
   * @param {string} search_name                - 검색할 이름
   * @param {string} search_department          - 검색할 과
   * @param {string} search_email               - 검색할 이메일
   * @param {int} current_page                  - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsPaymentsHistorys: (
    {
      lecture_no,
      filter_begin_dt,
      filter_end_dt,
      user_type,
      order_column,
      order_type,
      search_name,
      search_department,
      search_email,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/payments/historys";
    var myInit = {
      headers: {},
      queryStringParameters: {
        lecture_no,
        filter_begin_dt,
        filter_end_dt,
        user_type,
        order_column,
        order_type,
        search_name,
        search_department,
        search_email,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 선택한 강의의 구매 유저 다운로드  (선택한 달의 모든 강의 정보가 나옴)
   * @param {int} lecture_no                    - [필수] 선택한 강의 번호
   * @param {date} filter_begin_dt              - [필수] 필터 기간별 시작
   * @param {date} filter_end_dt                - [필수] 필터 기간별 끝
   * @param {string} order_column               - "user_no", "updatedAt", "real_price"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} user_type                  - 구분  "student", "doctor", "normal"
   * @param {string} search_name                - 검색할 이름
   * @param {string} search_department          - 검색할 과
   * @param {string} search_email               - 검색할 이메일
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  saveCmsPaymentsHistorys: (
    {
      lecture_no,
      filter_begin_dt,
      filter_end_dt,
      user_type,
      order_column,
      order_type,
      search_name,
      search_department,
      search_email,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/payments/historys/excel";
    var myInit = {
      headers: {},
      queryStringParameters: {
        lecture_no,
        filter_begin_dt,
        filter_end_dt,
        user_type,
        order_column,
        order_type,
        search_name,
        search_department,
        search_email,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 선택한 유저에게 email 발송               (선택한 달의 모든 유저에게)
   * @param {int} lecture_no                    - [필수] 선택한 강의 번호
   * @param {date} filter_begin_dt              - [필수] 필터 기간별 시작
   * @param {date} filter_end_dt                - [필수] 필터 기간별 끝
   * @param {string} title                      - [필수] 보낼 제목
   * @param {string} body                       - [필수] 보낼 내용
   * @param {string} order_column               - "user_no", "updatedAt", "real_price"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} user_type                  - 구분  "student", "doctor", "normal"
   * @param {string} search_name                - 검색할 이름
   * @param {string} search_department          - 검색할 과
   * @param {string} search_email               - 검색할 이메일
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  sendCmsPaymentsHistorysToEmail: (
    {
      lecture_no,
      filter_begin_dt,
      filter_end_dt,
      user_type,
      order_column,
      order_type,
      search_name,
      search_department,
      search_email,
      title,
      body,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/payments/historys/email";
    var myInit = {
      headers: {},
      queryStringParameters: {
        lecture_no,
        filter_begin_dt,
        filter_end_dt,
        user_type,
        order_column,
        order_type,
        search_name,
        search_department,
        search_email,
      },
      body: {
        title,
        body,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 선택한 유저에게 sms 발송                 (선택한 달의 모든 유저에게)
   * @param {int} lecture_no                    - [필수] 선택한 강의 번호
   * @param {date} filter_begin_dt              - [필수] 필터 기간별 시작
   * @param {date} filter_end_dt                - [필수] 필터 기간별 끝
   * @param {string} title                      - [필수] 보낼 제목
   * @param {string} body                       - [필수] 보낼 내용
   * @param {string} order_column               - "user_no", "updatedAt", "real_price"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} user_type                  - 구분  "student", "doctor", "normal"
   * @param {string} search_name                - 검색할 이름
   * @param {string} search_department          - 검색할 과
   * @param {string} search_email               - 검색할 이메일
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  sendCmsPaymentsHistorysToSms: (
    {
      lecture_no,
      filter_begin_dt,
      filter_end_dt,
      user_type,
      order_column,
      order_type,
      search_name,
      search_department,
      search_email,
      title,
      body,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/payments/historys/sms";
    var myInit = {
      headers: {},
      queryStringParameters: {
        lecture_no,
        filter_begin_dt,
        filter_end_dt,
        user_type,
        order_column,
        order_type,
        search_name,
        search_department,
        search_email,
      },
      body: {
        title,
        body,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 선택한 강의의 강사 정산 관련   (선택한 달의 모든 강의 정보가 나옴)
   * @param {int} lecturer_no                   - [필수] 강사 유저 번호
   * @param {date} filter_begin_dt              - [필수] 필터 기간별 시작
   * @param {date} filter_end_dt                - [필수] 필터 기간별 끝
   * @param {int} current_page                  - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsPaymentAdjustments: (
    { lecturer_no, filter_begin_dt, filter_end_dt, current_page, next_token },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/payments/adjustments";
    var myInit = {
      headers: {},
      queryStringParameters: {
        lecturer_no,
        filter_begin_dt,
        filter_end_dt,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  // inquiry

  /**
   * [CMS] 문의 리스트 가져오기 (인증 필요)
   * @param {string} order_column               - "inquiry_no", "response_state", "updatedAt"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} inquiry_type               - "lecture", "payment"
   * @param {date} filter_begin_dt              - 필터 시작일
   * @param {date} filter_end_dt                - 필터 종료일
   * @param {string} current_page               - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsInquirys: (
    {
      order_column,
      order_type,
      inquiry_type,
      filter_begin_dt,
      filter_end_dt,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/inquirys";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        inquiry_type,
        filter_begin_dt,
        filter_end_dt,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 문의 리스트 엑셀 저장 (인증 필요)
   * @param {string} order_column               - "inquiry_no", "response_state", "updatedAt"
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {string} inquiry_type               - "lecture", "payment"
   * @param {date} filter_begin_dt              - 필터 시작일
   * @param {date} filter_end_dt                - 필터 종료일
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  saveCmsInquirys: (
    {
      order_column,
      order_type,
      inquiry_type,
      filter_begin_dt,
      filter_end_dt,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/inquirys/excel";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        inquiry_type,
        filter_begin_dt,
        filter_end_dt,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 선택한 문의 정보  가져오기 (인증 필요)
   * @param {int} inquiry_no                 - [필수] 문의 번호
   * @param {Function} LoadingCallback       - 로딩 콜백
   */

  getCmsInquiry: ({ inquiry_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/inquirys/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        inquiry_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [API] 1대1 문의 답변 및 기능 변경 (인증 필요)
   * @param {int} inquiry_no                 - [필수] 문의 번호
   * @param {string} response_title          - 응답 제목
   * @param {string} response_content        - 응답 내용
   * @param {int} inquiry_state              - 문의 상태
   * @param {Function} LoadingCallback       - 로딩 콜백
   */

  updateCmsInquiry: (
    { inquiry_no, response_title, response_content, inquiry_state },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/inquirys";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        inquiry_no,
        response_title,
        response_content,
        inquiry_state,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] faq 리스트 가져오기 (인증 필요)
   * @param {string} order_column               - "faq_no", "createdAt", "faq_status" , "faq_order_weight" , ""faq_title""
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {date} filter_begin_dt              - 필터 시작일
   * @param {date} filter_end_dt                - 필터 종료일
   * @param {string} current_page               - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsFaqs: (
    {
      order_column,
      order_type,
      filter_begin_dt,
      filter_end_dt,
      current_page,
      next_token,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/faqs";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        filter_begin_dt,
        filter_end_dt,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] faq 엑셀 저장하기  (인증 필요)
   * @param {string} order_column               - "faq_no", "createdAt", "faq_status" , "faq_order_weight" , ""faq_title""
   * @param {string} order_type                 - "DESC", "ASC"
   * @param {date} filter_begin_dt              - 필터 시작일
   * @param {date} filter_end_dt                - 필터 종료일
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  saveCmsFaqs: (
    { order_column, order_type, filter_begin_dt, filter_end_dt },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/faqs/excel";
    var myInit = {
      headers: {},
      queryStringParameters: {
        order_column,
        order_type,
        filter_begin_dt,
        filter_end_dt,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 선택한 faq 리스트 정보 가져오기 (인증 필요)
   * @param {string} faq_no               - faq 번호
   */

  getCmsFaq: ({ faq_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/faqs/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        faq_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] faq 만들기 (인증 필요)
   * @param {string} faq_title                - [필수] faq 제목
   * @param {text} faq_content                - [필수] faq 내용
   * @param {string} faq_type                 - faq 타입
   * @param {int} faq_status                   - faq 0 비활성 1 활성
   * @param {int} faq_order_weight            - faq 가중치
   * @param {Function} LoadingCallback        - 로딩 콜백
   */

  createCmsFaq: (
    { faq_title, faq_content, faq_type, faq_status, faq_order_weight, locale },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/faqs";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        faq_title,
        faq_content,
        faq_type,
        faq_status,
        faq_order_weight,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] faq 변경 (인증 필요)
   * @param {int} faq_no                      - [필수] faq 번호
   * @param {string} faq_title                - faq 제목
   * @param {text} faq_content                - faq 내용
   * @param {string} faq_type                 - faq 타입 IN
   * @param {int} faq_status                   - faq 0 비활성 1 활성
   * @param {int} faq_order_weight            - faq 가중치
   * @param {Function} LoadingCallback        - 로딩 콜백
   */

  updateCmsFaq: (
    { faq_no, faq_title, faq_content, faq_type, faq_status, faq_order_weight },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/faqs";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        faq_no,
        faq_title,
        faq_content,
        faq_type,
        faq_status,
        faq_order_weight,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  // banner

  /**
   * [CMS] 배너 리스트 가져오기 (인증 필요)
   * @param {string} banner_type                - [필수] "main", "live", "chat"
   * @param {string} current_page               - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsBanners: (
    { banner_type, current_page, next_token },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/banners";
    var myInit = {
      headers: {},
      queryStringParameters: {
        banner_type,
        current_page,
        next_token,
      },
    };

    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 배너 상세 정보 가져오기 (인증 필요)
   * @param {int} banner_no                  - [필수] 배너 번호
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  getCmsBanner: ({ banner_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/banners/detail";
    var myInit = {
      headers: {},
      queryStringParameters: {
        banner_no,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 배너 만들기 (인증 필요)
   * @param {string} banner_type              - [필수] "main", "live", "chat"
   * @param {string} banner_title             - [필수] 배너 제목
   * @param {text} banner_content             - [필수] 배너 내용
   * @param {int} banner_state                - 배너 0 비활성 1 활성
   * @param {int} banner_order_weight         - 배너 정렬 가중치
   * @param {string} banner_url               - 배너 클릭시 이동할 url
   * @param {Function} LoadingCallback        - 로딩 콜백
   */

  createCmsBanner: (
    {
      banner_type,
      banner_title,
      banner_content,
      banner_state,
      banner_order_weight,
      banner_img_no,
      banner_url,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/banners";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        banner_type,
        banner_title,
        banner_content,
        banner_state,
        banner_order_weight,
        banner_img_no,
        banner_url,
      },
    };
    return Api.post(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 배너 만들기 (인증 필요)
   * @param {int} banner_no                   - [필수] 배너 번호
   * @param {string} banner_type              - [필수] "main", "live", "chat"
   * @param {string} banner_title             - [필수] 배너 제목
   * @param {text} banner_content             - [필수] 배너 내용
   * @param {int} banner_state                - 배너 0 비활성 1 활성
   * @param {int} banner_order_weight         - 배너 정렬 가중치
   * @param {string} banner_url               - 배너 클릭시 이동할 url
   * @param {Function} LoadingCallback        - 로딩 콜백
   */

  updateCmsBanner: (
    {
      banner_no,
      banner_type,
      banner_title,
      banner_content,
      banner_state,
      banner_order_weight,
      banner_img_no,
      banner_url,
    },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/banners";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        banner_no,
        banner_type,
        banner_title,
        banner_content,
        banner_state,
        banner_order_weight,
        banner_img_no,
        banner_url,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 배너 삭제하기 (인증 필요)
   * @param {int} banner_no                  - [필수] 배너 번호
   * @param {Function} LoadingCallback       - 로딩 콜백
   */

  deleteCmsBanner: ({ banner_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/banners";
    var myInit = {
      headers: {},
      queryStringParameters: {
        banner_no,
      },
    };
    return Api.del(apiName, path, myInit, LoadingCallback);
  },

  //----------------------------------------------------
  // content

  /**
   * [CMS] 내용 리스트 가져오기 (인증 필요)
   * @param {string} content_type   - [필수] "policy", "terms"
   * @param {string} current_page               - 현재 페이지
   * @param {string} next_token                 - 다음 토큰
   * @param {Function} LoadingCallback          - 로딩 콜백
   */

  listCmsContents: (
    { content_type, current_page, next_token },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/contents";
    var myInit = {
      headers: {},
      queryStringParameters: {
        content_type,
        current_page,
        next_token,
      },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 약관 내용 및 정책 내용 가져오기
   * @param {string} content_no     - [필수] content 번호
   * @param {Function} LoadingCallback - 로딩 콜백
   */

  getCmsContent: ({ content_no }, LoadingCallback) => {
    var apiName = v1Api;
    var path = "/cms/contents/detail";
    var myInit = {
      headers: {},
      queryStringParameters: { content_no },
    };
    return Api.get(apiName, path, myInit, LoadingCallback);
  },

  /**
   * [CMS] 약관 내용 및 정책 내용 수정 (인증 필요)
   * @param {string} content_no     - [필수] content 번호
   * @param {string} content_title  -   약관 제목
   * @param {text} content_content  -   약관 내용
   * @param {Function} LoadingCallback      - 로딩 콜백
   */

  updateCmsContent: (
    { content_no, content_title, content_content },
    LoadingCallback
  ) => {
    var apiName = v1Api;
    var path = "/cms/content";
    var myInit = {
      headers: {},
      queryStringParameters: {},
      body: {
        content_no,
        // content_locale,
        // content_type,
        content_title,
        content_content,
      },
    };
    return Api.put(apiName, path, myInit, LoadingCallback);
  },
};

exports.apiObjectMobilePass = {
  getTest: () => {
    return Api.getAxios().get(
      "https://fak0zv2jei.execute-api.ap-northeast-1.amazonaws.com/sp-prod-api-stage/v1/SPCMS_00003"
    );
  },

  getTest2: ({ test, test2 }) => {
    return Api.getAxios().get("https://www.naver.com");
  },
};
