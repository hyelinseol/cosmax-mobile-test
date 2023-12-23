// 마이쇼핑 - index.html
let survey_diagnosis_result = [];
let is_survey_cart_click = false;
let last_diagnosis_info = null;

// 마이쇼핑 진단내역 - survey_diagnosis_list.html

// 전체 진단 내역
let survey_all_diagnosis_list = {
  all: [], // 전체
  buy: [], // 구매완료
  diagnosis: [], // 진단완료
  progress: [], // 진행중
};

// 저장한 진단 내역
let survey_all_save_list = {
  all: [], // 전체
  buy: [], // 구매완료
  diagnosis: [], // 진단완료
};

async function getSurveyDiagnosis() {
  if (!survey_member_id) {
    for (let i = 0; i < 5; i++) {
      survey_member_id = await surveyGetMemberInfo();
      if (survey_member_id) {
        break;
      }
    }
  }
  if (!survey_member_id) {
    return [];
  }
  let set_param = {
    member_id: survey_member_id,
    from: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  };
  let _survey_diagnosis_result = [];
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis`,
      type: "get",
      data: set_param,
      dataType: "json",
      success: async function (result) {
        /*
        for (const diagnosis of result) {
          survey_diagnosis_result.push(diagnosis);
        }
        resolve(survey_diagnosis_result);
        */
        for (let diagnosis of result) {
          if (diagnosis.product_id.length > 1) {
            for (const diagnosis_product_id of diagnosis.product_id) {
              let keyword = await getSurveyDiagnosisDetail(
                diagnosis.hash,
                diagnosis.qna_at,
                diagnosis_product_id
              );
              if (keyword) {
                if (keyword.type == "shampoo") {
                  diagnosis.osdl_result.point1.shampoo_keyword = keyword.text;
                }
                if (keyword.type == "treatment") {
                  diagnosis.osdl_result.point1.treatment_keyword = keyword.text;
                }
              }
            }
          }
          _survey_diagnosis_result.push(diagnosis);
        }
        resolve(_survey_diagnosis_result);
      },
    });
  });
}
async function getSurveyDiagnosisDetail(hash, qna_at, product_id) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis?hash=${hash}&from=${qna_at}&to=${qna_at}&product_id=${product_id}`,
      type: "get",
      data: {},
      dataType: "json",
      success: function (result) {
        let return_data = { type: "", text: "keyword" };
        if (result[0].bom_code[0].indexOf("CSP") > -1) {
          return_data = { type: "shampoo", text: result[0].osdl_result.point1.shampoo_keyword };
        }
        if (result[0].bom_code[0].indexOf("CHT") > -1) {
          return_data = { type: "treatment", text: result[0].osdl_result.point1.treatment_keyword };
        }
        resolve(return_data);
      },
    });
  });
}
async function getSurveyDiagnoses(from, to) {
  if (!survey_member_id) {
    for (let i = 0; i < 5; i++) {
      survey_member_id = await surveyGetMemberInfo();
      if (survey_member_id) {
        break;
      }
    }
  }
  if (!survey_member_id) {
    return [];
  }
  if (!from) {
    from = dayjs().subtract(6, "month").format("YYYY-MM-DD");
  }
  if (!to) {
    to = dayjs().format("YYYY-MM-DD");
  }
  let set_param = {
    member_id: survey_member_id,
    from,
    to,
  };
  let _survey_diagnosis_result = [];
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnoses`,
      type: "get",
      data: set_param,
      dataType: "json",
      success: async function (result) {
        for (let diagnoses of result) {
          let set_param = null;
          for (let diagnos of diagnoses) {
            if(set_param == null) {
              set_param = diagnos;
            } else {
              set_param.bom_code.push(diagnos.bom_code[0]);
              set_param.product_id.push(diagnos.product_id[0]);
            }
            if (diagnos.product_type == "shampoo") {
              set_param.osdl_result.point1.shampoo_keyword = diagnos.osdl_result.point1.shampoo_keyword;
            }
            if (diagnos.product_type == "treatment") {
              set_param.osdl_result.point1.treatment_keyword = diagnos.osdl_result.point1.treatment_keyword;
            }
          }
          _survey_diagnosis_result.push(set_param);
        }
        resolve(_survey_diagnosis_result);
      },
    });
  });
}
function getSurveyDiagnosesCount() {
  let set_param = {
    member_id: survey_member_id,
    from: dayjs().subtract(6, "month").format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD"),
  };

  survey_jQuery.ajax({
    url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnoses`,
    type: "get",
    data: set_param,
    dataType: "json",
    success: function (result) {
      survey_jQuery("#survey_diagnosis_count").text(result.length);
      survey_jQuery("#survey_sidebar_diagnosis_count").text(result.length);
    },
  });
}

