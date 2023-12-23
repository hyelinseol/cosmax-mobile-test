let basket_survey_member_id = null;

let survey_set_params = [];
const surveyCommon = new SurveyCommon();
const surveyMyShop = new SurveyMyShop();

// 경로 입력
let product_area_list = survey_jQuery(".prdBox");
for (let i = 0; i < product_area_list.length; i++) {
  let href = survey_jQuery(product_area_list[i]).find(".thumbnail a").attr("href");
  if (href) {
    const skin_care_find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => href.indexOf(`product_no=${e.no}`) > -1 && e.type == "skin_care");
    if (skin_care_find) {
      href = href.replace("detail.html", "detail_essence.html");
      survey_jQuery(product_area_list[i]).find(".thumbnail a").attr("href", href);
    }

    const hair_care_find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => href.indexOf(`product_no=${e.no}`) > -1 && e.type == "hair_care");
    if (hair_care_find) {
      href = href.replace("detail.html", "detail_hair.html");
      survey_jQuery(product_area_list[i]).find(".thumbnail a").attr("href", href);
    }

    if (!skin_care_find && !hair_care_find) {
      survey_jQuery(product_area_list[i]).find(".xans-order-optionall").remove();
      survey_jQuery(product_area_list[i]).find(".ec-product-name").css({
        "font-size": "15px",
        "color": "#1b1b1b",
        "font-weight": "700",
      })
    }
    survey_jQuery(product_area_list[i]).find(".prdName a").attr("href", href);
  }
}

survey_jQuery(".survey_option_area").hide();
survey_jQuery(".optionDesc").hide();
window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {

      // 주문하기 버튼 클릭 시 product_no를 세션에 담기 ( 로그인 페이지 비회원 구매 버튼 노출 여부 체크하기 위함 )
      let survey_order_btn_list = survey_jQuery(".survey_order_btn");
      for (let survey_order_btn of survey_order_btn_list) {
        let old_onclick = survey_jQuery(survey_order_btn).attr("onclick");
        survey_jQuery(survey_order_btn).attr("old_onclick", old_onclick);
        survey_jQuery(survey_order_btn).attr("onclick", "surveyOrderBtn(this)");
      }
      // 주문하기 버튼 클릭 시 product_no를 세션에 담기 ( 로그인 페이지 비회원 구매 버튼 노출 여부 체크하기 위함 )
      let survey_all_order_btn_list = survey_jQuery(".survey_all_order_btn");
      for (let survey_all_order_btn of survey_all_order_btn_list) {
        let old_onclick = survey_jQuery(survey_all_order_btn).attr("onclick");
        survey_jQuery(survey_all_order_btn).attr("old_onclick", old_onclick);
        survey_jQuery(survey_all_order_btn).attr("onclick", "surveyAllOrderBtn(this)");
      }

      await surveyCommon.getCafe24CustomerInfo(CAFE24API);
      await surveyMyShop.surveyGetProductVariants();
      setTimeout(async function () {
        await surveyBasketSetOptions();
        // 샘플상품 수량 변경 막기 스크립트
        surveySampleProductQuantity()
        survey_jQuery(".survey_option_area").show();
        survey_jQuery(".optionDesc").show();

        if (!surveyCommon.survey_member_id) {
          await surveyCommon.getCafe24CustomerInfo(CAFE24API);
          basket_survey_member_id = surveyCommon.survey_member_id;
        }

        let survey_option_list = survey_jQuery(".survey_option_area");
        for (let survey_option of survey_option_list) {
          let survey_option_text = survey_jQuery(survey_option).text();
          if (survey_option_text.indexOf("선물하기") > -1) {
            survey_jQuery(survey_option).parent().find(".ec-product-name").css({
              "font-size": "15px",
              "color": "#1b1b1b",
              "font-weight": "700",
            });
            survey_jQuery(survey_option).remove();
          }
        }

        const option_desc_list = survey_jQuery(".optionDesc");
        for (let option_desc of option_desc_list) {
          const option_desc_text = survey_jQuery(option_desc).text();
          if (option_desc_text.indexOf("선물하기") > -1) {
            survey_jQuery(option_desc).parent().parent().parent().hide();
            survey_jQuery(option_desc).parent().parent().parent().parent().find(".ec-product-name").css({
              "font-size": "15px",
              "color": "#1b1b1b",
              "font-weight": "700",
            });
          }
        }

      }, 500);
    })(
      CAFE24API.init({
        client_id: surveyCommon.app_client_id,
        version: surveyCommon.app_version,
      })
    );
  },
  false
);

