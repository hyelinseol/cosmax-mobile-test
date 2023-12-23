let survey_osdl_type = null;
survey_member_id = null;

let _survey_product_no = shoplusGetParameters("product_no");
const regex = /[^0-9]/g;
let survey_product_no = _survey_product_no.replace(regex, "") * 1;

let is_survey_result_cart_click = false;

let survey_gift_key = null;

let survey_product_type = null;

let survey_bom_code = [];

let survey_nick_name = null;

let survey_is_hairless = false;

let survey_result_diagnosis = null;

let survey_diagnosis_result_list = null;

let survey_hash = shoplusGetParameters("hash");

let survey_is_sample_order = false;

const survey_ampoule_code_images = [
  // 딥클린 콤플렉스™
  {
    bulk_code: "3C2A00001110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple02.gif",
  },
  // 피록톤올아민
  {
    bulk_code: "3C2A00002110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple03.gif",
  },
  // 멘톨 & 허브쿨
  {
    bulk_code: "3C2A00003110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple04.gif",
  },
  // 판테놀 & 아쿠아씰
  {
    bulk_code: "3C2A00004110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple08.gif",
  },
  // 미라클미네랄
  {
    bulk_code: "3C2A00006110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple07.gif",
  },
  // 엔젤링 콤플렉스™
  {
    bulk_code: "3C2A00007110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple11.gif",
  },
  // 프로텍션 콤플렉스™
  {
    bulk_code: "3C2A00008110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple09.gif",
  },
  // 세범컨트롤 콤플렉스™
  {
    bulk_code: "3C2A11980110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple05.gif",
  },
  // 돌콩배아추출물
  {
    bulk_code: "3C2A11984110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple01.gif",
  },
  // 너리싱 콤플렉스™
  {
    bulk_code: "3C2A11982110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple10.gif",
  },
  // 자라나리옴
  {
    bulk_code: "3C2A11981110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple06.gif",
  },
];

function setSurveyResult() {
  // 세트상품 체크 하여 히든
  if (survey_product_no == survey_shampoo_no || survey_product_no == survey_treatment_no) {
    survey_jQuery(".btnArea").hide();
    survey_jQuery(".tabWrap").removeClass("tabWrap");
    survey_jQuery(".con").css("padding-top", "0px");
  }

  if (survey_product_no == survey_treatment_no) {
    survey_jQuery(".tab02").click();
  }
}

function surveyInputBomCode(result, type = null) {
  if (result.bom_code.length == 1) {
    survey_jQuery("#add_option_0").val(result.bom_code[0]);
    survey_jQuery("#add_option_1").val(result.manage_product_nick_name);
    survey_jQuery("#add_option_2").val(result.hash);
  } else {
    let set_count = 1;
    let delay = 0;
    setTimeout(function () {
      if (type == null) {
        // 1개가 아니면 세트 상품
        survey_jQuery("select[id^='setproduct_option_id']").each(function (index, element) {
          // 세트 상품에 속한 상품 선택
          let options = survey_jQuery(element).children();

          for (let i = 0; i < options.length; i++) {
            setTimeout(function () {
              let text = survey_jQuery(options[i]).text();
              if (text.indexOf("트리트먼트") > -1 || text.indexOf("샴푸") > -1) {
                if (survey_jQuery(element).val() == "*") {
                  let element_id = survey_jQuery(element).attr("id");
                  let val = survey_jQuery(options[i]).val();
                  var e = document.getElementById(element_id);
                  e.value = val;
                  var event = new Event("change", { bubbles: true });
                  e.dispatchEvent(event);
                } else {
                  if (options.length == set_count) {
                    let element_id = survey_jQuery(element).attr("id");
                    let val = survey_jQuery(options[i]).val();
                    var e = document.getElementById(element_id);
                    e.value = val;
                    var event = new Event("change", { bubbles: true });
                    e.dispatchEvent(event);
                  }
                  set_count++;
                }
              }
              delay++;
            }, delay * 200);
          }
        });

        // 코드 입력
        setTimeout(function () {
          for (const bom_code of result.bom_code) {
            survey_jQuery("input[name^='setproduct_add_option_id']").each(function (
              index,
              element
            ) {
              let input_value = survey_jQuery(element).val();
              // 샴푸
              if (bom_code.indexOf("CSP") > -1 && input_value.indexOf("맞춤형 샴푸 BOM") > -1) {
                let input_id = survey_jQuery(element).attr("name");
                survey_jQuery("#" + input_id).val(bom_code);
                survey_jQuery(element).next().val(bom_code);
              }
              if (bom_code.indexOf("CSP") > -1 && input_value.indexOf("맞춤형 샴푸 이름") > -1) {
                let input_id = survey_jQuery(element).attr("name");
                survey_jQuery("#" + input_id).val(result.manage_product_nick_name);
                survey_jQuery(element).next().val(result.manage_product_nick_name);
              }
              if (
                bom_code.indexOf("CSP") > -1 &&
                input_value.indexOf("맞춤형 샴푸 해시코드") > -1
              ) {
                let input_id = survey_jQuery(element).attr("name");
                survey_jQuery("#" + input_id).val(result.hash);
                survey_jQuery(element).next().val(result.hash);
              }
              // 트리트 먼트
              if (
                bom_code.indexOf("CHT") > -1 &&
                input_value.indexOf("맞춤형 트리트먼트 BOM") > -1
              ) {
                let input_id = survey_jQuery(element).attr("name");
                survey_jQuery("#" + input_id).val(bom_code);
                survey_jQuery(element).next().val(bom_code);
              }
              if (
                bom_code.indexOf("CHT") > -1 &&
                input_value.indexOf("맞춤형 트리트먼트 이름") > -1
              ) {
                let input_id = survey_jQuery(element).attr("name");
                survey_jQuery("#" + input_id).val(result.manage_product_nick_name);
                survey_jQuery(element).next().val(result.manage_product_nick_name);
              }
              if (
                bom_code.indexOf("CHT") > -1 &&
                input_value.indexOf("맞춤형 트리트먼트 해시코드") > -1
              ) {
                let input_id = survey_jQuery(element).attr("name");
                survey_jQuery("#" + input_id).val(result.hash);
                survey_jQuery(element).next().val(result.hash);
              }
            });
          }
        }, 2500);
      }
    }, 100);
  }
  survey_jQuery(".subscribeBox").attr("bom_code", result.bom_code);
  survey_jQuery(".subscribeBox").attr("nick_name", result.manage_product_nick_name);
  survey_jQuery(".subscribeBox").attr("qna_type", result.qna_type);
  survey_jQuery(".subscribeBox").attr("hash", result.hash);
}

