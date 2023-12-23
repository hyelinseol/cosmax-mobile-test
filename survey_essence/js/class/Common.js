// 공통사용
class EssenceCommon {
  // 앱 client_id
  app_client_id = "PHOutdi3EleQxttT8mq0FE";

  // 앱 version
  app_version = "2022-06-01";

  // 도메인
  survey_domain = "https://cosmax-api.shoplus.store";

  // app_name
  survey_app_name = "survey";

  // 회원 id
  survey_member_id = null;

  // mall_id
  survey_mall_id = null;

  // shop_no
  survey_shop_no = null;

  // 모바일 여부 체크
  survey_is_moile_device = false;

  // 카테고리 번호
  survey_category_no_list = {
    cosmaxtest: [
      { no: 28, type: "hair_care", survey_link: "/survey?product_no=14" },
      { no: 42, type: "skin_care", survey_link: "/survey_essence/index.html?product_no=24" },
    ],
    threewaau: [
      { no: 28, type: "hair_care", survey_link: "/survey?product_no=13" },
      { no: 42, type: "skin_care", survey_link: "/survey_essence/index.html?product_no=24" },
    ],
  };

  // 타입별 모든 상품 번호 리스트
  survey_product_list = {
    cosmaxtest: [
      { no: 13, type: "hair_care" },
      { no: 14, type: "hair_care" },
      { no: 15, type: "hair_care" },
      { no: 23, type: "skin_care" },
      { no: 24, type: "skin_care" },
    ],
    threewaau: [
      { no: 11, type: "hair_care" },
      { no: 12, type: "hair_care" },
      { no: 13, type: "hair_care" },
      { no: 23, type: "skin_care" },
      { no: 24, type: "skin_care" },
    ],
  };

  constructor() {
    this.survey_is_moile_device = CAFE24.MOBILE_DEVICE;
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
  surveySleep(time) {
    setTimeout(async function () {
      return new Promise(function (resolve, reject) {
        resolve(null);
      });
    }, time);
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
        console.log(err, res);
        if (res?.customer?.member_id) {
          self.survey_member_id = res.customer.member_id;
        }
        resolve(res);
      });
    });
  }
}