async function surveyOrderBtn(e) {
  if (!basket_survey_member_id) {
    await surveyCommon.surveySleep(500);
    if (!surveyCommon.survey_member_id) {
      await surveyCommon.getCafe24CustomerInfo(CAFE24API);
      basket_survey_member_id = surveyCommon.survey_member_id;
      location.href = "/member/login.html?returnUrl=/order/basket.html"; 
      return;
    }
  }

  let product_no = survey_jQuery(e).attr("product_no");
  let set_product_list = [];
  set_product_list.push(Number(product_no));
  sessionStorage.setItem("survey_basket_product", JSON.stringify(set_product_list));
  let old_onclick = survey_jQuery(e).attr("old_onclick");
  survey_jQuery(e).attr("onclick", old_onclick);
  survey_jQuery(e).click();
}

async function surveyAllOrderBtn(e) {
  if (!basket_survey_member_id) {
    await surveyCommon.surveySleep(500);
    if (!surveyCommon.survey_member_id) {
      await surveyCommon.getCafe24CustomerInfo(CAFE24API);
      basket_survey_member_id = surveyCommon.survey_member_id;
      location.href = "/member/login.html?returnUrl=/order/basket.html"; 
      return;
    }
  }

  let set_product_list = [];
  let product_list = survey_jQuery("input[id^='basket_chk_id'][type='checkbox']");
  for (let product of product_list) {
    const is_checked = survey_jQuery(product).is(':checked');
    if (is_checked) {
      let product_no = survey_jQuery(product).attr("product_no")
      set_product_list.push(Number(product_no));
    }
  }
  sessionStorage.setItem("survey_basket_product", JSON.stringify(set_product_list));
  let old_onclick = survey_jQuery(e).attr("old_onclick");
  survey_jQuery(e).attr("onclick", old_onclick);
  survey_jQuery(e).click();
}

