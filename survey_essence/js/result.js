const surveyCommon = new SurveyCommon();
let product_no = surveyCommon.shoplusGetParameters("product_no");

let hash = surveyCommon.shoplusGetParameters("hash");
let re_qna_hash = surveyCommon.shoplusGetParameters("re_qna_hash");
let qna_at = surveyCommon.shoplusGetParameters("qna_at");
let gift_key = surveyCommon.shoplusGetParameters("gift_key");
let order_id = surveyCommon.shoplusGetParameters("order_id");
let survey_discount_type = surveyCommon.shoplusGetParameters("discount_type");

const essenceResult = new EssenceResult(hash, qna_at, re_qna_hash);

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      await surveyCommon.getCafe24CustomerInfo(CAFE24API);

      // 상품, 품목 조회
      await essenceResult.getSurveyCafe24ProductVariant();

      // 문진 결과 조회
      await essenceResult.getSurveyResult();

      // BOM 정보 조회
      await essenceResult.getSurveyBoms();

      // 문진 입력
      await essenceResult.setSurveyResult();

      if (re_qna_hash) {
        survey_jQuery(".renew_detail_wrap").show();
      } else {
        survey_jQuery(".first_ess_sec01").show();
        survey_jQuery(".first_ess_sec02").show();

        if (!surveyCommon.survey_member_id) {
          let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => e.product_type == "essence");
          if (find) {
            sessionStorage.setItem("survey_result_product_no", find.no);
            sessionStorage.setItem("survey_result_hash", hash);
          }
        }
      }
      if (gift_key && order_id) {
        let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => e.product_type == "essence");
        if (find) {
          let params = {
            product_no: Number(find.no),
            bom_code: "",
            nick_name: "",
            hash,
            member_id: surveyCommon.survey_member_id,
          };
          surveyOrderCompleted(params);
        }
      }
      if (gift_key) {
        // 요금 노출 부분 히든
        survey_jQuery(".survey_bottom_price .total").hide();
        // 단 하루 무료배송! 히든
        survey_jQuery(".saleLabel").hide();
        // 구매하기 버튼 히든
        survey_jQuery(".btn-buy").hide();

        // 배송지 정보 입력 버튼 노출
        survey_jQuery(".gift_btn").removeClass("displaynone");
        survey_jQuery(".gift_btn").show();
    }

      setTimeout(function () {

        // 하단 구매하기 영역 노출
        essenceResult.setBottomBuyArea();
  
        // bom, hash, 닉네임 옵션 입력
        essenceResult.setInputBomCode();

        survey_jQuery(".afterLogin").show();

        survey_jQuery(".fixed-box").show();


        if (!surveyCommon.survey_member_id && !re_qna_hash) {
          survey_jQuery(".fixed-box .box-info .box-right .result-wrap .total-price.fold").hide();
          survey_jQuery(".saleLabel").hide();
          survey_jQuery("#survey_join_move").show();
        }

        /**
         * 임직원 세트로 진입 : 세트만 선택 가능하도록
         * 임직원 에센스로 진입 : 에센스만 선택 가능하도록
         * START
        */
        if (survey_discount_type && survey_discount_type.indexOf("employees") > -1) {
          let buy_type = surveyCommon.shoplusGetParameters("buy_type");
          if (buy_type) {
            survey_jQuery(".ar").addClass("displaynone");
            surveyProductSelect("employees_" + buy_type);
            survey_jQuery(".sbClose").addClass("displaynone");
            survey_jQuery(".myOptList").addClass("displaynone");

            const price = surveyCommon.surveyComma(Number(essenceResult.survey_product_resource[buy_type].discountprice.mobile_discount_price)) + "원";
            survey_jQuery(".survey_popup_price .price").text(price);
            survey_jQuery(".total-price-wrap .price").text(price);

            survey_jQuery(".subscribeBox").css("display", "flow-root");
            survey_jQuery(".subscribeBox .quantity").css("float", "right");
          } else {
            
            survey_jQuery("#survey_essence").text(essenceResult.survey_product_resource.employees_essence.product_name);
            survey_jQuery("#survey_essence").attr("onclick", "surveyProductSelect('employees_essence')");

            survey_jQuery("#survey_set_essence").text(essenceResult.survey_product_resource.employees_set_essence.product_name);
            survey_jQuery("#survey_set_essence").attr("onclick", "surveyProductSelect('employees_set_essence')");

            survey_employees_essence = surveyCommon.survey_product_list[CAFE24API.MALL_ID].find((e) => e.product_type == "employees_essence" && e.detail_type == survey_discount_type);
            survey_employees_set_essence = surveyCommon.survey_product_list[CAFE24API.MALL_ID].find((e) => e.product_type == "employees_set_essence" && e.detail_type == survey_discount_type);
            let employees_product_list = [];
            if (!survey_employees_essence) {
              survey_jQuery("#survey_essence").remove();
            } else {
              employees_product_list.push("employees_essence");
            }
            if (!survey_employees_set_essence) {
              survey_jQuery("#survey_set_essence").remove();
            } else {
              employees_product_list.push("employees_set_essence");
            }

            if (employees_product_list.length == 1) {
              surveyProductSelect(employees_product_list[0]);
              survey_jQuery(".ar").addClass("displaynone");
              survey_jQuery(".myOptList").addClass("displaynone");
              survey_jQuery(".sbClose").addClass("displaynone");
            }

          }
        }
        /**
         * END
         */

      }, 800);
    })(
      CAFE24API.init({
        client_id: surveyCommon.app_client_id,
        version: surveyCommon.app_version,
      })
    );
  },
  false
);

