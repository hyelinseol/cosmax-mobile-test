// 주문 조회
async function getSurveyOrderDetail() {
  if (!survey_member_id) {
    for (let i = 0; i < 5; i++) {
      survey_member_id = await surveyOrderDetailGetMemberInfo();
      if (survey_member_id) {
        break;
      }
    }
  }

  if (!survey_member_id) {
    return [];
  }

  let survey_order_date = survey_jQuery("#survey_order_date").text();
  if (survey_order_date) {
    survey_order_date = dayjs(survey_order_date).format("YYYY-MM-DD");
  }

  let set_param = {
    member_id: survey_member_id,
    start_date: survey_order_date,
    end_date: survey_order_date,
  };

  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/order`,
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
async function surveyOrderDetailGetMemberInfo() {
  return new Promise(async function (resolve, reject) {
    await setTimeout(async function () {
      await CAFE24API.getCustomerInfo(async function (err, res) {
          if (res) {
            if (res.customer && res.customer.member_id) {
              resolve(res.customer.member_id);
            }
          } else {
            resolve(null);
          }
      });
    }, 10);
  });
}
window.addEventListener(
  "load",
  async function (event) {
    let order_statu_list = ["E12", "E13", "E20", "E30", "E32", "E34", "E36", "E40"];
    let survey_order_quantity = 0;
    survey_mall_id = CAFE24API.MALL_ID;
    survey_shop_no = CAFE24API.SHOP_NO;
    const order_id = shoplusGetParameters("order_id");
    let orders = await getSurveyOrderDetail();
    let is_survey_gift = false;
    for (const order of orders) {
      if (order.order_id == order_id) {
        for (const order_info of order.additional_order_info_list) {
          // 선물하기 인지 체크
          if (order_info.value.indexOf("주문자이름") > -1) {
            // order_item_code정보가 있는 영역 찾기
            const survey_detail_info_list = survey_jQuery(".survey_detail_info");
            for (const item of order.items) {
              // 주문 상태가 교환 관련 상태일때
              if (order_statu_list.indexOf(item.order_status) > -1) {
                // order_item_code로 order_item_code정보가 있는 영역을 찾아 히든
                for (const survey_detail_info of survey_detail_info_list) {
                  let survey_detail_info_text = survey_jQuery(survey_detail_info).attr("href");
                  if (survey_detail_info_text.indexOf(item.order_item_code) > -1) {
                    survey_jQuery(survey_detail_info)
                      .parent()
                      .parent()
                      .parent()
                      .parent()
                      .parent()
                      .hide();
                  }
                }

                // 추가정보 히든
                // survey_jQuery(".xans-myshop-orderhistorydetailrefundnew").prev().hide();
                // 환불정보 히든
                survey_jQuery(".xans-myshop-orderhistorydetailrefundnew").hide();
                // 닉네임 히든
                survey_jQuery(".survey_nick_name").hide();
                // BOM 히든
                survey_jQuery(".survey_bom_code").hide();

                let survey_product_price = survey_jQuery("#survey_product_price").text();

                survey_jQuery("#survey_total_price").text(survey_product_price);

                survey_order_quantity -= item.quantity;
              }
            }
            // 선물 받으시는 분 정보 히든
            survey_jQuery(".orderArea.orderCs").next().hide();
            is_survey_gift = true;
          }
        }
        if (is_survey_gift == false) {
          survey_jQuery(".survey_ordadd").hide();
        }
        for (const item of order.items) {
          survey_order_quantity += item.quantity;
        }
      }
    }
    let survey_total_price = survey_jQuery("#survey_product_price").text();
    survey_jQuery("#survey_total_order_info").text(
      `(총 ${survey_order_quantity}개 / ${survey_total_price}원)`
    );

    // 히든되어있는 주문 상품 정보 영역 노출
    survey_jQuery(".shoplus_order_area").show();

    setTimeout(async function () {
      const _surveyCommon = new SurveyCommon();
      let tr_list = survey_jQuery(".xans-myshop.xans-myshop-orderhistorydetailbasic .ec-base-prdInfo");
      /*
      for (let i = 0; i < tr_list.length; i++) {
        let href = survey_jQuery(tr_list[i]).find(".thumbnail a").attr("href");
        if (href) {
          for (const survey_product of _surveyCommon.survey_product_list[_surveyCommon.survey_mall_id]) {
            if (href.indexOf(`product_no=${survey_product.no}`) > -1 && survey_product.type == "skin_care") {
              href = href.replace("detail.html", "detail_essence.html");
              survey_jQuery(tr_list[i]).find(".thumbnail a").attr("href", href);
            }
            if (href.indexOf(`product_no=${survey_product.no}`) > -1 && survey_product.type == "hair_care") {
              href = href.replace("detail.html", "detail_hair.html");
              survey_jQuery(tr_list[i]).find(".thumbnail a").attr("href", href);
            }
          }
          survey_jQuery(tr_list[i]).find(".prdName a").attr("href", href);
        }
      }
      */

      for (let i = 0; i < tr_list.length; i++) {
        let href = survey_jQuery(tr_list[i]).find(".thumbnail a").attr("href");
        if (href) {

          const skin_care_find = _surveyCommon.survey_product_list[_surveyCommon.survey_mall_id].find((e) => href.indexOf(`product_no=${e.no}`) > -1 && e.type == "skin_care");
          if (skin_care_find) {
            href = href.replace("detail.html", "detail_essence.html");
            survey_jQuery(tr_list[i]).find(".thumbnail a").attr("href", href);
          }
  
          const hair_care_find = _surveyCommon.survey_product_list[_surveyCommon.survey_mall_id].find((e) => href.indexOf(`product_no=${e.no}`) > -1 && e.type == "hair_care");
          if (hair_care_find) {
            href = href.replace("detail.html", "detail_hair.html");
            survey_jQuery(tr_list[i]).find(".thumbnail a").attr("href", href);
          }
  
          if (!skin_care_find && !hair_care_find) {
            survey_jQuery(tr_list[i]).find(".option").remove();
            survey_jQuery(tr_list[i]).find(".survey_option_area").remove();
            survey_jQuery(tr_list[i]).find(".ec-product-name").css({
              "font-size": "15px",
              "color": "#1b1b1b",
              "font-weight": "700",
            });
            let cancelproduct_list = survey_jQuery(".xans-myshop-cancelproduct tr");
            for (const cancel_product of cancelproduct_list) {
              let survey_nick_name = survey_jQuery(cancel_product).find("strong").text();
              if (survey_nick_name == survey_jQuery(tr_list[i]).find(".ec-product-name").text()) {
                survey_jQuery(cancel_product).find(".survey_nick_name").remove();
                survey_jQuery(cancel_product).find(".survey_bom_code").remove();
                survey_jQuery(cancel_product).find("strong").css({
                  "font-size": "13px",
                  "color": "#1b1b1b",
                  "font-weight": "700",
                });
              }
            }
          }
          survey_jQuery(tr_list[i]).find(".prdName a").attr("href", href);
        }
      }

      let tr_list2 = survey_jQuery(".xans-myshop.xans-myshop-orderhistorydetailindividual .ec-base-prdInfo");
      /*
      for (let i = 0; i < tr_list2.length; i++) {
        let href = survey_jQuery(tr_list2[i]).find(".thumbnail a").attr("href");
        if (href) {
          for (const survey_product of _surveyCommon.survey_product_list[_surveyCommon.survey_mall_id]) {
            if (href.indexOf(`product_no=${survey_product.no}`) > -1 && survey_product.type == "skin_care") {
              href = href.replace("detail.html", "detail_essence.html");
              survey_jQuery(tr_list2[i]).find(".thumbnail a").attr("href", href);
            }
            if (href.indexOf(`product_no=${survey_product.no}`) > -1 && survey_product.type == "hair_care") {
              href = href.replace("detail.html", "detail_hair.html");
              survey_jQuery(tr_list2[i]).find(".thumbnail a").attr("href", href);
            }
          }
          survey_jQuery(tr_list2[i]).find(".prdName a").attr("href", href);
        }
      }
      */

      for (let i = 0; i < tr_list2.length; i++) {
        let href = survey_jQuery(tr_list2[i]).find(".thumbnail a").attr("href");
        if (href) {
          const skin_care_find = _surveyCommon.survey_product_list[_surveyCommon.survey_mall_id].find((e) => href.indexOf(`product_no=${e.no}`) > -1 && e.type == "skin_care");
          if (skin_care_find) {
            href = href.replace("detail.html", "detail_essence.html");
            survey_jQuery(tr_list2[i]).find(".thumbnail a").attr("href", href);
          }
  
          const hair_care_find = _surveyCommon.survey_product_list[_surveyCommon.survey_mall_id].find((e) => href.indexOf(`product_no=${e.no}`) > -1 && e.type == "hair_care");
          if (hair_care_find) {
            href = href.replace("detail.html", "detail_hair.html");
            survey_jQuery(tr_list2[i]).find(".thumbnail a").attr("href", href);
          }
  
          if (!skin_care_find && !hair_care_find) {
            survey_jQuery(tr_list2[i]).find(".option").remove();
            survey_jQuery(tr_list2[i]).find(".survey_option_area").remove();
            survey_jQuery(tr_list2[i]).find(".ec-product-name").css({
              "font-size": "15px",
              "color": "#1b1b1b",
              "font-weight": "700",
            });


            let cancelproduct_list = survey_jQuery(".xans-myshop-cancelproduct tr");
            for (const cancel_product of cancelproduct_list) {
              let survey_nick_name = survey_jQuery(cancel_product).find("strong").text();
              if (survey_nick_name == survey_jQuery(tr_list2[i]).find(".ec-product-name").text()) {
                // survey_jQuery(cancel_product).remove();
                survey_jQuery(cancel_product).find(".survey_nick_name").remove();
                survey_jQuery(cancel_product).find(".survey_bom_code").remove();
                survey_jQuery(cancel_product).find("strong").css({
                  "font-size": "13px",
                  "color": "#1b1b1b",
                  "font-weight": "700",
                });
              }
            }

          }
          survey_jQuery(tr_list2[i]).find(".prdName a").attr("href", href);
        }
      }

    }, 100);

  },
  false
);

let survey_option_list = survey_jQuery(".survey_option_area");
for (let survey_option of survey_option_list) {
  let survey_option_text = survey_jQuery(survey_option).text();
  if (survey_option_text.indexOf("BOM") > -1) {
    survey_option_text = survey_option_text.replace("[", "");
    survey_option_text = survey_option_text.replace("]", "");

    let survey_option_array = survey_option_text.split(",");
    let survey_name_array = survey_option_array[1].split(":");
    let survey_nick_name = survey_jQuery.trim(survey_name_array[1]);

    let survey_bom_array = survey_option_array[0].split(":");

    let survey_bom_code = survey_jQuery.trim(survey_bom_array[1]);

    let nick_name_display = "";
    let survey_bom_code_display = "";
    if (!survey_nick_name) {
      nick_name_display = "displaynone";
    }

    if (!survey_bom_code) {
      survey_bom_code_display = "displaynone";
    }

    let option_html = `
             <div class="survey_nick_name ${nick_name_display}" nick_name="${survey_nick_name}">
                #${survey_nick_name}
             </div>
             <div class="survey_bom_code ${survey_bom_code_display}" bom_code="${survey_bom_code}">
                (${survey_bom_code})
             </div>
            `;

    survey_jQuery(survey_option).html(option_html);
  }
}

// 세트 상품
let survey_set_option_list = survey_jQuery(".xans-myshop-optionset .survey_set_order");
for (let survey_set_option of survey_set_option_list) {
  let survey_option_text = survey_jQuery(survey_set_option).text();
  let survey_qty = survey_jQuery(survey_set_option).attr("qty");
  if (survey_option_text.indexOf("BOM") > -1) {
    survey_option_text = survey_option_text.replace("[", "");
    survey_option_text = survey_option_text.replace("]", "");

    let survey_option_array = survey_option_text.split(",");
    let survey_name_array = survey_option_array[1].split(":");
    let survey_nick_name = survey_jQuery.trim(survey_name_array[1]);

    let survey_bom_array = survey_option_array[0].split(":");

    let survey_bom_code = survey_jQuery.trim(survey_bom_array[1]);

    let survey_hash_code = "";
    if (survey_option_array[2]) {
      let survey_hash_array = survey_option_array[2].split(":");
      survey_hash_code = survey_jQuery.trim(survey_hash_array[1]);
    }

    let survey_product_no = survey_jQuery(survey_set_option).attr("product_no");

    let nick_name_display = "";
    let survey_bom_code_display = "";
    if (!survey_nick_name) {
      nick_name_display = "displaynone";
    }

    if (!survey_bom_code) {
      survey_bom_code_display = "displaynone";
    }

    let option_html = `
    <div class="survey_nick_name ${nick_name_display}">
        #${survey_nick_name}
    </div>
    <div class="survey_bom_code ${survey_bom_code_display}" style="float: left; font-size: 10px;">
        (${survey_bom_code})
    </div>
    <div class="survey_completed_data" style="display: none;" hash_code="${survey_hash_code}" bom_code="${survey_bom_code}" nick_name="${survey_nick_name}" product_no="${survey_product_no}"></div>
    <p>(${survey_qty}개)</p>
    `;

    survey_jQuery(survey_set_option).html(option_html);
  }
}

// 상품 이미지 클릭시 이동 하는 링크와 상품명 클릭 시 이동하는 링크가 달라서 동일하게 맞춤
// 상품 이미지 클릭시 이동하는 링크 기준으로
// 상품명 클릭 시 이동하는 링크 수정
let survey_order_product_list = survey_jQuery(".xans-myshop-orderhistorydetailbasic .prdBox");
for (let i = 0; i < survey_order_product_list.length; i++) {
  let href = survey_jQuery(survey_order_product_list[i]).find(".thumbnail a").attr("href");
  survey_jQuery(survey_order_product_list[i]).find(".ec-product-name").attr("href", href);
}

// 환불정보 입력
let survey_refund_list = survey_jQuery(
  ".xans-myshop-orderhistorydetailrefundnew.orderArea .contents .csProduct .option"
);
for (let survey_refund of survey_refund_list) {
  let survey_refund_text = survey_jQuery(survey_refund).text();
  let survey_qty = survey_jQuery(survey_refund).attr("qty");
  if (survey_refund_text.indexOf("BOM") > -1) {
    survey_refund_text = survey_refund_text.replace("[", "");
    survey_refund_text = survey_refund_text.replace("]", "");

    let survey_refund_array = survey_refund_text.split(",");
    let survey_name_array = survey_refund_array[1].split(":");
    let survey_nick_name = survey_jQuery.trim(survey_name_array[1]);

    let survey_bom_array = survey_refund_array[0].split(":");

    let survey_bom_code = survey_jQuery.trim(survey_bom_array[1]);
    let survey_hash_code = "";
    if (survey_refund_array[2]) {
      let survey_hash_array = survey_refund_array[2].split(":");
      survey_hash_code = survey_jQuery.trim(survey_hash_array[1]);
    }

    let survey_product_no = survey_jQuery(survey_refund).attr("product_no");

    let nick_name_display = "";
    let survey_bom_code_display = "";
    if (!survey_nick_name) {
      nick_name_display = "displaynone";
    }

    if (!survey_bom_code) {
      survey_bom_code_display = "displaynone";
    }

    let option_html = `
    <div class="survey_nick_name ${nick_name_display}">
        #${survey_nick_name}
    </div>
    <div class="survey_bom_code ${survey_bom_code_display}" style="float: left; font-size: 10px;">
        (${survey_bom_code})
    </div>
    <div class="survey_completed_data" style="display: none;" hash_code="${survey_hash_code}" bom_code="${survey_bom_code}" nick_name="${survey_nick_name}" product_no="${survey_product_no}"></div>
    `;

    survey_jQuery(survey_refund).html(option_html);
  }
}


// 추가정보 선물하기 있는지 체크 후 삭제
let survey_ordadd_title_list = survey_jQuery(".survey_ordadd_title");
for (let i = 0; i < survey_ordadd_title_list.length; i++) {
  const title = survey_jQuery(survey_ordadd_title_list[i]).text();
  if (title == "선물하기") {
    survey_jQuery(survey_ordadd_title_list[i]).parent().remove();
  }
}

// 추가정보 영역에 리스트 없으면 추가정보 영역 삭제
let ord_add_count = survey_jQuery(".xans-myshop-ordadd").children().length;
if (ord_add_count == 0) {
  survey_jQuery(".survey_ordadd").remove();
}