function setSurveyProductHtml(survey_diagnosis) {
  let qna_date = dayjs(survey_diagnosis.qna_at).format("YYYY.MM.DD");
  let qna_type = survey_diagnosis.qna_type;
  let product_no = Number(survey_diagnosis.product_no);
  // 샴푸
  let shampoo_keyword_array = survey_diagnosis.osdl_result.point1.shampoo_keyword.split(" ");
  let shampoo_oily_text = shampoo_keyword_array[0];
  let shampoo_oily_level = shampoo_keyword_array[1].toLowerCase();

  // 트리트먼트
  let treatment_keyword_array = survey_diagnosis.osdl_result.point1.treatment_keyword.split(" ");
  let treatment_oily_text = treatment_keyword_array[0];
  let treatment_oily_level = treatment_keyword_array[1].toLowerCase();

  let fragrance_name = survey_diagnosis.osdl_result.point3.scent.name;
  if (!fragrance_name) {
    fragrance_name = survey_no_fragrance_name;
  }
  let fragrance_image = survey_diagnosis.osdl_result.point3.scent.image;
  if (!fragrance_image) {
    fragrance_image = survey_no_fragrance_image;
  }

  let buy_date = null;
  if (survey_diagnosis.buy_at) {
    buy_date = dayjs(survey_diagnosis.buy_at).format("YYYY.MM.DD");
  }

  let bom_code = survey_diagnosis.bom_code;

  let product_image = null;

  // 샴푸 or 세트
  if (product_no == Number(survey_shampoo_no) || product_no == Number(survey_set_product_no)) {
    product_image =
      "https://ecimg.cafe24img.com/pg115b69008946048/cosmaxtest/web/upload/mynomy/kr/layout/product01.png";
  }
  // 트리트먼트 or 세트
  if (product_no == Number(survey_treatment_no) || product_no == Number(survey_set_product_no)) {
    product_image =
      "https://ecimg.cafe24img.com/pg115b69008946048/cosmaxtest/web/upload/mynomy/kr/layout/product02.png";
  }

  if (product_no == Number(survey_set_product_no)) {
    product_image =
      "https://ecimg.cafe24img.com/pg115b69008946048/cosmaxtest/web/upload/mynomy/kr/layout/product03.png";
  }

  let date_html = `<p class="date"><span>진단일: ${qna_date}</span></p>`;
  let btn_html = `<a href="javascript:void(0);" class="btnWt" onClick="surveyCart(${product_no}, '${bom_code}', '${survey_diagnosis.manage_product_nick_name}', '${survey_diagnosis.qna_type}', '${survey_diagnosis.hash}')" bom_code=${bom_code} >구매하기</a>`;
  // let btn_html = `<a href="/survey/result.html?product_no=${product_no}&hash=${survey_diagnosis.hash}&qna_at=${survey_diagnosis.qna_at}" class="btnWt">구매하기</a>`;
  if (buy_date) {
    date_html = ` <p class="date"><span>구매일: ${buy_date}</span> <span>진단일: ${qna_date}</span></p>`;
    btn_html = `<a href="javascript:void(0);" class="btnWt" onClick="surveyMoveReBuyPage(${product_no}, '${survey_diagnosis.hash}', '${qna_date}')">재구매하기</a>`;
    btn_html += `<a href="#none" class="btnWt">리뷰 쓰기</a>`;
  }

  let result_page = "javascript:void(0);";
  if (qna_type == "qna") {
    result_page = `/survey/result.html?product_no=${product_no}&hash=${survey_diagnosis.hash}&qna_at=${survey_diagnosis.qna_at}`;
  }
  if (qna_type == "re_qna") {
    let qna_at = survey_diagnosis.qna_at;
    if (survey_diagnosis_result && survey_diagnosis_result.length > 0) {
      for (const _diagnosis of survey_diagnosis_result) {
        if (_diagnosis.hash == survey_diagnosis.before_hash) {
          qna_at = _diagnosis.qna_at;
        }
      }
    }
    result_page = `/survey/more_result.html?product_no=${product_no}&hash=${survey_diagnosis.before_hash}&qna_at=${qna_at}&re_qna_hash=${survey_diagnosis.hash}`;
  }

  let html = `
  <div class="treatHisBox">
    <span class="labelFb"></span>
    <p class="trTitle">#${survey_diagnosis.manage_product_nick_name}</p>
    <div class="treatInfo">
        <div class="treatInfoCon">
            <div class="inBox">
                <p class="treatPart">샴푸 <span class="treatLevel"><em>Lv3.</em>지성용</span></p>
                <p class="treatCode">9000000312</p>
            </div>
            <div class="inBox">
                <p class="treatPart">트리트먼트 <span class="treatLevel">Lv3.<em>극손상모용</em></span></p>
                <p class="treatCode">9000000312</p>
            </div>
            <div class="scent">
                <span class="scentImg"><img src="${fragrance_image}" /></span>
                ${fragrance_name}
            </div>
        </div>
        <div class="treatThumb">
            <div class="img"><img src="/web/upload/mynomy/kr/layout/img_prd02.png" alt="상품이미지"></div>
            <p class="treatCate">헤어케어</p>
        </div>
    </div>
    <div class="treatBtns">
        <div class="viewResult">
            <a href="#none">
                <p class="treatDate">진단일 : ${qna_date}</p>
                <p class="goResult"><a href="${result_page}" page="${result_page}">진단결과보기</a></p>
            </a>
        </div>
        <a href="${result_page}" class="btnSq black" 1onClick="surveyCart(${product_no}, '${bom_code}', '${survey_diagnosis.manage_product_nick_name}', '${survey_diagnosis.qna_type}', '${survey_diagnosis.hash}')">구매하기</a>
    </div>
  </div>
  `;

  return html;
}