function surveyBuyBtn() {
  if (survey_jQuery(".subscribeBox").length == 0) {
    survey_jQuery(".survey_popup_price .total strong").text("0원");
    survey_jQuery(".box-left").css("min-height", "0px");
    survey_jQuery(".product-info").css("height", "0px");
    survey_jQuery(".box-right .product-info .shadow").css("position", "unset");
  }

  survey_jQuery(".survey_popup_price").css("display", "flex");
  survey_jQuery(".survey_bottom_price").hide();

  if (survey_jQuery(".subscribeBox").length > 0) {;
    survey_jQuery(".box-info").css("overflow-y", "unset");
    survey_jQuery(".box-info").css("overflow-x", "unset");
  } else {
    survey_jQuery(".box-info").css("overflow-y", "unset");
    survey_jQuery(".box-info").css("overflow-x", "unset");
  }
}

function surveyProductAreaStyle(type) {
  if (type == "show") {
    survey_jQuery(".fixed-box .box-info .box-left").css("min-height", "");
    survey_jQuery(".product-info").css("height", "");
    survey_jQuery(".box-right .product-info .shadow").show();
  } else {
    survey_jQuery(".fixed-box .box-info .box-left").css("min-height", "256px");
    survey_jQuery(".product-info").css("height", "65px");
    survey_jQuery(".box-right .product-info .shadow").hide();
  }
}

