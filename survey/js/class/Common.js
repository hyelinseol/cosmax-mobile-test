// 공통사용
class SurveyCommon {
  // 앱 client_id
  app_client_id = "PHOutdi3EleQxttT8mq0FE";

  // 앱 version
  app_version = "2022-06-01";

  // 도메인
  survey_domain = "https://cosmax-api.shoplus.store";
  // survey_domain = "https://cosmax-api-dev.shoplus.store"

  // app_name
  survey_app_name = "survey";

  // 회원 id
  survey_member_id = null;

  // 회원명
  survey_member_name = null;

  // mall_id
  survey_mall_id = null;

  // shop_no
  survey_shop_no = null;

  // 모바일 여부 체크
  survey_is_moile_device = false;

  // 타입별 문진 url
  survey_qna_link_list = {
    cosmaxtest: [
      { type: "hair_care", detail_type: "", survey_link: "/m/survey?product_no=14" },
      { type: "hair_care", detail_type: "sample", survey_link: "/m/survey/sample.html?product_no=29" },
      { type: "skin_care", detail_type: "", survey_link: "/m/survey_essence/index.html?product_no=26" },
    ],
    threewaau: [
      { type: "hair_care", detail_type: "", survey_link: "/m/survey?product_no=13" },
      { type: "hair_care", detail_type: "sample", survey_link: "/m/survey/sample.html?product_no=24" },
      { type: "skin_care", detail_type: "", survey_link: "/m/survey_essence/index.html?product_no=17" },
    ],
  };

  // 카테고리 번호
  survey_category_no_list = {
    cosmaxtest: [
      { no: 28, type: "hair_care" },
      { no: 42, type: "skin_care" },
    ],
    threewaau: [
      { no: 26, type: "hair_care" },
      { no: 42, type: "skin_care" },
    ],
  };

  // 문진형 상품 정보 - 타입별 모든 상품 번호 리스트
  survey_product_list = {
    cosmaxtest: [
      { no: 13, type: "hair_care", detail_type: "", product_type: "shampoo" },
      { no: 15, type: "hair_care", detail_type: "", product_type: "treatment" },
      { no: 14, type: "hair_care", detail_type: "", product_type: "set_product" },
  
      // 샘플
      { no: 28, type: "hair_care", detail_type: "sample", product_type: "sample_shampoo" },
      { no: 27, type: "hair_care", detail_type: "sample", product_type: "sample_treatment" },
      { no: 29, type: "hair_care", detail_type: "sample", product_type: "sample_set_product" },
  
      // 임직원
      { no: 32, type: "hair_care", detail_type: "employees", product_type: "employees_shampoo" },
      { no: 31, type: "hair_care", detail_type: "employees", product_type: "employees_treatment" },
      { no: 30, type: "hair_care", detail_type: "employees", product_type: "employees_set_product" },

      { no: 23, type: "skin_care", detail_type: "", product_type: "essence" },
      { no: 25, type: "skin_care", detail_type: "", product_type: "boot_essence" },
      { no: 26, type: "skin_care", detail_type: "", product_type: "set_essence" },

      // 임직원2
      { no: 45, type: "hair_care", detail_type: "employees1", product_type: "employees_shampoo" },
      { no: 43, type: "hair_care", detail_type: "employees1", product_type: "employees_treatment" },
      { no: 44, type: "hair_care", detail_type: "employees1", product_type: "employees_set_product" },

      // 임직원3
      { no: 42, type: "skin_care", detail_type: "employees2", product_type: "employees_essence" },
      { no: 41, type: "skin_care", detail_type: "employees2", product_type: "employees_boot_essence" },
      { no: 40, type: "skin_care", detail_type: "employees2", product_type: "employees_set_essence" },

      // 임직원4
      { no: 23, type: "skin_care", detail_type: "employees3", product_type: "employees_essence" },
      { no: 25, type: "skin_care", detail_type: "employees3", product_type: "employees_boot_essence" },
      { no: 52, type: "skin_care", detail_type: "employees3", product_type: "employees_set_essence" },
    ],
    threewaau: [
      // 헤어케어 기본 세팅 - 세트상품 13
      { no: 11, type: "hair_care", detail_type: "", product_type: "shampoo" },
      { no: 12, type: "hair_care", detail_type: "", product_type: "treatment" },
      { no: 13, type: "hair_care", detail_type: "", product_type: "set_product" },

      // 스킨케어 기본 세팅 - 세트상품 17    
      { no: 15, type: "skin_care", detail_type: "", product_type: "essence" },
      { no: 16, type: "skin_care", detail_type: "", product_type: "boot_essence" },
      { no: 17, type: "skin_care", detail_type: "", product_type: "set_essence" },   
        
          // 헤어케어 샘플 - 세트상품 24
          { no: 22, type: "hair_care", detail_type: "sample", product_type: "sample_shampoo" },
          { no: 23, type: "hair_care", detail_type: "sample", product_type: "sample_treatment" },
          { no: 24, type: "hair_care", detail_type: "sample", product_type: "sample_set_product" },

          // 헤어케어 임직원 - 세트상품 27
          // 임직원 상품 - 진단 후 상세 화면 상품 선택시 아래 상품 노출, 주문목록 페이지 피드백하기 버튼 클릭하여 진행시 기본 세팅 상품(11,12,13) 선택하여 주문        
          { no: 25, type: "hair_care", detail_type: "employees", product_type: "employees_shampoo" },
          { no: 26, type: "hair_care", detail_type: "employees", product_type: "employees_treatment" },
          { no: 27, type: "hair_care", detail_type: "employees", product_type: "employees_set_product" },

          // 헤어케어+스킨케어 임직원2 - 세트상품 35, 세트상품 34 
          // 예외처리 - 진단 후 상세 화면 상품 선택시 세트만 노출, 주문목록 페이지 피드백하기 버튼 미노출
          { no: 36, type: "hair_care", detail_type: "employees1", product_type: "employees_shampoo" },
          { no: 37, type: "hair_care", detail_type: "employees1", product_type: "employees_treatment" },
          { no: 35, type: "hair_care", detail_type: "employees1", product_type: "employees_set_product" },
          { no: 33, type: "skin_care", detail_type: "employees1", product_type: "employees_essence" },
          { no: 32, type: "skin_care", detail_type: "employees1", product_type: "employees_boot_essence" },
          { no: 34, type: "skin_care", detail_type: "employees1", product_type: "employees_set_essence" },
        
           // 스킨케어 히든용 - 세트상품 61    
         { no: 59, type: "skin_care", detail_type: "employees2", product_type: "employees_essence" },
         { no: 60, type: "skin_care", detail_type: "employees2", product_type: "employees_boot_essence" },
         { no: 61, type: "skin_care", detail_type: "employees2", product_type: "employees_set_essence" },   
        
    ],
  };

