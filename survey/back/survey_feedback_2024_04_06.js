let is_diagnosis = false;
window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;

      survey_jQuery(".feedback_wrap .feedback_top .intro").addClass("show");
      survey_jQuery(".feedback_wrap .feedback_section.sec01 .txt").addClass("show");
      setTimeout(async function () {
        await CAFE24API.getCustomerInfo(async function (err, res) {
          return new Promise(function (resolve, reject) {
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
          await CAFE24API.get(`/api/v2/products/${buy_info.product_no}?embed=discountprice`, function (err, res) {
            return new Promise(function (resolve, reject) {
              survey_jQuery(".history_banner .banner_cont .product_cont img").attr("src", res.product.list_image);
              survey_jQuery(".history_banner .banner_cont .product_cont img").css("max-width", "120px");
              resolve(res);
            });
          });

          // 구매내역 O
          if (survey_member_name) {
            survey_jQuery(".survey_memeber_name").text(survey_member_name);
          }
          survey_jQuery("#survey_month").text(dayjs(buy_info.buy_at).format("MM"));
          survey_jQuery("#survey_day").text(dayjs(buy_info.buy_at).format("DD"));
          survey_jQuery("#survey_product_name").text(buy_info.product_name);
          survey_jQuery("#survey_product_nick_name").text(
            "#" + buy_info.manage_product_nick_name
          );
          survey_jQuery("#survey_feedback").attr(
            "href",
            `${survey_skin_path}/survey/more.html?product_no=${buy_info.product_no}&hash=${buy_info.hash}&qna_at=${buy_info.qna_at}`
          );

          survey_jQuery("#survey_feedback_move_btn").attr(
            "href",
            `${survey_skin_path}/survey/more.html?product_no=${buy_info.product_no}&hash=${buy_info.hash}&qna_at=${buy_info.qna_at}`
          );
          survey_jQuery("#survey_feedback_move_btn").show();
          survey_jQuery("#survey_buy_area").show();
        } else {
          let survey_diagnosis_result = await getSurveyFreedBackDiagnosis();
          if (survey_diagnosis_result.length > 0) {
            // 구매내역 X
            // 진단내역 O
            survey_jQuery("#survey_diagnosis_move_btn").show();
            survey_jQuery("#survey_qna_o_area").show();
          } else {
            // 진단내역 X
            survey_jQuery("#survey_qna_x_area").show();
            survey_jQuery("#survey_hair_quiz").attr(
              "href",
              `${survey_skin_path}/survey?product_no=${survey_set_product_no}`
            );
            survey_jQuery("#survey_hair_quiz").parent().attr("onClick", `location.href='${survey_skin_path}/survey?product_no=${survey_set_product_no}'`);
          }
        }

        var feedbackSlide = new Swiper('.up .feedback_slide', {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 24,
          speed: 1500,
          autoplay: {
            delay: 2000,
            disableOnInteraction: true,
          },
          loop: true
        });

        var feedbackSlide2 = new Swiper('.down .feedback_slide', {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 24,
          speed: 1500,
          autoplay: {
            delay: 2000,
            disableOnInteraction: true,
            reverseDirection: true,
          },
          loop: true
        });
      }, 1000);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
  },
  false
);

async function getSurveyFreedBackDiagnosis() {
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
        let list = [];
        for (const diagnosis of result) {
          if (!diagnosis.buy_at) {
            list.push(diagnosis);
          }
        }
        resolve(list);
      },
      error: function (e) {
        resolve([]);
      },
    });
  });
}

async function getCafe24Order(order_id) {
  return new Promise(function (resolve, reject) {
    CAFE24API.getOrderDetailInfo(survey_shop_no, order_id, function (err, res) {
      resolve(res);
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