async function surveyProductSelect(type) {
  document.getElementById("survey_shadow").style.position = "";
  let survey_product_resource = essenceResult.survey_product_resource[type];
  let product_type = survey_product_resource.product_name;
  let price = Number(survey_product_resource.price);
  let product_no = survey_product_resource.product_no;

  let mobile_discount_price = Number(survey_product_resource.price);
  if (survey_product_resource.discountprice?.mobile_discount_price) {
    mobile_discount_price = Number(survey_product_resource.discountprice.mobile_discount_price);
  }

  // let payment_type = "1회구매";
  let payment_type = "";
  let is_save = false;
  survey_jQuery(".subscribeBox").each(function (index, element) {
    let save_product_no = Number(survey_jQuery(element).attr("product_no"));
    let payment_text = survey_jQuery(element).find(".word").text();
    if (save_product_no == product_no) {
      is_save = true;
    }
  });
  if (is_save) {
    return;
  }

  let total_price_str = survey_jQuery(".survey_popup_price .total strong").text();

  let regex = /[^0-9]/g;
  let total_price = Number(total_price_str.replace(regex, ""));

  total_price += mobile_discount_price;

  let total_price_resut = surveyCommon.surveyComma(total_price) + "원";
  survey_jQuery(".survey_popup_price .total strong").text(total_price_resut);

  // 수량
  let total_quantity = Number(survey_jQuery(".survey_popup_price .survey_quantity").text());
  total_quantity += 1;
  survey_jQuery(".survey_popup_price .survey_quantity").text(total_quantity);

  let price_html = "";
  if (mobile_discount_price != 0 && mobile_discount_price != "0" &&  Number(price) > Number(mobile_discount_price)) {
    price_html = `<strike>${surveyCommon.surveyComma(price)}원</strike>`;
  }

  let bom_code = essenceResult.survey_diagnosis_result.bom_code;
  let nick_name = essenceResult.survey_diagnosis_result.manage_product_nick_name;
  let qna_type = essenceResult.survey_diagnosis_result.qna_type;
  let hash = essenceResult.survey_diagnosis_result.hash;

  if (!product_no || !bom_code || !nick_name || !qna_type || !hash) {
    let add_result_diagnoses = await getSurveyAddResultDiagnoses();
    if (add_result_diagnoses) {
      bom_code = add_result_diagnoses.bom_code.join(",");
      nick_name = add_result_diagnoses.manage_product_nick_name;
      qna_type = add_result_diagnoses.qna_type;
      hash = add_result_diagnoses.hash;

      let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => e.type == "skin_care" && e.product_type == type);

      if (find) {
        let product_info = await surveyGetCafe24API(
          `/api/v2/products/${find.no}?embed=discountprice`
        );
        product_no = product_info.product.product_no;
        product_type = product_info.product.product_name;
      }
    }
  }

  let html = `
  <div class="subscribeBox" product_no="${product_no}" bom_code="${bom_code}" nick_name="${nick_name}" qna_type="${qna_type}" hash="${hash}" product_type="${type}">
    <span class="sbClose" onclick="surveyRemoveTag(this)"></span>
    <div class="gdsBuyOpt">
      <p class="subject">${product_type}</p>
      <p class="price">
        ${price_html}
        <em>${surveyCommon.surveyComma(mobile_discount_price)}</em>원
      </p>
    </div>
    <div class="quantity">
      <input id="quantity" name="quantity_opt[]" style="" value="1" type="text" readonly />
      <a href="javascript:;" class="up QuantityUp" onclick="surveyQuantity(this, 'up')"
        ><img
          src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_up.gif"
          alt="수량증가"
      /></a>
      <a href="javascript:;" class="down QuantityDown"  onclick="surveyQuantity(this, 'down')"
        ><img
          src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_down.gif"
          alt="수량감소"
      /></a>
    </div>
    <p class="word">${payment_type}</p>
  </div>`;

  // 상품 리스트 영역 style
  surveyProductAreaStyle("show");
  survey_jQuery(".subscribeKindWrap").append(html);
  survey_jQuery("#survey_order_select").text(product_type);
}

function surveyCloseBtn() {
  // 상품 리스트 영역 style
  surveyProductAreaStyle("show");
  survey_jQuery(".survey_popup_price").hide();
  survey_jQuery(".survey_bottom_price").show();
}

function surveyRemoveTag(element) {
  let regex = /[^0-9]/g;
  let total_price_str = survey_jQuery(".survey_popup_price .total strong").text();
  let total_price = Number(total_price_str.replace(regex, ""));

  let quantity = Number(survey_jQuery(element).parent().find(".quantity input").val());
  let price = survey_jQuery(element).parent().find(".price em").text();

  // 수량
  let total_quantity = Number(survey_jQuery(".survey_popup_price .survey_quantity").text());
  total_quantity -= quantity;
  survey_jQuery(".survey_popup_price .survey_quantity").text(total_quantity);

  price = Number(price.replace(regex, ""));
  total_price -= price * quantity;
  let total_price_resut = surveyCommon.surveyComma(total_price) + "원";
  // survey_jQuery(".survey_popup_price .total em").text(total_price_resut);
  survey_jQuery(".survey_popup_price .total strong").text(total_price_resut);

  survey_jQuery(element).parent().remove();

  let product_count = survey_jQuery(".subscribeBox").length;
  if (product_count == 0) {
    survey_jQuery(".box-left").css("min-height", "0px");
    survey_jQuery(".product-info").css("height", "0px");
    survey_jQuery(".box-right .product-info .shadow").css("position", "unset");
  }

  if (survey_jQuery(".subscribeBox").length == 0) {
    survey_jQuery(".box-info").css("overflow-y", "unset");
    survey_jQuery(".box-info").css("overflow-x", "unset");
  }
}

