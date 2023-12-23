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

    let option_html = `
             <div class="survey_nick_name" nick_name="${survey_nick_name}">
                #${survey_nick_name}
             </div>
             <div class="survey_bom_code" bom_code="${survey_bom_code}">
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

    let option_html = `
    <div class="survey_nick_name">
        #${survey_nick_name}
    </div>
    <div class="survey_bom_code" style="float: left; font-size: 10px;">
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

    let option_html = `
    <div class="survey_nick_name">
        #${survey_nick_name}
    </div>
    <div class="survey_bom_code" style="float: left; font-size: 10px;">
        (${survey_bom_code})
    </div>
    <div class="survey_completed_data" style="display: none;" hash_code="${survey_hash_code}" bom_code="${survey_bom_code}" nick_name="${survey_nick_name}" product_no="${survey_product_no}"></div>
    `;

    survey_jQuery(survey_refund).html(option_html);
  }
}