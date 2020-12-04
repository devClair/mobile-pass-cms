import { env } from "../env";
import { tempTableData } from "../data";
import { CurrentAuthUiState, UserState } from "@psyrenpark/auth";
import { produce, setAutoFreeze } from "immer";
import IsoCode from "../json/iso_code.json";

const sort_tab_data = [
  { key: 0, value: "번호순", order_column: "lecture_no", order_type: "DESC" },
  { key: 1, value: "기간순", order_column: "updatedAt", order_type: "DESC" },
  {
    key: 2,
    value: "업로드순",
    order_column: "createdAt",
    order_type: "DESC",
  },
  // { key: 3, value: "조회수", order_column: "view_count", order_type: "DESC" },
  // {
  //   key: 4,
  //   value: "강의명",
  //   order_column: "lecture_title",
  //   order_type: "DESC",
  // },
  {
    key: 5,
    value: "Best노출만",
    order_column: "best_bare_state",
    order_type: "DESC",
  },
  {
    key: 6,
    value: "승인만",
    order_column: "lecture_state",
    order_type: "DESC",
  },
  {
    key: 7,
    value: "승인대기만",
    order_column: "lecture_state",
    order_type: "ASC",
  },
];

const sort_span_dic = {
  no: {
    value: "번호순",
    order_column: "no",
  },
  user_no: {
    value: "번호순",
    order_column: "user_no",
  },
  faq_no: {
    value: "번호순",
    order_column: "faq_no",
  },
  inquiry_no: {
    value: "번호순",
    order_column: "inquiry_no",
  },
  lecture_no: {
    value: "번호순",
    order_column: "lecture_no",
  },
  live_begin_dt: {
    value: "게시일 순",
    order_column: "live_begin_dt",
  },
  best_bare_state: {
    value: "best노출",
    order_column: "best_bare_state",
  },
  best_bare_order_weight: {
    value: "가중치",
    order_column: "best_bare_order_weight",
  },
  lecture_state: {
    value: "승인",
    order_column: "lecture_state",
  },
  notice_no: {
    value: "번호순",
    order_column: "notice_no",
  },
  view_count: {
    value: "조회수",
    order_column: "view_count",
  },
  income_count: {
    value: "구입",
    order_column: "income_count",
  },
  sales_count: {
    value: "시청",
    order_column: "sales_count",
  },
  inquiry_type: {
    value: "강좌 분류",
    order_column: "inquiry_type",
  },
  reg_lecture_count: {
    value: "수강자 등록순",
    order_column: "reg_lecture_count",
  },
  current_real_price: {
    value: "가격순",
    order_column: "current_real_price",
  },
  name: {
    value: "이름순",
    order_column: "user_name",
  },
  user_name: {
    value: "이름순",
    order_column: "user_name",
  },
  createdAt: {
    value: "작성일순",
    order_column: "createdAt",
  },
  faq_title: {
    value: "문의제목",
    order_column: "faq_title",
  },
  best_lecturer_state: {
    value: "노출순",
    order_column: "best_lecturer_state",
  },
  faq_order_weight: {
    value: "가중치순",
    order_column: "faq_order_weight",
  },
  notice_order_weight: {
    value: "가중치순",
    order_column: "notice_order_weight",
  },
  state: {
    value: "노출순",
    order_column: "state",
  },
  faq_status: {
    value: "노출순",
    order_column: "faq_status",
  },
  notice_state: {
    value: "노출순",
    order_column: "notice_state",
  },
  lecturer_status: {
    value: "강사 권한",
    order_column: "lecturer_status",
  },
  response_state: {
    value: "답변 완료",
    order_column: "response_state",
  },
  real_price: {
    value: "금액순",
    order_column: "real_price",
  },
};

const filter_list_type = {
  client_user: {
    key: "client_user",
    label: "일반회원",
  },
  business_user: {
    key: "business_user",
    label: "사업자회원",
  },
};

const order_column = {
  user_name: {
    key: "user_name",
    label: "이름",
  },
  birth: {
    key: "birth",
    label: "생년월일",
  },
  business_name: {
    key: "business_name",
    label: "법인/상호명",
  },
  history: {
    key: "history",
    label: "히스토리",
  },
  join_dt: {
    key: "join_dt",
    label: "가입일자",
  },
};
const filter_gender = {
  all: {
    key: "all",
    label: "전체",
  },
  male: {
    key: "male",
    label: "남자",
  },
  female: {
    key: "female",
    label: "여자",
  },
};