function surveyQuantity(element, type) {
  let regex = /[^0-9]/g;
  let total_price_str = survey_jQuery(".survey_popup_price .total strong").text();
  let total_price = Number(total_price_str.replace(regex, ""));
  let total_quantity = Number(survey_jQuery(".survey_popup_price .survey_quantity").text());

  let price_str = survey_jQuery(element).parent().parent().find(".price em").text();
  let price = Number(price_str.replace(regex, ""));

  let count = Number(survey_jQuery(element).parent().children().eq(0).val());
  if (type == "up") {
    count += 1;
    total_quantity += 1;
    total_price += price;
  } else {
    if (count > 1) {
      count -= 1;
      total_quantity -= 1;
      total_price -= price;
    }
  }

  // 총 금액
  let total_price_resut = surveyCommon.surveyComma(total_price) + "원";
  survey_jQuery(".survey_popup_price .total strong").text(total_price_resut);
  // 총 수량
  survey_jQuery(".survey_popup_price .survey_quantity").text("");
  survey_jQuery(".survey_popup_price .survey_quantity").text(total_quantity);

  survey_jQuery(element).parent().children().eq(0).val(count);
}


let is_survey_cart_click = false;
async function surveyResultCart(type) {
  if (is_survey_cart_click == true) {
    return;
  }
  is_survey_cart_click = true;

  let product_list = survey_jQuery(".subscribeBox");
  if (product_list.length == 0) {
    is_survey_cart_click = false;
    alert("상품을 선택해주세요.");
    return;
  }
  let is_set_product = false;
  let is_cart_set_product = false;

  for (const product of product_list) {
    let product_no = Number(survey_jQuery(product).attr("product_no"));
    let bom_code = survey_jQuery(product).attr("bom_code");
    let nick_name = survey_jQuery(product).attr("nick_name");
    let qna_type = survey_jQuery(product).attr("qna_type");
    let hash = survey_jQuery(product).attr("hash");
    let quantity = survey_jQuery(product).find(".quantity input").val();
    let product_type = survey_jQuery(product).attr("product_type");

    let payment_buy_type = survey_jQuery(product).attr("payment_buy_type");
    let regular_cycle = survey_jQuery(product).attr(".regular_cycle");

    await surveyDeleteCartProduct(product_no);
    await surveySaveCart(product_no, bom_code, nick_name, qna_type, hash, quantity, product_type);
  }

  if (type && type == "cart") {
    if (confirm("장바구니 담기가 되었습니다.\n장바구니 페이지로 이동하시겠습니까?")) {
      location.href = "/order/basket.html";
    }
    is_survey_cart_click = false;
  } else {
    await surveyCommon.surveySleep(800);
    location.href = "/order/basket.html";
  }
}

