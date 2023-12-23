survey_member_id = null;

// 이전 문진 결과 담은 변수
let survey_befor_qna = {
  shampoo: null,
  treatment: null,
};

let survey_product_no = Number(shoplusGetParameters("product_no"));
let survey_hash = shoplusGetParameters("hash");
let survey_re_qna_hash = shoplusGetParameters("re_qna_hash");
let survey_qna_at = shoplusGetParameters("qna_at");

let survey_shampoo_qna_result = null;
let survey_treatment_qna_result = null;

// 이전 문진 전송 데이터
let qna_send_data = null;

// 재문진 전송 데이터
let re_qna_send_data = null;

let is_survey_more_result_cart_click = false;

// 장바구니담기, 구매하기 버튼 클릭 시 체크용
let survey_re_qna_info = null;

let survey_befor_bom = null;

let survey_re_qna_result_info = null;

let survey_ingredient_list = [];

const survey_ampoule_code_images = [
  // 딥클린 콤플렉스™
  {
    bulk_code: "3C2A00001110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple02.gif"
  },
  // 피록톤올아민
  {
    bulk_code: "3C2A00002110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple03.gif"
  },
  // 멘톨 & 허브쿨
  {
    bulk_code: "3C2A00003110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple04.gif"
  },
  // 판테놀 & 아쿠아씰
  {
    bulk_code: "3C2A00004110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple08.gif"
  },
  // 미라클미네랄
  {
    bulk_code: "3C2A00006110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple07.gif"
  },
  // 엔젤링 콤플렉스™
  {
    bulk_code: "3C2A00007110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple11.gif"
  },
  // 프로텍션 콤플렉스™
  {
    bulk_code: "3C2A00008110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple09.gif"
  },
  // 세범컨트롤 콤플렉스™
  {
    bulk_code: "3C2A11980110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple05.gif"
  },
  // 돌콩배아추출물
  {
    bulk_code: "3C2A11984110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple01.gif"
  },
  // 너리싱 콤플렉스™
  {
    bulk_code: "3C2A11982110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple10.gif"
  },
  // 자라나리옴
  {
    bulk_code: "3C2A11981110",
    image: "https://threewaau.cafe24.com/web/upload/mynomy/kr/prd/emple06.gif"
  },
];