// 문진 조회
async function getSurveyQna(product_no) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${product_no}`,
      type: "get",
      data: {},
      dataType: "json",
      success: async function (result) {
        await getSurveyReQnaConfig(product_no, result.qna_hierarchy);
        resolve(result);
      },
    });
  });
}

// 조회
async function getSurveyConfig() {
  survey_product_no = shoplusGetParameters("product_no");

  survey_shampoo = survey_product_list[CAFE24API.MALL_ID].find(
    (e) => e.product_type == "sample_shampoo"
  );
  survey_treatment = survey_product_list[CAFE24API.MALL_ID].find(
    (e) => e.product_type == "sample_treatment"
  );
  survey_set_product = survey_product_list[CAFE24API.MALL_ID].find(
    (e) => e.product_type == "sample_set_product"
  );

  survey_shampoo_no = survey_shampoo.product_no;
  survey_treatment_no = survey_treatment.product_no;
  survey_set_product_no = survey_set_product.product_no;

  // 세트 상품일 때
  if (survey_product_no == survey_set_product_no) {
    await getSurveyQna(survey_shampoo_no);
    await getSurveyQna(survey_treatment_no);
  } else {
    await getSurveyQna(survey_treatment_no);
  }
}

function getSurveyReQnaConfig(product_no, qna_hierarchy) {
  let hash = shoplusGetParameters("hash");
  let hash_param = "";
  if (hash) {
    hash_param = "hash=" + hash;
  }
  let member_id_param = "";
  if (survey_member_id) {
    // member_id_param = `&member_id=${survey_member_id}`;
  }
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}/re_qna?${hash_param}${member_id_param}`,
      type: "get",
      data: {},
      dataType: "json",
      success: function (result) {
        // 샴푸 or 트리트먼트
        // 해결하고 싶은 고민
        // 원하는 향

        let survey_worry_selected = [];
        // 세트 상품이 아닐때
        if (survey_product_no != survey_set_product_no) {
          for (const qna of qna_hierarchy) {
            for (const qna_children of qna.children) {
              if (qna_children.question_type == "main") {
                for (const answer of qna_children.children) {
                  let index = result.surveys[0].survey_result.findIndex(
                    (e) => Number(e) == Number(answer.hierarchy_id)
                  );
                  if (index > -1) {
                    survey_worry_selected.push(answer.subject);
                  }
                }
              }
            }
          }
        } else {
          for (let survey of result.surveys) {
            if (Number(survey.product_no) == Number(product_no)) {
              for (const qna of qna_hierarchy) {
                for (const qna_children of qna.children) {
                  if (qna_children.question_type == "main") {
                    for (const answer of qna_children.children) {
                      let index = survey.survey_result.findIndex(
                        (e) => Number(e) == Number(answer.hierarchy_id)
                      );
                      if (index > -1) {
                        survey_worry_selected.push(answer.subject);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (Number(product_no) == Number(survey_shampoo_no)) {
          localStorage.setItem(
            "survey_worry_shampoo_selected",
            JSON.stringify(survey_worry_selected)
          );
        }
        if (Number(product_no) == Number(survey_treatment_no)) {
          localStorage.setItem(
            "survey_worry_treatment_selected",
            JSON.stringify(survey_worry_selected)
          );
        }
        // localStorage.setItem("survey_worry_selected", JSON.stringify(survey_worry_selected));
        resolve(result);
      },
      error: function (request, status, error) {
        resolve([]);
      },
    });
  });
}
// 주문 조회
async function getSurveyDiagnosisOrder(from, to) {
  let set_param = {
    member_id: survey_member_id,
    start_date: dayjs(from).format("YYYY-MM-DD"),
    end_date: dayjs(to).format("YYYY-MM-DD"),
    status_type: "N00,N10,N22,N20,N21,N30,N40,N50",
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/order`,
      type: "GET",
      data: set_param,
      dataType: "json",
      success: function (result) {
        console.log("orders", result);
        resolve(result.count);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve([]);
      },
    });
  });
}
async function getSurveyAllDiagnoses() {
  // 샘플 문진 화면에서 넘어 왔으면 진행하지 않는다
  if (document.referrer.indexOf("sample.html") > -1) {
    return;
  }

  let from = "2023-07-01";
  let to = dayjs().format("YYYY-MM-DD");

  let order_status_list = ["N00", "N10", "N22", "N20", "N21", "N30", "N40", "N50"];
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnoses?member_id=${survey_member_id}&from=${from}&to=${to}&product_no=${survey_product_no}`,
      type: "get",
      data: {},
      dataType: "json",
      success: async function (result) {
        for (const diagnoses of result) {
          for (const diagnose of diagnoses) {
            if (diagnose.order_id) {
              let sample_order_list = await getSurveyDiagnosisOrder(
                diagnose.buy_at,
                diagnose.buy_at
              );
              for (const sample_order of sample_order_list) {
                if (sample_order.order_id == diagnose.order_id) {
                  let find_sample_order = sample_order.items.find(
                    (e) =>
                      Number(e.product_no) == Number(survey_product_no) &&
                      order_status_list.indexOf(e.order_status) > -1
                  );
                  if (find_sample_order) {
                    survey_is_sample_order = true;
                  }
                  resolve(result);
                  return;
                }
              }
              await surveyHeirCareSleep(500);
            }
          }
        }
        resolve(null);
      },
    });
  });
}
async function getSurveyResultDiagnoses() {
  let qna_at = shoplusGetParameters("qna_at");
  if (qna_at && qna_at.indexOf("#progress") > -1) {
    qna_at = qna_at.replace("#progress", "");
  }
  if (qna_at && qna_at.indexOf("#none") > -1) {
    qna_at = qna_at.replace("#none", "");
  }

  qna_at = qna_at.replace(/\./gi, "-");
  qna_at = dayjs(qna_at).format("YYYY-MM-DD");

  let hash = shoplusGetParameters("hash");

  let _survey_diagnosis_result = null;

  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnoses?hash=${hash}&from=${qna_at}&to=${qna_at}`,
      type: "get",
      data: {},
      dataType: "json",
      success: async function (result) {
        for (const diagnose of result[0]) {
          survey_bom_code.push(diagnose.bom_code[0]);

          if (diagnose.bom_code[0].indexOf("CSP") > -1) {
            setSurveyDiagnosisResult(survey_shampoo_no, diagnose);
          }
          if (diagnose.bom_code[0].indexOf("CHT") > -1) {
            setSurveyDiagnosisResult(survey_treatment_no, diagnose);
          }
        }

        for (let diagnoses of result) {
          let set_param = null;
          for (let diagnos of diagnoses) {
            if (set_param == null) {
              set_param = diagnos;
            } else {
              set_param.bom_code.push(diagnos.bom_code[0]);
              set_param.product_id.push(diagnos.product_id[0]);
            }
            if (diagnos.product_type == "shampoo") {
              set_param.osdl_result.point1.shampoo_keyword =
                diagnos.osdl_result.point1.shampoo_keyword;
            }
            if (diagnos.product_type == "treatment") {
              set_param.osdl_result.point1.treatment_keyword =
                diagnos.osdl_result.point1.treatment_keyword;
            }
          }
          _survey_diagnosis_result = set_param;
        }
        let survey_qna_result = Object.assign(
          _survey_diagnosis_result,
          _survey_diagnosis_result.osdl_result
        );

        delete survey_qna_result.osdl_result;
        sessionStorage.setItem("survey_result", JSON.stringify(survey_qna_result));
        survey_jQuery(".survey_product_name").text(
          "#" + survey_qna_result.manage_product_nick_name
        );

        survey_nick_name = survey_qna_result.manage_product_nick_name;

        survey_befor_qna_result = survey_qna_result;
        resolve(survey_qna_result);
      },
    });
  });
}

function setSurveyDiagnosisResult(product_no, result) {
  let survey_set_param_info = sessionStorage.getItem("survey_set_param");
  let survey_set_param = JSON.parse(survey_set_param_info);

  let survey_target = null;
  let survey_worry_selected = [];
  if (Number(product_no) == Number(survey_shampoo_no)) {
    survey_target = "#survey_shampoo_area";
    survey_worry_selected = localStorage.getItem("survey_worry_shampoo_selected");
  }
  if (Number(product_no) == Number(survey_treatment_no)) {
    survey_target = "#survey_treatmen_area";
    survey_worry_selected = localStorage.getItem("survey_worry_treatment_selected");
  }

  if (!result.manage_product_nick_name && survey_set_param.member.product_name) {
    result.manage_product_nick_name = survey_set_param.member.product_name;
  }

  // OSDL 입력
  survey_jQuery("#survey_scalp").text(result.osdl_result.osdl.scalp);
  survey_jQuery("#survey_sensitive").text(result.osdl_result.osdl.sensitive);
  survey_jQuery("#survey_hair").text(result.osdl_result.osdl.hair);
  survey_jQuery("#survey_hair_loss").text(result.osdl_result.osdl.hair_loss);

  survey_jQuery(".survey_osdl_type").text(
    result.osdl_result.osdl.scalp +
      result.osdl_result.osdl.sensitive +
      result.osdl_result.osdl.hair +
      result.osdl_result.osdl.hair_loss +
      " 타입"
  );

  // ODSL 이미지 하단 텍스트
  survey_jQuery(".survey_osdl_text_top").html(
    surveyEnterBr(result.osdl_result.osdl.mobile_text.top)
  );
  survey_jQuery(".survey_osdl_text_bottom").html(
    surveyEnterBr(result.osdl_result.osdl.mobile_text.bottom)
  );

  // 지성, 중성, 건성 세팅
  if (result.osdl_result.osdl.scalp == "O") {
    survey_jQuery(".oily_checked").addClass("checked");
    survey_jQuery(".survey_scalp_text").text("지성");
    survey_jQuery(".survey_scalp_image").attr("src", "/web/upload/mynomy/kr/prd/ht_O.svg");
    survey_jQuery("#survey_shampoo_scalp").text("지성");
  } else if (result.osdl_result.osdl.scalp == "N") {
    survey_jQuery(".normal_checked").addClass("checked");
    survey_jQuery(".survey_scalp_text").text("중성");
    survey_jQuery(".survey_scalp_image").attr("src", "/web/upload/mynomy/kr/prd/ht_N.svg");
    survey_jQuery("#survey_shampoo_scalp").text("중성");
  } else {
    survey_jQuery(".dry_checked").addClass("checked");
    survey_jQuery(".survey_scalp_text").text("건성");
    survey_jQuery(".survey_scalp_image").attr("src", "/web/upload/mynomy/kr/prd/ht_D.svg");
    survey_jQuery("#survey_shampoo_scalp").text("건성");
  }

  // 민감성 세팅
  if (result.osdl_result.osdl.sensitive == "S") {
    survey_jQuery(".sensitive_checked").addClass("checked");
    survey_jQuery(".survey_sensitive_text").text("민감성");
    survey_jQuery(".survey_sensitive_image").attr("src", "/web/upload/mynomy/kr/prd/ht_S.svg");
  } else {
    survey_jQuery(".resistant_checked").addClass("checked");
    survey_jQuery(".survey_sensitive_text").text("저항성");
    survey_jQuery(".survey_sensitive_image").attr("src", "/web/upload/mynomy/kr/prd/ht_R.svg");
  }

  // 건강모, 손상모, 극손상모 세팅
  if (result.osdl_result.osdl.hair == "H") {
    survey_jQuery(".healthy_checked").addClass("checked");
    survey_jQuery(".survey_hair_text").text("건강모");
    survey_jQuery(".survey_hair_image").attr("src", "/web/upload/mynomy/kr/prd/ht_H.svg");
    survey_jQuery("#survey_treatment_hair").text("건강모");
  } else if (result.osdl_result.osdl.hair == "D") {
    survey_jQuery(".damaged_checked").addClass("checked");
    survey_jQuery(".survey_hair_text").text("손상모");
    survey_jQuery(".survey_hair_image").attr("src", "/web/upload/mynomy/kr/prd/ht_D.svg");
    survey_jQuery("#survey_treatment_hair").text("손상모");
  } else {
    survey_jQuery(".extremely_damaged_checked").addClass("checked");
    survey_jQuery(".survey_hair_text").text("극손상모");
    survey_jQuery(".survey_hair_image").attr("src", "/web/upload/mynomy/kr/prd/ht_E.svg");
    survey_jQuery("#survey_treatment_hair").text("극손상모");
  }

  // 탈모 고민
  if (result.osdl_result.osdl.hair_loss == "L") {
    survey_jQuery(".hair_loss_checked").addClass("checked");
    survey_jQuery(".survey_hair_loss_text").text("탈모 고민");
    survey_jQuery("#survey_hair_loss_image").attr("src", "/web/upload/mynomy/kr/prd/ht_L.svg");
  } else {
    survey_jQuery(".without_hair_loss_checked").addClass("checked");
    survey_jQuery(".survey_hair_loss_text").text("탈모 고민 없음");
    survey_jQuery("#survey_hair_loss_image").attr("src", "/web/upload/mynomy/kr/prd/ht_W.svg");
  }

  // let survey_worry_selected = localStorage.getItem("survey_worry_selected");
  // alert(survey_worry_selected);
  let survey_worry_selected_array = JSON.parse(survey_worry_selected);
  survey_jQuery(survey_target + " .survey_worry_list").empty();
  let select_worry_array = [];
  for (const worry of survey_worry_selected_array) {
    let set_append_html = `
    <li>
      <span class="check"></span>
      <span class="word">${worry}</span>
    </li>`;
    survey_jQuery(survey_target + " .survey_worry_list").append(set_append_html);
    select_worry_array.push("#" + worry);
  }

  survey_jQuery(".survey_result_text").text("고객님이 문진 첫 화면에서 직접 선택한 기능입니다.");

  // 샴푸
  let shampoo_keyword = result.osdl_result.point1.shampoo_keyword.split(" ");
  // shampoo_level
  let left_percent = 0;
  if (result.osdl_result.point1.sequence == 1) {
    left_percent = 16;
  }
  if (result.osdl_result.point1.sequence == 2) {
    left_percent = 34;
  }
  if (result.osdl_result.point1.sequence == 3) {
    left_percent = 50;
  }
  if (result.osdl_result.point1.sequence == 4) {
    left_percent = 66;
  }
  if (result.osdl_result.point1.sequence == 5) {
    left_percent = 83;
  }
  if (result.osdl_result.point1.sequence == 6) {
    left_percent = 100;
  }
  survey_jQuery(survey_target + " .shampoo_level").css("left", left_percent + "%");
  survey_jQuery(survey_target + " .shampoo_keyword").text(shampoo_keyword[0]);
  survey_jQuery(survey_target + " .shampoo_keyword_level").text(shampoo_keyword[1]);

  let treatment_keyword = result.osdl_result.point1.treatment_keyword.split(" ");

  survey_jQuery(survey_target + " .treatment_level").css("left", left_percent + "%");
  survey_jQuery(survey_target + " .treatment_keyword").text(treatment_keyword[0]);
  survey_jQuery(survey_target + " .treatment_keyword_level").text(treatment_keyword[1]);
  survey_jQuery(survey_target + " #shampoo_mobile_point").html(
    surveyEnterBr(result.osdl_result.point1.shampoo_mobile_point)
  );
  survey_jQuery(survey_target + " #treatment_mobile_point").html(
    surveyEnterBr(result.osdl_result.point1.treatment_mobile_point)
  );

  let survey_worry_text = select_worry_array.join(",");
  survey_jQuery(survey_target + " .survey_worry_text").text(survey_worry_text);

  // 엠플 입력
  survey_jQuery(survey_target + " .survey_ampoules_area").empty();

  // 샴푸
  for (let ampoule of result.osdl_result.point2.ampoules) {
    let ampoule_name_array = ampoule.name.split("\n");
    let ampoule_name = ampoule_name_array[0];
    let sub_ampoule_name_html = "";
    if (ampoule_name_array.length > 1) {
      sub_ampoule_name_html = "<span>" + ampoule_name_array[1] + "</span>";
    }

    let ingredient_html = "";
    for (let ingredient of ampoule.ingredients) {
      ingredient_html += `
        <li>
          <div class="cont_img"><img src="${ingredient.image}" alt=""></div>
          <div class="cont_txt">
            ${ingredient.name}
          </div>
        </li>
      `;
    }

    let ampoule_image = "";
    let find_ampoule_image = survey_ampoule_code_images.find(
      (e) => e.bulk_code == ampoule.bulk_code
    );
    if (find_ampoule_image) {
      ampoule_image = find_ampoule_image.image;
    }

    let set_html = `
      <div class="swiper-slide item">
        <div class="solution_cont">
          <div class="in">
            <h3 class="tit">
            ${ampoule_name}
            ${sub_ampoule_name_html}
            </h3>
            <div class="img"><img src="${ampoule_image}" alt="특허성분이미지"></div>
            <div class="explan">
              ${surveyEnterBr(ampoule.description)}
            </div>
            <div class="cont_list">
              <ul>
                ${ingredient_html}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    survey_jQuery(survey_target + " .survey_ampoules_area").append(set_html);
  }

  survey_jQuery(survey_target + " .survey_ampoules_list").empty();
  for (const ingredient of result.osdl_result.point2.bottom_fix_ingredient) {
    let set_html = `
    <div class="plus">
      <figure><img
              src="${ingredient.image}"
              alt="${ingredient.name}" /></figure>
      <figcaption>${ingredient.name}</figcaption>
    </div>
    `;
    survey_jQuery(survey_target + " .survey_ampoules_list").append(set_html);
  }

  if (result.osdl_result.point3.scent.name) {
    survey_jQuery(survey_target + " .survey_scent_name").text(result.osdl_result.point3.scent.name);
    survey_jQuery(survey_target + " .survey_scent_detail_description").html(
      surveyEnterBr(result.osdl_result.point3.scent.detail_description)
    );
    survey_jQuery(survey_target + " .survey_scent_image").attr(
      "src",
      result.osdl_result.point3.scent.image
    );

    survey_jQuery(survey_target + " .survey_scent_top").text(
      result.osdl_result.point3.scent.text.top
    );
    survey_jQuery(survey_target + " .survey_scent_mid").text(
      result.osdl_result.point3.scent.text.mid
    );
    survey_jQuery(survey_target + " .survey_scent_bottom").text(
      result.osdl_result.point3.scent.text.bottom
    );
  } else {
    survey_jQuery(survey_target + " .survey_scent_name").text("Fragrance Free");
    survey_jQuery(survey_target + " .survey_scent_name")
      .next()
      .hide();
    survey_jQuery(survey_target + " .survey_scent_image").attr("src", survey_no_fragrance_image);
    survey_jQuery(survey_target + " .survey_scent_detail_description").html(
      `민감한 고객님들을 위해<br>향료를 추가하지 않았습니다.`
    );
    survey_jQuery(survey_target + " .survey_scent_top")
      .parent()
      .parent()
      .hide();
  }

  // 지성, 중성, 건성 세팅
  let scalp_list = [];
  let survey_scalp_type_image = "";
  if (result.osdl_result.osdl.scalp == "O") {
    survey_jQuery("#survey_scalp_type").html("<strong>지성</strong>이라면?");
    scalp_list = result.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp01.png";
  } else if (result.osdl_result.osdl.scalp == "N") {
    survey_jQuery("#survey_scalp_type").html("<strong>중성</strong>이라면?");
    scalp_list = result.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp02.png";
  } else {
    survey_jQuery("#survey_scalp_type").html("<strong>건성</strong>이라면?");
    scalp_list = result.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp03.png";
  }

  survey_jQuery("#survey_scalp_type").nextAll().remove();
  for (const scalp of scalp_list) {
    let text = surveyEnterBr(scalp.text);
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery("#survey_scalp_list").append(set_html);
    survey_jQuery("#survey_scalp_type_image").attr("src", survey_scalp_type_image);
  }

  // 민감성 세팅
  let sensitive_list = [];
  let survey_sensitive_type_image = "";
  if (result.osdl_result.osdl.sensitive == "S") {
    survey_jQuery("#survey_sensitive_type").html("<strong>민감성</strong>이라면?");
    sensitive_list = result.osdl_result.point4.hair_tip.sensitive;
    survey_sensitive_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp04.png";
  } else {
    survey_jQuery("#survey_sensitive_type").html("<strong>비민감성</strong>이라면?");
    sensitive_list = result.osdl_result.point4.hair_tip.sensitive;
    survey_sensitive_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp05.png";
  }

  survey_jQuery("#survey_sensitive_type").nextAll().remove();
  for (const sensitive of sensitive_list) {
    let text = surveyEnterBr(sensitive.text);
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery("#survey_sensitive_list").append(set_html);
    survey_jQuery("#survey_sensitive_type_image").attr("src", survey_sensitive_type_image);
  }

  // 건강모, 손상모, 극손상모 세팅
  let hair_list = [];
  let survey_hair_type_image = "";
  if (result.osdl_result.osdl.hair == "H") {
    survey_jQuery("#survey_hair_type").html("<strong>건강모</strong>라면?");
    hair_list = result.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp06.png";
  } else if (result.osdl_result.osdl.hair == "D") {
    survey_jQuery("#survey_hair_type").html("<strong>손상모</strong>라면?");
    hair_list = result.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp07.png";
  } else {
    survey_jQuery("#survey_hair_type").html("<strong>(극)손상모</strong>라면?");
    hair_list = result.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp07.png";
  }

  survey_jQuery("#survey_hair_type").nextAll().remove();
  for (const hair of hair_list) {
    let text = surveyEnterBr(hair.text);
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery("#survey_hair_list").append(set_html);
    survey_jQuery("#survey_hair_type_image").attr("src", survey_hair_type_image);
  }

  // 탈모 고민
  let hair_loss_list = [];
  let survey_hair_loss_type_image = "";
  if (result.osdl_result.osdl.hair_loss == "L") {
    survey_jQuery("#survey_hair_loss_type").html("<strong>탈모</strong>라면?");
    hair_loss_list = result.osdl_result.point4.hair_tip.hair_loss;
    survey_hair_loss_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp08.png";
  } else {
    survey_jQuery("#survey_hair_loss_type").html("<strong>탈모를 예방</strong>하려면?");
    hair_loss_list = result.osdl_result.point4.hair_tip.hair_loss;
    survey_hair_loss_type_image =
      "https://threewaau.cafe24.com/web/upload/mynomy/kr_mobile/prd/scalp09.png";
  }
  survey_jQuery("#survey_hair_loss_type").nextAll().remove();
  for (const hair_loss of hair_loss_list) {
    let text = surveyEnterBr(hair_loss.text);
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery("#survey_hair_loss_list").append(set_html);
    survey_jQuery("#survey_hair_loss_type_image").attr("src", survey_hair_loss_type_image);
  }

  survey_jQuery(survey_target + " .survey_bom_code").text(
    result.bom_code[0].substr(survey_bom_cut_start, survey_bom_cut_end)
  );

  if (survey_set_param && survey_set_param.member && survey_set_param.member.product_name) {
    survey_jQuery(survey_target + " .survey_product_name").text(
      "#" + survey_set_param.member.product_name
    );
  }
}

