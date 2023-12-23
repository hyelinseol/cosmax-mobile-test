const surveyCommon = new SurveyCommon();

const survey_gift_fix_priduct_list = {
  cosmaxtest: [
    {
      product_no: 51,
      items: [
        35,37
      ]
    },
    {
      product_no: 50,
      items: [
        33,37
      ]
    },
  ],
  threewaau: [
    {
      product_no: 44,
      items: [
        42,48
      ]
    },
    {
      product_no: 45,
      items: [
        43,48
      ]
    },
  ],
};

(async function (CAFE24API) {
  setTimeout(async function () {
    await surveyCommon.getCafe24CustomerInfo(CAFE24API);
    let gift_survey_product_list = survey_jQuery(".gift_survey_product");
    for (const gift_survey_product of gift_survey_product_list) {
      let product_no = survey_jQuery(gift_survey_product).attr("product_no");
      let find_survey_product = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => Number(e.no) == Number(product_no));
      if (find_survey_product?.type == "hair_care") {
        survey_jQuery(gift_survey_product).attr("href", "/product/detail_hair.html?product_no=" + product_no + "&gift_list=Y");
      }
      if (find_survey_product?.type == "skin_care") {
        survey_jQuery(gift_survey_product).attr("href", "/product/detail_essence.html?product_no=" + product_no + "&gift_list=Y");
      }
    }
  }, 100);
})(
  CAFE24API.init({
    client_id: surveyCommon.app_client_id,
    version: surveyCommon.app_version,
  })
);