// 문진 결과 조회
async function getSurveyMoreResultDiagnosis(hash, from, to, product_id) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis`,
      type: "get",
      data: {
        hash,
        from: dayjs(from).format("YYYY-MM-DD"),
        to: dayjs(to).format("YYYY-MM-DD"),
        product_id,
      },
      dataType: "json",
      success: async function (result) {
        resolve(result[0]);
      },
    });
  });
}

// 이전 문진 정보 체크
function setSurveyBeforQnaInfo(params) {
  // 샴푸
  if (params.bom_code[0].indexOf("CSP") > -1) {
    survey_befor_qna.shampoo = params;
  }
  // 트리트먼트
  if (params.bom_code[0].indexOf("CHT") > -1) {
    survey_befor_qna.treatment = params;
  }
}

// 화면 노출
async function setSurveyMoreResultDiagnosis(params) {
  let survey_target = "";
  let sub_survey_target = "";
  let befor_result = null;

  // 샴푸
  if (params.bom_code[0].indexOf("CSP") > -1) {
    survey_target = "#survey_re_shampoo_area";
    sub_survey_target = "#survey_shampoo_area";
    befor_result = survey_befor_qna.shampoo;
  }
  // 트리트먼트
  if (params.bom_code[0].indexOf("CHT") > -1) {
    survey_target = "#survey_re_treatmen_area";
    sub_survey_target = "#survey_treatmen_area";
    befor_result = survey_befor_qna.treatment;
  }

  // 재문진 전송 내용 조회
  re_qna_send_data = await getSurveySendData(survey_re_qna_hash);

  // 이전 문진 전송 내용 조회
  qna_send_data = await getSurveySendData(survey_hash);
  // BOM_CODE 입력
  survey_jQuery(survey_target + " .survey_bom_code").text(
    params.bom_code[0].substr(survey_bom_cut_start, survey_bom_cut_end)
  );
  survey_jQuery(sub_survey_target + " .survey_bom_code").text(
    params.bom_code[0].substr(survey_bom_cut_start, survey_bom_cut_end)
  );

  // 나만을 위한 세정-영양 밸런스 입력
  if (survey_target == "#survey_re_shampoo_area") {
    let shampoo_pc_point = surveyEnterBr(params.osdl_result.point1.shampoo_pc_point);
    survey_jQuery(sub_survey_target + " #shampoo_pc_point").html(shampoo_pc_point);
  } else {
    let treatment_pc_point = surveyEnterBr(params.osdl_result.point1.treatment_pc_point);
    survey_jQuery(sub_survey_target + " #treatment_pc_point").html(treatment_pc_point);
  }

  // 변경 전/후 level icon 노출
  setSurveyDiffLevel(survey_target, params, befor_result);

  // 선택한 고민 노출
  let survey_worry_array = await setSurveyWorrySelect(survey_target);

  // 이전 문진 선택한 고민 노출
  let survey_befor_worry_array = await setSurveyBeforWorrySelect(
    survey_target,
    befor_result.qna_type
  );

  // 앰플 노출
  await setSurveyAmpoule(survey_target, params);

  // 향 노출
  setSurveyScent(survey_target, params);

  // osdl 타입 입력
  survey_jQuery(".survey_osdl_type").text(
    befor_result.osdl_result.osdl.scalp +
      befor_result.osdl_result.osdl.sensitive +
      befor_result.osdl_result.osdl.hair +
      befor_result.osdl_result.osdl.hair_loss +
      " 타입"
  );

  // OSDL 노출 (샴푸, 트리트먼트 공통 페이지)
  // setSurveyOSDL(params);
  setSurveyOSDL(befor_result, survey_target);

  // sub_survey_target
  setSurveySubDiagnosis(sub_survey_target, params, survey_worry_array);

  if (survey_product_no == survey_shampoo_no || survey_product_no == survey_treatment_no) {
    // survey_jQuery(".btnArea").hide();
    survey_jQuery(".tab01").hide();
    survey_jQuery(".tab02").hide();
    // survey_jQuery(".tabWrap").removeClass("tabWrap");
    survey_jQuery(".con").css("padding-top", "0px");
  }

  if (survey_product_no == survey_treatment_no) {
    survey_jQuery(".tab02").click();
  }

  if (survey_product_no == survey_set_product_no) {
    survey_jQuery(".tab01").show();
    survey_jQuery(".tab02").show();
  }
}

// 변경 전/후 level icon 노출
function setSurveyDiffLevel(survey_target, params, befor_result) {
  let left_percent = 0;
  if (params.osdl_result.point1.sequence == 1) {
    left_percent = 16;
  }
  if (params.osdl_result.point1.sequence == 2) {
    left_percent = 34;
  }
  if (params.osdl_result.point1.sequence == 3) {
    left_percent = 50;
  }
  if (params.osdl_result.point1.sequence == 4) {
    left_percent = 66;
  }
  if (params.osdl_result.point1.sequence == 5) {
    left_percent = 83;
  }
  if (params.osdl_result.point1.sequence == 6) {
    left_percent = 100;
  }

  let befor_left_percent = 0;
  if (befor_result.osdl_result.point1.sequence == 1) {
    befor_left_percent = 16;
  }
  if (befor_result.osdl_result.point1.sequence == 2) {
    befor_left_percent = 34;
  }
  if (befor_result.osdl_result.point1.sequence == 3) {
    befor_left_percent = 50;
  }
  if (befor_result.osdl_result.point1.sequence == 4) {
    befor_left_percent = 66;
  }
  if (befor_result.osdl_result.point1.sequence == 5) {
    befor_left_percent = 83;
  }
  if (befor_result.osdl_result.point1.sequence == 6) {
    befor_left_percent = 100;
  }

  if (survey_target == "#survey_re_shampoo_area") {
    // 변경 후 level
    let shampoo_keyword = params.osdl_result.point1.shampoo_keyword.split(" ");
    // let left_px = params.osdl_result.point1.sequence * 80;
    survey_jQuery(survey_target + " .after_level").css("left", left_percent + "%");
    survey_jQuery(survey_target + " .after_keyword").text(shampoo_keyword[0]);
    survey_jQuery(survey_target + " .after_keyword_level").text(shampoo_keyword[1]);
    // 변경 전 lvel
    let befor_shampoo_keyword = befor_result.osdl_result.point1.shampoo_keyword.split(" ");

    // 변경 전과 변경 후가 다를경우 노출: 변경 전과 동일 시 변경 후만 노출 하기 위함
    if (
      Number(params.osdl_result.point1.sequence) != Number(befor_result.osdl_result.point1.sequence)
    ) {
      // let befor_left_px = befor_result.osdl_result.point1.sequence * 80;
      survey_jQuery(survey_target + " .befor_level").css("left", befor_left_percent + "%");
      survey_jQuery(survey_target + " .befor_keyword").text(befor_shampoo_keyword[0]);
      survey_jQuery(survey_target + " .befor_keyword_level").text(befor_shampoo_keyword[1]);
    } else {
      survey_jQuery(survey_target + " .befor_level").hide();
    }
    let find = re_qna_send_data.surveys.find(
      (e) => Number(e.product_no) == Number(survey_shampoo_no)
    );
    let scent_find = find.survey_section.find((e) => e.type == "base");
    if (scent_find) {
      let _html = "";
      if (scent_find.score > 0) {
        _html = "<strong>세정력이 강화되어<br>더 개운해졌어요</strong>";
      } else if (scent_find.score == 0) {
        _html = "<strong>만족스러웠던 세정력을<br>그대로 유지했어요</strong>";
      } else {
        _html = "<strong>부드러운 모발을 위해<br>영양감을 강화했어요</strong>";
      }
      survey_jQuery(survey_target + " .survey_re_shampoo_point").html(_html);
    }
  } else {
    // 변경 후 level
    let treatment_keyword = params.osdl_result.point1.treatment_keyword.split(" ");
    // let treatment_left_px = params.osdl_result.point1.sequence * 80;
    survey_jQuery(survey_target + " .after_level").css("left", left_percent + "%");
    survey_jQuery(survey_target + " .after_keyword").text(treatment_keyword[0]);
    survey_jQuery(survey_target + " .after_keyword_level").text(treatment_keyword[1]);
    // 변경 전 lvel
    let befor_treatment_keyword = befor_result.osdl_result.point1.treatment_keyword.split(" ");

    // 변경 전과 변경 후가 다를경우 노출: 변경 전과 동일 시 변경 후만 노출 하기 위함
    if (
      Number(params.osdl_result.point1.sequence) != Number(befor_result.osdl_result.point1.sequence)
    ) {
      // let befor_left_px = befor_result.osdl_result.point1.sequence * 80;
      survey_jQuery(survey_target + " .befor_level").css("left", befor_left_percent + "%");
      survey_jQuery(survey_target + " .befor_keyword").text(befor_treatment_keyword[0]);
      survey_jQuery(survey_target + " .befor_keyword_level").text(befor_treatment_keyword[1]);
      if (
        params.osdl_result.point1.treatment_keyword ==
        befor_result.osdl_result.point1.treatment_keyword
      ) {
        survey_jQuery(survey_target + " .befor_level").hide();
      }
    } else {
      survey_jQuery(survey_target + " .befor_level").hide();
    }
    let find = re_qna_send_data.surveys.find(
      (e) => Number(e.product_no) == Number(survey_treatment_no)
    );
    let scent_find = find.survey_section.find((e) => e.type == "base");
    if (scent_find) {
      let _html = "";
      if (scent_find.score > 0) {
        _html = "<strong>너무 기름지지 않도록<br>가벼운 사용감으로 조정했어요</strong>";
      } else if (scent_find.score == 0) {
        _html = "<strong>만족스러웠던 영양감을<br>그대로 유지했어요</strong>";
      } else {
        _html = "<strong>영양감이 강화되어<br>더 부드러워졌어요</strong>";
      }
      survey_jQuery(survey_target + " .survey_re_shampoo_point").html(_html);
    }
  }
}

// 엠플 노출
async function setSurveyAmpoule(survey_target, params) {
  // 이전 문진 결과 담은 변수
  let befor_qna_result = {};
  // 재문진 전송 데이터
  let send_data = {};
  if (survey_target == "#survey_re_shampoo_area") {
    befor_qna_result = survey_befor_qna.shampoo;
    send_data = re_qna_send_data.surveys.find((e) => Number(e.product_no) == survey_shampoo_no);
  } else {
    befor_qna_result = survey_befor_qna.treatment;
    send_data = re_qna_send_data.surveys.find((e) => Number(e.product_no) == survey_treatment_no);
  }
  survey_befor_bom = await getSurveyBom(befor_qna_result.bom_code[0]);
  let befor_ampoule = searchSurveyBomAmpoule(survey_befor_bom);
  let param_bom = await getSurveyBom(params.bom_code[0]);
  // for (const bom of param_bom) {
  //   for (const ingredient of bom.ingredients) {
  //     survey_ingredient_list.push(ingredient);
  //   }
  // }
  let param_ampoule = searchSurveyBomAmpoule(param_bom);

  // 앰플 노출
  let ampoule_html = "";
  let count = 0;
  for (const ampoule of params.osdl_result.point2.ampoules) {
    // 이름 내려쓰기
    let ampoule_name_array = ampoule.name.split("\n");
    let ampoule_name = ampoule_name_array[0];
    if (ampoule_name_array.length > 1) {
      ampoule_name += `<span>${ampoule_name_array[1]}</span>`;
    }
    // 설명 내려쓰기
    let ampoule_description = surveyEnterBr(ampoule.description);
    let icon_html = '<div class="icoArea iconew"><strong>NEW</strong></div>';
    let find_befor_ampoule = befor_ampoule.find((e) => e.bulk_code == ampoule.bulk_code);
    if (find_befor_ampoule) {
      let find_param_ampoule = param_ampoule.find((e) => e.bulk_code == ampoule.bulk_code);
      if (find_param_ampoule) {
        if (find_param_ampoule.ratio > find_befor_ampoule.ratio) {
          icon_html = '<div class="icoArea icoup"><strong class="up">강화</strong></div>';
        }
        if (find_param_ampoule.ratio == find_befor_ampoule.ratio) {
          icon_html = '<div class="icoArea icokeep"><strong class="keep">유지</strong></div>';
        }
        if (find_param_ampoule.ratio < find_befor_ampoule.ratio) {
          icon_html = '<div class="icoArea icodown"><strong class="down">약화</strong></div>';
        }
      }
    }

    ampoule_html += `
      <li>
        ${icon_html}
        <div class="titArea">
          ${ampoule_name}
        </div>
        <div class="contArea">
          <p>
            ${ampoule_description}
          </p>
        </div>
      </li>
    `;
    count++;
  }
  survey_jQuery(survey_target + " .survey_ampoules_simple_area").empty();
  survey_jQuery(survey_target + " .survey_ampoules_simple_area").append(ampoule_html);
}

async function getSurveySendData(hash) {
  if (!survey_member_id) {
    for (let i = 0; i < 5; i++) {
      survey_member_id = await surveyGetMemberInfo();
      if (survey_member_id) {
        break;
      }
    }
  }
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}/send`,
      type: "get",
      data: {
        member_id: survey_member_id,
        hash,
      },
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
    });
  });
}

