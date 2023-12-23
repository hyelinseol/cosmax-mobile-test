const surveyCommon = new SurveyCommon();
let product_no = surveyCommon.shoplusGetParameters("product_no");

let gift_list = surveyCommon.shoplusGetParameters("gift_list");
if (gift_list && gift_list == "Y") {
  survey_jQuery(".btn_style01").addClass("btnGift_gift");
  survey_jQuery(".btn_style03").addClass("survey_link_gift");
}

survey_jQuery(".btn_style01").attr("onclick", "surveyGiftClick();");

let is_cart_click = false;
async function surveyGiftClick() {
  if (is_cart_click == true) {
    return;
  }
  is_cart_click = true;
  await surveyDeleteCartProduct();
  chatisGPApp.clickGiveButton();
  await surveySleep(1000);
  is_cart_click = false;
}

async function surveyDeleteCartProduct() {
  const cart_list = await surveyGetCartList();
  const find = cart_list.find((e) => Number(e.product_no) == Number(product_no));
  if (find) {
    await surveyDeleteCart(find.product_no, find.option_id, find.basket_product_no);
  }
}

async function surveyGetCartList() {
  return new Promise(function (resolve, reject) {
    CAFE24API.getCartList(function(err, res) {
      if (res) {
        resolve(res.carts);
      }
      if (err) {
        reject(err);
      }
    });
  });
}

async function surveyDeleteCart(product_no, option_id, basket_product_no) {
  return new Promise(function (resolve, reject) {
    CAFE24API.deleteCartItems(
      'A',
      [   
        {
          product_no,
          option_id,
          basket_product_no
        },
      ],
      function(err,res) {
        if (res) {
          resolve(res);
        }
        if (err) {
          reject(err);
        }
      }
    );
  });
}


(async function (CAFE24API) {
  await surveyCommon.getCafe24CustomerInfo(CAFE24API);
  // thumb-wrap
  let product_list = survey_jQuery(".thumb-wrap a");
  for (let product of product_list) {
    let param = survey_jQuery(product).attr("href");
    let param_array = param.split("/");
    if (param_array.length > 0) {
      if (param_array[3]) {
        let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
          (e) => Number(e.no) == Number(param_array[3])
        );
        if (find && find.type == "hair_care") {
          detail_file = "detail_hair.html";
        }
        if (find && find.type == "skin_care") {
          detail_file = "detail_essence.html";
        }
        survey_jQuery(product).attr("href", "/product/"+detail_file+"?product_no=" + find.no);
      }
    }
  }

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


  // 타입별 문진 링크 입력
  let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find(
    (e) => Number(e.no) == Number(product_no)
  );

  let find_qna_link = surveyCommon.survey_qna_link_list[surveyCommon.survey_mall_id].find(
    (e) => e.type == find.type && e.detail_type == ""
  );
  survey_jQuery(".btn_style03").attr("href", find_qna_link.survey_link);

  if (find) {
    if (find.detail_type.indexOf("employees") > -1) {

      let product_type = find.product_type.replace("employees_", "");
      let href = find_qna_link.survey_link + "&discount_type=" + find.detail_type + "&buy_type=" + product_type;
      survey_jQuery(".btn_style03").attr("href", href);
      survey_jQuery(".survey_start").attr("href", href);
    }
  
    if (find.detail_type == "sample") {
      let find_qna_link = surveyCommon.survey_qna_link_list[surveyCommon.survey_mall_id].find(
        (e) => e.type == "hair_care" && e.detail_type == "sample"
      );
      survey_jQuery(".btn_style03").attr("href", find_qna_link.survey_link);
      survey_jQuery(".survey_start").attr("href", find_qna_link.survey_link);
      /*
      survey_jQuery(".btn_style03").attr("href", "javascript:void(0)");
      survey_jQuery(".btn_style03").css("background", "#BBB");
      survey_jQuery(".btn_style03").css("color", "#FFF");
      survey_jQuery(".btn_style03").text("COMING SOON");
      survey_jQuery(".forYou").parent().addClass("displaynone");
      survey_jQuery(".btn_style03").parent().parent().css("display", "contents");
      */
    }
  }

})(
  CAFE24API.init({
    client_id: app_client_id,
    version: app_version,
  })
);

window.addEventListener(
  "load",
  async function (event) {

    survey_jQuery("select[id^='setproduct_option_id']").each(function (index, element) {
      // 세트 상품에 속한 상품 선택
      let options = survey_jQuery(element).children();
    
      for (let i = 0; i < options.length; i++) {
        let text = survey_jQuery(options[i]).text();
    
        if (survey_jQuery(options[i]).val() == "*") {
          continue;
        } else {
          let element_id = survey_jQuery(element).attr("id");
          let val = survey_jQuery(options[i]).val();
          var e = document.getElementById(element_id);
          e.value = val;
          var event = new Event("change", { bubbles: true });
          e.dispatchEvent(event);
        }
      }
    });

    let add_option_list = survey_jQuery(`input[id^='setproduct_add_option_id`);
    for (let i=0; i < add_option_list.length; i++) {
      survey_jQuery(add_option_list[i]).val("선물하기");
    }

    let add_option_list2 = survey_jQuery(`input[id^='add_option`);
    for (let i=0; i < add_option_list2.length; i++) {
      survey_jQuery(add_option_list2[i]).val("선물하기");
    }

    // 일반 상품 추가 옵션 입력
    setTimeout(async function () {
      let add_option_list = survey_jQuery(`input[id^='setproduct_add_option_id`);
      for (let i=0; i < add_option_list.length; i++) {
        survey_jQuery(add_option_list[i]).val("선물하기");
      }

      let add_option_list2 = survey_jQuery(`input[id^='add_option`);
      for (let i=0; i < add_option_list2.length; i++) {
        survey_jQuery(add_option_list2[i]).val("선물하기");
      }

      // 하단 버튼 영역 노출
      survey_jQuery(".fixed-btn").show();
    }, 1000);
  },
  false
);