function surveyEnterBr(text) {
  return text.replace(/(\n|\r\n)/g, "<br>");
}

async function surveyProductSelect(type) {
  let product_type = "";
  let mobile_price = 0;
  let price = 0;
  let product_no = "";

  document.getElementById("survey_shadow").style.position = "";
  if (type == "shampoo") {
    product_type = survey_product_resource.shampoo.product_name;
    mobile_price = Number(survey_product_resource.shampoo.price);
    price = Number(survey_product_resource.shampoo.discountprice.mobile_discount_price);
    product_no = survey_product_resource.shampoo.product_no;
  }
  if (type == "treatment") {
    product_type = survey_product_resource.treatment.product_name;
    mobile_price = Number(survey_product_resource.treatment.price);
    price = Number(survey_product_resource.treatment.discountprice.mobile_discount_price);
    product_no = survey_product_resource.treatment.product_no;
  }
  if (type == "set_product") {
    product_type = survey_product_resource.set_product.product_name;
    mobile_price = Number(survey_product_resource.set_product.price);
    price = Number(survey_product_resource.set_product.discountprice.mobile_discount_price);
    product_no = survey_product_resource.set_product.product_no;
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

  total_price += price;

  let total_price_resut = surveyComma(total_price) + "원";
  survey_jQuery(".survey_popup_price .total strong").text(total_price_resut);

  // 수량
  let total_quantity = Number(survey_jQuery(".survey_popup_price .survey_quantity").text());
  total_quantity += 1;
  survey_jQuery(".survey_popup_price .survey_quantity").text(total_quantity);

  let price_html = "";
  if (mobile_price != 0 && mobile_price != "0" && Number(mobile_price) > Number(price)) {
    price_html = `<strike>${surveyComma(mobile_price)}원</strike>`;
  }

  let bom_code = survey_befor_qna_result.bom_code.join(",");
  let nick_name = survey_befor_qna_result.manage_product_nick_name;
  let qna_type = survey_befor_qna_result.qna_type;
  let hash = survey_befor_qna_result.hash;

  if (!product_no || !bom_code || !nick_name || !qna_type || !hash) {
    let add_result_diagnoses = await getSurveyAddResultDiagnoses();
    if (add_result_diagnoses) {
      bom_code = add_result_diagnoses.bom_code.join(",");
      nick_name = add_result_diagnoses.manage_product_nick_name;
      qna_type = add_result_diagnoses.qna_type;
      hash = add_result_diagnoses.hash;

      if (type == "shampoo") {
        let shampoo = await surveyGetCafe24API(
          `/api/v2/products/${survey_shampoo_no}?embed=discountprice`
        );
        product_no = shampoo.product.product_no;
        product_type = shampoo.product.product_name;
      }
      if (type == "treatment") {
        // 트리트먼트 상품 정보
        let treatment = await surveyGetCafe24API(
          `/api/v2/products/${survey_treatment_no}?embed=discountprice`
        );
        product_no = treatment.product.product_no;
        product_type = treatment.product.product_name;
      }
      if (type == "set_product") {
        // 세트 상품 정보
        let set_product = await surveyGetCafe24API(
          `/api/v2/products/${survey_set_product_no}?embed=discountprice`
        );
        product_no = set_product.product.product_no;
        product_type = set_product.product.product_name;
      }
    }
  }

  let survey_close_icon_class = "";
  let survey_quantity_style = "";
  let survey_quantity_click = "";
  let survey_quantity_up_click = "surveyQuantity(this, 'up')";
  let survey_quantity_down_click = "surveyQuantity(this, 'down')";
  if (!survey_is_sample_order) {
    survey_close_icon_class = "displaynone";
    survey_quantity_style = "margin-left: 20px;";
    survey_quantity_click = "clickEventStop(event)";
    survey_quantity_up_click = "clickEventStop(event)";
    survey_quantity_down_click = "clickEventStop(event)";
  }

  let html = `
  <div class="subscribeBox" product_no="${product_no}" bom_code="${bom_code}" nick_name="${nick_name}" qna_type="${qna_type}" hash="${hash}" product_type="${type}">
    <span class="sbClose ${survey_close_icon_class}" onclick="surveyRemoveTag(this)"></span>
    <div class="gdsBuyOpt">
      <p class="subject">${product_type}</p>
      <p class="price">
        ${price_html}
        <em>${surveyComma(price)}</em>원
      </p>
    </div>
    <div class="quantity" onclick="${survey_quantity_click}" style="${survey_quantity_style}">
      <input id="quantity" name="quantity_opt[]" style="" value="1" type="text" readonly />
      <a href="javascript:;" class="up QuantityUp"  onclick="${survey_quantity_up_click}"
        ><img
          src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_up.gif"
          alt="수량증가"
      /></a>
      <a href="javascript:;" class="down QuantityDown" onclick="${survey_quantity_down_click}"
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

  if (survey_jQuery(".subscribeBox").length > 0) {
    // survey_jQuery(".box-info").css("overflow-y", "auto");
    // survey_jQuery(".box-info").css("overflow-x", "hidden");
  }
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
  let total_price_resut = surveyComma(total_price) + "원";
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

  let product_no = Number(survey_jQuery(element).parent().parent().attr("product_no"));

  // 총 금액
  let total_price_resut = surveyComma(total_price) + "원";
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

  for (const product of product_list) {
    let product_no = survey_jQuery(product).attr("product_no");
    let bom_code = survey_jQuery(product).attr("bom_code");
    let nick_name = survey_jQuery(product).attr("nick_name");
    let qna_type = survey_jQuery(product).attr("qna_type");
    let hash = survey_jQuery(product).attr("hash");
    let quantity = survey_jQuery(product).find(".quantity input").val();
    let product_type = survey_jQuery(product).attr("product_type");

    /*
    let is_basket = await getCafe24BasketProduct(product_no, product_type);
    if (is_basket == false) {
      alert(
        "이미 샘플 상품이 장바구니에 담겨있습니다.\n샘플 상품은 1개만 주문이 가능합니다.\n진단내역을 변경하고자 하는 경우 장바구니의 샘플상품을 삭제 후 다시 담아주세요"
      );
      is_survey_cart_click = false;
      return;
    }
    */

    await surveyDeleteCartProduct(product_no);

    if (product_type != "set_product") {
      // 샴푸, 트리트먼트
      surveySetHairCareCart(
        product_no,
        bom_code,
        nick_name,
        qna_type,
        hash,
        quantity,
        product_type
      );
    } else {
      // 세트 상품
      let bom_code_list = bom_code.split(",");
      let treatment_bom = bom_code_list.find((e) => e.indexOf("CHT") > -1);
      let shampoo_bom = bom_code_list.find((e) => e.indexOf("CSP") > -1);

      // 세트 상품 장바구니 담기
      let bundle_product_components = [];

      let shampoo_set_param = {
        product_no: survey_product_resource.shampoo.product_no,
        variants_code: survey_variant_resource.shampoo.variant_code,
        additional_option_values: [
          {
            key: "item_option_add",
            type: "text",
            title: "맞춤형 샴푸 BOM",
            value: shampoo_bom,
          },
          {
            key: "item_option_add",
            type: "text",
            title: "맞춤형 샴푸 이름",
            value: nick_name,
          },
          {
            key: "item_option_add",
            type: "text",
            title: "맞춤형 샴푸 해시코드",
            value: hash,
          },
        ],
      };
      bundle_product_components.push(shampoo_set_param);

      let treatment_set_param = {
        product_no: survey_product_resource.treatment.product_no,
        variants_code: survey_variant_resource.treatment.variant_code,
        additional_option_values: [
          {
            key: "item_option_add",
            type: "text",
            title: "맞춤형 트리트먼트 BOM",
            value: treatment_bom,
          },
          {
            key: "item_option_add",
            type: "text",
            title: "맞춤형 트리트먼트 이름",
            value: nick_name,
          },
          {
            key: "item_option_add",
            type: "text",
            title: "맞춤형 트리트먼트 해시코드",
            value: hash,
          },
        ],
      };
      bundle_product_components.push(treatment_set_param);

      await setCafe24SetProductCart(product_no, bundle_product_components, quantity);
    }
  }
  setTimeout(function () {
    if (type && type == "cart") {
      if (confirm("장바구니 담기가 되었습니다.\n장바구니 페이지로 이동하시겠습니까?")) {
        location.href = "/order/basket.html";
      }
    } else {
      location.href = "/order/basket.html";
    }
    is_survey_cart_click = false;
  }, 1000);
}

// 세트 장바구니 담기
async function setCafe24SetProductCart(product_no, bundle_product_components, quantity) {
  return new Promise(function (resolve, reject) {
    CAFE24API.init(app_client_id);
    CAFE24API.addBundleProductsCart(
      "A0000",
      "P",
      [
        {
          product_no: product_no, // 세트상품번호
          quantity: quantity,
          bundle_product_components: bundle_product_components,
        },
      ],
      function (err, res) {
        resolve(res);
      }
    );
  });
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
        xhr.setRequestHeader("X-Cafe24-Api-Version", app_version);
        xhr.setRequestHeader("X-Cafe24-Client-Id", app_client_id);
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

function surveyBuyBtn() {
  if (survey_jQuery(".subscribeBox").length == 0) {
    survey_jQuery(".survey_popup_price .total strong").text("0원");

    survey_jQuery(".box-left").css("min-height", "0px");
    survey_jQuery(".product-info").css("height", "0px");
    survey_jQuery(".box-right .product-info .shadow").css("position", "unset");
    // 상품 리스트 영역 style
    // surveyProductAreaStyle("hide");
  }

  survey_jQuery(".survey_popup_price").css("display", "flex");
  survey_jQuery(".survey_bottom_price").hide();

  if (survey_jQuery(".subscribeBox").length > 0) {
    // survey_jQuery(".box-info").css("overflow-y", "auto");
    // survey_jQuery(".box-info").css("overflow-x", "hidden");
    survey_jQuery(".box-info").css("overflow-y", "unset");
    survey_jQuery(".box-info").css("overflow-x", "unset");
  } else {
    survey_jQuery(".box-info").css("overflow-y", "unset");
    survey_jQuery(".box-info").css("overflow-x", "unset");
  }
}

function surveyCloseBtn() {
  // 상품 리스트 영역 style
  surveyProductAreaStyle("show");

  survey_jQuery(".survey_popup_price").hide();
  survey_jQuery(".survey_bottom_price").show();

  survey_jQuery(".box-info").css("overflow-y", "unset");
  survey_jQuery(".box-info").css("overflow-x", "unset");
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

function surveyGiftBtn() {
  // https://채티스-도메인?gift_key=채티스key&bom_code=샴푸bom_code,트리트먼트
  let bom_code = survey_bom_code.join(",");
  let hash = shoplusGetParameters("hash");

  location.href = `https://gp.chatis.app/gc?gift_code=${survey_gift_key}&bom_code=${bom_code}&hash=${hash}&nick_name=${survey_nick_name}`;
}

async function getSurveyBoms() {
  let survey_ingredient_text_list = [];

  let survey_scent_list = await surveyGetScent();

  for (const bom_code of survey_bom_code) {
    let survey_ingredients = [];
    let bom_info = await getSurveyBom(bom_code, survey_scent_list);
    for (const bom of bom_info) {
      if (bom.ingredients && bom.ingredients.length > 0) {
        for (const ingredient of bom.ingredients) {
          if (survey_ingredients.indexOf(ingredient.RAWCDK) == -1) {
            survey_ingredients.push(ingredient.RAWCDK);
          }
        }
      }
    }
    if (bom_code.indexOf("CHT") > -1) {
      survey_ingredient_text_list.push(
        "<span style='font-weight: bold;'>트리트먼트</span> : " + survey_ingredients.join(", ")
      );
    }
    if (bom_code.indexOf("CSP") > -1) {
      survey_ingredient_text_list.unshift(
        "<span style='font-weight: bold;'>샴푸</span> : " + survey_ingredients.join(", ")
      );
    }
    if (survey_ingredient_text_list.length > 0) {
      let survey_ingredient_text = survey_ingredient_text_list.join("<br>");
      survey_jQuery(".survey_ingredients").html(survey_ingredient_text);
    }
  }
}

async function surveyGetScent() {
  return new Promise(function (resolve, reject) {
    let product_no = Number(survey_product_no);
    if (product_no == survey_set_product_no) {
      product_no = survey_treatment_no;
    }
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/scent`,
      type: "get",
      data: { product_no },
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (e) {},
    });
  });
}

async function getSurveyBom(bom_code, scent_list) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/bom/${bom_code}`,
      type: "get",
      dataType: "json",
      success: function (result) {
        if (bom_code.indexOf("CHT") > -1) {
          for (let bom of result) {
            let find = scent_list.find((e) => e.bulk_code == bom.composition.bulk_code);
            if (find) {
              if (Number(bom.composition.ratio) < 1) {
                survey_jQuery(".survey_scent_type").text("보통");
              } else {
                survey_jQuery(".survey_scent_type").text("강하게");
              }
            }
          }
        }
        if (bom_code.indexOf("CSP") > -1) {
          for (let bom of result) {
            let find = scent_list.find((e) => e.bulk_code == bom.composition.bulk_code);
            if (find) {
              if (Number(bom.composition.ratio) < 1) {
                survey_jQuery(".survey_scent_type").text("보통");
              } else {
                survey_jQuery(".survey_scent_type").text("강하게");
              }
            }
          }
        }
        resolve(result);
      },
      error: function (request, status, error) {
        resolve([]);
      },
    });
  });
}