// 문진 조회
async function getSurveyQna(product_no) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${product_no}`,
      type: "get",
      data: {},
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
    });
  });
}

// 선택한 고민 노출
async function setSurveyWorrySelect(survey_target) {
  let survey_worry_array = [];
  let survey_worry_html = "";
  // 재문진 전송 내용 조회
  let product_no = null;
  if (survey_target == "#survey_re_shampoo_area") {
    product_no = survey_shampoo_no;
  } else {
    product_no = survey_treatment_no;
  }
  let find = re_qna_send_data.surveys.find((e) => Number(e.product_no) == Number(product_no));
  if (find) {
    for (const hierarchy_id of find.survey_result) {
      let worry = surveyGetWorrySelect(Number(find.product_no), Number(hierarchy_id));

      if (worry) {
        let index = survey_worry_array.indexOf(worry.subject);
        if (index == -1) {
          survey_worry_array.push(worry.subject);
        }
      }
    }
  }

  for (let i = 0; i < survey_worry_array.length; i++) {
    let comma = "";
    let br = "";
    if (i == survey_worry_array.length - 1) {
      comma = "";
    } else {
      comma = ", ";
    }
    if (i == 2 && survey_worry_array.length > 3) {
      br = "<br>";
    }
    survey_worry_html += `<span>#${survey_worry_array[i]}${comma}</span>${br}`;
  }
  survey_worry_html += "에 대한 <br> 고객님의 피드백을 반영했어요";
  survey_jQuery(survey_target + " .survey_worry_area").empty();
  survey_jQuery(survey_target + " .survey_worry_area").append(survey_worry_html);

  return survey_worry_array;
}