async function surveyGiftSetCart(product_no) {
  (async function (CAFE24API) {

    await surveyDeleteCartProduct(product_no);

    let find_survey_product = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => Number(e.no) == Number(product_no));
    let additional_option_name = "";

    // 헤어케어
    if (find_survey_product && find_survey_product.type == "hair_care") {

      let result = "";
      if (find_survey_product.product_type.indexOf("sampoo") > -1) {
        additional_option_name = "맞춤형 샴푸 BOM";
        result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${product_no}/variants`);
      }

      if (find_survey_product.product_type.indexOf("treatment") > -1) {
        additional_option_name = "맞춤형 트리트먼트 BOM";
        result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${product_no}/variants`);
      }

      if (additional_option_name) {
        await setCafe24Cart(
          product_no,
          additional_option_name,
          "선물하기",
          "선물하기",
          result.variants[0].variant_code,
          "선물하기",
          1
        );
        await surveyCommon.surveySleep(500);
        location.href="/order/basket.html";
        return;
      }

      if (find_survey_product.product_type.indexOf("set_product") > -1) {
        const result = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].filter((e) => e.type == find_survey_product.type && e.detail_type == find_survey_product.detail_type);

        // 세트 상품 장바구니 담기
        let bundle_product_components = [];

        let shampoo = result.find((e) => e.product_type.indexOf("sampoo") > -1);
        let shampoo_result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${shampoo.no}/variants`);
        let shampoo_set_param = {
          product_no: shampoo.no,
          variants_code: shampoo_result.variants[0].variant_code,
          additional_option_values: [
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 샴푸 BOM",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 샴푸 이름",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 샴푸 해시코드",
              value: "선물하기",
            },
          ]
        }
        bundle_product_components.push(shampoo_set_param);

        let treatment = result.find((e) => e.product_type.indexOf("treatment") > -1);
        let treatment_result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${treatment.no}/variants`);
        let treatment_set_param = {
          product_no: treatment.no,
          variants_code: treatment_result.variants[0].variant_code,
          additional_option_values: [
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 트리트먼트 BOM",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 트리트먼트 이름",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 트리트먼트 해시코드",
              value: "선물하기",
            },
          ]
        }
        bundle_product_components.push(treatment_set_param);
        await setCafe24SetProductCart(product_no, bundle_product_components, 1);
        await surveyCommon.surveySleep(500);
        location.href="/order/basket.html";
        return;
      }
    }

    // 스킨케어
    if (find_survey_product && find_survey_product.type == "skin_care") {

      let result = "";

      if (find_survey_product.product_type.indexOf("set_essence") > -1) {
        const result = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].filter((e) => e.type == find_survey_product.type && e.detail_type == find_survey_product.detail_type);
        // 세트 상품 장바구니 담기
        let bundle_product_components = [];

        let essence = result.find((e) => e.product_type.indexOf("essence") > -1);
        let essence_result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${essence.no}/variants`);
        let essence_set_param = {
          product_no: essence.no,
          variants_code: essence_result.variants[0].variant_code,
          additional_option_values: [
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 에센스 BOM",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 에센스 이름",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 에센스 해시코드",
              value: "선물하기",
            },
          ]
        }
        bundle_product_components.push(essence_set_param);

        let boot_essence = result.find((e) => e.product_type.indexOf("boot_essence") > -1);
        let boot_essence_result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${boot_essence.no}/variants`);
        let boot_essence_set_param = {
          product_no: boot_essence.no,
          variants_code: boot_essence_result.variants[0].variant_code,
          additional_option_values: [
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 부스팅 에센스 BOM",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 부스팅 에센스 이름",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "맞춤형 부스팅 에센스 해시코드",
              value: "선물하기",
            },
          ]
        }
        bundle_product_components.push(boot_essence_set_param);
        await setCafe24SetProductCart(product_no, bundle_product_components, 1);
        await surveyCommon.surveySleep(500);
        location.href="/order/basket.html";
        return;
      }

      if (find_survey_product.product_type.indexOf("essence") > -1) {
        additional_option_name = "맞춤형 에센스 BOM";
        result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${product_no}/variants`);
      }

      if (find_survey_product.product_type.indexOf("boot_essence") > -1) {
        additional_option_name = "맞춤형 부스팅 에센스 BOM";
        result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${product_no}/variants`);
      }

      if (additional_option_name) {
        await setCafe24Cart(
          product_no,
          additional_option_name,
          "선물하기",
          "선물하기",
          result.variants[0].variant_code,
          "선물하기",
          1
        );
        await surveyCommon.surveySleep(500);
        location.href="/order/basket.html";
        return;
      }
    }

    if (!find_survey_product) {

      let find_gift_fix_priduct = survey_gift_fix_priduct_list[surveyCommon.survey_mall_id].find((e) => Number(e.product_no) == Number(product_no));
      if (!find_gift_fix_priduct || typeof find_gift_fix_priduct == "undefined") {
        let result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${product_no}/variants`);
        await setCafe24Cart(
          product_no,
          "3WAAU 스킨케어 BOM",
          "선물하기",
          "선물하기",
          result.variants[0].variant_code,
          "선물하기",
          1
        );
        await surveyCommon.surveySleep(500);
        location.href="/order/basket.html";
      } else {
        // 세트 상품 장바구니 담기
        let bundle_product_components = [];

        let result = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${find_gift_fix_priduct.items[0]}/variants`);
        let set_param = {
          product_no: find_gift_fix_priduct.items[0],
          variants_code: result.variants[0].variant_code,
          additional_option_values: [
            {
              key: "item_option_add",
              type: "text",
              title: "3WAAU 스킨케어 BOM",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "3WAAU 스킨케어 이름",
              value: "선물하기",
            }
          ]
        }
        bundle_product_components.push(set_param);

        let result2 = await surveyCommon.surveyGetCafe24API(CAFE24API, `/api/v2/products/${find_gift_fix_priduct.items[1]}/variants`);
        let set_param2 = {
          product_no: find_gift_fix_priduct.items[1],
          variants_code: result2.variants[0].variant_code,
          additional_option_values: [
            {
              key: "item_option_add",
              type: "text",
              title: "3WAAU 스킨케어 BOM",
              value: "선물하기",
            },
            {
              key: "item_option_add",
              type: "text",
              title: "3WAAU 스킨케어 이름",
              value: "선물하기",
            }
          ]
        }
        bundle_product_components.push(set_param2);
        await setCafe24SetProductCart(product_no, bundle_product_components, 1);
        await surveyCommon.surveySleep(500);
        location.href="/order/basket.html";
        return;
      }
    }

  })(
    CAFE24API.init({
      client_id: surveyCommon.app_client_id,
      version: surveyCommon.app_version,
    })
  );
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
      client_id: surveyCommon.app_client_id,
      version: surveyCommon.app_version,
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