function setSurveyDiagnosis() {
  survey_jQuery(".diagnosisList").empty();
  let set_html = setSurveyProductListHtml(survey_diagnosis_result);
  if (survey_diagnosis_result.length == 0) {
    set_html =
      '<p class="all_no_data" style="padding: 50px 0; text-align: center; font-size: 16px; color: #555;">내역이 없습니다.</p>';
  } else {
    set_html += `
    <div class="btn-more" onclick="addView()">
      <button>
        <span>더보기</span><img src="/web/upload/mynomy/kr/layout/arrow.png" alt="화살표" />
      </button>
    </div>
    `;
  }
  survey_jQuery(".diagnosisList").append(set_html);
}

// 장바구니 담기
function surveyCart(product_no, bom_code, nick_name, qna_type, hash) {
  if (is_survey_cart_click == true) {
    return;
  }
  is_survey_cart_click = true;
  surveySetCart(product_no, bom_code, nick_name, qna_type, hash);

  setTimeout(function () {
    is_survey_cart_click = false;
    location.href = "/order/basket.html";
  }, 1000);
}

// 진단내역 > 전체 진단 내역 > 전체 조회 ( 기간 조회 )
async function getSurveyDiagnosisByDate(
  search_from = null,
  search_to = null,
  hash = null,
  status = null
) {
  let from = search_from;
  let to = search_to;
  if (!from || !to) {
    from = dayjs().subtract(6, "month").format("YYYY-MM-DD");
    to = dayjs().format("YYYY-MM-DD");
  }
  if (!survey_member_id) {
    for (let i = 0; i < 5; i++) {
      survey_member_id = await surveyGetMemberInfo();
      if (survey_member_id) {
        break;
      }
    }
  }
  if (!survey_member_id) {
    return [];
  }
  let set_param = {
    member_id: survey_member_id,
    from,
    to,
  };

  if (hash) {
    set_param[hash] = hash;
  }
  survey_diagnosis_result = [];
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis`,
      type: "get",
      data: set_param,
      dataType: "json",
      success: async function (result) {
        /*
        for (const diagnosis of result) {
          if (status) {
            if (status == "diagnosis_completion" && diagnosis.buy_at == null) {
              // buy_at
              survey_diagnosis_result.push(diagnosis);
            }
            if (status == "buy_completion" && diagnosis.buy_at) {
              survey_diagnosis_result.push(diagnosis);
            }
          } else {
            survey_diagnosis_result.push(diagnosis);
          }
        }

        // setSurveyDiagnosisByDate(result);
        resolve(result);
        */

        for (let diagnosis of result) {
          if (diagnosis.product_id.length > 1) {
            for (const diagnosis_product_id of diagnosis.product_id) {
              let keyword = await getSurveyDiagnosisDetail(
                diagnosis.hash,
                diagnosis.qna_at,
                diagnosis_product_id
              );
              if (keyword) {
                if (keyword.type == "shampoo") {
                  diagnosis.osdl_result.point1.shampoo_keyword = keyword.text;
                }
                if (keyword.type == "treatment") {
                  diagnosis.osdl_result.point1.treatment_keyword = keyword.text;
                }
              }
            }
          }
          survey_diagnosis_result.push(diagnosis);
        }
        resolve(result);
      },
    });
  });
}

function setSurveyDiagnosisByDate(params) {
  let survey_all_diagnosis_list_all_html = "";
  let survey_all_diagnosis_list_buy_html = "";
  let survey_all_diagnosis_list_diagnosis_html = "";

  let survey_all_diagnosis_list_buy_count = 0;
  let survey_all_diagnosis_list_diagnosis_count = 0;

  for (const survey_diagnosis of params) {
    const html = setSurveyProductHtml(survey_diagnosis);
    survey_all_diagnosis_list_all_html += html;

    if (survey_diagnosis.buy_at) {
      survey_all_diagnosis_list_buy_html += html;
      survey_all_diagnosis_list_buy_count++;
    } else {
      survey_all_diagnosis_list_diagnosis_html += html;
      survey_all_diagnosis_list_diagnosis_count++;
    }
  }

  survey_jQuery(".survey_all_diagnosis_list_all").empty();
  if (survey_all_diagnosis_list_all_html) {
    survey_jQuery(".survey_all_diagnosis_list_all").append(survey_all_diagnosis_list_all_html);
  } else {
    survey_jQuery(".survey_all_diagnosis_list_all").after(
      '<p class="all_no_data" style="padding: 50px 0; text-align: center; font-size: 16px; color: #555;">내역이 없습니다.</p>'
    );
  }

  survey_jQuery(".survey_all_diagnosis_list_all").show();

  survey_jQuery(".survey_all_diagnosis_list_buy").empty();
  if (survey_all_diagnosis_list_buy_html) {
    survey_jQuery(".survey_all_diagnosis_list_buy").append(survey_all_diagnosis_list_buy_html);
  } else {
    survey_jQuery(".survey_all_diagnosis_list_buy").after(
      '<p class="buy_no_data" style="padding: 50px 0; text-align: center; font-size: 16px; color: #555;">내역이 없습니다.</p>'
    );
  }

  survey_jQuery(".survey_all_diagnosis_list_buy").attr(
    "count",
    survey_all_diagnosis_list_buy_count
  );
  survey_jQuery(".survey_all_diagnosis_list_buy").show();

  survey_jQuery(".survey_all_diagnosis_list_diagnosis").empty();
  survey_jQuery(".survey_all_diagnosis_list_diagnosis").attr(
    "count",
    survey_all_diagnosis_list_diagnosis_count
  );

  if (survey_all_diagnosis_list_diagnosis_html) {
    survey_jQuery(".survey_all_diagnosis_list_diagnosis").append(
      survey_all_diagnosis_list_diagnosis_html
    );
  } else {
    survey_jQuery(".survey_all_diagnosis_list_diagnosis").after(
      '<p class="diagnosis_no_data" style="padding: 50px 0; text-align: center; font-size: 16px; color: #555;">내역이 없습니다.</p>'
    );
  }
  survey_jQuery(".survey_all_diagnosis_list_diagnosis").show();
}

// 진단내역 최근6개월 ~ 최근 1개월 버튼 클릭 시 호출
function surveySearchDate(e) {
  //
  let month = survey_jQuery(e).attr("month");
  let from = dayjs().subtract(month, "month").format("YYYY-MM-DD");
  let to = dayjs().format("YYYY-MM-DD");
  getSurveyDiagnosisByDate(from, to);
}

function surveyChangeDate(e) {
  let date = survey_jQuery(e).val();
  let from = date + "-01";
  let to = date + "-" + dayjs(date).daysInMonth();
  getSurveyDiagnosisByDate(from, to);
}

function setDateYm() {
  let month_count = 6;
  survey_jQuery("#survey_search_date").empty();
  for (let i = 0; i <= month_count; i++) {
    let text = dayjs().subtract(i, "month").format("YYYY년 MM월");
    let start_date = dayjs().subtract(i, "month").format("YYYY-MM");
    let html = `<option value="${start_date}">${text}</option>`;
    survey_jQuery("#survey_search_date").append(html);
  }
}

function surveyGetAjax(url) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url,
      type: "GET",
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve(null);
      },
    });
  });
}

// 임시저장 조회 (진단이어하기)
async function getSurveyStorage() {
  survey_jQuery(".progress").remove();
  let storage_array = [];

  let product_no_array = [survey_shampoo_no, survey_treatment_no, survey_set_product_no];

  for (const product_no of product_no_array) {
    let result = await surveyGetAjax(
      `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${product_no}/storage?member_id=${survey_member_id}`
    );
    if (result) {
      storage_array[product_no] = result;
    }
  }

  let product_html = "";
  let count = 0;
  for (const storage in storage_array) {
    if (storage_array[storage] && storage_array[storage].result_status == "N" && count < 2) {
      const date = dayjs(storage_array[storage].updated_at).format("YYYY.MM.DD");
      product_html += `
        <div class="prog_quiz">
            <dl class="prog_dl">
                <dt>
                    <img src="//ecimg.cafe24img.com/pg115b69008946048/cosmaxtest/web/upload/mynomy/kr/layout/thum_prd01.png" alt="상품이미지" />
                </dt>
                <dd>
                    <p class="date">${date}</p>
                    <a href="${survey_skin_path}/survey?product_no=${storage}&type=connect" class="sentence">
                        <span>헤어케어퀴즈</span>
                        <strong>이어하기</strong>
                        <span class="arr_top"></span>
                    </a>
                </dd>
            </dl>
        </div>
      `;
      count++;
    }
  }

  if (product_html) {
    let progress_html = `
    <div class="progress">
        <a href="#none" class="see_more">
            더보기<span class="arr">></span>
        </a>
        <div class="prog_txt">
            <h3>진단중</h3>
            <p>진단을 끝까지 완료하지 않아<br/>임시저장된 진단이 있어요.<br/>진단을 마무리하고 나만의 처방 결과를 알아보세요!</p>
        </div>
        ${product_html}
        <!-- <div class="mBtn gColumn">
            <a href="#none" class="btnBl">진단 이어하기 <i class="xi-long-arrow-right"></i></a>
        </div> -->
    </div>
    `;
    // /myshop/index.html
    survey_jQuery(".myshop_diagnosisState").after(progress_html);
    // diagnosis_list.html
    survey_jQuery(".prdTab").after(progress_html);
  }
}

function surveyMoveReBuyPage(product_no, hash, qna_at) {
  if (product_no && hash) {
    location.href = `${survey_skin_path}/myshop/mypage/repurchase_set.html?product_no=${product_no}&hash=${hash}&qna_at=${qna_at}`;
  }
}

async function getSurveyDiagnosisByHash(search_from = null, search_to = null, hash = null) {
  let product_no = shoplusGetParameters("product_no");
  let from = search_from;
  let to = search_to;
  if (!from || !to) {
    from = dayjs().subtract(6, "month").format("YYYY-MM-DD");
    to = dayjs().format("YYYY-MM-DD");
  }

  let set_param = {
    member_id: survey_member_id,
    from,
    to,
  };

  if (hash) {
    set_param["hash"] = hash;
  }
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis`,
      type: "get",
      data: set_param,
      dataType: "json",
      success: function (result) {
        console.log("result", result);
        for (const diagnosis of result) {
          if (diagnosis.hash == hash) {
            const qna_at = dayjs(diagnosis.qna_at).format("YYYY-MM-DD");

            let bom_code = diagnosis.bom_code;
            for (const bom of diagnosis.bom_code) {
              if (Number(product_no) == survey_shampoo_no && bom.indexOf("CSP") > -1) {
                bom_code = bom;
              }
              if (Number(product_no) == survey_treatment_no && bom.indexOf("CHT") > -1) {
                bom_code = bom;
              }
            }
            let result_path = ``;
            if (diagnosis.qna_type == "qna") {
              result_path = `${survey_skin_path}/survey/result.html?product_no=${product_no}&hash=${diagnosis.hash}&qna_at=${qna_at}`;
            } else {
              result_path = `${survey_skin_path}/survey/more_result.html?product_no=${product_no}&hash=${diagnosis.before_hash}&qna_at=${qna_at}&re_qna_hash=${diagnosis.hash}`;
            }
            survey_jQuery("#survey_same_product_re_buy").attr("href", result_path);
            survey_jQuery("#survey_feedback_re_buy").attr(
              "href",
              `${survey_skin_path}/survey/more.html?product_no=${product_no}&hash=${diagnosis.hash}&qna_at=${qna_at}`
            );
          }
        }
        resolve(result);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve([]);
      },
    });
  });
}