// 선택한 고민 노출
async function setSurveyBeforWorrySelect(survey_target, qna_type) {
  let survey_worry_array = [];
  let survey_worry_html = "";
  // 재문진 전송 내용 조회
  let product_no = null;
  if (survey_target == "#survey_re_shampoo_area") {
    product_no = survey_shampoo_no;
  } else {
    product_no = survey_treatment_no;
  }
  let find = qna_send_data.surveys.find((e) => Number(e.product_no) == Number(product_no));
  if (find) {
    for (const hierarchy_id of find.survey_result) {
      let worry = surveyGetWorrySelect(Number(find.product_no), Number(hierarchy_id), qna_type);

      if (worry) {
        let index = survey_worry_array.indexOf(worry.subject);
        if (index == -1) {
          survey_worry_array.push(worry.subject);
        }
      }
    }
  }
  return survey_worry_array;
}

// 선택한 고민 찾기
function surveyGetWorrySelect(product_no, hierarchy_id, qna_type = "re_qna") {
  let params = "";
  if (product_no == survey_shampoo_no) {
    params = survey_shampoo_qna_result;
  } else {
    params = survey_treatment_qna_result;
  }
  let qna_hierarchy = null;
  if (qna_type == "qna") {
    qna_hierarchy = params.qna_hierarchy;
  } else {
    qna_hierarchy = params.re_qna_hierarchy;
  }
  for (const folder of qna_hierarchy) {
    for (const question of folder.children) {
      if (question.question_type == "main") {
        for (const answer of question.children) {
          if (Number(answer.hierarchy_id) == hierarchy_id) {
            return {
              hierarchy_id: answer.hierarchy_id,
              subject: answer.subject,
            };
          }
        }
      }
    }
  }
}

// 향 노출
function setSurveyScent(survey_target, params, befor_bom = null) {
  survey_jQuery(survey_target + " .survey_scent_type")
    .parent()
    .show();
  survey_jQuery(survey_target + " .survey_scent_top")
    .parent()
    .parent()
    .show();
  if (!params.osdl_result.point3.scent.name) {
    params.osdl_result.point3.scent.name = "Fragrance Free";
    params.osdl_result.point3.scent.image = survey_no_fragrance_image;
    params.osdl_result.point3.scent.detail_description = `민감한 고객님들을 위해<br>향료를 추가하지 않았습니다.`;
    survey_jQuery(survey_target + " .survey_scent_type")
      .parent()
      .hide();
    survey_jQuery(survey_target + " .survey_scent_top")
      .parent()
      .parent()
      .hide();
  }

  // 향 이미지 입력
  survey_jQuery(survey_target + " .survey_scent_image").attr(
    "src",
    params.osdl_result.point3.scent.image
  );

  // 향 이름 입력
  survey_jQuery(survey_target + " .survey_scent_name").text(params.osdl_result.point3.scent.name);
  // 향 설명 입력
  survey_jQuery(survey_target + " .survey_scent_detail_description").html(
    surveyEnterBr(params.osdl_result.point3.scent.detail_description)
  );
  // TOP
  survey_jQuery(survey_target + " .survey_scent_top").text(
    params.osdl_result.point3.scent.text.top
  );
  // MID
  survey_jQuery(survey_target + " .survey_scent_mid").text(
    params.osdl_result.point3.scent.text.mid
  );
  // BOTTOM
  survey_jQuery(survey_target + " .survey_scent_bottom").text(
    params.osdl_result.point3.scent.text.bottom
  );

  if (survey_target == "#survey_re_shampoo_area" || survey_target == "#survey_shampoo_area") {
    send_data = re_qna_send_data.surveys.find((e) => Number(e.product_no) == survey_shampoo_no);
  } else {
    send_data = re_qna_send_data.surveys.find((e) => Number(e.product_no) == survey_treatment_no);
  }
  /*
  if (befor_bom) {
    console.log("befor_bom", befor_bom);
    let section = befor_bom.find((e) => e.bulk_group_name == "향");
    if (section && Number(section.contain) < 1) {
      // survey_jQuery(survey_target + " .survey_scent_type").text("보통");
    } else {
      // survey_jQuery(survey_target + " .survey_scent_type").text("강하게");
    }
  } else {
    let section = send_data.survey_section.find((e) => e.type == "scent");
    if (section && Number(section.scent_ratio) < 1) {
      survey_jQuery(survey_target + " .survey_scent_type").text("보통");
    } else {
      survey_jQuery(survey_target + " .survey_scent_type").text("강하게");
    }
  }
  */
  let section = send_data.survey_section.find((e) => e.type == "scent");
  if (section && Number(section.scent_ratio) < 1) {
    survey_jQuery(survey_target + " .survey_scent_type").text("보통");
  } else {
    survey_jQuery(survey_target + " .survey_scent_type").text("강하게");
  }
}

// 내려쓰기
function surveyEnterBr(text) {
  return text.replace(/(\n|\r\n)/g, "<br>");
}