async function surveyBasketSetOptions () {
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
      let survey_product_name_area = "";

      let survey_product_name = survey_jQuery(survey_option).parent().find(".prdName a").text();
      if (survey_product_name.indexOf("세트") > -1) {
        if (survey_bom_code.indexOf("CSP") > -1) {
          survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px;"><strong>${surveyMyShop.survey_product_resource?.sampoo?.product_name || "유어 맞춤형 샴푸" }</strong></div>`;
        } else if (survey_bom_code.indexOf("CHT") > -1) {
          survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px;"><strong>${surveyMyShop.survey_product_resource?.treatment?.product_name || "유어 맞춤형 트리트먼트"}</strong></div>`;
        } else if (survey_bom_code.indexOf("CEN") > -1) {
          survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px;"><strong>${surveyMyShop.survey_product_resource?.essence?.product_name || "유어 맞춤형 에센스" }</strong></div>`;
        } else if (survey_bom_code.indexOf("CEB") > -1) {
          survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px;"><strong>${surveyMyShop.survey_product_resource?.boot_essence?.product_name || "부스팅 에센스"}</strong></div>`;
        } else {
          // survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px;"><strong>${surveyMyShop.survey_product_resource.boot_essence.product_name}</strong></div>`;
        }
      }
      if (survey_product_name.indexOf("체험 키트") > -1) {
        if (survey_bom_code.indexOf("CSP") > -1) {
          survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px;"><strong>${surveyMyShop.survey_product_resource?.sample_sampoo?.product_name || "유어 맞춤형 샴푸(샘플)" }</strong></div>`;
        } else if (survey_bom_code.indexOf("CHT") > -1) {
          survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px;"><strong>${surveyMyShop.survey_product_resource?.sample_treatment?.product_name || "유어 맞춤형 트리트먼트(샘플)"}</strong></div>`;
        } else {
          // survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px;"><strong>${surveyMyShop.survey_product_resource.boot_essence.product_name}</strong></div>`;
        }
      }
      let option_html = `
      ${survey_product_name_area}
       <h3 class="survey_nick_name naming" nick_name="${survey_nick_name}">
          #${survey_nick_name}
       </h3>
       <div class="survey_bom_code" bom_code="${survey_bom_code}">
          <font style="font-size: 10px;">(${survey_bom_code})</font>
       </div>
      `;
      let find = survey_jQuery(survey_option).parent().find(".survey_nick_name");
      survey_jQuery(survey_option).html(option_html);
    }
  }

  let _survey_option_list = survey_jQuery(".optionDesc");
  if (_survey_option_list.length > 0) {
    for (let survey_option of _survey_option_list) {
      let survey_option_text = survey_jQuery(survey_option).text();
      if (survey_option_text.indexOf("BOM") > -1) {
        survey_option_text = survey_option_text.replace("[", "");
        survey_option_text = survey_option_text.replace("]", "");
    
        let survey_option_array = survey_option_text.split(",");
    
        let survey_name_array = survey_option_array[1].split(":");
        let survey_nick_name = survey_jQuery.trim(survey_name_array[1]);
    
        let survey_bom_array = survey_option_array[0].split(":");
        let survey_bom_code = survey_jQuery.trim(survey_bom_array[2]);
        let survey_product_name_area = "";
  
        let survey_product_name = survey_jQuery(survey_option).parent().parent().parent().parent().find(".ec-product-name").text();
        if (survey_product_name.indexOf("세트") > -1 || survey_product_name.indexOf("샴푸와 트리트먼트") > -1) {
          if (survey_bom_code.indexOf("CSP") > -1) {
            survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px; margin-left: 20px;"><strong>${surveyMyShop.survey_product_resource?.sampoo?.product_name || "유어 맞춤형 샴푸" }</strong></div>`;
          } else if (survey_bom_code.indexOf("CHT") > -1) {
            survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px; margin-left: 20px;"><strong>${surveyMyShop.survey_product_resource?.treatment?.product_name || "유어 맞춤형 트리트먼트"}</strong></div>`;
          } else if (survey_bom_code.indexOf("CEN") > -1) {
            survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px; margin-left: 20px;"><strong>${surveyMyShop.survey_product_resource?.essence?.product_name || "유어 맞춤형 에센스" }</strong></div>`;
          } else if (survey_bom_code.indexOf("CEB") > -1) {
            survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px; margin-left: 20px;"><strong>${surveyMyShop.survey_product_resource?.boot_essence?.product_name || "부스팅 에센스"}</strong></div>`;
          } else {
            // survey_product_name_area = `<div style="margin-top: 5px;margin-bottom: 5px;"><strong>${surveyMyShop.survey_product_resource.boot_essence.product_name}</strong></div>`;
          }
        }

        survey_jQuery(survey_option).parent().parent().parent().parent().parent().find(".ec-base-button").hide();
        // survey_jQuery(survey_option).parent().parent().parent().parent().parent().parent().parent().find(".theme3").hide();
        // survey_jQuery(survey_option).parent().parent().parent().parent().parent().find(".description .info").eq(0).hide();
        // survey_jQuery(survey_option).parent().parent().parent().parent().parent().find(".description .info").eq(2).hide();
        // survey_jQuery(survey_option).parent().parent().parent().parent().parent().find(".description .info").eq(3).hide();
        // console.log(survey_jQuery(survey_option).parent().parent().parent().parent().parent());

        let option_html = `
        ${survey_product_name_area}
         <h3 class="survey_nick_name naming" nick_name="${survey_nick_name}" style="display: inline-block; font-weight: 700; margin-left: 20px;">
            #${survey_nick_name}
         </h3>
         <div class="survey_bom_code" bom_code="${survey_bom_code}" style="margin-left: 20px;">
            <font style="font-size: 10px;">(${survey_bom_code})</font>
         </div>
        `;
        let find = survey_jQuery(survey_option).parent().find(".survey_nick_name");
        survey_jQuery(survey_option).html(option_html);
      }
    }
  }
  
  let survey_basket_row = survey_jQuery(".survey_basket_row");
  for (const basket_row of survey_basket_row) {
    let product_no = survey_jQuery(basket_row).attr("product_no");
    let bom_code = survey_jQuery.trim(
      survey_jQuery(basket_row).find(".survey_bom_code").attr("bom_code")
    );
  
    let nick_name = survey_jQuery.trim(
      survey_jQuery(basket_row).find(".survey_nick_name").attr("nick_name")
    );
  
    // 주문하기 버튼 변경
    survey_jQuery(basket_row)
      .find(".survey_order_one")
      .attr("onclick", `surveyBasketOrderOne(this, ${product_no}, '${bom_code}', '${nick_name}')`);
  }
  
  // 전체상품주문 버튼 변경
  let survey_order_all = survey_jQuery(".survey_order_all");
  for (const survey_order of survey_order_all) {
    survey_jQuery(survey_order).attr("onclick", "surveyBasketOrderAll()");
  }
  
  // 선택상품주문 버튼 변경
  let survey_order_select = survey_jQuery(".survey_order_select");
  for (const survey_order of survey_order_select) {
    survey_jQuery(survey_order).attr("onclick", "surveyBasketOrderSelect()");
  }

  survey_jQuery(".survey_option_area").removeClass("displaynone");
}

