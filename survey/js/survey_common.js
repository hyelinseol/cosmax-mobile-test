// 앱 client_id
let app_client_id = "PHOutdi3EleQxttT8mq0FE";

// 앱 version
let app_version = "2022-06-01";

// 도메인
let survey_domain = "https://cosmax-api.shoplus.store";

// app_name
let survey_app_name = "survey";

// 회원 id
let survey_member_id = null;

// 샴푸 상품 번호
let survey_shampoo_no = 11;

// 트리트먼트 상품 번호
let survey_treatment_no = 12;

// 세트 상품 번호
let survey_set_product_no = 13;

const survey_product_list = {
  cosmaxtest: [
    { product_no: 13, product_type: "shampoo" },
    { product_no: 15, product_type: "treatment" },
    { product_no: 14, product_type: "set_product" },
    // 샘플
    { product_no: 28, product_type: "sample_shampoo" },
    { product_no: 27, product_type: "sample_treatment" },
    { product_no: 29, product_type: "sample_set_product" },
    // 임직원
    { product_no: 32, product_type: "employees_shampoo" },
    { product_no: 31, product_type: "employees_treatment" },
    { product_no: 30, product_type: "employees_set_product" },
  ],
  threewaau: [
    { product_no: 11, product_type: "shampoo" },
    { product_no: 12, product_type: "treatment" },
    { product_no: 13, product_type: "set_product" },
    // 샘플
    { product_no: 22, product_type: "sample_shampoo" },
    { product_no: 23, product_type: "sample_treatment" },
    { product_no: 24, product_type: "sample_set_product" },
    // 임직원
    { product_no: 25, product_type: "employees_shampoo" },
    { product_no: 26, product_type: "employees_treatment" },
    { product_no: 27, product_type: "employees_set_product" },
  ],
}


// bom_code 자르기 시작
let survey_bom_cut_start = 10;
// bom_code 자르기 끝
let survey_bom_cut_end = 10;

// 무향 이미지
let survey_no_fragrance_image =
  "https://threewaau.cafe24.com/web/upload/mynomy/kr/diagnosis/no_scent.jpeg";
let survey_no_fragrance_name = "Fragrance Free";

let survey_skin_path = "";

let survey_shampoo_name = "맞춤형 샴푸";
let survey_treatment_name = "맞춤형 트리트먼트";
let survey_set_product_name = "샴푸+트리트먼트 세트";

let survey_product_resource = {
  shampoo: {},
  treatment: {},
  set_product: {},
};

let survey_variant_resource = {
  shampoo: {},
  treatment: {},
  set_product: {},
};

// 문의내역 게시판 번호
let survey_board_no = 9;

//GET 파라메터
function shoplusGetParameters(param_name) {
  let returnValue;

  let url = location.href;

  let parameters = url.slice(url.indexOf("?") + 1, url.length).split("&");

  for (let i = 0; i < parameters.length; i++) {
    let varName = parameters[i].split("=")[0];
    if (varName.toUpperCase() == param_name.toUpperCase()) {
      returnValue = parameters[i].split("=")[1];
      returnValue = returnValue.replace("#none", "");
      returnValue = returnValue.replace("#progress", "");

      returnValue = returnValue.replace("#prdDetail", "");
      returnValue = returnValue.replace("#prdReview", "");
      returnValue = returnValue.replace("#prdInfo", "");
      returnValue = returnValue.replace("#prdQnA", "");
      returnValue = returnValue.replace("#header", "");

      return decodeURIComponent(returnValue);
    }
  }
}

function surveyRemoveSotrage() {
  sessionStorage.removeItem("survey_set_param");
  sessionStorage.removeItem("survey_result");
  localStorage.removeItem("survey_worry_selected");
  localStorage.removeItem("survey_result");

  sessionStorage.removeItem("survey_befor_qna_result");
  sessionStorage.removeItem("survey_re_qna_result");
  localStorage.removeItem("survey_worry_selected");
  localStorage.removeItem("survey_treatment_worry_selected");
  localStorage.removeItem("survey_shampoo_worry_selected");
  localStorage.removeItem("survey_re_qna_result");
}

function surveyComma(number) {
  return number.toLocaleString();
}

// 장바구니 담기
async function surveySetCart(
  product_no,
  bom_code,
  nick_name,
  qna_type = null,
  hash = null,
  quantity = 1
) {
  // 샴푸 전송
  if (Number(product_no) == survey_set_product_no) {
    let bom_code_array = bom_code.split(",");
    for (let code of bom_code_array) {
      if (code.indexOf("CSP") > -1) {
        let variant_code = survey_variant_resource.shampoo.variant_code;
        await getCafe24Option(survey_shampoo_no, code, nick_name, variant_code, hash, quantity);
      }
      if (code.indexOf("CHT") > -1) {
        // 트리트먼트 담기
        let variant_code = survey_variant_resource.treatment.variant_code;
        await getCafe24Option(survey_treatment_no, code, nick_name, variant_code, hash, quantity);
      }
    }
  } else {
    let bom_code_array = bom_code.split(",");
    for (let code of bom_code_array) {
      if (survey_shampoo_no == Number(product_no) && code.indexOf("CSP") > -1) {
        let variant_code = survey_variant_resource.shampoo.variant_code;
        await getCafe24Option(survey_shampoo_no, code, nick_name, variant_code, hash, quantity);
      }
      if (survey_treatment_no == Number(product_no) && code.indexOf("CHT") > -1) {
        let variant_code = survey_variant_resource.treatment.variant_code;
        await getCafe24Option(survey_treatment_no, code, nick_name, variant_code, hash, quantity);
      }
    }
  }
}

