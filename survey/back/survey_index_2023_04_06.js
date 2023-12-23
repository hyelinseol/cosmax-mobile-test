window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;
      setTimeout(async function () {
        await CAFE24API.getCustomerInfo(async function (err, res) {
          return new Promise(function (resolve, reject) {
            console.log(err, res);
            if (res) {
              if (res.customer) {
                survey_member_name = res.customer.name;
                survey_member_id = res.customer.member_id;
              }
            }
            survey_shop_no = CAFE24API.SHOP_NO;
            resolve(res);
          });
        });

        let buy_info = null;
        let survey_diagnosis_order_result = await getSurveyDiagnosisOrder();
        if (survey_diagnosis_order_result.length > 0) {
          for (const survey_diagnosis_order of survey_diagnosis_order_result) {
            if (buy_info) {
              continue;
            }
            let order_info = await getCafe24Order(survey_diagnosis_order.order_id);
            for (const order of order_info.orders) {
              if (!order || !order.items || order.items.length == 0) {
                continue;
              }
              for (const item of order.items) {
                if (item.order_status == "N40") {
                  buy_info = {
                    product_no: survey_diagnosis_order.product_no,
                    hash: survey_diagnosis_order.result_hash,
                    qna_at: survey_diagnosis_order.qna_at,
                    manage_product_nick_name: survey_diagnosis_order.recipe_product_name,
                    buy_at: dayjs(survey_diagnosis_order.buy_at).format("YYYY-MM-DD"),
                    product_name: item.product_name,
                  };
                }
              }
            }
          }
        }
        if (buy_info) {
          // 구매내역 O
          // 내구매내역확인 버튼 노출
          survey_jQuery("#survey_order").show();
        } else {
          let survey_diagnosis_result = await getSurveyDiagnosis();
          if (survey_diagnosis_result.length > 0) {
            // 진단내역 O / 구매내역 X
            survey_jQuery("#survey_diagnosis").show();
          } else {
            // 진단내역 X
            survey_jQuery("#survey_start").show();
            survey_jQuery("#survey_start_href").attr(
              "href",
              `${survey_skin_path}/survey?product_no=${survey_set_product_no}`
            );
          }
        }
      }, 500);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
  },
  false
);

async function getSurveyMainDiagnosis() {
  if (!survey_member_id) {
    return [];
  }
  let set_param = {
    member_id: survey_member_id,
    from: dayjs("2022-01-01").format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis`,
      type: "get",
      data: set_param,
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (e) {
        resolve([]);
      },
    });
  });
}

// 주문 조회
async function getSurveyDiagnosisOrder() {
  let set_param = {
    member_id: survey_member_id
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis/order`,
      type: "GET",
      data: set_param,
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve([]);
      },
    });
  });
}

async function getCafe24Order(order_id) {
  return new Promise(function (resolve, reject) {
    CAFE24API.getOrderDetailInfo(survey_shop_no, order_id, function (err, res) {
      console.log("res", res);
      resolve(res);
    });
  });
}