function surveyBasketOrderOne(e, product_no, bom_code, nick_name) {
  survey_set_params.push({
    product_no,
    bom_code,
    nick_name,
  });
  sessionStorage.setItem("survey_result", JSON.stringify(survey_set_params));

  let call = survey_jQuery(e).attr("onclick_copy");
  survey_jQuery(e).attr("onclick", call);
  survey_jQuery(e).click();
}

function surveyBasketOrderAll() {
  // 전체 선택
  survey_jQuery(".survey_all_check").prop("checked", false);
  survey_jQuery(".survey_all_check").click();

  surveyBasketOrderSelect();
}

function surveyBasketOrderSelect() {
  survey_set_params = [];
  let basket_chk_list = survey_jQuery("input[id^='basket_chk_id'][type='checkbox']");
  for (const chk of basket_chk_list) {
    let is_cheked = survey_jQuery(chk).prop("checked");
    if (is_cheked) {
      let basket_row = survey_jQuery(chk).parent().parent();
      let product_no = survey_jQuery(basket_row).attr("product_no");
      let bom_code = survey_jQuery.trim(
        survey_jQuery(basket_row).find(".survey_bom_code").attr("bom_code")
      );

      let nick_name = survey_jQuery.trim(
        survey_jQuery(basket_row).find(".survey_nick_name").attr("nick_name")
      );
      survey_set_params.push({
        product_no,
        bom_code,
        nick_name,
      });
    }
  }

  sessionStorage.setItem("survey_result", JSON.stringify(survey_set_params));
  let call = survey_jQuery(".survey_order_select").attr("onclick_copy");
  survey_jQuery(".survey_order_select").attr("onclick", call);
  survey_jQuery(".survey_order_select").click();
}

// 샘플상품 수량 변경 막기
function surveySampleProductQuantity() {
  let tr_basket_product_list = survey_jQuery(".div_basket_product");
  for (const tr_basket_product of tr_basket_product_list) {
    let tr_basket_product_no = survey_jQuery(tr_basket_product).attr("product_no");
    let find_product = survey_product_list[CAFE24API.MALL_ID].find((e) => Number(e.product_no) == tr_basket_product_no);
    if (find_product && find_product.product_type.indexOf("sample") > -1) {
      // 수량 입력 방지
      survey_jQuery(tr_basket_product).children(".qtyDown").attr("onclick", "surveyPreventDefault(event);");
      survey_jQuery(tr_basket_product).children(".qtyUp").attr("onclick", "surveyPreventDefault(event);");
      survey_jQuery(tr_basket_product).children("input").attr("readonly", true);
    }
  }
}

function surveyPreventDefault(e) {
  e.preventDefault();
}