let survey_set_params = [];
const surveyCommon = new SurveyCommon();
const surveyMyShop = new SurveyMyShop();

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      await surveyCommon.getCafe24CustomerInfo(CAFE24API);
      await surveyMyShop.surveyGetProductVariants();
      setTimeout(async function () {
        await surveyBasketSetOptions();
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
      if (find.length == 0) {
        // survey_jQuery(survey_option).html(option_html);
      } else {
        // survey_jQuery(survey_option).remove();
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
      /*
            let hash = survey_jQuery.trim(survey_jQuery(basket_row).find(".hash_code").text());
      
            let index = survey_set_params.findIndex(
              (e) => e.hash == hash && Number(e.product_no) == Number(product_no)
            );
            if (index == -1) {
              survey_set_params.push({
                product_no,
                bom_code,
                hash,
              });
            } else {
              survey_set_params[index] = {
                product_no,
                bom_code,
                hash,
              };
            }
            */
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
