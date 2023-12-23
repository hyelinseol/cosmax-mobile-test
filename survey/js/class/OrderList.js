class SurveyOrderList {

  constructor() {
    //
  }

  // 문진 조회
  async getSurveyResult(form, to) {
    let url = `/front/diagnoses?member_id=${surveyCommon.survey_member_id}&from=${form}&to=${to}`;
    return new Promise(async function (resolve, reject) {
      await surveyCommon.getSurveyAjax(url).then(function (res) {
        resolve(res);
      })
      .catch(function (err) {
        console.log(err);
        reject(null);
      });
    });
  }

  // 주문 조회
  async getSurveyOrder(order_status, start_date, end_date) {
    let set_param = {
      member_id: surveyCommon.survey_member_id,
      start_date,
      end_date,
      order_status,
    };
    return new Promise(function (resolve, reject) {
      survey_jQuery.ajax({
        url: `${surveyCommon.survey_domain}/app/${surveyCommon.survey_app_name}/mall/${surveyCommon.survey_mall_id}/api/survey/shops/${surveyCommon.survey_shop_no}/front/order`,
        type: "GET",
        data: set_param,
        dataType: "json",
        success: function (result) {
          resolve(result.count);
        },
        error: function (request, status, error) {
          console.log(request, status, error);
          resolve([]);
        },
      });
    });
  }

  // 주문 조회
  async getSurveyOrderOne(order_id, start_date, end_date) {
    let set_param = {
      start_date,
      end_date,
    };
    return new Promise(function (resolve, reject) {
      survey_jQuery.ajax({
        url: `${surveyCommon.survey_domain}/app/${surveyCommon.survey_app_name}/mall/${surveyCommon.survey_mall_id}/api/survey/shops/${surveyCommon.survey_shop_no}/front/order/` + order_id,
        type: "GET",
        data: set_param,
        dataType: "json",
        success: function (result) {
          resolve([result.count.order]);
        },
        error: function (request, status, error) {
          console.log(request, status, error);
          resolve([]);
        },
      });
    });
  }

}