function setProductType(product_no) {
  if (Number(product_no) == Number(survey_shampoo_no)) {
    survey_jQuery("#survey_product_type").text("샴푸");
  }
  if (Number(product_no) == Number(survey_treatment_no)) {
    survey_jQuery("#survey_product_type").text("트리트먼트");
  }
  if (Number(product_no) == Number(survey_set_product_no)) {
    survey_jQuery("#survey_product_type").text("세트");
  }
}

function setSurveyProductListHtml(survey_diagnosis) {
  let html = "";
  let product_image = "";

  for (const diagnosis of survey_diagnosis) {
    if (!diagnosis.buy_at) {
      // continue;
    }

    let shampoo_keyword = diagnosis.osdl_result.point1.shampoo_keyword;
    let shampoo_keyword_array = shampoo_keyword.split(" ");
    let treatment_keyword = diagnosis.osdl_result.point1.treatment_keyword;
    let treatment_keyword_array = treatment_keyword.split(" ");

    let shampoo_oily_text = shampoo_keyword_array[0];
    let shampoo_oily_level = "";
    if (shampoo_keyword_array[1]) {
      shampoo_oily_level = shampoo_keyword_array[1].toLowerCase();
    }
    let treatment_oily_text = treatment_keyword_array[0];
    let treatment_oily_level = "";
    if (treatment_keyword_array[1]) {
      treatment_oily_level = treatment_keyword_array[1].toLowerCase();
    }

    if (Number(diagnosis.product_no) == survey_shampoo_no) {
      product_image = survey_product_resource.shampoo.list_image;
    } else if (Number(diagnosis.product_no) == survey_treatment_no) {
      product_image = survey_product_resource.treatment.list_image;
    } else {
      product_image = survey_product_resource.set_product.list_image;
    }

    let shampoo_style = "display: none";
    let treatment_style = "display: none";
    let shampoo_bom = "";
    let treatment_bom = "";
    for (let code of diagnosis.bom_code) {
      if (code.indexOf("CSP") > -1) {
        shampoo_style = "";
        shampoo_bom = code.substr(10, 10);
      }
      if (code.indexOf("CHT") > -1) {
        treatment_style = "";
        treatment_bom = code.substr(10, 10);
      }
    }

    let qna_at = dayjs(diagnosis.qna_at).format("YYYY.MM.DD");

    let result_page = "javascript:void(0);";
    if (diagnosis.qna_type == "qna") {
      result_page = `${survey_skin_path}/survey/result.html?product_no=${diagnosis.product_no}&hash=${diagnosis.hash}&qna_at=${qna_at}`;
    }
    if (diagnosis.qna_type == "re_qna") {
      if (survey_diagnosis_result && survey_diagnosis_result.length > 0) {
        for (const _diagnosis of survey_diagnosis_result) {
          if (_diagnosis.hash == diagnosis.before_hash) {
            // qna_at = dayjs(_diagnosis.qna_at).format("YYYY.MM.DD");
          }
        }
      }
      result_page = `${survey_skin_path}/survey/more_result.html?product_no=${diagnosis.product_no}&hash=${diagnosis.before_hash}&qna_at=${qna_at}&re_qna_hash=${diagnosis.hash}`;
    }

    let scent_name = diagnosis.osdl_result.point3.scent.name || "Fragrance Free";
    let scent_image = diagnosis.osdl_result.point3.scent.image || survey_no_fragrance_image;

    let add_label = "";
    if (diagnosis.before_hash) {
      add_label = "<span class='labelFb'></span>";
    }

    html += `
    <div class="treatHisBox" style="display: none" nick_name="${diagnosis.manage_product_nick_name}">
      <span class="delHis"><a href="javascript:deleteSurveyDiagnosis('${diagnosis.hash}')" title="진단내역 삭제"></a></span>
      ${add_label}
      <p class="trTitle">#${diagnosis.manage_product_nick_name}</p>
      <div class="treatInfo">
          <div class="treatInfoCon">
              <div class="inBox" style="${shampoo_style}">
                  <p class="treatPart">샴푸 <span class="treatLevel"><em>${shampoo_oily_level}.</em>${shampoo_oily_text}</span></p>
                  <p class="treatCode">${shampoo_bom}</p>
              </div>
              <div class="inBox" style="${treatment_style}">
                  <p class="treatPart">트리트먼트 <span class="treatLevel">${treatment_oily_level}.<em>${treatment_oily_text}</em></span></p>
                  <p class="treatCode">${treatment_bom}</p>
              </div>
              <div class="scent">
                  <span class="scentImg"><img src="${scent_image}" /></span>
                  ${scent_name}
              </div>
          </div>
          <div class="treatThumb">
              <div class="img"><img src="${product_image}" alt="상품이미지"></div>
              <p class="treatCate">헤어케어</p>
          </div>
      </div>
      <div class="treatBtns">
          <div class="viewResult">
              <a href="${result_page}">
                  <p class="treatDate">진단일 : ${qna_at}</p>
                  <p class="goResult">진단결과보기</p>
              </a>
          </div>
          <a href="${result_page}" class="btnSq black" 1onClick="surveyCart(${diagnosis.product_no}, '${diagnosis.bom_code}', '${diagnosis.manage_product_nick_name}', '${diagnosis.qna_type}', '${diagnosis.hash}')">구매하기</a>
      </div>
    </div>`;
  }
  if (!html) {
    html =
      "<p style='padding: 50px 0; text-align: center; font-size: 16px; color: #555; font-weight: 400;'>주문 내역이 없습니다.</p>";
  }
  return html;
}

