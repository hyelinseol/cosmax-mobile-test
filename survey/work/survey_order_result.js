let survey_diagnosis_list = [];

// 구매완료 호출 API
function surveyOrderCompleted(params) {
  console.log("Completed");
  let order_id = shoplusGetParameters("order_id");
  survey_jQuery.ajax({
    url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/order/${order_id}/completed`,
    type: "POST",
    accept: "application/json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(params),
    dataType: "json",
    success: function (result) {
      console.log(result);
    },
  });
}

async function getSurveyDiagnoses(hash) {
  let set_param = {
    hash,
    from: dayjs("2022-01-01").format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnoses`,
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

let survey_option_list = survey_jQuery(
  ".xans-order-normalresultlist .ec-base-prdInfo .prdBox .description .info li p.option"
);
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

    let survey_hash_code = "";
    if (survey_option_array[2]) {
      let survey_hash_array = survey_option_array[2].split(":");
      survey_hash_code = survey_jQuery.trim(survey_hash_array[1]);
    }

    let survey_product_no = survey_jQuery(survey_option).attr("product_no");

    let option_html = `
    <div class="survey_nick_name">
        #${survey_nick_name}
    </div>
    <div class="survey_bom_code">
        (${survey_bom_code})
    </div>
    <div class="survey_completed_data" style="display: none;" hash_code="${survey_hash_code}" bom_code="${survey_bom_code}" nick_name="${survey_nick_name}" product_no="${survey_product_no}"></div>
    `;
    if (survey_nick_name.indexOf("선물하기") > -1) {
      survey_hash_code="";
      survey_bom_code="";
      survey_nick_name="";
      option_html = `<div class="survey_completed_data" style="display: none;" hash_code="${survey_hash_code}" bom_code="${survey_bom_code}" nick_name="${survey_nick_name}" product_no="${survey_product_no}"></div>`;
    }
    survey_jQuery(survey_option).html(option_html);
  }
}

// 세트 상품
let survey_set_option_list = survey_jQuery(
  ".xans-order-normalresultlist .ec-base-prdInfo .prdBox .description .info li ul.option li .survey_set_order"
);
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

    let option_html = `
    <div class="survey_nick_name">
        #${survey_nick_name}
    </div>
    <div class="survey_bom_code" style="float: left;">
        (${survey_bom_code})
    </div>
    <div class="survey_completed_data" style="display: none;" hash_code="${survey_hash_code}" bom_code="${survey_bom_code}" nick_name="${survey_nick_name}" product_no="${survey_product_no}"></div>
    <p>(${survey_qty}개)</p>
    `;
    if (survey_nick_name.indexOf("선물하기") > -1) {
      option_html = "";
    }
    survey_jQuery(survey_set_option).html(option_html);
  }
}

let survey_set_option_list2 = survey_jQuery(
  ".xans-order-individualresultlist .ec-base-prdInfo .prdBox .description .info li ul.option li"
);
for (let survey_set_option of survey_set_option_list2) {
  let survey_option_text = survey_jQuery(survey_set_option).text();
  let survey_qty = survey_jQuery(survey_set_option).parent().parent().parent().attr("qty");
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

    let option_html = `
    <div class="survey_nick_name">
        #${survey_nick_name}
    </div>
    <div class="survey_bom_code" style="float: left;">
        (${survey_bom_code})
    </div>
    <div class="survey_completed_data" style="display: none;" hash_code="${survey_hash_code}" bom_code="${survey_bom_code}" nick_name="${survey_nick_name}" product_no="${survey_product_no}"></div>
    <p>(${survey_qty}개)</p>
    `;
    if (survey_nick_name.indexOf("선물하기") > -1) {
      option_html = "";
    }
    survey_jQuery(survey_set_option).html(option_html);
  }
}


window.addEventListener(
  "load",
  function (event) {
    setTimeout(async function () {

      const _surveyCommon = new SurveyCommon();

      (function (CAFE24API) {
        CAFE24API.getCustomerInfo(function (err, res) {
          survey_member_name = null;
          survey_member_id = null;
          if (res) {
            if (res.customer) {
              survey_member_name = res.customer.name;
              survey_member_id = res.customer.member_id;
              survey_mall_id = CAFE24API.MALL_ID;
              survey_shop_no = CAFE24API.SHOP_NO;
            }
          }
        });
      })(
        CAFE24API.init({
          client_id: app_client_id,
          version: app_version,
        })
      );

      let survey_completed_data = survey_jQuery(".survey_completed_data");
      for (const result of survey_completed_data) {
        let product_no = Number(survey_jQuery(result).attr("product_no"));
        let bom_code = survey_jQuery(result).attr("bom_code");
        let nick_name = survey_jQuery(result).attr("nick_name");
        let hash = survey_jQuery(result).attr("hash_code");
        if (hash) {
          let survey_diagnosis = await getSurveyDiagnoses(hash);

          if (!product_no) {
            product_no = survey_set_product_no;
          }
  
          if (bom_code.indexOf(",") > -1 && Number(result.product_no) != survey_set_product_no) {
            let bom_code_array = bom_code.split(",");
            for (const bom of bom_code_array) {
              if (Number(product_no) == survey_shampoo_no && bom.indexOf("CSP") > -1) {
                bom_code = bom;
              }
              if (Number(product_no) == survey_treatment_no && bom.indexOf("CHT") > -1) {
                bom_code = bom;
              }
            }
          }
          // 문진의 product_no로 전송해야 한다
          if (survey_diagnosis.length > 0) {
            let find = survey_diagnosis[0].find((e) => e.hash == hash);
            if (find && hash && product_no) {
              let params = {
                product_no: Number(find.product_no),
                // product_no: Number(product_no),
                bom_code,
                nick_name,
                hash,
                member_id: survey_member_id,
              };
              surveyOrderCompleted(params);
            }
          }
        } else {
          let params = {
            product_no: Number(product_no),
            bom_code,
            nick_name,
            hash,
            member_id: survey_member_id,
          };
          surveyOrderCompleted(params);
        }
      }



      let product_area_list = survey_jQuery(".prdBox");
      for (let i = 0; i < product_area_list.length; i++) {
        let href = survey_jQuery(product_area_list[i]).find(".thumbnail a").attr("href");
        if (href) {
          for (const survey_product of _surveyCommon.survey_product_list[_surveyCommon.survey_mall_id]) {
            if (href.indexOf(`product_no=${survey_product.no}`) > -1 && survey_product.type == "skin_care") {
              href = href.replace("detail.html", "detail_essence.html");
              survey_jQuery(product_area_list[i]).find(".thumbnail a").attr("href", href);
            }
            if (href.indexOf(`product_no=${survey_product.no}`) > -1 && survey_product.type == "hair_care") {
              href = href.replace("detail.html", "detail_hair.html");
              survey_jQuery(product_area_list[i]).find(".thumbnail a").attr("href", href);
            }
          }
          survey_jQuery(product_area_list[i]).find(".prdName .ec-product-name").attr("href", href);
        }
      }


      setTimeout(function () {
        surveyRemoveSotrage();
      }, 100);
    }, 100);
  },
  false
);