// 장바구니 담기
async function surveySaveCart(
  product_no,
  bom_code,
  nick_name,
  qna_type = null,
  hash = null,
  quantity = 1,
  product_type
) {
  let variant_code = essenceResult.survey_variant_resource[product_type].variant_code;
  // 일반 스킨케어
  if (product_type.indexOf("employees") == -1) {
    let find = surveyCommon.survey_product_list[CAFE24API.MALL_ID].find((e) => Number(e.no) == Number(product_no));
    let bom_text = "";
    if (find) {
      if (find.product_type == "essence") {
        bom_text = "맞춤형 에센스 BOM";
      }
      if (find.product_type == "boot_essence") {
        bom_text = "맞춤형 부스팅 에센스 BOM";
      }
    }
    // 단품 상품 장바구니 담기
    if (product_type !== "set_essence") {
      // let option_result = await getSurveyCafe24Option(product_no);
      let cart_result = await setCafe24Cart(
        product_no,
        bom_text,
        bom_code,
        nick_name,
        variant_code,
        hash,
        quantity
      );
    } else {
      // 세트 상품 장바구니 담기
      let bundle_product_components = [];
      for (let survey_product of surveyCommon.survey_product_list[surveyCommon.survey_mall_id]) {
        if (survey_product.type == "skin_care" && survey_product.product_type.indexOf("employees") == -1) {
          if (survey_product.no !== Number(product_no)) {
            let variant_code = "";
            for (const survey_variant in essenceResult.survey_variant_resource) {
              if (essenceResult.survey_variant_resource[survey_variant].product_no == survey_product.no) {
                variant_code = essenceResult.survey_variant_resource[survey_variant].variant_code;
              }
            }
            if (survey_product.product_type == "boot_essence") {
              bom_code = "WAU31S07020000000001CEB1WAU0001";
            }
            let bom_text = "";
            let nick_name_text = "";
            let hash_text = "";
            if (survey_product.product_type == "essence") {
              bom_text = "맞춤형 에센스 BOM";
              nick_name_text = "맞춤형 에센스 이름";
              hash_text = "맞춤형 에센스 해시코드";
            }
            if (survey_product.product_type == "boot_essence") {
              bom_text = "맞춤형 부스팅 에센스 BOM";
              nick_name_text = "맞춤형 부스팅 에센스 이름";
              hash_text = "맞춤형 부스팅 에센스 해시코드";
            }
            // let option_result = await getSurveyCafe24Option(survey_product.no);
            let set_param = {
              product_no: survey_product.no,
              variants_code: variant_code,
              additional_option_values: [
                {
                  key: "item_option_add",
                  type: "text",
                  title: bom_text,
                  value: bom_code,
                },
                {
                  key: "item_option_add",
                  type: "text",
                  title: nick_name_text,
                  value: nick_name,
                },
                {
                  key: "item_option_add",
                  type: "text",
                  title: hash_text,
                  value: hash,
                },
              ]
            }
            bundle_product_components.push(set_param);
          }
        }
      }
      await setCafe24SetProductCart(product_no, bundle_product_components, quantity);
    }
  } else {
    // 임직원 단품 상품 장바구니 담기
    if (product_type !== "employees_set_essence") {
      // let option_result = await getSurveyCafe24Option(product_no);
      let find = surveyCommon.survey_product_list[CAFE24API.MALL_ID].find((e) => Number(e.no) == Number(product_no));
      let bom_text = "맞춤형 에센스 BOM";
      if (find) {
        if (find.product_type == "employees_essence") {
          bom_text = "맞춤형 에센스 BOM";
        }
        if (find.product_type == "employees_boot_essence") {
          bom_text = "맞춤형 부스팅 에센스 BOM";
        }
      }
      let cart_result = await setCafe24Cart(
        product_no,
        bom_text,
        bom_code,
        nick_name,
        variant_code,
        hash,
        quantity
      );
    } else {
      // 임직원 세트 상품 장바구니 담기
      let bundle_product_components = [];
      for (let survey_product of surveyCommon.survey_product_list[surveyCommon.survey_mall_id]) {
        if (survey_product.type == "skin_care" && survey_product.product_type.indexOf("employees") > -1 && survey_product.detail_type == survey_discount_type) {
          if (survey_product.no !== Number(product_no)) {
            let variant_code = "";
            for (const survey_variant in essenceResult.survey_variant_resource) {
              if (essenceResult.survey_variant_resource[survey_variant].product_no == survey_product.no) {
                variant_code = essenceResult.survey_variant_resource[survey_variant].variant_code;
              }
            }
            if (survey_product.product_type.indexOf("boot_essence") > -1) {
              bom_code = "WAU31S07020000000001CEB1WAU0001";
            }
            let bom_text = "";
            let nick_name_text = "";
            let hash_text = "";
            if (survey_product.product_type == "employees_essence") {
              bom_text = "맞춤형 에센스 BOM";
              nick_name_text = "맞춤형 에센스 이름";
              hash_text = "맞춤형 에센스 해시코드";
            }
            if (survey_product.product_type == "employees_boot_essence") {
              bom_text = "맞춤형 부스팅 에센스 BOM";
              nick_name_text = "맞춤형 부스팅 에센스 이름";
              hash_text = "맞춤형 부스팅 에센스 해시코드";
            }
            // let option_result = await getSurveyCafe24Option(survey_product.no);
            let set_param = {
              product_no: survey_product.no,
              variants_code: variant_code,
              additional_option_values: [
                {
                  key: "item_option_add",
                  type: "text",
                  title: bom_text,
                  value: bom_code,
                },
                {
                  key: "item_option_add",
                  type: "text",
                  title: nick_name_text,
                  value: nick_name,
                },
                {
                  key: "item_option_add",
                  type: "text",
                  title: hash_text,
                  value: hash,
                },
              ]
            }
            const find_index = bundle_product_components.findIndex((e) => e.product_no == survey_product.no);
            if (find_index == -1) {
              bundle_product_components.push(set_param);
            }
          }
        }
      }
      await setCafe24SetProductCart(product_no, bundle_product_components, quantity);
    }
  }
}