async function surveySearchSiagnosisIng() {
  let product_no_array = [survey_shampoo_no, survey_treatment_no, survey_set_product_no];
  let retrun_array = [];

  for (const product_no of product_no_array) {
    let result = await surveyGetAjax(
      `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${product_no}/storage?member_id=${survey_member_id}`
    );
    if (result && result.result_status == "N") {
      result.product_no = product_no;
      retrun_array.push(result);
    }
  }
  return retrun_array;
}

function surveySetSiagnosisIng(params) {
  let html = "";
  let product_image = "";
  let shampoo_style = "display: none";
  let treatment_style = "display: none";
  for (const param in params) {
    let product_name = "";
    if (Number(param.product_no) == survey_shampoo_no) {
      product_image =
        "//ecimg.cafe24img.com/pg115b69008946048/cosmaxtest/web/upload/mynomy/kr/layout/img_prd01.png";
      product_name = survey_shampoo_name;
      shampoo_style = "";
    } else if (Number(param.product_no) == survey_treatment_no) {
      product_image =
        "//ecimg.cafe24img.com/pg115b69008946048/cosmaxtest/web/upload/mynomy/kr/layout/img_prd03.png";
      product_name = survey_treatment_name;
      treatment_style = "";
    } else {
      product_image =
        "//ecimg.cafe24img.com/pg115b69008946048/cosmaxtest/web/upload/mynomy/kr/layout/img_prd02.png";
      product_name = survey_set_product_name;
      shampoo_style = "";
      treatment_style = "";
    }

    let qna_at = dayjs(param.qna_at).format("YYYY.MM.DD");

    html += `
    <div class="treatHisBox" qna_at="${qna_at}">
      <span class="labelFb"></span>
      <p class="trTitle">#헤어케어</p>
      <div class="treatInfo">
          <div class="treatInfoCon">
              <div class="inBox" style="${shampoo_style}">
                  <p class="treatPart">샴푸 <span class="treatLevel" style="visibility: hidden;"><em>-</em>-</span></p>
                  <p class="treatCode">-</p>
              </div>
              <div class="inBox" style="${treatment_style}">
                  <p class="treatPart">트리트먼트 <span class="treatLevel" style="visibility: hidden;">-<em>-</em></span></p>
                  <p class="treatCode">-</p>
              </div>
              <div class="scent" style="visibility: hidden;">
                  <span class="scentImg"><img src="${survey_no_fragrance_image}" /></span>
                  -
              </div>
          </div>
          <div class="treatThumb">
              <div class="img"><img src="${product_image}" alt="상품이미지"></div>
              <p class="treatCate">헤어케어</p>
          </div>
      </div>
      <div class="treatBtns">
          <div class="viewResult">
              <a href="javascript:void(0);">
                  <p class="treatDate">진단일 : ${qna_at}</p>
                  <p class="goResult" style="visibility: hidden;">진단결과보기</p>
              </a>
          </div>
          <a href="javascript:void(0)" class="btnSq black" style="visibility: hidden;">구매하기</a>
      </div>
    </div>`;
  }
  html = "";
  survey_jQuery(".diagnosisList").empty(html);
  survey_jQuery(".diagnosisList").append(html);
}

