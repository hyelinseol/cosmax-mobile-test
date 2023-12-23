
// 주문 조회
async function getSurveyOrderDetail() {
  if (!survey_member_id) {
    for (let i = 0; i < 5; i++) {
      survey_member_id = await surveyGetMemberInfo();
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
    end_date: survey_order_date
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

window.addEventListener(
  "load",
  async function (event) {
    let order_statu_list = ["E12","E13","E20","E30","E32","E34","E36","E40"];
    let survey_order_quantity = 0;
    survey_mall_id = CAFE24API.MALL_ID;
    survey_shop_no = CAFE24API.SHOP_NO;
    const order_id = shoplusGetParameters("order_id");
    let orders = await getSurveyOrderDetail();
    console.log("orders", orders);
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
                    survey_jQuery(survey_detail_info).parent().parent().parent().parent().parent().hide();
                  }
                }

                // 선물 받으시는 분 정보 히든
                survey_jQuery(".xans-myshop-orderhistorydetailrefundnew").prev().prev().hide();
                // 추가정보 히든
                survey_jQuery(".xans-myshop-orderhistorydetailrefundnew").prev().hide();
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
          }
        }
        for (const item of order.items) {
          survey_order_quantity += item.quantity;
        }
        
      }
    }
    let survey_total_price = survey_jQuery("#survey_product_price").text();
    survey_jQuery("#survey_total_order_info").text(`(총 ${survey_order_quantity}개 / ${survey_total_price}원)`);

    // 히든되어있는 주문 상품 정보 영역 노출
    survey_jQuery(".shoplus_order_area").show();
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

    let survey_hash_array = survey_option_array[2].split(":");
    let survey_hash_code = survey_jQuery.trim(survey_hash_array[1]);

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


// 환불정보 입력
let survey_refund_list = survey_jQuery(".xans-myshop-orderhistorydetailrefundnew.orderArea .contents .csProduct .option");
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

    let survey_hash_array = survey_refund_array[2].split(":");
    let survey_hash_code = survey_jQuery.trim(survey_hash_array[1]);

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