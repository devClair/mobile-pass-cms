import { env } from "../env";
import { CurrentAuthUiState, UserState } from "@psyrenpark/auth";
import { produce, setAutoFreeze } from "immer";
import IsoCode from "../json/iso_code.json";

const filter_list_type = {
  client_user: {
    key: "client_user",
    label: "일반회원",
  },
  business_user: {
    key: "business_user",
    label: "사업자회원",
  },
  standard_q: {
    key: "standard_q",
    label: "STANDARD Q",
  },
  standard_f: {
    key: "standard_f",
    label: "STANDARD F",
  },
  app_push: {
    key: "app_push",
    label: "앱푸쉬알림",
  },
  id_management: {
    key: "id_management",
    label: "ID 관리",
  },
  terms_of_service: {
    key: "terms_of_service",
    label: "License 사용 규정",
  },
  privacy_policy: {
    key: "privacy_policy",
    label: "개인정보처리방침",
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
  created_at: {
    key: "created_at",
    label: "created_at",
  },
  title: {
    key: "title",
    label: "제목",
  },
  medical_institution: {
    key: "medical_institution",
    label: "의료기관명",
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

const filter_test_result = {
  all: {
    key: "all",
    label: "전체",
  },
  positive: {
    key: "positive",
    label: "Positive",
  },
  negative: {
    key: "negative",
    label: "Negative",
  },
  invalid: {
    key: "invalid",
    label: "Invalid",
  },
};

const filter_user_type = {
  all: {
    key: "all",
    label: "전체",
  },
  client: {
    key: "client",
    label: "일반",
  },
  business: {
    key: "business",
    label: "사업자",
  },
  doctor: {
    key: "doctor",
    label: "의료진",
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
  title: {
    key: "title",
    label: "제목",
  },
  content: {
    key: "content",
    label: "내용",
  },
  id: {
    key: "id",
    label: "ID",
  },
  medical_institution: {
    key: "medical_institution",
    label: "의료기관명",
  },
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
    filter_list_type: "standard_q",
    order_column: "user_name",
    filter_gender: "all",
    filter_test_result: "all",
    search_filter: "user_name",
    search_text: "",
    current_page: 1,
  },
  push: {
    filter_list_type: "app_push",
    order_column: "created_at",
    filter_user_type: "all",
    search_filter: "title",
    search_text: "",
    current_page: 1,
  },
  id: {
    filter_list_type: "id_management",
    order_column: "created_at",
    search_filter: "id",
    search_text: "",
    current_page: 1,
  },
  terms: {
    filter_list_type: "terms_of_service",
    filter_country_code: "KR",
  },
};

const table_data_default = {
  code: "",
  data: [],
  currentRow: 0,
  next_token: "",
  total_count: 1,
  total_page: 1,
  current_page: 1,
};

const user = {
  list_params: {
    ...list_params_default.user,
  },
  table_data: table_data_default,
};
const report = {
  list_params: {
    ...list_params_default.report,
  },
  table_data: table_data_default,
};

const push = {
  list_params: {
    ...list_params_default.push,
  },
  table_data: table_data_default,
};

const id = {
  list_params: {
    ...list_params_default.id,
  },
  table_data: table_data_default,
};

const terms = {
  list_params: {
    ...list_params_default.terms,
  },
  content: "",
};

const INITIAL_STATE = {
  locale: "ko-KR",
  baseFileServerUrl: env.baseFileServerUrl,
  isLoading: 0, // 로딩 상태
  currentAuthUiState: CurrentAuthUiState.SIGN_IN, // 인증 화면 상태
  // currentAuthUiState: CurrentAuthUiState.CHANGE_PASSWORD, // 인증 화면 상태
  userState: UserState.SIGNED, // 인증 상태
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
  filter_test_result: filter_test_result,
  filter_user_type: filter_user_type,
  search_filter: search_filter,
  acceptedFile: {
    img: "",
    file: "",
  },
  user: user,
  report: report,
  push: push,
  id: id,
  terms: terms,
};

setAutoFreeze(false);

export default (state = INITIAL_STATE, { type, payload }) => {
  // console.log("state", state);
  switch (type) {
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

    // ReducerMobilePass ==========================================
    case "LIST_CMS_TABLE_DATA":
      return produce(state, (draft) => {
        draft[payload.reducer_key].table_data = {
          ...payload.table_data,
        };
      });

    case "SET_LIST_PARAMS":
      return produce(state, (draft) => {
        draft[payload.reducer_key].list_params = {
          ...state[payload.reducer_key].list_params,
          ...payload.list_params,
        };
      });

    case "GET_TERMS_CONTENT":
      return {
        ...state,
        terms: {
          ...state.terms,
          content: payload.content,
        },
      };

    // user
    // case "LIST_CMS_USERS":
    //   return produce(state, (draft) => {
    //     draft.user.user_data = {
    //       ...payload.user_data,
    //     };
    //   });

    // case "GET_CMS_USER":
    //   return produce(state, (draft) => {
    //     draft.user.user_data = {
    //       ...state.user.user_data,
    //       ...payload.user_data,
    //     };
    //   });
    default:
      return state;
  }
};