  // 고정형 상품 정보
  survey_fix_product_list = {
    cosmaxtest: [
      { no: 33, type: "skin_care", product_type: "essence", bom_code: "WAU31S07990000000002CEN1WAU0003", nick_name: "3WAAU 스킨케어" }, // 진정 맞춤 에센스
      { no: 50, type: "skin_care", product_type: "set_essence", product_list: [33, 37] },  // 튼튼 장벽 진정 에센스 세트
      { no: 35, type: "skin_care", product_type: "essence", bom_code: "WAU31S07990000000001CEN1WAU0003", nick_name: "3WAAU 스킨케어" }, // 보습 맞춤 에센스
      { no: 51, type: "skin_care", product_type: "set_essence", product_list: [35, 37] },  // 탱글 물광 수분 에센스 세트
      { no: 37, type: "skin_care", product_type: "boot_essence", bom_code: "WAU31S07020000000001CEB1WAU0001", nick_name: "3WAAU 스킨케어" }, 
    ],
    threewaau: [
      { no: 43, type: "skin_care", product_type: "essence", bom_code: "WAU31S07990000000001CEN1WAU0003", nick_name: "3WAAU 스킨케어" }, // 탱글 물광 수분 에센스
      { no: 45, type: "skin_care", product_type: "set_essence", product_list: [43, 48] }, // 탱글 물광 수분 에센스 세트
      { no: 42, type: "skin_care", product_type: "essence", bom_code: "WAU31S07990000000002CEN1WAU0003", nick_name: "3WAAU 스킨케어" }, // 튼튼 장벽 진정 에센스
      { no: 44, type: "skin_care", product_type: "set_essence", product_list: [42, 48] }, // 튼튼 장벽 진정 에센스 세트
      { no: 48, type: "skin_care", product_type: "boot_essence", bom_code: "WAU31S07020000000001CEB1WAU0001", nick_name: "3WAAU 스킨케어" },
      { no: 60, type: "skin_care", product_type: "boot_essence", bom_code: "WAU31S07020000000001CEB1WAU0001", nick_name: "3WAAU 스킨케어" },  // 부스팅 에센스 (히든용)
      { no: 62, type: "skin_care", product_type: "essence", bom_code: "WAU31S07990000000002CEN1WAU0003", nick_name: "3WAAU 스킨케어" }, // 튼튼 장벽 진정 에센스 (히든용)
      { no: 63, type: "skin_care", product_type: "essence", bom_code: "WAU31S07990000000001CEN1WAU0003", nick_name: "3WAAU 스킨케어" }, // 탱글 물광 수분 에센스 (히든용)
      { no: 64, type: "skin_care", product_type: "set_essence", product_list: [63, 60] }, // 탱글 물광 수분 에센스 세트 히든용
      { no: 65, type: "skin_care", product_type: "set_essence", product_list: [62, 60] }, // 튼튼 장벽 진정 에센스 세트 히든용
    ]
  };