// OSDL 입력
function setSurveyOSDL(params, survey_target) {
  // ODSL 이미지 하단 텍스트
  survey_jQuery(survey_target + " #survey_osdl_text_top").html(
    surveyEnterBr(params.osdl_result.osdl.mobile_text.top)
  );
  survey_jQuery(survey_target + " #survey_osdl_text_bottom").html(
    surveyEnterBr(params.osdl_result.osdl.mobile_text.bottom)
  );

  // 지성, 중성, 건성 세팅
  if (params.osdl_result.osdl.scalp == "O") {
    survey_jQuery(survey_target + " .oily_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_scalp_text").text("지성");
    survey_jQuery(survey_target + " #survey_scalp_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_O.svg"
    );
  } else if (params.osdl_result.osdl.scalp == "N") {
    survey_jQuery(survey_target + " .normal_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_scalp_text").text("중성");
    survey_jQuery(survey_target + " #survey_scalp_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_N.svg"
    );
  } else {
    survey_jQuery(survey_target + " .dry_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_scalp_text").text("건성");
    survey_jQuery(survey_target + " #survey_scalp_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_D.svg"
    );
  }

  // 민감성 세팅
  if (params.osdl_result.osdl.sensitive == "S") {
    survey_jQuery(survey_target + " .sensitive_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_sensitive_text").text("민감성");
    survey_jQuery(survey_target + " #survey_sensitive_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_S.svg"
    );
  } else {
    survey_jQuery(survey_target + " .resistant_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_sensitive_text").text("저항성");
    survey_jQuery(survey_target + " #survey_sensitive_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_R.svg"
    );
  }

  // 건강모, 손상모, 극손상모 세팅
  if (params.osdl_result.osdl.hair == "H") {
    survey_jQuery(survey_target + " .healthy_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_hair_text").text("건강모");
    survey_jQuery(survey_target + " #survey_hair_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_H.svg"
    );
  } else if (params.osdl_result.osdl.hair == "D") {
    survey_jQuery(survey_target + " .damaged_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_hair_text").text("손상모");
    survey_jQuery(survey_target + " #survey_hair_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_D.svg"
    );
  } else {
    survey_jQuery(survey_target + " .extremely_damaged_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_hair_text").text("극손상모");
    survey_jQuery(survey_target + " #survey_hair_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_E.svg"
    );
  }

  // 탈모 고민
  if (params.osdl_result.osdl.hair_loss == "L") {
    survey_jQuery(survey_target + " .hair_loss_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_hair_loss_text").text("탈모 고민");
    survey_jQuery(survey_target + " #survey_hair_loss_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_L.svg"
    );
  } else {
    survey_jQuery(survey_target + " .without_hair_loss_checked").addClass("checked");
    survey_jQuery(survey_target + " #survey_hair_loss_text").text("탈모 고민 없음");
    survey_jQuery(survey_target + " #survey_hair_loss_image").attr(
      "src",
      "/web/upload/mynomy/kr/prd/ht_W.svg"
    );
  }

  // 지성, 중성, 건성 세팅
  let scalp_list = [];
  let survey_scalp_type_image = "";
  if (params.osdl_result.osdl.scalp == "O") {
    survey_jQuery(survey_target + " #survey_scalp_type").html(
      '<strong class="">지성</strong>이라면?'
    );
    scalp_list = params.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp01.png";
  } else if (params.osdl_result.osdl.scalp == "N") {
    survey_jQuery(survey_target + " #survey_scalp_type").html(
      '<strong class="">중성</strong>이라면?'
    );
    scalp_list = params.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp02.png";
  } else {
    survey_jQuery(survey_target + " #survey_scalp_type").html(
      '<strong class="">건성</strong>이라면?'
    );
    scalp_list = params.osdl_result.point4.hair_tip.scalp;
    survey_scalp_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp03.png";
  }

  survey_jQuery(survey_target + " #survey_scalp_type")
    .nextAll()
    .remove();
  for (const scalp of scalp_list) {
    let text = scalp.text.replace(/(\n|\r\n)/g, "<br>");
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery(survey_target + " #survey_scalp_list").append(set_html);
    survey_jQuery(survey_target + " #survey_scalp_type_image").attr("src", survey_scalp_type_image);
  }

  // 민감성 세팅
  let sensitive_list = [];
  let survey_sensitive_type_image = "";
  if (params.osdl_result.osdl.sensitive == "S") {
    survey_jQuery(survey_target + " #survey_sensitive_type").html(
      '<strong class="">민감성</strong>이라면?'
    );
    sensitive_list = params.osdl_result.point4.hair_tip.sensitive;
    survey_sensitive_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp04.png";
  } else {
    survey_jQuery(survey_target + " #survey_sensitive_type").html(
      '<strong class="">비민감성</strong>이라면?'
    );
    sensitive_list = params.osdl_result.point4.hair_tip.sensitive;
    survey_sensitive_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp05.png";
  }

  survey_jQuery(survey_target + " #survey_sensitive_type")
    .nextAll()
    .remove();
  for (const sensitive of sensitive_list) {
    let text = sensitive.text.replace(/(\n|\r\n)/g, "<br>");
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery(survey_target + " #survey_sensitive_list").append(set_html);
    survey_jQuery(survey_target + " #survey_sensitive_type_image").attr(
      "src",
      survey_sensitive_type_image
    );
  }

  // 건강모, 손상모, 극손상모 세팅
  let hair_list = [];
  let survey_hair_type_image = "";
  if (params.osdl_result.osdl.hair == "H") {
    survey_jQuery(survey_target + " #survey_hair_type").html(
      '<strong class="">건강모</strong>라면?'
    );
    hair_list = params.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp06.png";
  } else if (params.osdl_result.osdl.hair == "D") {
    survey_jQuery(survey_target + " #survey_hair_type").html(
      '<strong class="">손상모</strong>라면?'
    );
    hair_list = params.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp07.png";
  } else {
    survey_jQuery(survey_target + " #survey_hair_type").html(
      '<strong class="">(극)손상모</strong>라면?'
    );
    hair_list = params.osdl_result.point4.hair_tip.hair;
    survey_hair_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp07.png";
  }

  survey_jQuery(survey_target + " #survey_hair_type")
    .nextAll()
    .remove();
  for (const hair of hair_list) {
    let text = hair.text.replace(/(\n|\r\n)/g, "<br>");
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery(survey_target + " #survey_hair_list").append(set_html);
    survey_jQuery(survey_target + " #survey_hair_type_image").attr("src", survey_hair_type_image);
  }

  // 탈모 고민
  let hair_loss_list = [];
  let survey_hair_loss_type_image = "";
  if (params.osdl_result.osdl.hair_loss == "L") {
    survey_jQuery(survey_target + " #survey_hair_loss_type").html(
      '<strong class="">탈모</strong>라면?'
    );
    hair_loss_list = params.osdl_result.point4.hair_tip.hair_loss;
    survey_hair_loss_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp08.png";
  } else {
    survey_jQuery(survey_target + " #survey_hair_loss_type").html(
      "<strong>탈모를 예방</strong>하려면?"
    );
    hair_loss_list = params.osdl_result.point4.hair_tip.hair_loss;
    survey_hair_loss_type_image = "/web/upload/mynomy/kr_mobile/prd/scalp09.png";
  }
  survey_jQuery(survey_target + " #survey_hair_loss_type")
    .nextAll()
    .remove();
  for (const hair_loss of hair_loss_list) {
    let text = hair_loss.text.replace(/(\n|\r\n)/g, "<br>");
    let set_html = `
      <p class="tip">Tip</p>
      <p class="info">${text}</p>
    `;
    survey_jQuery(survey_target + " #survey_hair_loss_list").append(set_html);
    survey_jQuery(survey_target + " #survey_hair_loss_type_image").attr(
      "src",
      survey_hair_loss_type_image
    );
  }
}

