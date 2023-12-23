const survey_fix_product_no = document.querySelector("meta[property='product:productId']").getAttribute("content");
let find = surveyCommonSideBar.survey_product_list["threewaau"].find((e) => Number(e.no) == Number(survey_fix_product_no));
if (find) {
  if (find.type == "hair_care") {
    location.href = "/product/detail_hair.html?product_no=" + find.no;
  }
  if (find.type == "skin_care") {
    location.href = "/product/detail_essence.html?product_no=" + find.no;
  }
}

survey_jQuery(".btnGift").attr("onclick", "surveyGiftClick();");

window.addEventListener(
  "load",
  async function (event) {
    (function (CAFE24API) {
      survey_jQuery("#opt_layer_iframe_parent").remove();
    
      let bom_code = "";
      let nick_name = "";
  
      let find = surveyCommonSideBar.survey_fix_product_list[CAFE24API.MALL_ID].find((e) => Number(e.no) == Number(survey_fix_product_no));
      if (find) {
        bom_code = find.bom_code;
        nick_name = find.nick_name;
      }


      // thumb-wrap
      let product_list = survey_jQuery(".thumb-wrap a");
      for (let product of product_list) {
        let param = survey_jQuery(product).attr("href");
        let param_array = param.split("/");
        if (param_array.length > 0) {
          if (param_array[3]) {
            let find = surveyCommonSideBar.survey_product_list[CAFE24API.MALL_ID].find(
              (e) => Number(e.no) == Number(param_array[3])
            );
            if (find && find.type == "hair_care") {
              detail_file = "detail_hair.html";
            }
            if (find && find.type == "skin_care") {
              detail_file = "detail_essence.html";
            }
            if (find) {
              survey_jQuery(product).attr("href", "/product/"+detail_file+"?product_no=" + find.no); 
            }
          }
        }
      }
      

      let add_option_list = survey_jQuery("#totalProductsOption .xans-record-");
      for (let i = 0; i < add_option_list.length; i++) {
        let th = survey_jQuery(add_option_list[i]).find("th").text();
        if (th.indexOf("BOM") > -1 && bom_code) {
          survey_jQuery(add_option_list[i]).find("td input").val(bom_code);
        }
        if (th.indexOf("이름") > -1 && nick_name) {
          survey_jQuery(add_option_list[i]).find("td input").val(nick_name);
        }
      }
  
      // 세트 상품에 속한 상품 선택
      survey_jQuery("select[id^='setproduct_option_id']").each(async function (index, element) {
        const value = survey_jQuery(element).val();
        if (value && value.length > 5) {
          return;
        }
        survey_jQuery(element).children().eq(1).prop("selected", true); //첫번째 option 선택
        let element_id = survey_jQuery(element).attr("id");
        var e = document.getElementById(element_id);
        var event = new Event("change", { bubbles: true });
        e.dispatchEvent(event);
        await surveySleep(50);
      });
  
      // 세트 구성 상품 추가 옵션 입력
      setTimeout(async function () {
        let product_list = [];
        survey_jQuery("select[id^='setproduct_option_id']").each(async function (index, element) {
          // 세트 상품에 속한 상품 선택
          let product_no = survey_jQuery(element).attr("product-no");
          product_list.push(product_no);
        });
  
        if (find?.product_list && find?.product_list.length > 0) {
          for (const product of find.product_list) {
            let add_option_list = survey_jQuery(`input[name^='setproduct_add_option_id_${product}']`);
            for (let i = 0; i < add_option_list.length; i++) {
              let full_name = survey_jQuery(add_option_list[i]).attr("name");
              let option_name = survey_jQuery(add_option_list[i]).val();
              let _find = surveyCommonSideBar.survey_fix_product_list[CAFE24API.MALL_ID].find((e) => Number(e.no) == Number(product));
              let value = "";
              if (option_name.indexOf("BOM") > -1) {
                value = _find.bom_code;
              }
              if (option_name.indexOf("이름") > -1) {
                value = _find.nick_name;
              }
              survey_jQuery("#" + full_name).val(value);
              var e = document.getElementById(full_name);
              e.value = value;
              var event = new KeyboardEvent("keyup", {
                bubbles: true,
              });
              e.dispatchEvent(event);
              await surveySleep(50);
            }
          }
        }
  
        if (product_list.length > 0) {
          survey_jQuery(".QuantityUp").attr("href", "javascript:setProductQuantity('up')");
          survey_jQuery(".QuantityDown").attr("href", "javascript:setProductQuantity('down')");
          setTimeout(async function () {
            let quantity = survey_jQuery("#option_box1_quantity").val();
            survey_jQuery(`input[name^='quantity_opt']`).val(Number(1));
            
          }, 100);
        }
        survey_jQuery(".detailBtns").css("display", "flex");
        survey_jQuery(".scroll-wrap").show();

      }, 200);
  
      
  
    })(
      CAFE24API.init({
        version: surveyCommonSideBar.app_version,
        client_id: surveyCommonSideBar.app_client_id,
      })
    );
  },
  false
);

function setProductQuantity(type) {
  if (type == "up") {
    survey_jQuery(".option_box_up").click();
  } else {
    survey_jQuery(".option_box_down").click();
  }

  setTimeout(async function () {
    let quantity = survey_jQuery("#option_box1_quantity").val();

    survey_jQuery(`input[name^='quantity_opt']`).val(Number(quantity));

  }, 200);

}

  // 슬립
  async function surveySleep(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(async function () {
        resolve(null);
      }, time);
    });
  }

  async function surveyGetCafe24API(url) {
    return new Promise(function (resolve, reject) {
      (function (CAFE24API) {
        CAFE24API.get(url, function (err, res) {
          resolve(res);
        });
      })(
        CAFE24API.init({
          version: surveyCommonSideBar.app_version,
          client_id: surveyCommonSideBar.app_client_id,
        })
      );
    });
  }

  async function surveyDeleteCartProduct() {
    const cart_list = await surveyGetCartList();
    const find = cart_list.find((e) => Number(e.product_no) == Number(survey_fix_product_no));
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

  let is_cart_click = false;
  async function setCafe24SetProductCart(e) {
    if (is_cart_click == true) {
      return;
    }
    is_cart_click = true;
    await surveyDeleteCartProduct();
    let origin_onclick = survey_jQuery(e).attr("origin_onclick");
    survey_jQuery(e).attr("onclick", origin_onclick);

    survey_jQuery(e).click();
    await surveySleep(1000);
    is_cart_click = false;
  }

  async function setCafe24SetProductBuy(e) {
    if (is_cart_click == true) {
      return;
    }
    is_cart_click = true;
    await surveyDeleteCartProduct();
    let origin_onclick = survey_jQuery(e).attr("origin_onclick");
    survey_jQuery(e).attr("onclick", origin_onclick);

    survey_jQuery(e).click();
    await surveySleep(1000);
    is_cart_click = false;
  }

  async function surveyGiftClick() {
    if (is_cart_click == true) {
      return;
    }
    is_cart_click = true;
    let add_option_list = survey_jQuery("#totalProductsOption .xans-record-");
    for (let i = 0; i < add_option_list.length; i++) {
      survey_jQuery(add_option_list[i]).find("td input").val("선물하기");
    }
    let add_option_list2 = survey_jQuery(`input[id^='setproduct_add_option_id']`);
    for (let i = 0; i < add_option_list2.length; i++) {
      survey_jQuery(add_option_list2[i]).val("선물하기");
    }

    await surveyDeleteCartProduct();

    chatisGPApp.clickGiveButton()
    await surveySleep(1000);
    is_cart_click = false;
  }