  survey_boot_essence = {
    cosmaxtest: 25,
    threewaau: 16,
  }

  worry_type_list = {
    dry: "보습",
    sensitive: "진정",
    wrinkle: "탄력",
    color: "색소",
    pore: "트러블·모공",
  };

  constructor() {
    // this.survey_is_moile_device = CAFE24.MOBILE_DEVICE;
    this.survey_is_moile_device = CAFE24.MOBILE;
    this.survey_mall_id = CAFE24API.MALL_ID;
    this.survey_shop_no = CAFE24API.SHOP_NO;
  }

  // GET 조회
  async getSurveyAjax(url) {
    let self = this;
    return new Promise(async function (resolve, reject) {
      survey_jQuery.ajax({
        url:
          `${self.survey_domain}/app/${self.survey_app_name}/mall/${self.survey_mall_id}/api/survey/shops/${self.survey_shop_no}` +
          url,
        type: "GET",
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
          resolve(result);
        },
        error: function (e) {
          console.log("e", e);
          reject(e);
        },
      });
    });
  }

  // PUT 전송
  putSurveyAjax(url, params) {
    let self = this;
    return new Promise(function (resolve, reject) {
      survey_jQuery.ajax({
        url:
          `${self.survey_domain}/app/${self.survey_app_name}/mall/${self.survey_mall_id}/api/survey/shops/${self.survey_shop_no}` +
          url,
        type: "PUT",
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(params),
        dataType: "json",
        success: function (result) {
          resolve(result);
        },
        error: function (e) {
          console.log("e", e);
          resolve(null);
        },
      });
    });
  }

  // POST 전송
  postSurveyAjax(url, params) {
    let self = this;
    return new Promise(function (resolve, reject) {
      survey_jQuery.ajax({
        url:
          `${self.survey_domain}/app/${self.survey_app_name}/mall/${self.survey_mall_id}/api/survey/shops/${self.survey_shop_no}` +
          url,
        type: "POST",
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(params),
        dataType: "json",
        success: function (result) {
          resolve(result);
        },
        error: function (e) {
          console.log("e", e);
          resolve(null);
        },
      });
    });
  }

  // 슬립
  async surveySleep(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(async function () {
        resolve(null);
      }, time);
    });
  }

  //GET 파라메터
  shoplusGetParameters(param_name) {
    let returnValue;
    let url = location.href;
    let parameters = url.slice(url.indexOf("?") + 1, url.length).split("&");
    for (let i = 0; i < parameters.length; i++) {
      let varName = parameters[i].split("=")[0];
      if (varName.toUpperCase() == param_name.toUpperCase()) {
        returnValue = parameters[i].split("=")[1];
        returnValue = returnValue.replace("#none", "");
        returnValue = returnValue.replace("#progress", "");
        returnValue = returnValue.replace("#prdDetail", "");
        returnValue = returnValue.replace("#prdReview", "");
        returnValue = returnValue.replace("#prdInfo", "");
        returnValue = returnValue.replace("#prdQnA", "");
        returnValue = returnValue.replace("#header", "");
        return decodeURIComponent(returnValue);
      }
    }
  }

  // 카페24 회원 정보 조회
  getCafe24CustomerInfo(CAFE24API) {
    let self = this;
    return new Promise(function (resolve, reject) {
      self.survey_mall_id = CAFE24API.MALL_ID;
      self.survey_shop_no = CAFE24API.SHOP_NO;
      CAFE24API.getCustomerInfo(function (err, res) {
        if (res?.customer?.member_id) {
          self.survey_member_id = res.customer.member_id;
          self.survey_member_name = res.customer.name;
        }
        resolve(res);
      });
    });
  }
  shoplusGetNumber(value) {
    if (value) {
      let regex = /[^0-9]/g;
      let result = value.replace(regex, "");
      return result;
    }
    return value;
  }

  surveyEnter(value) {
    if (!value) {
      return value;
    }
    return value.replace(/(\n|\r\n)/g, "<br>");
  }

  surveyComma(number) {
    return number.toLocaleString();
  }

  // 문진 조회
  async getSurveyResult(hash, qna_at) {
    let self = this;
    let url = `/front/diagnoses?hash=${hash}&from=${qna_at}&to=${qna_at}`;
    return new Promise(async function (resolve, reject) {
      await self.getSurveyAjax(url).then(function (res) {
        console.log("res", res);
        console.log("res", res[0][0]);
        resolve(res[0][0]);
      })
      .catch(function (err) {
        console.log(err);
        reject(null);
      });
    });
  }
  // 카페24 GET 조회
  async surveyGetCafe24API(CAFE24API, url) {
    let self = this;
    return new Promise(function (resolve, reject) {
      (function (CAFE24API) {
        CAFE24API.get(url, function (err, res) {
          resolve(res);
        });
      })(
        CAFE24API.init({
          client_id: self.app_client_id,
          version: self.app_version,
        })
      );
    })
  }
}