// 게시판 조회
async function getSurveyBoard() {
  if (!survey_member_id) {
    return;
  }
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/boards?board_no=${survey_board_no}&member_id=${survey_member_id}`,
      type: "GET",
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve([]);
      },
    });
  });
}

function setSurveyBoardReadStatus(params) {
  if (!params || params.length == 0) {
    return;
  }

  let is_read = true;
  for (let param of params) {
    if (param.reply_status == "C" && param.read_status == "unread") {
      is_read = false;
    }
  }
  if (is_read == false) {
    survey_jQuery("#survey_board_link").addClass("on");
  }
}

// 주문 count 조회
async function getSurveyOrderCount(order_status, start_date, end_date) {
  if (!survey_member_id) {
    for (let i = 0; i < 5; i++) {
      survey_member_id = await surveyGetMemberInfo();
      if (survey_member_id) {
        break;
      }
    }
  }

  if (!survey_member_id) {
    return [];
  }
  let set_param = {
    member_id: survey_member_id,
    start_date,
    end_date,
    order_status,
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/order/count`,
      type: "GET",
      data: set_param,
      dataType: "json",
      success: function (result) {
        resolve(result.count);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve([]);
      },
    });
  });
}

// 주문 조회
async function getSurveyOrder(order_status, start_date, end_date) {
  if (!survey_member_id) {
    for (let i = 0; i < 5; i++) {
      survey_member_id = await surveyGetMemberInfo();
      if (survey_member_id) {
        break;
      }
    }
  }

  if (!survey_member_id) {
    return [];
  }
  let set_param = {
    member_id: survey_member_id,
    start_date,
    end_date,
    order_status,
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/order`,
      type: "GET",
      data: set_param,
      dataType: "json",
      success: function (result) {
        resolve(result.count);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve([]);
      },
    });
  });
}

async function surveyGetMemberInfo() {
  return new Promise(async function (resolve, reject) {
    await setTimeout(async function () {
      await CAFE24API.getCustomerInfo(async function (err, res) {
          if (res) {
            if (res.customer && res.customer.member_id) {
              resolve(res.customer.member_id);
            }
          } else {
            resolve(null);
          }
      });
    }, 10);
  });
}

// 주문 삭제
async function deleteSurveyDiagnosis(hash) {

  if (!survey_member_id || !hash) {
    return;
  }

  if (confirm("해당 진단내역을 삭제하시겠습니까?")) {    
    return new Promise(function (resolve, reject) {
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis?member_id=${survey_member_id}&hash=${hash}`,
        type: "DELETE",
        success: function (result) {
          console.log("result", result);
          if (result.length == 0) {
            alert("삭제되었습니다.");
            location.reload();
          } else {
            alert("해당 진단 내역으로 주문한 이력이 있습니다.\n주문이력과 피드백루프를 위해 삭제할 수 없습니다.");
          }
          resolve(result);
        },
        error: function (request, status, error) {
          console.log(request, status, error);
          resolve([]);
        },
      });
    });
  }
}