async function getSurveyCartList() {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/carts`,
      type: "get",
      data: { member_id: survey_member_id },
      dataType: "json",
      success: async function (result) {
        resolve(result);
      },
      error: function (request, status, error) {
        resolve([]);
      },
    });
  });
}
function surveyShowDiagnosis() {
  sessionStorage.setItem("survey_result_show_diagnosis", "click");
  location.href = "/member/login.html";
}

// 세트 장바구니 담기
async function setCafe24SetProductCart(product_no, bundle_product_components, quantity) {
  return new Promise(function (resolve, reject) {
    CAFE24API.init(app_client_id);
    CAFE24API.addBundleProductsCart(
      "A0000",
      "P",
      [
        {
          product_no: product_no, // 세트상품번호
          quantity: quantity,
          bundle_product_components: bundle_product_components,
        },
      ],
      function (err, res) {
        resolve(res);
      }
    );
  });
}
// 슬립
function surveyHeirCareSleep(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(async function () {
      resolve(null);
    }, time);
  });
}

function clickEventStop(e) {
  e.preventDefault();
}

async function surveyGetCafe24SampleProducts() {
  let _survey_shampoo_no = survey_shampoo_no;
  let _survey_treatment_no = survey_treatment_no;
  let _survey_set_product_no = survey_set_product_no;

  if (survey_is_sample_order) {
    let _survey_shampoo = survey_product_list[CAFE24API.MALL_ID].find(
      (e) => e.product_type == "shampoo"
    );
    let _survey_treatment = survey_product_list[CAFE24API.MALL_ID].find(
      (e) => e.product_type == "treatment"
    );
    let _survey_set_product = survey_product_list[CAFE24API.MALL_ID].find(
      (e) => e.product_type == "set_product"
    );
    _survey_shampoo_no = _survey_shampoo.product_no;
    _survey_treatment_no = _survey_treatment.product_no;
    _survey_set_product_no = _survey_set_product.product_no;
  }

  // 샴푸 상품 정보
  let shampoo = await surveyGetCafe24API(
    `/api/v2/products/${_survey_shampoo_no}?embed=discountprice`
  );
  survey_product_resource.shampoo = shampoo.product;

  // 트리트먼트 상품 정보
  let treatment = await surveyGetCafe24API(
    `/api/v2/products/${_survey_treatment_no}?embed=discountprice`
  );
  survey_product_resource.treatment = treatment.product;

  // 세트 상품 정보
  let set_product = await surveyGetCafe24API(
    `/api/v2/products/${_survey_set_product_no}?embed=discountprice`
  );
  survey_product_resource.set_product = set_product.product;

  // 샴푸 품목 정보
  let shampoo_variant = await surveyGetCafe24API(`/api/v2/products/${_survey_shampoo_no}/variants`);
  survey_variant_resource.shampoo = shampoo_variant.variants[0];

  // 트리트먼트 품목 정보
  let treatment_variant = await surveyGetCafe24API(
    `/api/v2/products/${_survey_treatment_no}/variants`
  );
  survey_variant_resource.treatment = treatment_variant.variants[0];

  // 세트 품목 정보
  let set_product_variant = await surveyGetCafe24API(
    `/api/v2/products/${_survey_set_product_no}/variants`
  );
  survey_variant_resource.set_product = set_product_variant.variants[0];

  survey_jQuery("#survey_shampoo").text(survey_product_resource.shampoo.product_name);
  survey_jQuery("#survey_treatment").text(survey_product_resource.treatment.product_name);
  survey_jQuery("#survey_set_product").text(survey_product_resource.set_product.product_name);
}

// 장바구니 담기
async function surveySetHairCareCart(
  product_no,
  bom_code,
  nick_name,
  qna_type = null,
  hash = null,
  quantity = 1,
  product_type
) {
  let bom_code_array = bom_code.split(",");
  for (let code of bom_code_array) {
    if (product_no && code.indexOf("CSP") > -1 && product_type == "shampoo") {
      let variant_code = survey_variant_resource.shampoo.variant_code;
      await setCafe24Cart(product_no, "맞춤형 샴푸 BOM", code, nick_name, variant_code, hash, quantity);
    }
    if (product_no && code.indexOf("CHT") > -1 && product_type == "treatment") {
      let variant_code = survey_variant_resource.treatment.variant_code;
      await setCafe24Cart(product_no, "맞춤형 트리트먼트 BOM", code, nick_name, variant_code, hash, quantity);
    }
  }
}

async function getCafe24BasketProduct(product_no, product_type) {
  return new Promise(function (resolve, reject) {
    CAFE24API.getCartList(function (err, res) {
      for (const survey_basket of res.carts) {
        if (
          product_type == "set_product" &&
          Number(product_no) == Number(survey_basket.product_no)
        ) {
          resolve(false);
        }
      }
      resolve(true);
    });
  });
}

survey_jQuery(".survey_memeber_name").text("");
window.addEventListener(
  "load",
  async function (event) {
    localStorage.removeItem("survey_worry_shampoo_selected");
    localStorage.removeItem("survey_worry_treatment_selected");

    setTimeout(async function () {
      await CAFE24API.getCustomerInfo(async function (err, res) {
        return new Promise(function (resolve, reject) {
          if (err) {
            survey_jQuery(".survey_memeber_name").text("고객");
          } else {
            // res 개체를 통해 응답 메세지를 확인할 수 있습니다.
            if (res && res.customer && res.customer.name) {
              survey_member_id = res.customer.member_id;
              survey_jQuery(".survey_memeber_name").text(res.customer.name);
              survey_jQuery(".sample_buy_btn").text("구매하기");
            } else {
              survey_jQuery(".survey_memeber_name").text("고객");
            }
          }
          resolve(res);
        });
      });
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;
      let hash = shoplusGetParameters("hash");
      let type = shoplusGetParameters("type");
      sessionStorage.setItem("survey_result_product_no", survey_product_no);
      sessionStorage.setItem("survey_result_hash", hash);

      survey_result_diagnosis = null;
      if (hash) {
        await getSurveyConfig();
        await surveyHeirCareSleep(500);
        await getSurveyAllDiagnoses();
        survey_result_diagnosis = await getSurveyResultDiagnoses();
      }

      // setTimeout(async function () {
      setSurveyResult();
      // survey_jQuery("#survey_result").css("visibility", "visible");

      // surveyGetProductVariants();

      await surveyGetCafe24SampleProducts();

      survey_jQuery(".layout-detail").attr("style", "");

      // setTimeout(async function () {
      let mobile_discount_price = Number(
        survey_product_resource.set_product.discountprice.mobile_discount_price
      );
      let mobile_price = Number(survey_product_resource.set_product.price);

      if (survey_is_sample_order) {
        mobile_discount_price = Number(
          survey_product_resource.shampoo.discountprice.mobile_discount_price
        );
        mobile_price = Number(survey_product_resource.shampoo.price);
      }

      let sale_percent = 0;
      if (mobile_price > mobile_discount_price) {
        // 소수점 버림
        sale_percent = Math.floor(((mobile_price - mobile_discount_price) / mobile_price) * 100);
      }
      survey_jQuery("#totalPrice .total-price .total .price").text(
        surveyComma(mobile_discount_price) + "원"
      );
      if (sale_percent > 0) {
        survey_jQuery("#survey_strike").text(mobile_price);
        survey_jQuery("#survey_discount").text(sale_percent + "%");
        survey_jQuery("#survey_strike").show();
        survey_jQuery("#survey_discount").show();
      }

      // 문진 bom 조회
      await getSurveyBoms();
      let bom_code_list = survey_jQuery(".survey_bom_code");
      if (bom_code_list) {
        for (let bom_code of bom_code_list) {
          let bom_code_text = survey_jQuery(bom_code).text();
          if (bom_code_text[0] == "9") {
            survey_jQuery(".survey_is_hairless").text("탈모증상완화 기능성화장품");
          }
        }
      }

      if (!survey_product_resource?.set_product?.product_name) {
        await surveyGetCafe24SampleProducts();
        await surveyHeirCareSleep(500);
      }
      if (survey_product_resource?.set_product?.product_name) {
        survey_jQuery("#survey_set_product").text(
          survey_product_resource?.set_product?.product_name
        );
      }

      survey_gift_key = shoplusGetParameters("gift_key");
      if (survey_gift_key) {
        // 요금 노출 부분 히든
        survey_jQuery(".survey_price_area").hide();
        // 단 하루 무료배송! 히든
        survey_jQuery(".saleLabel").hide();
        // 구매하기 버튼 히든
        survey_jQuery(".btn-buy").hide();

        // 배송지 정보 입력 버튼 노출
        survey_jQuery(".gift_btn").removeClass("displaynone");
        survey_jQuery(".gift_btn").show();
      } else {
        survey_jQuery(".btn-buy").removeClass("displaynone");
        survey_jQuery(".btn-cart").removeClass("displaynone");
        survey_jQuery(".survey_set_product_cart").hide();
      }
      survey_product_type = shoplusGetParameters("product_type");
      if (survey_product_type) {
        if (survey_product_type != "set_product") {
          survey_jQuery(".tab01").hide();
          survey_jQuery(".tab02").hide();
        }
        if (survey_product_type == "shampoo") {
          survey_jQuery(".tab01").click();
        }
        if (survey_product_type == "treatment") {
          survey_jQuery(".tab02").click();
        }
      }
      survey_jQuery(".fixed-box .box-info .box-left .subject .name").text("#" + survey_nick_name);

      setTimeout(function () {
        if (!survey_member_id) {
          survey_jQuery(".total-price-wrap").hide();
          survey_jQuery(".saleLabel").hide();
          survey_jQuery("#survey_join_move").show();
        }

        survey_jQuery("#totalPrice .total-price .price").text(
          surveyComma(mobile_discount_price) + "원"
        );
        survey_jQuery("#totalPrice .total-price .price").css("color", "#FF585D");
        survey_jQuery("#totalPrice .total-price .price").css("font-size", "18px");
        survey_jQuery(".fixed-box").show();
        survey_jQuery("#survey_result").css("visibility", "visible");

        if (survey_result_diagnosis) {
          surveyInputBomCode(survey_result_diagnosis);
        }

        if (survey_is_sample_order === true) {
          // 샘플 주문건이 있을때
          survey_jQuery(".ar").removeClass("displaynone");
          survey_jQuery("#survey_shampoo").parent().removeClass("displaynone");
          survey_jQuery("#survey_treatment").parent().removeClass("displaynone");
          survey_jQuery(".myOptList").removeClass("displaynone");
          survey_jQuery(".sbClose").removeClass("displaynone");
          survey_jQuery(".quantity").css("margin-left", "");
        } else {
          surveyProductSelect("set_product");
        }
      }, 1000);

      // }, 500);
      // }, 500);
    }, 1000);
  },
  false
);
/* 상세페이지 탭 */
survey_jQuery(".detailTab").each(function () {
  var $this = $(this);
  var $btn = $this.find(".btn > li");
  var $con = $this.find(".con > li");
  var current = 0;
  $btn.eq(current).addClass("on");
  $con.eq(current).addClass("on");
  $btn.bind("click", function () {
    current = $btn.index($(this));
    $btn.removeClass("on");
    $btn.eq(current).addClass("on");
    //
    $con.removeClass("on");
    $con.eq(current).addClass("on");
  });
});

survey_jQuery(".tab01").on("click", function () {
  $(".treatment").hide();
  $(".shampoo").show();
});

survey_jQuery(".tab02").on("click", function () {
  $(".shampoo").hide();
  $(".treatment").show();
});

// 장바구니 담기 전 추가 조회
async function getSurveyAddResultDiagnoses() {
  let qna_at = shoplusGetParameters("qna_at");
  if (qna_at && qna_at.indexOf("#progress") > -1) {
    qna_at = qna_at.replace("#progress", "");
  }
  if (qna_at && qna_at.indexOf("#none") > -1) {
    qna_at = qna_at.replace("#none", "");
  }

  qna_at = qna_at.replace(/\./gi, "-");
  qna_at = dayjs(qna_at).format("YYYY-MM-DD");

  let hash = shoplusGetParameters("hash");

  let _survey_diagnosis_result = null;

  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnoses?hash=${hash}&from=${qna_at}&to=${qna_at}`,
      type: "get",
      data: {},
      dataType: "json",
      success: async function (result) {
        for (let diagnoses of result) {
          let set_param = null;
          for (let diagnos of diagnoses) {
            if (set_param == null) {
              set_param = diagnos;
            } else {
              set_param.bom_code.push(diagnos.bom_code[0]);
              set_param.product_id.push(diagnos.product_id[0]);
            }
          }
          _survey_diagnosis_result = set_param;
        }
        let survey_qna_result = Object.assign(
          _survey_diagnosis_result,
          _survey_diagnosis_result.osdl_result
        );

        delete survey_qna_result.osdl_result;
        resolve(survey_qna_result);
      },
    });
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