const filter_is_approved = {
  all: {
    key: "all",
    label: "전체",
  },
  awating: {
    key: "awating",
    label: "대기중",
  },
  approved: {
    key: "approved",
    label: "승인완료",
  },
};

const search_filter = {
  user_name: {
    key: "user_name",
    label: "이름",
  },
  email: {
    key: "email",
    label: "이메일",
  },
  remarks: {
    key: "remarks",
    label: "비고",
  },
  business_name: {
    key: "business_name",
    label: "법인/상호명",
  },
  business_license_number: {
    key: "business_license_number",
    label: "사업자등록번호",
  },
};

const search_type_data = [
  { key: 0, value: "이름", search_column: "search_name" },
  { key: 1, value: "제목", search_column: "search_title" },
  { key: 2, value: "내용", search_column: "search_content" },
  { key: 3, value: "과", search_column: "search_department" },
  { key: 4, value: "학", search_column: "search_faculty" },
];

const list_params = {
  order_column: "lecture_no",
  order_type: "DESC",
  search_type: "lecturer_name",
  filter_begin_dt: new Date(),
  filter_end_dt: new Date(),
  search_text: null,
  current_page: 1,
  current_department: 0,
};

const lecture = {
  list_params: list_params,
  sort_tab_data: sort_tab_data,
  search_type_data: [
    { key: 0, value: "이름", search_column: "search_name" },
    { key: 1, value: "제목", search_column: "search_title" },
    { key: 2, value: "내용", search_column: "search_content" },
    { key: 3, value: "과", search_column: "search_department" },
    { key: 4, value: "학", search_column: "search_faculty" },
  ],
  lecture_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const user_type_data = [
  {
    index: 0,
    key: "전체",
    value: "전체",
    type: "all",
  },
  {
    index: 1,
    key: "의사",
    value: "의사",
    type: "doctor",
  },
  {
    index: 2,
    key: "학생",
    value: "학생",
    type: "student",
  },
  {
    index: 3,
    key: "일반",
    value: "일반",
    type: "normal",
  },
];

const inquiry_type_data = [
  {
    index: 0,
    key: "전체",
    value: "전체",
    type: "all",
  },
  {
    index: 1,
    key: "결제",
    value: "결제",
    type: "payment",
  },
  {
    index: 2,
    key: "강의",
    value: "강의",
    type: "lecture",
  },
];

const list_params_base = {
  // order_column: "lecture_no",
  // order_type: "DESC",
  // search_type: "lecturer_name",
  // filter_begin_dt: new Date(),
  // filter_end_dt: new Date(),
  // search_text: null,
  // current_page: 1,
  // current_department: 0,
};

const list_params_default = {
  user: {
    filter_list_type: "client_user",
    order_column: "user_name",
    filter_country_code: "ALL",
    filter_gender: "all",
    filter_is_approved: "all",
    search_filter: "user_name",
    search_text: "",
    current_page: 1,
  },
  report: {
    filter_list_type: "client_user",
    order_column: "user_name",
    current_page: 1,
  },
  // order_column: "lecture_no",
  // order_type: "DESC",
  // search_type: "lecturer_name",
  // filter_begin_dt: new Date(),
  // filter_end_dt: new Date(),
  // search_text: null,
  // current_page: 1,
  // current_department: 0,
};

const faq = {
  list_params: list_params_base,
  sort_tab_data: sort_tab_data,
  search_type_data: search_type_data,
  faq_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const inquiry = {
  list_params: list_params_base,
  sort_tab_data: sort_tab_data,
  search_type_data: search_type_data,
  inquiry_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const banner = {
  list_params: list_params_base,
  sort_tab_data: sort_tab_data,
  search_type_data: search_type_data,
  tab_type_data: [
    { key: 0, value: "메인", type: "main" },
    { key: 1, value: "라이브 강의", type: "live" },
    { key: 2, value: "라이브 강의 채팅창 아래", type: "chat" },
  ],
  marks: [],
  banner_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const notice = {
  list_params: list_params_base,
  sort_tab_data: sort_tab_data,
  search_type_data: search_type_data,
  /* notice_type */
  tab_type_data: [
    { key: 0, value: "라이브벳", type: "live-vet" },
    { key: 1, value: "라이브 스터디", type: "live-study" },
  ],
  notice_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const content = {
  list_params: list_params_base,
  sort_tab_data: sort_tab_data,
  search_type_data: search_type_data,
  tab_type_data: [
    { key: 0, value: "개인정보처리방침", type: "policy" },
    { key: 1, value: "이용약관", type: "terms" },
  ],
  content_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const lecturer = {
  list_params: list_params_base,
  sort_tab_data: sort_tab_data,
  search_type_data: [
    { key: 0, value: "이름", search_column: "search_name" },
    { key: 1, value: "제목", search_column: "search_title" },
    { key: 2, value: "과", search_column: "search_department" },
    // { key: 2, value: "내용", search_column: "search_content" },
    // { key: 4, value: "학", search_column: "search_faculty" },
  ],
  // tab_type_data: [
  //   { key: 0, value: "메인", type: "main" },
  //   { key: 1, value: "라이브 강의", type: "live" },
  //   { key: 2, value: "라이브 강의 채팅창 아래", type: "chat" },
  // ],
  marks: [],
  lecturer_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
  department_info: [],
  banklist: [],
};

const user = {
  list_params: {
    ...list_params_default.user,
    // list_type: "client_user",
    // order_column: "user_name",

    // order_type: "DESC",
    // search_type: "lecturer_name",
    // filter_begin_dt: new Date(),
    // filter_end_dt: new Date(),
    // search_text: null,
    // current_page: 1,
    // current_department: 0,
  },
  sort_tab_data: sort_tab_data,
  search_type_data: search_type_data,
  // tab_type_data: [
  //   { key: 0, value: "개인정보처리방침", type: "policy" },
  //   { key: 1, value: "이용약관", type: "terms" },
  // ],
  user_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const payment = {
  list_params: list_params_base,
  sort_tab_data: sort_tab_data,
  search_type_data: [
    { key: 0, value: "이름", search_column: "search_name" },
    { key: 1, value: "제목", search_column: "search_title" },
    { key: 2, value: "내용", search_column: "search_content" },
  ],
  // tab_type_data: [
  //   { key: 0, value: "개인정보처리방침", type: "policy" },
  //   { key: 1, value: "이용약관", type: "terms" },
  // ],
  payment_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const reg_lecture = {
  list_params: list_params_base,
  sort_tab_data: sort_tab_data,
  search_type_data: [
    { key: 0, value: "이름", search_column: "search_name" },
    { key: 1, value: "과", search_column: "search_department" },
    { key: 2, value: "이메일", search_column: "search_email" },
  ],
  // tab_type_data: [
  //   { key: 0, value: "개인정보처리방침", type: "policy" },
  //   { key: 1, value: "이용약관", type: "terms" },
  // ],
  reg_lecture_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const adjustment = {
  list_params: list_params_base,
  sort_tab_data: sort_tab_data,
  search_type_data: [],
  // tab_type_data: [
  //   { key: 0, value: "개인정보처리방침", type: "policy" },
  //   { key: 1, value: "이용약관", type: "terms" },
  // ],
  adjustment_data: {
    code: "",
    data: [],
    currentRow: 0,
    next_token: "",
    total_count: 1,
    total_page: 1,
    current_page: 1,
  },
};

const INITIAL_STATE = {
  locale: "ko-KR",
  baseFileServerUrl: env.baseFileServerUrl,
  isLoading: 0, // 로딩 상태
  currentAuthUiState: CurrentAuthUiState.SIGN_IN, // 인증 화면 상태
  // currentAuthUiState: CurrentAuthUiState.CHANGE_PASSWORD, // 인증 화면 상태
  userState: UserState.NOT_SIGN, // 인증 상태
  myAuth: {}, // 인증관련 정보
  myUser: {}, // 로그인후 유저 정보
  userData: {
    code: "",
    data: [],
  },
  list_params_default: list_params_default,
  filter_list_type: filter_list_type,
  order_column: order_column,
  filter_country_code: IsoCode,
  filter_gender: filter_gender,
  filter_is_approved: filter_is_approved,
  search_filter: search_filter,
  sort_span_dic: sort_span_dic,
  modalOverflow: true,
  inquiry_type_data: inquiry_type_data,
  tempTableData: tempTableData,
  acceptedFile: {
    img: "",
    file: "",
  },
  instructor_info: {
    user_no: "",
    lecturer_name: "",
    lecturer_title: "",
    lecturer_career: "",
    lecturer_introduction_img_no: "",
    tb_image: {
      full_file_path: "",
    },
    createdAt: "",
    updatedAt: "",
  },
  instructor_list_info: [
    {
      user_no: "",
      lecturer_name: "",
      lecturer_title: "",
      lecturer_career: "",
      lecturer_introduction_img_no: "",
      tb_image: {
        full_file_path: "",
      },
      createdAt: "",
      updatedAt: "",
    },
  ],
  department_info: [],
  banklist: [],

  faculty_info: [],
  faq: faq,
  inquiry: inquiry,
  banner: banner,
  notice: notice,
  content: content,
  lecturer: lecturer,
  lecture: lecture,
  user: user,
  report: {},
  payment: payment,
  reg_lecture: reg_lecture,
  adjustment: adjustment,
};

setAutoFreeze(false);

export default (state = INITIAL_STATE, { type, payload }) => {
  // console.log("state", state);
  switch (type) {
    // case "SET_PAGE_KEY":
    // return {
    //   ...state,
    //   // // pageKey: payload.pageKey,
    //   // // listKey: payload.listKey,
    //   // // match: payload.match,
    //   // page_key: payload.page_key,
    // };

    case "SET_MODAL_OVER_FLOW":
      return { ...state, modalOverflow: payload };

    case "SET_IS_LOGIN":
      return { ...state, isLogin: payload };

    case "SET_MY_USER":
      return { ...state, myUser: payload };

    case "SET_IS_EXIST_LANG_FILE":
      return { ...state, isExistLangFile: payload };

    case "SET_IS_AUTO_LOGIN":
      return {
        ...state,
        isLogin: payload.isLogin,
        isExistLangFile: payload.isExistLangFile,
      };

    case "SET_IS_LOADING":
      // return { ...state, isLoading: payload };
      // return produce(state, (draft) => {
      //   draft.isLoading = payload
      //     ? draft.isLoading + 1
      //     : draft.isLoading > 0
      //     ? draft.isLoading - 1
      //     : draft.isLoading;
      // });

      return {
        ...state,
        isLoading: payload
          ? state.isLoading + 1
          : state.isLoading > 0
          ? state.isLoading - 1
          : state.isLoading,
      };

    case "SET_CURRENT_AUTH_UI_STATE":
      return { ...state, currentAuthUiState: payload };

    case "SET_MY_AUTH":
      return { ...state, myAuth: payload };

    case "SET_USER_STATE":
      return {
        ...state,
        currentAuthUiState: CurrentAuthUiState.SIGN_IN,
        userState: payload,
      };

    case "SIGN_IN":
      return {
        ...state,
        currentAuthUiState: CurrentAuthUiState.SIGN_IN,
        userState: UserState.SIGNED,
        myUser: payload,
      };

    case "SIGN_OUT":
      return {
        ...state,
        currentAuthUiState: CurrentAuthUiState.SIGN_IN,
        userState: UserState.NOT_SIGN,
      };

    // case "GET_CMS_USER":
    //   return {
    //     ...state,
    //     userData: { ...state.userData, code: payload.code, data: payload.data },
    //   };

    // =========================================================================
    // common

    case "SET_HADER_LIST_PARAMS":
      return produce(state, (draft) => {
        draft[payload.reducer_type].list_params = {
          ...state[payload.reducer_type].list_params,
          ...payload.list_params,
        };
      });

    // =========================================================================
    // lecture
    case "SET_LIST_PARAMS":
      return produce(state, (draft) => {
        draft[payload.path].list_params = {
          ...state[payload.path].list_params,
          ...payload.list_params,
        };
      });

    case "LIST_CMS_LECTURES":
      return produce(state, (draft) => {
        draft.lecture.lecture_data = {
          ...payload.lecture_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_LECTURES":
      return produce(state, (draft) => {
        draft.lecture.lecture_data = {
          ...payload.lecture_data,
        };
        // draft.acceptedFile.img = payload.acceptedFile_img;
        draft.department_info = payload.department_info;
      });

    case "LIST_DEPARTMENTS":
      return produce(state, (draft) => {
        draft.department_info = payload.department_info;
      });

    case "LIST_FACULTYS":
      return produce(state, (draft) => {
        draft.faculty_info = payload.faculty_info;
      });

    // case "LIST_CMS_LECTURERS":
    //   return {
    //     ...state,
    //     instructor_list_info: payload.instructor_list_info,
    //     department_info: payload.department_info,
    //     next_token: payload.next_token,
    //     total_count: payload.total_count,
    //     total_page: payload.total_page,
    //     current_page: payload.current_page,
    //   };

    case "SET_ACCEPTED_FILE":
      return {
        ...state,
        acceptedFile: {
          img: payload.img,
          file: payload.file,
        },
      };

    // =========================================================================
    // FAQ

    case "LIST_CMS_FAQS":
      return produce(state, (draft) => {
        draft.faq.faq_data = {
          ...payload.faq_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_FAQ":
      return produce(state, (draft) => {
        draft.faq.faq_data = {
          ...state.faq.faq_data,
          ...payload.faq_data,
        };
        draft.department_info = payload.department_info;
      });

    // =========================================================================
    // inquiry

    case "LIST_CMS_INQUIRYS":
      return produce(state, (draft) => {
        draft.inquiry.inquiry_data = {
          ...payload.inquiry_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_INQUIRY":
      return produce(state, (draft) => {
        draft.inquiry.inquiry_data = {
          ...state.inquiry.inquiry_data,
          ...payload.inquiry_data,
        };
        draft.department_info = payload.department_info;
      });

    // =========================================================================
    // banner

    case "LIST_CMS_BANNERS":
      return produce(state, (draft) => {
        draft.banner.banner_data = {
          ...payload.banner_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_BANNER":
      return produce(state, (draft) => {
        draft.banner.banner_data = {
          ...state.banner.banner_data,
          ...payload.banner_data,
        };
        draft.banner.marks = payload.marks;
        draft.department_info = payload.department_info;
      });

    // =========================================================================
    // notice

    case "LIST_CMS_NOTICES":
      return produce(state, (draft) => {
        draft.notice.notice_data = {
          ...payload.notice_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_NOTICE":
      return produce(state, (draft) => {
        draft.notice.notice_data = {
          ...state.notice.notice_data,
          ...payload.notice_data,
        };
        draft.department_info = payload.department_info;
      });

    // =========================================================================
    // content

    case "LIST_CMS_CONTENTS":
      return produce(state, (draft) => {
        draft.content.content_data = {
          ...payload.content_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_CONTENT":
      return produce(state, (draft) => {
        draft.content.content_data = {
          ...state.content.content_data,
          ...payload.content_data,
        };
        draft.department_info = payload.department_info;
      });

    // =========================================================================
    // lecturer

    case "LIST_CMS_LECTURERS":
      return produce(state, (draft) => {
        draft.lecturer.lecturer_data = {
          ...payload.lecturer_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_LECTURER":
      return produce(state, (draft) => {
        draft.lecturer.lecturer_data = {
          ...state.lecturer.lecturer_data,
          ...payload.lecturer_data,
        };
        draft.department_info = payload.department_info;
        draft.banklist = payload.banklist;
      });

    // =========================================================================
    // user

    case "LIST_CMS_USERS":
      return produce(state, (draft) => {
        draft.user.user_data = {
          ...payload.user_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_USER":
      return produce(state, (draft) => {
        draft.user.user_data = {
          ...state.user.user_data,
          ...payload.user_data,
        };
        draft.department_info = payload.department_info;
      });

    // =========================================================================
    // payment

    case "LIST_CMS_PAYMENTS":
      return produce(state, (draft) => {
        draft.payment.payment_data = {
          ...payload.payment_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_PAYMENT":
      return produce(state, (draft) => {
        draft.payment.payment_data = {
          ...state.payment.payment_data,
          ...payload.payment_data,
        };
        draft.department_info = payload.department_info;
      });

    // =========================================================================
    // payment

    case "LIST_CMS_REG_LECTURES":
      return produce(state, (draft) => {
        draft.reg_lecture.reg_lecture_data = {
          ...payload.reg_lecture_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_REG_LECTURE":
      return produce(state, (draft) => {
        draft.payment.reg_lecture_data = {
          ...state.reg_lecture.reg_lecture_data,
          ...payload.reg_lecture_data,
        };
        draft.department_info = payload.department_info;
      });

    // =========================================================================
    // adjustment

    case "LIST_CMS_REG_ADJUSTMENTS":
      return produce(state, (draft) => {
        draft.adjustment.adjustment_data = {
          ...payload.adjustment_data,
        };
        draft.department_info = payload.department_info;
      });

    case "GET_CMS_REG_ADJUSTMENT":
      return produce(state, (draft) => {
        draft.adjustment.adjustment_data = {
          ...state.adjustment.adjustment_data,
          ...payload.adjustment_data,
        };
        draft.department_info = payload.department_info;
      });

    default:
      return state;
  }
};
