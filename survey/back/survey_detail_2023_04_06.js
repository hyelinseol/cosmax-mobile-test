async function getSurveyDetailDiagnosisCount() {
  let set_param = {
    member_id: survey_member_id,
    from: dayjs().subtract(6, "month").format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis`,
      type: "get",
      data: set_param,
      dataType: "json",
      success: function (result) {
        if (result.length > 0) {
          resolve(result.length);
        } else {
          resolve(0);
        }
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve(0);
      },
    });
  });
}


window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;
      await CAFE24API.getCustomerInfo(function (err, res) {
        return new Promise(function (resolve, reject) {
          if (res) {
            if (res.customer) {
              survey_member_name = res.customer.name;
              survey_member_id = res.customer.member_id;
            }
          }
          if (!survey_member_id) {
            let cafe24_member_info = JSON.parse(
              sessionStorage.getItem("member_" + survey_shop_no)
            );
            if (
              cafe24_member_info &&
              cafe24_member_info.data &&
              cafe24_member_info.data.member_id
            ) {
              survey_member_id = cafe24_member_info.data.member_id;
            }
          }
          resolve(res);
        });
      });
      let regex = /[^0-9]/g;
      let total_price_str = survey_jQuery("#survey_product_price").text();
      let total_price = Number(total_price_str.replace(regex, ""));
      survey_jQuery("#survey_product_price").text(surveyComma(total_price) + "원");

      let total_sale_price_str = survey_jQuery("#survey_product_sale_price").text();
      let total_sale_price = Number(total_sale_price_str.replace(regex, ""));
      survey_jQuery("#survey_product_sale_price").text(surveyComma(total_sale_price) + "원");

      let total_strike_price_str = survey_jQuery(".perOriginPrice em strike").text();
      total_strike_price =  Number(total_strike_price_str.replace(regex, ""));
      survey_jQuery(".perOriginPrice em strike").text(surveyComma(total_strike_price) + "원");

      let survey_diagnosis_count = await getSurveyDetailDiagnosisCount();
      if (survey_diagnosis_count > 0) {
        survey_jQuery("#survey_diagnosis_move").show();
      } else {
        survey_jQuery(".btn_style03").css("width", "100%");
        survey_jQuery(".btn_style03").parent().css("width", "100%");
        survey_jQuery(".btn_style03").parent().css("margin-left", "0px");
      }
      // 하단 버튼 영역 노출
      survey_jQuery(".fixed-btn").show();

    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
  },
  false
);