// 옵션 조회
async function getCafe24Option(product_no, bom_code, nick_name, variant_code, hash, quantity) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${location.origin}/api/v2/products/${product_no}/options`,
      type: "GET",
      async: true,
      processData: false,
      contentType: "application/json",
      beforeSend: function (xhr, opts) {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("X-Cafe24-Api-Version", app_version);
        xhr.setRequestHeader("X-Cafe24-Client-Id", app_client_id);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      },
      cache: false,
      data: {},
      success: async function (data) {
        let result = await setCafe24Cart(
          product_no,
          data.options.additional_options[0].additional_option_name,
          bom_code,
          nick_name,
          variant_code,
          hash,
          quantity
        );
        resolve(result);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        reject(error);
      },
    });
  });
}

// 장바구니 담기
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
      version: app_version,
      client_id: app_client_id,
    })
  );
}

// 상품 정보, 품목정보 조회
function surveyGetProductVariants() {
  (function (CAFE24API) {
    CAFE24API.get(`/api/v2/products/${survey_shampoo_no}?embed=discountprice`, function (err, res) {
      survey_product_resource.shampoo = res.product;
    });
    CAFE24API.get(
      `/api/v2/products/${survey_treatment_no}?embed=discountprice`,
      function (err, res) {
        survey_product_resource.treatment = res.product;
      }
    );
    CAFE24API.get(
      `/api/v2/products/${survey_set_product_no}?embed=discountprice`,
      function (err, res) {
        survey_product_resource.set_product = res.product;
      }
    );

    CAFE24API.get(`/api/v2/products/${survey_shampoo_no}/variants`, function (err, res) {
      survey_variant_resource.shampoo = res.variants[0];
    });
    CAFE24API.get(`/api/v2/products/${survey_treatment_no}/variants`, function (err, res) {
      survey_variant_resource.treatment = res.variants[0];
    });
    CAFE24API.get(`/api/v2/products/${survey_set_product_no}/variants`, function (err, res) {
      survey_variant_resource.set_product = res.variants[0];
    });
  })(
    CAFE24API.init({
      version: app_version,
      client_id: app_client_id,
    })
  );
}

async function surveySetTime(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(true);
    }, time);
  });
}

async function surveyGetCafe24Products() {

  // 샴푸 상품 정보
  let shampoo = await surveyGetCafe24API(`/api/v2/products/${survey_shampoo_no}?embed=discountprice`);
  survey_product_resource.shampoo = shampoo.product;

  // 트리트먼트 상품 정보
  let treatment = await surveyGetCafe24API(`/api/v2/products/${survey_treatment_no}?embed=discountprice`);
  survey_product_resource.treatment = treatment.product;

  // 세트 상품 정보
  let set_product = await surveyGetCafe24API(`/api/v2/products/${survey_set_product_no}?embed=discountprice`);
  survey_product_resource.set_product = set_product.product;


  // 샴푸 품목 정보
  let shampoo_variant = await surveyGetCafe24API(`/api/v2/products/${survey_shampoo_no}/variants`);
  survey_variant_resource.shampoo = shampoo_variant.variants[0];

  // 트리트먼트 품목 정보
  let treatment_variant = await surveyGetCafe24API(`/api/v2/products/${survey_treatment_no}/variants`);
  survey_variant_resource.treatment = treatment_variant.variants[0];

  // 세트 품목 정보
  let set_product_variant = await surveyGetCafe24API(`/api/v2/products/${survey_set_product_no}/variants`);
  survey_variant_resource.set_product = set_product_variant.variants[0];

}

async function surveyGetCafe24API(url) {
  return new Promise(function (resolve, reject) {
    (function (CAFE24API) {
      CAFE24API.get(url, function (err, res) {
        resolve(res);
      });
    })(
      CAFE24API.init({
        version: app_version,
        client_id: app_client_id,
      })
    );
  });
}

async function surveyGetMemberDetailInfo() {
  let is_member = false;
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      CAFE24API.getCustomerInfo(async function (err, res) {
        survey_member_name = null;
        survey_member_id = null;
        if (res) {
          if (res.customer) {
            survey_member_name = res.customer.name;
            survey_member_id = res.customer.member_id;
            is_member = true;
          }
        }
        if (is_member) {
          resolve(res.customer);
        } else {
          surveyGetMemberDetailInfo();
        }
      });
    }, 1000);
  });
}