function setSurveySubDiagnosis(sub_survey_target, params, survey_worry_array) {
  let left_percent = 0;
  if (params.osdl_result.point1.sequence == 1) {
    left_percent = 16;
  }
  if (params.osdl_result.point1.sequence == 2) {
    left_percent = 34;
  }
  if (params.osdl_result.point1.sequence == 3) {
    left_percent = 50;
  }
  if (params.osdl_result.point1.sequence == 4) {
    left_percent = 66;
  }
  if (params.osdl_result.point1.sequence == 5) {
    left_percent = 83;
  }
  if (params.osdl_result.point1.sequence == 6) {
    left_percent = 100;
  }

  /* 샴푸 레시피 넘버 입력 */
  // survey_jQuery(sub_survey_target + " .survey_bom_code").text(params.bom_code[0].substr(survey_bom_cut_start, survey_bom_cut_end));

  /* 세정-영양 밸런스 */
  // shampoo
  let shampoo_keyword = params.osdl_result.point1.shampoo_keyword.split(" ");
  // let left_px = params.osdl_result.point1.sequence * 80;
  /*
  survey_jQuery(sub_survey_target + " .shampoo_level").css("left", left_percent + "%");
  survey_jQuery(sub_survey_target + " .shampoo_keyword").text(shampoo_keyword[0]);
  survey_jQuery(sub_survey_target + " .shampoo_keyword_level").text(shampoo_keyword[1]);
  survey_jQuery(sub_survey_target + " #shampoo_mobile_point").html(
    surveyEnterBr(params.osdl_result.point1.shampoo_mobile_point)
  );
  */

  survey_jQuery(".shampoo_level").css("left", left_percent + "%");
  survey_jQuery(".shampoo_keyword").text(shampoo_keyword[0]);
  survey_jQuery(".shampoo_keyword_level").text(shampoo_keyword[1]);
  survey_jQuery("#shampoo_mobile_point").html(
    surveyEnterBr(params.osdl_result.point1.shampoo_mobile_point)
  );

  // treatment
  let treatment_keyword = params.osdl_result.point1.treatment_keyword.split(" ");
  /*
  survey_jQuery(sub_survey_target + " .treatment_level").css("left", left_percent + "%");
  survey_jQuery(sub_survey_target + " .treatment_keyword").text(treatment_keyword[0]);
  survey_jQuery(sub_survey_target + " .treatment_keyword_level").text(treatment_keyword[1]);
  survey_jQuery(sub_survey_target + " #treatment_mobile_point").html(
    surveyEnterBr(params.osdl_result.point1.treatment_mobile_point)
  );
  */

  survey_jQuery(".treatment_level").css("left", left_percent + "%");
  survey_jQuery(".treatment_keyword").text(treatment_keyword[0]);
  survey_jQuery(".treatment_keyword_level").text(treatment_keyword[1]);
  survey_jQuery("#treatment_mobile_point").html(
    surveyEnterBr(params.osdl_result.point1.treatment_mobile_point)
  );

  /* 나만을 위한 솔루션 콤플렉스 */
  survey_jQuery(sub_survey_target + " .survey_worry_list").empty();
  for (const worry of survey_worry_array) {
    survey_jQuery(sub_survey_target + " .survey_worry_list").append(
      `<li><span class="check"></span><span class="word">${worry}</span></li>`
    );
  }
  /* 고객님을 위한 솔루션 콤플렉스*/
  survey_jQuery(sub_survey_target + " .survey_ampoules_area").empty();

  for (let ampoule of params.osdl_result.point2.ampoules) {
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
    let find_ampoule_image = survey_ampoule_code_images.find((e) => e.bulk_code == ampoule.bulk_code);
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
    survey_jQuery(sub_survey_target + " .survey_ampoules_area").append(set_html);
  }

  survey_jQuery(sub_survey_target + " .survey_ampoules_list").empty();
  for (const ingredient of params.osdl_result.point2.bottom_fix_ingredient) {
    let set_html = `
      <div class="plus">
        <figure><img
                src="${ingredient.image}"
                alt="${ingredient.name}" /></figure>
        <figcaption>${ingredient.name}</figcaption>
      </div>
      `;
    survey_jQuery(sub_survey_target + " .survey_ampoules_list").append(set_html);
  }

  // 향 입력
  setSurveyScent(sub_survey_target, params, survey_befor_bom);
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
      // 코드 입력
      for (const bom_code of result.bom_code) {
        survey_jQuery("input[name^='setproduct_add_option_id']").each(function (index, element) {
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
          if (bom_code.indexOf("CSP") > -1 && input_value.indexOf("맞춤형 샴푸 해시코드") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(result.hash);
            survey_jQuery(element).next().val(result.hash);
          }
          // 트리트 먼트
          if (bom_code.indexOf("CHT") > -1 && input_value.indexOf("맞춤형 트리트먼트 BOM") > -1) {
            let input_id = survey_jQuery(element).attr("name");
            survey_jQuery("#" + input_id).val(bom_code);
            survey_jQuery(element).next().val(bom_code);
          }
          if (bom_code.indexOf("CHT") > -1 && input_value.indexOf("맞춤형 트리트먼트 이름") > -1) {
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
      // 1개가 아니면 세트 상품

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
      }
    }, 100);
  }
  survey_jQuery(".subscribeBox").attr("bom_code", result.bom_code);
  survey_jQuery(".subscribeBox").attr("nick_name", result.manage_product_nick_name);
  survey_jQuery(".subscribeBox").attr("qna_type", result.qna_type);
  survey_jQuery(".subscribeBox").attr("hash", result.hash);
}