// 옵션 조회
async function getSurveyCafe24Option(product_no) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${location.origin}/api/v2/products/${product_no}/options`,
      type: "GET",
      async: true,
      processData: false,
      contentType: "application/json",
      beforeSend: function (xhr, opts) {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("X-Cafe24-Api-Version", surveyCommon.app_version);
        xhr.setRequestHeader("X-Cafe24-Client-Id", surveyCommon.app_client_id);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      },
      cache: false,
      data: {},
      success: async function (data) {
        resolve(data);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        reject(error);
      },
    });
  });
}

// 담품 장바구니 담기
async function setCafe24Cart(
  product_no,
  additional_option_name,
  bom_code,
  nick_name,
  variant_code,
  hash,
  quantity
) {
  (async function (CAFE24API) {
    let data = {
      shop_no: 1,
      request: {
        duplicated_item_check: "F",
        product_no: product_no,
        basket_type: "A0000",
        prepaid_shipping_fee: "P",
        variants: [
          {
            quantity: quantity,
            variants_code: variant_code,
            additional_option_values: [
              {
                key: "item_option_add",
                type: "text",
                name: additional_option_name,
                value: bom_code,
              },
              {
                key: "item_option_add",
                type: "text",
                name: "이름",
                value: nick_name,
              },
              {
                key: "item_option_add",
                type: "text",
                name: "해시코드",
                value: hash,
              },
            ],
          },
        ],
      },
    };
    return new Promise(function (resolve, reject) {
      CAFE24API.post("/api/v2/carts", data, function (err, res) {
        if (res) {
          resolve(res);
        }
        if (err) {
          reject(err);
        }
      });
    });
  })(
    CAFE24API.init({
      version: surveyCommon.app_version,
      client_id: surveyCommon.app_client_id,
    })
  );
}

// 세트 장바구니 담기
async function setCafe24SetProductCart(
  product_no,
  bundle_product_components,
  quantity
) {
  return new Promise(function (resolve, reject) {
    CAFE24API.init(surveyCommon.app_client_id);
    CAFE24API.addBundleProductsCart(
      'A0000',
      'P',
      [
          {
            'product_no' : product_no, // 세트상품번호
            'quantity' : quantity,
            'bundle_product_components': bundle_product_components
          }
      ],
      function(err,res) {
          resolve(res);
      }
    );
  });
}
function surveyGiftBtn() {
  // https://채티스-도메인?gift_key=채티스key&bom_code=샴푸bom_code,트리트먼트
  let bom_code = essenceResult.survey_diagnosis_result.bom_code.join(",");
  let hash = surveyCommon.shoplusGetParameters("hash");
  let gift_key = surveyCommon.shoplusGetParameters("gift_key");
  location.href = `https://gp.chatis.app/gc?gift_code=${gift_key}&bom_code=${bom_code}&hash=${hash}&nick_name=${essenceResult.survey_diagnosis_result.manage_product_nick_name}`;
}

function surveyShowDiagnosis() {
  sessionStorage.setItem("survey_result_show_diagnosis", "click");
  location.href = "/member/login.html";
}

// 장바구니 담기 전 추가 조회
async function getSurveyAddResultDiagnoses() {
  return new Promise(async function (resolve, reject) {
    let url = "";
    if (essenceResult.re_qna_hash) {
      let to = dayjs().format("YYYY-MM-DD");
      url = `/front/diagnoses?hash=${essenceResult.re_qna_hash}&from=${essenceResult.qna_at}&to=${to}`;
    } else {
      url = `/front/diagnoses?hash=${essenceResult.hash}&from=${essenceResult.qna_at}&to=${essenceResult.qna_at}`;
    }
    await surveyCommon
      .getSurveyAjax(url)
      .then(function (res) {
        console.log("res", res[0][0]);
        resolve(res[0][0]);
      })
      .catch(function (err) {
        console.log(err);
      })
  });
}

async function surveyDeleteCartProduct(product_no) {
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

// 구매완료 호출 API
function surveyOrderCompleted(params) {
  console.log("Completed");
  let order_id = surveyCommon.shoplusGetParameters("order_id");
  survey_jQuery.ajax({
    url: `${surveyCommon.survey_domain}/app/${surveyCommon.survey_app_name}/mall/${surveyCommon.survey_mall_id}/api/survey/shops/${surveyCommon.survey_shop_no}/front/order/${order_id}/completed`,
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