async function getSurveyBom(bom_code) {
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/bom/${bom_code}`,
      type: "get",
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (request, status, error) {
        resolve([]);
      },
    });
  });
}

function searchSurveyBomAmpoule(params) {
  let return_array = [];
  for (const param of params) {
    if (param.bulk_group_code == "BG-2") {
      return_array.push({
        bulk_code: param.composition.bulk_code,
        ratio: Number(param.composition.ratio),
      });
    }
  }
  return return_array;
}

function surveyQuantity() {
  setTimeout(async function () {
    let count = Number(survey_jQuery("#quantity").val());
    survey_jQuery("#survey_quantity").text(count);
  }, 100);
}

function surveySetQuantityClick(type) {
  if (survey_product_no == survey_set_product_no) {
    if (type == "up") {
      survey_jQuery(".option_box_up").click();
    } else {
      survey_jQuery(".option_box_down").click();
    }
    setTimeout(async function () {
      let count = Number(survey_jQuery(".quantity_opt").val());
      survey_jQuery("#quantity").val(count);
      survey_jQuery("#survey_quantity").text(count);
    }, 200);
  } else {
    //
    if (type == "up") {
      document.getElementsByClassName("QuantityUp")[0].click();
    } else {
      document.getElementsByClassName("QuantityDown")[0].click();
    }
    setTimeout(function () {
      let count = Number(survey_jQuery("#quantity").val());
      survey_jQuery("#survey_quantity").text(count);
    }, 200);
  }
}
function surveyCart(type) {
  if (is_survey_more_result_cart_click == true) {
    return;
  }
  is_survey_more_result_cart_click = true;

  let product_list = survey_jQuery(".subscribeBox");
  if (product_list.length == 0) {
    is_survey_more_result_cart_click = false;
    alert("상품을 선택해주세요.");
    return;
  }
  for (const product of product_list) {
    let product_no = Number(survey_jQuery(product).attr("product_no"));
    let bom_code = survey_jQuery(product).attr("bom_code");
    let nick_name = survey_jQuery(product).attr("nick_name");
    let qna_type = survey_jQuery(product).attr("qna_type");
    let hash = survey_jQuery(product).attr("hash");
    let quantity = survey_jQuery(product).find(".quantity input").val();

    if (product_no != survey_set_product_no) {
      // 샴푸, 트리트먼트
      surveySetCart(product_no, bom_code, nick_name, qna_type, hash, quantity);
      setTimeout(function () {
        if (type && type == "cart") {
          if (confirm("장바구니 담기가 되었습니다.\n장바구니 페이지로 이동하시겠습니까?")) {
            location.href = "/order/basket.html";
          }
        } else {
          location.href = "/order/basket.html";
        }
        is_survey_more_result_cart_click = false;
      }, 1000);
    } else {
      // 세트 상품
      survey_jQuery(".survey_set_product_cart").click();
      is_survey_more_result_cart_click = false;
    }
  }
}
function surveyBuyBtn() {
  surveyInputBomCode(survey_re_qna_result_info, "input_text");
}

async function getSurveyBoms() {
  let survey_ingredient_text_list = [];
  for (const bom_code of survey_re_qna_info.bom_code) {
    let survey_ingredients = [];
    let param_bom = await getSurveyBom(bom_code);
    for (const bom of param_bom) {
      for (const ingredient of bom.ingredients) {
        if (survey_ingredients.indexOf(ingredient.RAWCDK) == -1) {
          survey_ingredients.push(ingredient.RAWCDK);
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

// 로드 시 실행
survey_jQuery(".survey_memeber_name").text("");
window.addEventListener(
  "load",
  async function (event) {
    setTimeout(async function () {
      await CAFE24API.getCustomerInfo(async function (err, res) {
        return new Promise(function (resolve, reject) {
          console.log("###", err, res);
          if (err) {
            survey_jQuery(".survey_memeber_name").text("고객");
            survey_member_id = null;
          } else {
            if (res && res.customer && res.customer.name) {
              survey_jQuery(".survey_memeber_name").text(res.customer.name);
              survey_member_id = res.customer.member_id;
            } else {
              survey_jQuery(".survey_memeber_name").text("고객");
            }
          }

          survey_mall_id = CAFE24API.MALL_ID;
          survey_shop_no = CAFE24API.SHOP_NO;
          resolve(res);
        });
      });
      if (!survey_member_id) {
        for (let i = 0; i < 5; i++) {
          survey_member_id = await surveyGetMemberInfo();
          if (survey_member_id) {
            break;
          }
        }
      }
      

      // 문진 조회
      survey_shampoo_qna_result = await getSurveyQna(survey_shampoo_no);
      survey_treatment_qna_result = await getSurveyQna(survey_treatment_no);

      // 이전문진 - 결과조회
      let survey_qna_result = await getSurveyMoreResultDiagnosis(
        survey_hash,
        dayjs("2023-01-01").format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD")
      );
      // 이전문진 - 결과조회 by product_id
      for (const product_id of survey_qna_result.product_id) {
        let survey_qna_result = await getSurveyMoreResultDiagnosis(
          survey_hash,
          dayjs("2023-01-01").format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
          product_id
        );
        setSurveyBeforQnaInfo(survey_qna_result);
      }
      if (survey_qna_at && survey_qna_at.indexOf(".") > -1) {
        survey_qna_at = survey_qna_at.replace(/\./gi, '-');
      }
      // 재문진 - 결과조회
      let survey_re_qna_result = await getSurveyMoreResultDiagnosis(
        survey_re_qna_hash,
        survey_qna_at,
        dayjs().format("YYYY-MM-DD")
      );
      survey_re_qna_info = survey_re_qna_result;

      let set_param = {
        product_no: survey_re_qna_result.product_no,
        bom_code: survey_re_qna_result.bom_code,
        hash: survey_re_qna_result.hash,
      };
      sessionStorage.setItem("survey_re_qna_result", JSON.stringify(set_param));

      surveyInputBomCode(survey_re_qna_result);
      survey_re_qna_result_info = survey_re_qna_result;

      survey_jQuery("#survey_re_shampoo_area .survey_bom_code").text("");
      survey_jQuery("#survey_re_treatmen_area .survey_bom_code").text("");

      // 재문진 - 결과조회 by product_id
      for (const product_id of survey_re_qna_result.product_id) {
        let survey_re_qna_result = await getSurveyMoreResultDiagnosis(
          survey_re_qna_hash,
          survey_qna_at,
          dayjs().format("YYYY-MM-DD"),
          product_id
        );
        // 화면 노출
        setSurveyMoreResultDiagnosis(survey_re_qna_result);
      }
      // 상품 가격 입력
      let survey_product_price = Number(survey_jQuery("#survey_product_price").attr("price"));
      let survey_product_price_comma = surveyComma(survey_product_price);
      survey_jQuery("#survey_product_price").text(survey_product_price_comma);

      let survey_product_custom_price = Number(
        survey_jQuery("#survey_product_custom").attr("price")
      );
      if (survey_product_custom_price > survey_product_price) {
        let survey_product_custom_price_comma = surveyComma(survey_product_custom_price);
        survey_jQuery("#survey_product_custom").text(survey_product_custom_price_comma);
        survey_jQuery("#survey_product_custom").show();
      }

      let product_name_array = [];
      product_name_array[survey_shampoo_no] = "3WAAU 샴푸";
      product_name_array[survey_treatment_no] = "3WAAU 트리트먼트";
      product_name_array[survey_set_product_no] = "샴푸와 트리트먼";
      survey_jQuery(".survey_product_name").text(product_name_array[survey_product_no]);
      survey_jQuery(".survey_product_name_area .name").text(
        "#" + survey_re_qna_info.manage_product_nick_name
      );

      if (survey_product_no == survey_set_product_no) {
        survey_jQuery("#quantity").val(1);
        survey_jQuery(".survey_qty_up").attr("onclick", "surveySetQuantityClick('up')");
        survey_jQuery(".survey_qty_down").attr("onclick", "surveySetQuantityClick('down')");
      } else {
        survey_jQuery("#quantity").attr("onchange", "surveyQuantity()");
      }

      await surveyGetCafe24Products();
      // survey_jQuery(".survey_bottom_price .total strong em").text("70,000원");
      // setTimeout(async function () {
      //   survey_jQuery("#survey_result").css("visibility", "visible");
      // }, 200);

      setTimeout(async function () {
        let survey_product_resource_info = survey_product_resource.shampoo;
        if (survey_product_no == survey_treatment_no) {
          survey_product_resource_info = survey_product_resource.treatment;
        }
        if (survey_product_no == survey_set_product_no) {
          survey_product_resource_info.retail_price =
            Number(survey_product_resource_info.retail_price) +
            Number(survey_product_resource.treatment.retail_price);
          survey_product_resource_info.discountprice.mobile_discount_price =
            Number(survey_product_resource_info.discountprice.mobile_discount_price) +
            Number(survey_product_resource.treatment.discountprice.mobile_discount_price);
          survey_product_resource_info.price =
            Number(survey_product_resource_info.price) +
            Number(survey_product_resource.treatment.price);
        }

        let survey_retail_price = Number(survey_product_resource_info.retail_price);
        let survey_discount_price = Number(
          survey_product_resource_info.discountprice.mobile_discount_price
        );
        if (survey_retail_price > 0 && survey_retail_price > survey_discount_price) {
          survey_jQuery("#survey_strike").text(surveyComma(survey_retail_price));
          survey_jQuery("#survey_strike").show();
          let survey_sale_price = survey_retail_price - survey_discount_price;
          let survey_discount = Number((survey_sale_price / survey_retail_price) * 100);
          if (survey_discount > 0) {
            survey_jQuery("#survey_discount").text(Math.floor(survey_discount) + "%");
            survey_jQuery("#survey_discount").show();
          }
        }

        let price = Number(survey_product_resource_info.price);
        if (survey_discount_price > 0) {
          price = survey_discount_price;
        }
        survey_jQuery("#survey_price").text(surveyComma(price) + "원");
        survey_jQuery(".fixed-box").show();

        // 문진 bom 조회
        await getSurveyBoms();
        let survey_re_shampoo_bom_code = survey_jQuery(
          "#survey_re_shampoo_area .survey_bom_code"
        ).text();
        if (survey_re_shampoo_bom_code && survey_re_shampoo_bom_code[0] == "9") {
          survey_jQuery(".survey_is_hairless").text("탈모증상완화 기능성화장품");
        }
        survey_jQuery("#quantity").attr("readonly", true);

        survey_jQuery(".fixed-box .box-info .box-left .subject .name").text(
          "#" + survey_re_qna_result_info.manage_product_nick_name
        );
        survey_jQuery("#survey_result").css("visibility", "visible");
      }, 1000);
    }, 500);
  },
  false
);
