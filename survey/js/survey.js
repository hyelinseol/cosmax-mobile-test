// 수신 데이터
let survey = null;

// 트리트먼트 수신 데이터
let treatment_survey = null;

// 선택한 트리트먼트 hierarchy_id 히스토리
let treatment_survey_history_hierarchy = [];

// 스텝 배열
let survey_step_lsit = [];

// 일반 질문 배열
let survey_qna = [];

// 선택한 hierarchy_id 히스토리
let survey_history_hierarchy = [];

// 선택한 storage hierarchy_id 히스토리
let survey_storage_history_hierarchy = null;

// 선택한 질문, 답변 hierarchy_id 이력
let survey_question_answer_history_hierarchy = [];

// 선택한 질문, 답변 향
let survey_question_answer_history_hierarchy_fragrance_name = null;

// 선택한 성별, 연도, 이름 이력
let survey_question_answer_etc_history_hierarchy = {
  gender: null,
  birth: null,
  product_name: null,
};

// 분기 후 질문 여부 리스트
let survey_process_question_list = [];

// 시작 버튼 클릭 여부
let is_start = false;

let is_gender = false;

let is_product_name = false;

let is_fragrance = false;

// 사용자 입력 상품명
let product_name = "";

// 성별
let gender = "";

// 출생연도
let birth = "";

// 재문진 배열
let survey_re_qna = [];

// mall_id
let survey_mall_id = null;

// 샵 번호
let survey_shop_no = 1;

// 상품 번호
let survey_product_no = null;

let survey_member_name = null;

let befor_step = 1;

let is_first_preset = false;

let befor_percent = [
  {
    start: "0%",
    progress: "20%",
  },
];

// 프리셋 첫질문 답변 텍스트 배열 담는다 > 결과페이지 노출
let first_preset_text_answer = [];

let fragrance_hierarchy_array = [];

// 세트상품 여부
let is_set_product = false;

let is_survey_result = false;

let is_hair_loss = false;
let hair_loss_preset_array = [];

// 탈모 프리셋 합산점수별 hierarchy_id 체크
let hair_loss_preset_question_hierarchy_id_list = {
  "cosmaxtest": [5881, 5887, 5893, 5899, 5905, 5911],
  "threewaau": [1349, 1355, 1361, 1367, 1373, 1379]
};

let hair_loss_base_array = [];

let hair_loss_base_question_hierarchy_id_list = {
  "cosmaxtest": [
    { key: "m_20_up", hierarchy_id: 5881 },
    { key: "w_20_up", hierarchy_id: 5887 },
    { key: "m_0_up", hierarchy_id: 5893 },
    { key: "w_0_up", hierarchy_id: 5899 },
    { key: "m_0_down", hierarchy_id: 5905 },
    { key: "w_0_down", hierarchy_id: 5911 },
  ],
  "threewaau": [
    { key: "m_20_up", hierarchy_id: 1349 },
    { key: "w_20_up", hierarchy_id: 1355 },
    { key: "m_0_up", hierarchy_id: 1361 },
    { key: "w_0_up", hierarchy_id: 1367 },
    { key: "m_0_down", hierarchy_id: 1373 },
    { key: "w_0_down", hierarchy_id: 1379 },
  ]
};

let treatment_answer_ampoule_type_info = {
  "cosmaxtest": {
    I: [
      6063,
      6069,
      6075,
      6128,
      6143,
      6144,
    ],
    P: [6064, 6070],
    H: [6065, 6067, 6073, 6130],
    D: [6066],
    M: [6068, 6129],
  },
  "threewaau": {
    I: [
      1506,
      1512,
      3199,
      1573,
      1588,
      1589,
    ],
    P: [1507, 1513],
    H: [1508, 1510, 3197, 1575],
    D: [1509],
    M: [1511, 1574],
  }
};

let survey_hair_descript = {
  "cosmaxtest": [
    { hierarchy_id: 5841, subject: "건강모", content: "손빗질시 엉킴이 전혀 없고<br>윤기있는 모발이며, 염색 이력 없음" },
    { hierarchy_id: 5842, subject: "손상모 1단계", content: "손빗질시 엉킴이 거의 없음" },
    { hierarchy_id: 5843, subject: "손상모 2단계", content: "손빗질시 엉킴이 있긴하지만<br>쉽게 풀어지는 편" },
    { hierarchy_id: 5844, subject: "손상모 3단계", content: "한 두번의 손빗질로는<br>쉽게 풀리지 않고 엉킴" },
    { hierarchy_id: 5845, subject: "극손상모", content: "엉킴이 심해 손빗질이 어렵고<br>모발 끝이 갈라진 모발이 많음" },
  ],
  "threewaau": [
    { hierarchy_id: 1310, subject: "건강모", content: "손빗질시 엉킴이 전혀 없고<br>윤기있는 모발이며, 염색 이력 없음" },
    { hierarchy_id: 1311, subject: "손상모 1단계", content: "손빗질시 엉킴이 거의 없음" },
    { hierarchy_id: 1312, subject: "손상모 2단계", content: "손빗질시 엉킴이 있긴하지만<br>쉽게 풀어지는 편" },
    { hierarchy_id: 1313, subject: "손상모 3단계", content: "한 두번의 손빗질로는<br>쉽게 풀리지 않고 엉킴" },
    { hierarchy_id: 1314, subject: "극손상모", content: "엉킴이 심해 손빗질이 어렵고<br>모발 끝이 갈라진 모발이 많음" },
  ]
};

// 나의 모발 손상도 질문 hierarchy_id
let survey_my_hair_damage = {
  "cosmaxtest": [5840],
  "threewaau": [1309]
};

// 탈모 증상 완화
let survey_hair_loss_relax = {
  "cosmaxtest": 5780,
  "threewaau": 1247
};

// 해결하고싶은 고민
let survey_my_worry = {
  "cosmaxtest": 5771,
  "threewaau": 1238
};

let survey_scent_type = "";

let survey_scent_list = [];

let survey_gift_key = null;

let survey_product_type = null;

let survey_discount_type = null;

let survey_buy_type = null;

let order_id = null;

let no_show_hierarchy = [
  5881, 5887, 5893, 5867, 5899, 5905, 5911, 6161,
  1349, 1355, 1361, 1336, 1367, 1373, 1379, 1605,
];

// 조회
async function getSurveyConfig() {
  survey_mall_id = CAFE24API.MALL_ID;
  survey_shop_no = CAFE24API.SHOP_NO;
  survey_product_no = shoplusGetParameters("product_no");

  survey_shampoo = survey_product_list[CAFE24API.MALL_ID].find((e) => e.product_type == "shampoo");
  survey_treatment = survey_product_list[CAFE24API.MALL_ID].find((e) => e.product_type == "treatment");
  survey_set_product = survey_product_list[CAFE24API.MALL_ID].find((e) => e.product_type == "set_product");

  survey_shampoo_no = survey_shampoo.product_no;
  survey_treatment_no = survey_treatment.product_no;
  survey_set_product_no = survey_set_product.product_no;

  // 세트 상품일 때
  if (survey_product_no == survey_set_product_no) {
    is_set_product = true;
    treatment_survey = await getSurveyProduct(survey_treatment_no);
    survey = await getSurveyProduct(survey_shampoo_no);
  } else {
    survey = await getSurveyProduct(survey_product_no);
  }
}

// 상품 문진 조회
async function getSurveyProduct(product_no) {
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

// 첫 화면 노출
function showSurveyFirst() {
  if (survey.qna_hierarchy.length == 0) {
    alert("등록된 질문이 없습니다.");
    return false;
  }
  is_start = true;

  let type = shoplusGetParameters("type");
  if (type && type == "connect") {
    for (const qna of survey.qna_hierarchy) {
      if (qna.intro_status == "enabled") {
        survey_history_hierarchy.push(qna.hierarchy_id);
        continue;
      }
      showSurveyQuestion(qna.children[0].hierarchy_id);
      history.pushState(null, null, location.search);
      history.pushState(null, null, location.search + "#progress");
      return;
    }
  }

  if (
    survey.qna_hierarchy[0].type == "folder" &&
    survey.qna_hierarchy[0].intro_status == "enabled"
  ) {
    showSurveyQuestion(survey.qna_hierarchy[0].hierarchy_id);
  }
  if (
    survey.qna_hierarchy[0].type == "folder" &&
    survey.qna_hierarchy[0].intro_status == "disabled"
  ) {
    showSurveyQuestion(survey.qna_hierarchy[0].children[0].hierarchy_id);
  }
}

// 3) step 내용 담기
function getSurveyStep() {
  let step_count = 0;
  if (survey && survey.qna_hierarchy && survey.qna_hierarchy.length > 0) {
    for (const qna_hierarchy of survey.qna_hierarchy) {
      step_count++;
      if (qna_hierarchy.intro_status == "enabled") {
        continue;
      }
      // 마지막 스텝 미노출
      if (step_count == survey.qna_hierarchy.length) {
        continue;
      }
      survey_step_lsit.push(qna_hierarchy.subject);
    }
  }
  let step_select_width = (survey_step_lsit.length - 1) * 40;
  survey_jQuery("#survey_step_width_style").append(
    `.step.selected { 
      width: calc(100% - ${step_select_width}px); 
    }`
  );
}

// 분기 후 질문 내용 담기
function getSurveyProcessQuestion() {
  for (const qna_hierarchy of survey.qna_hierarchy) {
    for (const children of qna_hierarchy.children) {
      if (children.process_question_status == "enabled") {
        if (children.process_where.length > 0) {
          survey_process_question_list[children.hierarchy_id] = {
            checked: false,
            list: children.process_where,
          };
        }
      }
    }
  }
}

// 4) step 노출
function setSurvetStep(type) {
  if (survey_step_lsit && survey_step_lsit.length > 0) {
    let i = 1;
    for (const step of survey_step_lsit) {
      if (type == "intro") {
        let step_html = `
        <li class="step">
          <div class="menu">
            <span>${i}</span>
            <h3 class="title">${step}</h3>
            </div>
        </li>
      `;
        survey_jQuery("#survey_area").append(step_html);
      } else {
        //
      }
      i++;
    }
  }
}

// 답변 타입별 리스트 만들기 ( 타입, 답변 리스트, 부모 hierarchy_id, 다음 hierarchy_id, 선택가능수, 화면배열 )
function setSurveyAnswer(
  answer_type,
  answer_list,
  parent_hierarchy_id,
  next_hierarchy_id,
  select_count,
  display_array_count,
  question_subject,
  question
) {
  let is_hair = false;
  let answer_html = "";
  // 텍스트
  if (answer_type == "text") {
    answer_html += `<div class="select"><ul class="row">`;

    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].display_status == "enabled") {
        let checked = "";
        let is_auto_select = surveyAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_auto_select) {
          checked = "line_checked";
        }
        let is_question_history_select = surveyHistoryAutoSelectQuestion(
          answer_list[i].hierarchy_id
        );
        if (is_question_history_select) {
          checked = "";
        }
        let is_history_select = surveyHistoryAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_history_select) {
          checked = "line_checked";
        }
        answer_html += `
        <li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}" class="${checked}">
          <a href="javascript:void(0);">${answer_list[i].subject}</a>
        </li>`;
      }
    }
    answer_html += `</ul></div>`;
  } else if (answer_type == "image" && display_array_count <= 1) {
    answer_html += `
    <div class="select">
      <ul class="row gFlex2">
    `;

    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].display_status == "enabled") {
        let checked = "";
        let is_auto_select = surveyAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_auto_select) {
          checked = "line_checked";
        }
        let is_question_history_select = surveyHistoryAutoSelectQuestion(
          answer_list[i].hierarchy_id
        );
        if (is_question_history_select) {
          checked = "";
        }
        let is_history_select = surveyHistoryAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_history_select) {
          checked = "line_checked";
        }

        if (answer_list[i].image) {
          answer_html += `
          <li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}" class="${checked}">
            <span>${answer_list[i].subject}</span>
            <div class="img_area"><img src="${answer_list[i].image}" alt="지성아이콘" /></div>
          </li>
          `;
        } else {
          answer_html += `<li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}" class="${checked}">${answer_list[i].subject}</li>`;
        }
      }
    }

    answer_html += `
      </ul>
    </div>
    `;
  } else if (answer_type == "image" && display_array_count > 1) {
    if (answer_list && answer_list[0] && answer_list[0].image) {
      let img = new Image();
      img.onload = function () {
        if (this.width < this.height) {
          survey_jQuery(".select").removeClass("wide");
          survey_jQuery(".select").addClass("narrow long");
        }
        if (display_array_count == 2 && this.width == this.height) {
          survey_jQuery(".select").removeClass("wide");
        }
      };
      img.src = answer_list[0].image;
    }
    display_array_count = 2;
    answer_html += `<div class="select wide"><ul class="gFlex${display_array_count}">`;
    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].display_status == "enabled") {
        let checked = "";
        let is_auto_select = surveyAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_auto_select) {
          checked = "line_checked";
        }
        let is_question_history_select = surveyHistoryAutoSelectQuestion(
          answer_list[i].hierarchy_id
        );
        if (is_question_history_select) {
          checked = "";
        }
        let is_history_select = surveyHistoryAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_history_select) {
          checked = "line_checked";
        }

        if (answer_list[i].image) {
          let add_class = "";
          if (question_subject.indexOf("나의 모발 시술") > -1) {
            add_class = "vertical";
          }
          answer_html += `
          <li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}" class="${checked}">
              <a href="javascript:void(0);">
                  <div class="img_area ${add_class}"><img src="${answer_list[i].image}" alt="비듬각질 이미지" /></div>
                  <span>${answer_list[i].subject}</span>
              </a>    
          </li>`;
        } else {
          answer_html += `
          <li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}" class="${checked}">
            <a href="javascript:void(0);">${answer_list[i].subject}</a>
          </li>`;
        }
      }
    }
    answer_html += `</ul></div>`;
  } else if (answer_type == "height_slide_image") {
    let image_html = "";
    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].display_status == "enabled") {
        if (survey_my_hair_damage[survey_mall_id].indexOf(Number(question.hierarchy_id)) > -1) {
          let find_hair = survey_hair_descript[survey_mall_id].find((e) => Number(e.hierarchy_id) == Number(answer_list[i].hierarchy_id));
          image_html += `
          <div class="swiper-slide">
            <div class="imgWrap"><img src="${answer_list[i].image}" alt="건강모 이미지" /></div>
            <h4>${answer_list[i].subject}</h4>
            <p class="hairStats">${find_hair.content}</p>
          </div>
          `;
          is_hair = true;
        } else {
          image_html += `<div class="swiper-slide"><img src="${answer_list[i].image}" alt="모래시계 이미지" /></div>`;
        }
      }
    }
    let answer_li_html = "";
    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].display_status == "enabled") {
        let checked = "";
        if (i == 0) {
          checked = "checked line_checked";
        }

        let is_auto_select = surveyAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_auto_select) {
          checked = "checked line_checked";
        }
        let is_question_history_select = surveyHistoryAutoSelectQuestion(
          answer_list[i].hierarchy_id
        );
        if (is_question_history_select) {
          checked = "";
        }
        let is_history_select = surveyHistoryAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_history_select) {
          checked = "checked line_checked";
        }
        answer_li_html += `
        <li class="${checked}" answer_type="${answer_type}" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}">
          ${answer_list[i].subject}
        </li>`;
      }
    }
    // 나의 모발 손상도 일때
    let add_class = "half";
    let add_style = "";
    if (is_hair) {
      add_class = "hair";
      // add_style = "visibility: hidden;";
      // add_slide_class = "swiper-container-fade swiper-container-initialized swiper-container-vertical"; swiper-wrapper
    }
    answer_html += `<div class="select wide"><div class="controlArea ${add_class}" style="${add_style}">`;
    answer_html += `
      <div class="img_area">
        <div class="slide-draggable vertical"> <!-- 슬라이드 방향 -->
          <div class="swiper-wrapper">
            ${image_html}
          </div>
        </div>
      </div>
      <div class="control_bar">
        <ol>
          ${answer_li_html}
        </ol>
        <div class="bar"><div class="blank-top"></div><div class="blank-bt"></div></div>
      </div>
    `;
    answer_html += `</div></div>`;
  } else if (answer_type == "OX") {
    answer_html += `<div class="select"><ul class="gFlex2">`;
    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].display_status == "enabled") {
        let checked = "";
        let is_auto_select = surveyAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_auto_select) {
          checked = "line_checked";
        }
        let is_question_history_select = surveyHistoryAutoSelectQuestion(
          answer_list[i].hierarchy_id
        );
        if (is_question_history_select) {
          checked = "";
        }
        let is_history_select = surveyHistoryAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (is_history_select) {
          checked = "line_checked";
        }
        let icon_class = "xi-radiobox-blank";
        let is_true = "true";
        if (i == 1) {
          icon_class = "xi-close";
          is_true = "false";
        }
        answer_html += `
        <li answer_type="${answer_type}" onClick="surveyAnswerOXClick(this)" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" is_true="${is_true}" next_hierarchy_id="${next_hierarchy_id}" class="${checked}">
          <a href="javascript:void(0);">
            <span>
              <i class="${icon_class}"></i>
            </span>${answer_list[i].subject}
          </a>
        </li>`;
      }
    }
    answer_html += `</ul></div>`;

  } else if (answer_type == "scent") {
    answer_html += `
    <div class="select">
      <div class="controlSlide fragrance plus">
        <div class="slideArea">
          <div class="swiper-container fragranceSlide">
            <div class="swiper-wrapper">
    `;

    let is_strong = false;
    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].answer_description == "strong") {
        continue;
      }
      if (answer_list[i].display_status == "enabled") {
        let line_checked = "";
        if (i == 0) {
          line_checked = "line_checked";
        }
        let is_auto_select = surveyAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (!is_auto_select) {
          let strong_hierarchy_id = searchQuestionScentHierarchyId(
            answer_list[i].hierarchy_id,
            "strong"
          );
          if (strong_hierarchy_id) {
            is_auto_select = surveyAutoSelectAnswer(strong_hierarchy_id);
            if (is_auto_select) {
              is_strong = true;
            }
          }
        }
        if (is_auto_select) {
          line_checked = "line_checked";
          survey_storage_history_hierarchy.fragrance_name = answer_list[i].subject;
        }

        let is_history_select = surveyHistoryAutoSelectAnswer(answer_list[i].hierarchy_id);
        if (!is_history_select) {
          let strong_hierarchy_id = searchQuestionScentHierarchyId(
            answer_list[i].hierarchy_id,
            "strong"
          );
          if (strong_hierarchy_id) {
            is_history_select = surveyHistoryAutoSelectAnswer(strong_hierarchy_id);
            if (is_history_select) {
              is_strong = true;
            }
          }
        } else {
          is_strong = false;
        }
        if (is_history_select) {
          line_checked = "line_checked";
        }

        let scent_top = answer_list[i].top;
        let scent_mid = answer_list[i].middle;
        let scent_bottom = answer_list[i].bottom;
        let frag_gray_html = "";
        if (scent_top && scent_mid && scent_bottom) {
          frag_gray_html = `
          <div class="frag_gray">
            <dl class="frag_dl">
                <dt>TOP</dt>
                <dd>${scent_top}</dd>
            </dl>
            <dl class="frag_dl">
                <dt>MIDDLE</dt>
                <dd>${scent_mid}</dd>
            </dl>
            <dl class="frag_dl">
                <dt>BOTTOM</dt>
                <dd>${scent_bottom}</dd>
            </dl>
          </div>
          `;
        }
        let add_slide_class = "";
        if (answer_list[i].ratio_status == "disabled") {
          add_slide_class = "slide-free";
        }
        answer_html += `
          <div class="swiper-slide ${line_checked} ${add_slide_class}" answer_type="${answer_type}" min="${select_count.min
          }" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id
          }" next_hierarchy_id="${next_hierarchy_id}" index="${i}" subject="${answer_list[i].subject
          }">
            <div class="trans_area">
              <div class="img_area">
                <img
                  src="${answer_list[i].image}"
                />
              </div>
            </div>
            <div class="txt">
              <h4>${answer_list[i].subject}</h4>
              <p>${answer_list[i].answer_description.replace(/(\n|\r\n)/g, "<br>")}</p>
              ${frag_gray_html}
            </div>
          </div>
        `;
      }
    }

    let normal_checked = "";
    let strong_checked = "";

    let normal_class = "";
    let strong_class = "";
    if (
      survey_scent_type == "strong" ||
      is_strong == true
    ) {
      strong_checked = "checked";
      strong_class = "line_checked";
    } else {
      normal_checked = "checked";
      normal_class = "line_checked";
    }

    let fix_asnwer_html = `
      <input type="radio" name="strength" class="radiobox ${normal_class}" onClick="surveyRadioClick(this)" ${normal_checked} value="normal"><label>보통</label>
      <input type="radio" name="strength" class="radiobox ${strong_class}" onClick="surveyRadioClick(this)" ${strong_checked} value="strong"><label>강하게</label>
    `;

    let survey_worry_selected_list = JSON.parse(localStorage.getItem("survey_worry_selected"));
    let strength_class = "";
    survey_scent_type = "";
    if (
      survey_worry_selected_list.indexOf(survey_hair_loss_relax[survey_mall_id]) > -1
    ) {
      fix_asnwer_html = `
        <input type="radio" name="strength" class="radiobox line_checked" onClick="surveyRadioClick(this)" checked value="strong"><label>강하게</label>
      `;
      strength_class = "displaynone";
      survey_scent_type = "strong";
    }

    answer_html += `
            </div>
            <div class="swiper-pagination swiper-pagination-fragrance"></div>
          </div>
        </div>
        <div class="strength ${strength_class}">
          <span>부향율</span>
          <span>
            ${fix_asnwer_html}
          </span>
        </div>
      </div>
    </div>
    `;
  } else if (answer_type == "gender_age") {
    let male_checked = "";
    if (
      survey_storage_history_hierarchy &&
      survey_storage_history_hierarchy.member &&
      survey_storage_history_hierarchy.member.gender &&
      survey_storage_history_hierarchy.member.gender == "male"
    ) {
      male_checked = "line_checked";
    }

    let female_checked = "";
    if (
      survey_storage_history_hierarchy &&
      survey_storage_history_hierarchy.member &&
      survey_storage_history_hierarchy.member.gender &&
      survey_storage_history_hierarchy.member.gender == "female"
    ) {
      female_checked = "line_checked";
    }
    if (
      survey_question_answer_etc_history_hierarchy &&
      survey_question_answer_etc_history_hierarchy.gender
    ) {
      male_checked = "";
      female_checked = "";
    }
    if (
      survey_question_answer_etc_history_hierarchy &&
      survey_question_answer_etc_history_hierarchy.gender &&
      survey_question_answer_etc_history_hierarchy.gender == "male"
    ) {
      male_checked = "line_checked";
    }

    if (
      survey_question_answer_etc_history_hierarchy &&
      survey_question_answer_etc_history_hierarchy.gender &&
      survey_question_answer_etc_history_hierarchy.gender == "female"
    ) {
      female_checked = "line_checked";
    }

    let option_html = "<option selected value=''>출생연도</option>";
    let start_year = Number(dayjs().format("YYYY"));
    let end_year = Number(dayjs().subtract(94, "year").format("YYYY"));
    let birth_date = 0;
    if (survey_storage_history_hierarchy && survey_storage_history_hierarchy.member.birth_date) {
      birth_date = Number(survey_storage_history_hierarchy.member.birth_date);
    }
    if (
      survey_question_answer_etc_history_hierarchy &&
      survey_question_answer_etc_history_hierarchy.birth
    ) {
      birth_date = Number(survey_question_answer_etc_history_hierarchy.birth);
    }
    for (let i = start_year; i > end_year; i--) {
      let selected = "";

      if (birth_date == i) {
        selected = "selected='selected'";
      }
      option_html += `<option id="birth_${i}" value='${i}' ${selected}>${i}년생</option>`;
    }
    answer_html += `
    <div class="select">
      <ul class="gFlex2">
          <li id="survey_men" onClick="surveyAnswerGenderClick('male')" class="${male_checked}" hierarchy_id="${question.hierarchy_id}">남자</li> 
          <li id="survey_women" onClick="surveyAnswerGenderClick('female')" class="${female_checked}" hierarchy_id="${question.hierarchy_id}">여자</li>  
      </ul>
      <div class="selectBox">
          <select  id="survey_birth" name="birth" onChange="surveyChangeBirth(this)">
              ${option_html}
          </select>
          <div class="age">
              <span id="survey_old"></span>
          </div>
      </div>
     </div>
    `;
  } else {
    //
  }

  // 닉네임
  if (question.question_type == "nick_name") {
    let month = dayjs().format("MM");
    let day = dayjs().format("DD");
    let survey_input_product_name = "";
    if (
      survey_question_answer_etc_history_hierarchy &&
      survey_question_answer_etc_history_hierarchy.product_name
    ) {
      survey_input_product_name = survey_question_answer_etc_history_hierarchy.product_name;
    }
    answer_html = `
    <div class="nameBox">
        <input id="survey_input_product_name" type="text" placeholder="${question.placeholder}" onKeyup="surveyInputProductName()" onKeydown="surveyInputProductName()" value="${survey_input_product_name}"  hierarchy_id="${question.hierarchy_id}" class="line_checked"/>
        <button class="btnClear" onClick="clearInputProductName()"><i class="xi-close"></i></button>
    </div>
    <div class="img_area">
        <img src="/web/upload/mynomy/kr_mobile/diagnosis/recipe01.png" alt="샴푸 이미지" />
        &nbsp;
        <span id="survey_product_name" class="name">#${question.placeholder}</span>
        <span class="date">${month}<br/>${day}</span>
    </div>
    `;
  }
  return answer_html;
}

// 프리셋 체크
function surveyPresetCheck(hierarchy_id) {
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (
          Number(children[i].hierarchy_id) == Number(hierarchy_id) &&
          children[i].preset_setting_status == "enabled" &&
          children[i].presets &&
          children[i].presets.length > 0
        ) {
          return children[i];
        }
      }
    }
  }
  return null;
}

// 프리셋 노출
function showSurveyPreset(hierarchy_id, question) {
  let preset_html = "";
  let survey_step_sequence = 1;
  let subject = "";
  let next_hierarchy_id = surveyNextQuestionHierarchyId(hierarchy_id);
  let intro_count = 0;

  // 스텝을 어디까지 노출 시킬지 체크
  let top_persent = 0;
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (
      survey.qna_hierarchy[j].type == "folder" &&
      survey.qna_hierarchy[j].intro_status == "enabled"
    ) {
      intro_count++;
    }
    if (survey.qna_hierarchy[j].children && survey.qna_hierarchy[j].children.length > 0) {
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          top_persent = ((i + 1) / survey.qna_hierarchy[j].children.length) * 100;
          survey_step_sequence = survey.qna_hierarchy[j].sequence;
          subject = children[i].subject;
        }
      }
    }
  }
  let find_index = survey.qna_hierarchy.findIndex((e) => e.sequence == survey_step_sequence);
  if (find_index > -1) {
    survey_step_sequence = find_index + intro_count;
  }
  if (subject.indexOf("\n") > -1) {
    subject = subject.replace(/(\n|\r\n)/g, "<br>");
  }

  survey_step_sequence = survey_step_sequence - intro_count;

  // 스텝 노출
  let step_html = "<div class='step'>";
  for (let i = 0; i < survey_step_lsit.length; i++) {
    let menu_count = i + 1;
    step_html += `
        <div>${menu_count}</div>
      `;
  }
  step_html += `
    <div class="percent percent-dummy"></div>
    <div class="percent percent-gradient"></div>
  </div>`;

  // 상단 리스트 영역
  let top_html = "";

  for (let i = 0; i < question.presets.length; i++) {
    let hair_loss_preset_question_hierarchy_id_index = hair_loss_preset_question_hierarchy_id_list[survey_mall_id].findIndex(
      (e) => e == Number(question.presets[i].hierarchy_id)
    );
    if (hair_loss_preset_question_hierarchy_id_index > -1) {
      hair_loss_preset_array.push({
        subject: question.presets[i].subject,
        preset_answer_config: question.presets[i].preset_answer_config,
      });
    }

    if (question.presets[i].status == "disabled") {
      continue;
    }

    let preset_text = question.presets[i].preset_answer_config.join(",");

    top_html += `
      <div class="survey_worry_question swiper-slide" data-preset="${preset_text}" hierarchy_id="${question.hierarchy_id}">
        <div class="img_area"><img src="${question.presets[i].preset_pc_iamge}" /></div>
        <div class="txt">
            <h4>${question.presets[i].subject}</h4>
            <p>${question.presets[i].content}</p>
        </div>
      </div>
    `;
  }

  // 답변 리스트 영역
  let answer_html = "";
  let first_preset_text_answer = [];
  for (let i = 0; i < question.children.length; i++) {
    let is_auto_select = surveyAutoSelectAnswer(question.children[i].hierarchy_id);
    let select = "";
    if (is_auto_select) {
      select = "checked line_checked";
      first_preset_text_answer.push(Number(question.children[i].hierarchy_id));
    }
    let is_question_history_select = surveyHistoryAutoSelectQuestion(
      question.children[i].hierarchy_id
    );
    if (is_question_history_select) {
      select = "";
    }
    let is_history_select = surveyHistoryAutoSelectAnswer(question.children[i].hierarchy_id);
    if (is_history_select) {
      select = "checked line_checked";
    }

    answer_html += `<li id="preset_${question.children[i].hierarchy_id}" hierarchy_id="${question.children[i].hierarchy_id}" onClick="surveyAnswerPresetClick(this)" min="${question.select_count.min}" max="${question.select_count.max}" class="${select}">${question.children[i].subject}</li>`;
  }
  if (first_preset_text_answer.length > 0) {
    localStorage.setItem("survey_worry_selected", JSON.stringify(first_preset_text_answer));
  }

  preset_html += `
    <div id="stepArea">
      ${step_html}
    </div>
    <div class="progress-percent" data-start="0%" data-progress="20%"></div>
    <div class="contentBox selectArea">
      <div class="txt">
          <h3>${subject}</h3>
      </div>
      <div class="slideArea">
        <div class="swiper-container profileSlide">
          <div class="swiper-wrapper">
            ${top_html}
          </div>
          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>
      </div>
      <div class="inner">
        <div class="select line">
            <ul class="view">
                ${answer_html}
            </ul>
        </div>
      </div>
      <div class="dBtn gFixed gFull">
          <a href="javascript:void(0);" onclick="showNextSurveyQuestion(this, ${next_hierarchy_id})" class="btnFunc" min="${question.select_count.min}" max="${question.select_count.max}">원하는 기능을 다 선택했어요.</a>
      </div>
    </div>
  `;

  survey_jQuery("#survey_area").empty();
  survey_jQuery("#survey_area").append(preset_html);
  survey_jQuery("#stepArea").show();
  survey_jQuery("#stepArea").addClass("active");
  // 프리셋 스크롤 스크립트 호출
  presetSwiper();
  if (survey_step_lsit.length == survey_step_sequence) {
    top_persent = 100;
  }

  let start_persent = survey_jQuery(".progress-percent").data("start");
  let progress_percent = survey_jQuery(".progress-percent").data("progress");
  if (befor_percent.length > 0) {
    let befor_start = befor_percent[befor_percent.length - 1].start;
    let befor_progress = befor_percent[befor_percent.length - 1].progress;
    if (start_persent != befor_progress) {
      start_persent = befor_progress;
    }
  }
  befor_percent.push({
    start: start_persent,
    progress: progress_percent,
  });
  if (start_persent == progress_percent) {
    start_persent = "0%";
  }
  survey_jQuery("#stepArea .percent-dummy").css("left", start_persent);
  setTimeout(function () {
    survey_jQuery("#stepArea .percent-dummy").addClass("active");
    survey_jQuery("#stepArea .percent-dummy").css("left", `${progress_percent}`);
  }, 100);
}

// 인트로 노출 하기
function showSurveyIntro(hierarchy_id) {
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (Number(survey.qna_hierarchy[j].hierarchy_id) == Number(hierarchy_id)) {
      if (
        survey.qna_hierarchy[j].type == "folder" &&
        survey.qna_hierarchy[j].intro_status == "enabled"
      ) {
        survey_jQuery("#survey_area").empty();
        // 세트 상품이면
        let intro_html = survey.qna_hierarchy[j].intro_html;
        if (is_set_product == true) {
          // intro_html = survey.qna_hierarchy[j].intro_html.replace(/샴푸/g, "샴푸+트리트먼트");
        }
        survey_jQuery("#survey_area").append(intro_html);

        let next_hierarchy_id = surveyNextQuestionHierarchyId(hierarchy_id);

        survey_jQuery(".surveyNext").attr("href", "javascript:void(0)");
        survey_jQuery(".surveyNext").attr(
          "onClick",
          "showNextSurveyQuestion(this, " + next_hierarchy_id + ")"
        );
        survey_jQuery(".surveyNext").attr("hierarchy_id", hierarchy_id);
        survey_jQuery("#survey_mobile_intro").show();
        survey_jQuery("#survey_mobile_intro").css("overflow", "hidden");
        survey_jQuery("#stepArea").addClass("active");
        return true;
      }
    }
  }
  return false;
}

// 질문 노출 하기
function showSurveyQuestion(hierarchy_id, type = null) {
  if (hierarchy_id && no_show_hierarchy.indexOf(Number(hierarchy_id)) > -1) {
    let _next_hierarchy_id = surveyNextQuestionHierarchyId(hierarchy_id);
    if (_next_hierarchy_id) {
      showSurveyQuestion(_next_hierarchy_id, type);
      return;
    }
    return;
  }

  // hierarchy_id가 없으면 질문 끝까지 다함
  if (!hierarchy_id) {
    surveyResult();
    return;
  }

  // 인트로 체크
  let intro_result = showSurveyIntro(hierarchy_id);
  if (intro_result) {
    return;
  }
  // 분기 질문 체크
  let process_where_result = surveyProcessWhereCheck(hierarchy_id);
  if (
    process_where_result !== null &&
    process_where_result !== false &&
    typeof process_where_result !== "undefined"
  ) {
    hierarchy_id = process_where_result;
  } else if (process_where_result === null && type == "back") {
    let next_hierarchy_id = surveyNextQuestionHierarchyId(hierarchy_id);
    showSurveyQuestion(next_hierarchy_id);
    return;
  } else if (process_where_result === null || typeof process_where_result == "undefined") {
    let next_hierarchy_id = surveyNextQuestionHierarchyId(hierarchy_id);
    showSurveyQuestion(next_hierarchy_id);
    return;
  }

  // 프리셋 체크
  let preset_result = surveyPresetCheck(hierarchy_id);
  if (preset_result != null) {
    showSurveyPreset(hierarchy_id, preset_result);
    return;
  }

  let question_html = "";
  let survey_step_sequence = 1;
  let toast_popup_html = "";
  let tooltip_html = "";
  let answer_type = "";
  let children_sequence = 0;

  let intro_count = 0;

  // 스텝을 어디까지 노출 시킬지 체크
  let top_persent = 0;
  let qna_hierarchy_count = 0;
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (
      survey.qna_hierarchy[j].type == "folder" &&
      survey.qna_hierarchy[j].intro_status == "enabled"
    ) {
      intro_count++;
    }
    if (survey.qna_hierarchy[j].children && survey.qna_hierarchy[j].children.length > 0) {
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          top_persent = (((i + 1) / children.length) * 100) / 10;
          qna_hierarchy_count = survey.qna_hierarchy[j].children.length;
          survey_step_sequence = survey.qna_hierarchy[j].sequence;
          subject = children[i].subject;
          children_sequence = children[i].sequence;
        }
      }
    }
  }
  let find_index = survey.qna_hierarchy.findIndex((e) => e.sequence == survey_step_sequence);
  if (find_index > -1) {
    survey_step_sequence = find_index + intro_count;
  }
  let percent = (1 / qna_hierarchy_count) * 10;
  survey_step_sequence = survey_step_sequence - intro_count;
  top_persent = (survey_step_sequence - 1) * 20 + percent * children_sequence;
  if (qna_hierarchy_count == children_sequence || survey_step_sequence == 5) {
    top_persent = survey_step_sequence * 20;
  }

  // 스텝 노출
  let step_html = "<div class='step'>";
  for (let i = 0; i < survey_step_lsit.length; i++) {
    let menu_count = i + 1;
    step_html += `
        <div>${menu_count}</div>
      `;
  }
  let befor = top_persent - percent;
  if (survey_step_sequence == 1) {
    befor = 0;
    top_persent = 20;
  }
  step_html += `
      <div class="percent percent-dummy"></div>
      <div class="percent percent-gradient"></div>
    </div>
    <div class="progress-percent" data-start="${befor}%" data-progress="${top_persent}%"></div>  
  `;

  let is_scent = false;
  let is_gender_age = false;
  // 질문 노출
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].children && survey.qna_hierarchy[j].children.length > 0) {
      let is_check = false;
      let children = survey.qna_hierarchy[j].children;

      // 이전 step 입력
      let folder_sequence = survey.qna_hierarchy[j].sequence - 1;
      let question_subject = "";
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          let survey_next_hierarchy_id = surveyNextQuestionHierarchyId(hierarchy_id);

          // 향 일때 향 + 부향율 선택으로 인해 2로 수정
          if (
            (children[i].answer_type == "scent" || children[i].answer_type == "gender_age") &&
            children[i].select_count.max < 2
          ) {
            children[i].select_count.max = 2;
          }

          // 다음 버튼
          let survey_next_btn = `
            <a href="javascript:history.back();" class="btnPrev surveyNext">이전</a>
            <a href="javascript:void(0)" class="btnNext surveyPrev" onClick="showNextSurveyQuestion(this, ${survey_next_hierarchy_id})" min="${children[i].select_count.min}" max="${children[i].select_count.max}"  type="${children[i].question_type}">다음</a>
          `;

          // toast_popup 노출
          if (children[i].toast_popup.status == "enabled" && children[i].toast_popup.content) {
            toast_popup_html += `
            <div id="survey_pop_warp" class="popWrap">
              <div class="pop">
                  <p>${children[i].toast_popup.content.replace(/(\n|\r\n)/g, "<br>")}</p>
              </div>
            </div>
            `;
          }

          // tooltip_html 노출
          if (children[i].tooltip.status == "enabled" && children[i].tooltip.content) {
            tooltip_html += children[i].tooltip.content;
          }

          answer_type = children[i].answer_type;
          question_hierarchy_id = children[i].hierarchy_id;
          question_subject = children[i].subject.replace(/(\n|\r\n)/g, "<br>");

          // 답변 리스트 html
          let answer_list_html = setSurveyAnswer(
            children[i].answer_type,
            children[i].children,
            children[i].hierarchy_id,
            survey_next_hierarchy_id,
            children[i].select_count,
            children[i].display_array_count,
            question_subject,
            children[i]
          );

          let add_class = "";
          if (children[i].answer_type == "image" && children[i].display_array_count > 2) {
            add_class += "wide";
          }

          let find_index = survey.qna_hierarchy.findIndex((e) => e.sequence == folder_sequence);
          if (find_index > -1) {
            folder_sequence = find_index + intro_count;
          }
          if (j == folder_sequence) {
            if (children[i].question_type == "nick_name") {
              question_html += `
              <div id="stepArea" style="height: unset;">
                <div class="contentBox recipeBox">
                    <div class="inner">
                        <div class="txt">
                            <h3>${question_subject}</h3>
                        </div>
                        ${answer_list_html}
                    </div>   
                    <div class="dBtn gColumn gFixed">
                    ${survey_next_btn}
                    </div>
                </div>  
                ${toast_popup_html}  
              </div>
            `;
            } else {
              let add_style = "";
              let gender_age_class = "";
              let scent_class1 = "";
              let scent_class2 = "";
              let inner_full_class = "inner";
              if (children[i].question_type == "gender_age") {
                step_html = "";
                gender_age_class = "gender";
              }
              if (children[i].question_type == "scent") {
                scent_class1 = "fragrance";
                inner_full_class = "full";
                scent_class2 = "treat";
              }
              question_html += `
              <div id="stepArea">
                ${step_html}
              </div>
              <div class="contentBox ${scent_class1}">
                <div class="${inner_full_class}">
                    <div class="txt ${gender_age_class} ${scent_class2}" style="${add_style}">
                        <h3>${question_subject}</h3>
                    </div>
                    ${answer_list_html}
                </div>
                ${tooltip_html}
                <div class="dBtn gColumn gFixed">
                    ${survey_next_btn}
                </div>
              </div>
              ${toast_popup_html}
            `;
            }
          }
        }
      }

      survey_jQuery("#survey_area").empty();
      survey_jQuery("#survey_area").append(question_html);
      if (survey_jQuery(".survey_tooltip_mobile").length > 0) {
        // let min_height = survey_jQuery("#container").css("min-height");
        let container_height = survey_jQuery("#container").height();
        let contents_height = survey_jQuery("#contents").height();

        survey_jQuery("#contents").css("height", contents_height + 45 + "px");

        // let replace_min_height = min_height.replace("px", "");
        // if (min_height) {
        //   let update_min_height = Number(min_height) + 45;
        //    survey_jQuery("#container").css("min-height", update_min_height + "px");
        //    // survey_jQuery("#contents").css("min-height", min_height + "px");
        // }
        survey_jQuery(".survey_tooltip_mobile").show();
      } else {
        // survey_jQuery("#container").css("min-height", "");
        // survey_jQuery("#contents").css("min-height", "");
        survey_jQuery("#container").css("height", "");
        survey_jQuery("#contents").css("height", "");
      }

      // 토스트 팝업 숨김
      if (toast_popup_html) {
        setTimeout(function () {
          survey_jQuery("#survey_pop_warp").fadeOut(200);
        }, 2000);
      }
      // 세로 슬라이드 일때
      if (answer_type == "height_slide_image") {
        let line_checked = survey_jQuery(".line_checked");
        if (line_checked.length > 1) {
          survey_jQuery(line_checked[0]).removeClass("checked line_checked");
        }
        survey_jQuery(".swiper-wrapper").children().css("visibility", "hidden");
        if (survey_my_hair_damage[survey_mall_id].indexOf(Number(question_hierarchy_id)) > -1) {
          setTimeout(function () {
            survey_jQuery(".swiper-wrapper").children().first().css("visibility", "");
          }, 100);

          setTimeout(function () {
            settingHeightSlideImage();
            survey_jQuery(".line_checked").click();
          }, 500);
        } else {
          setTimeout(function () {
            survey_jQuery(".controlArea:not(.plus) .slide-draggable").css("min-height", "150px");
            settingHeightSlideImage();

            survey_jQuery(".swiper-wrapper").children().first().css("visibility", "");
          }, 100);
          setTimeout(function () {
            survey_jQuery(".line_checked").click();
          }, 500);
        }
      }
      // 향 일때
      if (answer_type == "scent") {
        is_scent = true;
      }
      // 성별/출생연도 일때
      if (answer_type == "gender_age") {
        is_gender_age = true;
      }
    }
  }

  survey_jQuery("#stepArea").show();
  survey_jQuery("#stepArea").addClass("active");

  let start_persent = survey_jQuery(".progress-percent").data("start");
  let progress_percent = survey_jQuery(".progress-percent").data("progress");
  if (befor_percent.length > 0) {
    let befor_progress = befor_percent[befor_percent.length - 1].progress;
    if (start_persent != befor_progress) {
      start_persent = befor_progress;
    }
  }
  befor_percent.push({
    start: start_persent,
    progress: progress_percent,
  });

  survey_jQuery("#stepArea .percent-dummy").css("left", start_persent);
  setTimeout(function () {
    survey_jQuery("#stepArea .percent-dummy").addClass("active");
    survey_jQuery("#stepArea .percent-dummy").css("left", `${progress_percent}`);
  }, 100);

  // 향일때
  if (is_scent) {
    setTimeout(function () {
      survey_jQuery("#stepArea").addClass("active");
      let list = survey_jQuery(".fragranceSlide .swiper-wrapper .swiper-slide");
      let index = 0;
      for (let i = 0; i < list.length; i++) {
        let line_checked = survey_jQuery(list[i]).hasClass("line_checked");
        if (line_checked) {
          index = i;
        }
      }
      settingScentSlideImage(index);
    }, 10);
  }

  if (is_gender_age) {
    setTimeout(function () {
      surveyChangeBirth();
    }, 10);
  }

  return null;
}

function settingHeightSlideImage() {
  //draggable
  setH();
  survey_jQuery(window).on("load resize", function () {
    setH();
  });
  function setH() {
    survey_jQuery(".controlArea:not(.plus) .slide-draggable").css(
      "height",
      survey_jQuery(".controlArea:not(.plus) .slide-draggable").height()
    );

    survey_jQuery(".controlArea:not(.plus) .control_bar .bar .blank-top").css(
      "height",
      survey_jQuery(".controlArea:not(.plus) .control_bar ol li").height() / 2 - 12
    );
    survey_jQuery(".controlArea:not(.plus) .control_bar .bar .blank-bt").css(
      "height",
      survey_jQuery(".controlArea:not(.plus) .control_bar ol li").height() / 2 - 12
    );
  }
  var draggable = new Swiper(".controlArea:not(.plus) .slide-draggable", {
    direction: "vertical",
    loop: false,
    allowTouchMove: false,
    effect: "fade",
    scrollbar: {
      el: ".controlArea:not(.plus) .control_bar .bar",
      hide: false,
      draggable: true,
    },
    on: {
      slideChange: function () {
        survey_jQuery(".controlArea:not(.plus) .control_bar ol li")
          .removeClass("checked line_checked")
          .eq(draggable.activeIndex)
          .addClass("checked line_checked");

        let hierarchy_id = survey_jQuery(".line_checked").attr("hierarchy_id");
        setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);

        let swiper_list = survey_jQuery(".swiper-slide");
        swiper_list.each(function (index, element) {
          let is_active = survey_jQuery(element).hasClass("swiper-slide-active");
          if (!is_active) {
            survey_jQuery(element).find("p").hide();
          } else {
            survey_jQuery(element).find("p").show();
          }
        });
      },
      slideChangeTransitionEnd: function () {
        // let swiper_list = survey_jQuery(".swiper-slide");
        // swiper_list.each(function (index, element) {
        //   //
        //   let is_active = survey_jQuery(element).hasClass("swiper-slide-active")
        //   if (!is_active) {
        //     survey_jQuery(element).find("p").hide();
        //   } else {
        //     survey_jQuery(element).find("p").show();
        //   }
        // });
      },
    },
  });
  survey_jQuery(".controlArea:not(.plus) .control_bar ol li").on("click", function () {
    draggable.slideTo($(this).index());
  });
  survey_jQuery(".swiper-slide").css("visibility", "");
}

function settingWidthSlideImage(index) {
  var fragranceSlide = new Swiper(".fragranceSlide", {
    speed: 600,
    slidesPerView: "auto",
    spaceBetween: 0,
    slideToClickedSlide: true,
    centeredSlides: true,
    mousewheel: true,
    pagination: {
      el: ".swiper-pagination-fragrance",
      clickable: true,
    },
    on: {
      slideChangeTransitionStart: function () {
        let fragrance_text = survey_jQuery(".fragranceSlide .swiper-slide-active h4").text();
        survey_jQuery(".frag_gray").hide();

        if (fragrance_text == "무향") {
          survey_jQuery(".strength").hide();
        } else {
          survey_jQuery(".strength").show();
          survey_jQuery(".fragranceSlide .swiper-slide-active .frag_gray").show();
        }
      },
      slideChangeTransitionEnd: function () {
        let fragrance_text = survey_jQuery(".fragranceSlide .swiper-slide-active h4").text();
        if (
          survey_jQuery(".fragranceSlide .swiper-slide-active").hasClass("slide-free") ||
          fragrance_text == "무향"
        ) {
          survey_jQuery(".strength").hide();
        } else {
          survey_jQuery(".strength").show();
        }
        survey_jQuery(".fragranceSlide .swiper-slide").removeClass("line_checked");
        survey_jQuery(".fragranceSlide .swiper-slide-active").addClass("line_checked");

        let hierarchy_id = survey_jQuery(".swiper-slide-active").attr("hierarchy_id");
        let value = survey_jQuery("input[name='strength']:checked").val();
        if (fragrance_text == "무향") {
          value = "normal";
        }
        if (value == "strong") {
          for (const fragrance in fragrance_hierarchy_array) {
            if (fragrance_hierarchy_array[fragrance].indexOf(Number(hierarchy_id)) > -1) {
              setSurveyQuestionAnswerHistory(Number(fragrance_hierarchy_array[fragrance][1]), 1);
              survey_jQuery("input:radio[name='strength']:radio[value='" + value + "']").click();
            }
          }
        } else {
          setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);
          survey_jQuery("input:radio[name='normal']:radio[value='" + value + "']").click();
        }
      },
    },
  });
  if (index) {
    fragranceSlide.slideTo(Number(index));
  }
}

function settingScentSlideImage(index) {
  var fragranceSlide = new Swiper(".fragranceSlide", {
    speed: 600,
    slidesPerView: "auto",
    spaceBetween: 0,
    slideToClickedSlide: true,
    centeredSlides: true,
    mousewheel: true,
    pagination: {
      el: ".swiper-pagination-fragrance",
      clickable: true,
    },
    on: {
      slideChangeTransitionStart: function () {
        /*
        if (survey_jQuery(".fragranceSlide .swiper-slide-active").hasClass("slide-free")) {
          survey_jQuery(".strength").hide();
        } else {
          survey_jQuery(".strength").show();
        }
        */

        if (survey_jQuery(".fragranceSlide .swiper-slide-active").hasClass("slide-free")) {
          survey_jQuery(".strength").hide();
          survey_jQuery("input:radio[name='strength']:radio[value='normal']").click();
        } else {
          survey_jQuery(".strength").show();
        }

        survey_jQuery(".fragranceSlide .swiper-slide").removeClass("line_checked");
        survey_jQuery(".fragranceSlide .swiper-slide-active").addClass("line_checked");
        let subject = survey_jQuery(".fragranceSlide .swiper-slide-active").attr("subject");
        let radiobox_list = survey_jQuery(".radiobox");
        let value = "normal";
        for (let radiobox of radiobox_list) {
          let line_checked = survey_jQuery(radiobox).hasClass("line_checked");
          if (line_checked) {
            value = survey_jQuery(radiobox).val();
          }
        }
        survey_question_answer_history_hierarchy_fragrance_name = subject;
        let hierarchy_id = survey_jQuery(".swiper-slide-active.line_checked").attr("hierarchy_id");
        if (value == "strong") {
          survey_jQuery("input:radio[name='strength']:radio[value='" + value + "']").click();
        } else {
          survey_jQuery("input:radio[name='normal']:radio[value='" + value + "']").click();
        }
        setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);

      },
      slideChangeTransitionEnd: function () {
        /*
        if (survey_jQuery(".fragranceSlide .swiper-slide-active").hasClass("slide-free")) {
          survey_jQuery(".strength").hide();
          survey_jQuery("input:radio[name='strength']:radio[value='normal']").click();
        } else {
          survey_jQuery(".strength").show();
        }

        survey_jQuery(".fragranceSlide .swiper-slide").removeClass("line_checked");
        survey_jQuery(".fragranceSlide .swiper-slide-active").addClass("line_checked");
        let subject = survey_jQuery(".fragranceSlide .swiper-slide-active").attr("subject");
        let radiobox_list = survey_jQuery(".radiobox");
        let value = "normal";
        for (let radiobox of radiobox_list) {
          let line_checked = survey_jQuery(radiobox).hasClass("line_checked");
          if (line_checked) {
            value = survey_jQuery(radiobox).val();
          }
        }
        survey_question_answer_history_hierarchy_fragrance_name = subject;
        let hierarchy_id = survey_jQuery(".swiper-slide-active.line_checked").attr("hierarchy_id");
        if (value == "strong") {
          survey_jQuery("input:radio[name='strength']:radio[value='" + value + "']").click();
        } else {
          survey_jQuery("input:radio[name='normal']:radio[value='" + value + "']").click();
        }
        setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);
        */
      },
    },
  });
  if (index) {
    fragranceSlide.slideTo(Number(index));
  }
}

function presetSwiper() {
  var main_swiper = new Swiper(".profileSlide", {
    speed: 600,
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    on: {
      slideChangeTransitionStart: function () {
        $(".selectArea .select ul.view li").removeClass("checked line_checked");
        $("li[id^='preset_']").css("cursor", "");
        $(".select .view li").css("cursor", "");

        if (
          $(".slideArea .profileSlide .swiper-slide").eq(main_swiper.activeIndex).data("preset") !=
          undefined
        ) {
          let first_preset_text_answer = [];

          let data_preset = $(".slideArea .profileSlide .swiper-slide")
            .eq(main_swiper.activeIndex)
            .data("preset");
          if (data_preset) {
            let preset = $(".slideArea .profileSlide .swiper-slide")
              .eq(main_swiper.activeIndex)
              .data("preset")
              .split(",");

            setSurveyQuestionAnswerHistory(Number(preset[0]), 1);
            for (let i = 0; i < preset.length; i++) {
              if (i == 0) {
                setSurveyQuestionAnswerHistory(Number(preset[i]), 1, "delete");
              }
              setSurveyQuestionAnswerHistory(Number(preset[i]), preset.length);
              $("#preset_" + preset[i]).addClass("checked line_checked");
              first_preset_text_answer.push(Number(preset[i]));
              localStorage.setItem(
                "survey_worry_selected",
                JSON.stringify(first_preset_text_answer)
              );
            }

            // $(".select .view li").css("cursor", "default");
            $(".select .view li").css("cursor", "");
          }
        } else {
          $(".select .view li").css("cursor", "");
        }
      },
    },
  });
}

function progressPersent() {
  if ($("#stepArea").length) {
    $("#stepArea").addClass("active");
    setTimeout(function () {
      let percentST = $(".step .menu.progress.ing").data("start");
      let percent = $(".step .menu.progress.ing").data("progress");
      $(".step .menu.progress.ing .percent").css("top", percentST);
      setTimeout(function () {
        $(".step .menu.progress.ing .percent").addClass("active");
        $(".step .menu.progress.ing .percent").css("top", percent);
      }, 100);
    }, 100);
  }
}

let posY;
// 툴팁 노출
function showTooltip() {
  posY = survey_jQuery(window).scrollTop();
  survey_jQuery("html").addClass("expand-box");
  survey_jQuery("#container").css("top", -posY);

  let tooltip_list = survey_jQuery(".survey_tooltip_mobile");
  survey_jQuery(tooltip_list[1]).show();
}
// 툴팁 닫기
function closeTooltip() {
  survey_jQuery("html").removeClass("expand-box");
  survey_jQuery(window).scrollTop(posY);
  let tooltip_list = survey_jQuery(".survey_tooltip_mobile");
  survey_jQuery(tooltip_list[1]).hide();
}
// 툴팁 삭제
function removeTooltip() {
  survey_jQuery(".contentBox .infoWrap").remove();
}
// 다음 질문 hierarchy_id 찾기
function surveyNextQuestionHierarchyId(hierarchy_id) {
  let qna_hierarchy_sequence = 1;

  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      // 인트로 체크
      if (Number(survey.qna_hierarchy[j].hierarchy_id) == Number(hierarchy_id)) {
        let folder_index = j + 1;
        if (survey.qna_hierarchy[folder_index]) {
          if (survey.qna_hierarchy[folder_index].intro_status == "enabled") {
            return survey.qna_hierarchy[folder_index].hierarchy_id;
          } else {
            return survey.qna_hierarchy[folder_index].children[0].hierarchy_id;
          }
        }
      }

      // 다음 질문 체크
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          qna_hierarchy_sequence = Number(survey.qna_hierarchy[j].sequence);
          if (children[i + 1]) {
            return children[i + 1].hierarchy_id;
          } else {
            continue;
          }
        }
      }
    }
  }

  // 다음 폴더 체크
  qna_hierarchy_sequence += 1;
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      let children = survey.qna_hierarchy[j].children;
      if (
        Number(survey.qna_hierarchy[j].sequence) == qna_hierarchy_sequence &&
        children.length > 0
      ) {
        return children[0].hierarchy_id;
      }
    }
  }
  return null;
}

// 임시저장조회 및 노출
async function getSurveyQnaStorage() {
  if (survey_member_id) {
    return new Promise(function (resolve, reject) {
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}/storage?member_id=${survey_member_id}`,
        type: "GET",
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
          if (survey_product_no == survey_set_product_no) {
            // 향 찾기 원하는 향
            let set_param = {
              survey_hierarchy_ids: [],
              member: result.member,
              result_status: result.result_status,
              updated_at: result.updated_at,
            };
            for (const survey of result.surveys) {
              if (Number(survey.product_no) == Number(survey_shampoo_no)) {
                set_param.survey_hierarchy_ids = survey.hierarchy_ids;
                for (const hierarchy_id of survey.hierarchy_ids) {
                  setSurveyQuestionAnswerHistory(Number(hierarchy_id), 30);
                }
              }
            }
            survey_storage_history_hierarchy = set_param;
          } else {
            survey_storage_history_hierarchy = result;

            for (const hierarchy_id of result.survey_hierarchy_ids) {
              setSurveyQuestionAnswerHistory(Number(hierarchy_id), 30);
            }
          }

          resolve(survey_storage_history_hierarchy);
        },
      });
    });
  }
}

// 임시저장 API
function setSurveyStorage(params) {
  survey_jQuery.ajax({
    url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}/storage`,
    type: "PUT",
    accept: "application/json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(params),
    dataType: "json",
    success: function (result) {
      // console.log(result);
    },
  });
}

// 다음 질문 노출
function showNextSurveyQuestion(element, next_hierarchy_id) {
  // 인트로일때
  if (survey_jQuery(element).hasClass("surveyIntro")) {
    let agree_checkbox = survey_jQuery("#survey_mobile_intro .surveyAgree");
    for (const agree of agree_checkbox) {
      let agree_checked = survey_jQuery(agree).is(":checked");
      if (!agree_checked) {
        alert("민감정보수집 및 이용동의를 체크해주세요.");
        return;
      }
    }
    // 질문 노출
    let hierarchy_id = survey_jQuery(element).attr("hierarchy_id");
    survey_history_hierarchy.push(Number(hierarchy_id));
    if (is_set_product == true) {
      let hierarchy_index_info = searchHierarchyIndexInfo(Number(hierarchy_id));
      let treatment_hierarchy_id = searchTreatmentHierarchyId(hierarchy_index_info);
      if (treatment_hierarchy_id) {
        treatment_survey_history_hierarchy.push(treatment_hierarchy_id);
      }
    }

    showSurveyQuestion(next_hierarchy_id);
    history.pushState(null, null, location.search);
    history.pushState(null, null, location.search + "#progress");

    surveySaveStorage();
    survey_jQuery("#header .header").removeClass("slideUp").addClass("slideDown");
    survey_jQuery("#stepArea .step").removeClass("up");
    return;
  }

  let min = survey_jQuery(element).attr("min");
  let max = survey_jQuery(element).attr("max");

  /*
  let select_answer_count = survey_jQuery(".line_checked").length;
  if (select_answer_count > max) {
    alert("최대 " + max + "개까지 선택할 수 있어요.");
    return;
  }
  if (select_answer_count < min) {
    alert("해당되는 항목을 선택해주세요.\n최대 " + max + "개까지 선택할 수 있어요.");
    return;
  }
  */

  let type = survey_jQuery(element).attr("type");

  if (type != "gender_age") {
    let select_answer_count = survey_jQuery(".line_checked").length;
    if (select_answer_count > max) {
      alert("최대 " + max + "개까지 선택할 수 있어요.");
      return;
    }
    if (select_answer_count < min) {
      alert("해당되는 항목을 선택해주세요.\n최대 " + max + "개까지 선택할 수 있어요.");
      return;
    }
  } else {
    let survey_men = survey_jQuery("#survey_men").hasClass("line_checked");
    let survey_women = survey_jQuery("#survey_women").hasClass("line_checked");
    if (!survey_men && !survey_women) {
      alert("성별을 선택해주세요.");
      return;
    }

    let survey_birth = survey_jQuery("#survey_birth").find(".line_checked");
    if (survey_birth.length == 0) {
      alert("출생연도를 선택해주세요.");
      return;
    }
  }

  if (no_show_hierarchy.indexOf(Number(next_hierarchy_id)) > -1) {
    let _next_hierarchy_id = surveyNextQuestionHierarchyId(next_hierarchy_id);
    if (_next_hierarchy_id) {
      showNextSurveyQuestion(element, _next_hierarchy_id);
      return;
    }
    return;
  }

  let select_answer = survey_jQuery(".line_checked");
  for (let i = 0; i < select_answer.length; i++) {
    let hierarchy_id = survey_jQuery(select_answer[i]).attr("hierarchy_id");
    if (hierarchy_id) {
      // 향 - 강하게시 hierarchy_id 변경
      if (type == "scent") {
        let scent_hierarchy_id = searchQuestionScentHierarchyId(hierarchy_id);
        if (scent_hierarchy_id) {
          hierarchy_id = scent_hierarchy_id;
        }
      }

      survey_history_hierarchy.push(Number(hierarchy_id));
      if (is_set_product == true) {
        let hierarchy_index_info = searchHierarchyIndexInfo(Number(hierarchy_id));
        let treatment_hierarchy_id = searchTreatmentHierarchyId(hierarchy_index_info);
        if (treatment_hierarchy_id) {
          treatment_survey_history_hierarchy.push(treatment_hierarchy_id);
        }
      }
    }
  }

  if (type == "scent") {
    is_fragrance = true;
  }
  if (type == "gender_age") {
    is_gender = true;
    survey_jQuery("li.line_checked").click();
  }

  // 질문 노출
  showSurveyQuestion(next_hierarchy_id);
  surveySaveStorage();

  survey_jQuery("#header .header").removeClass("slideUp").addClass("slideDown");
  survey_jQuery("#stepArea .step").removeClass("up");
  window.scrollTo(0, 0);
}

function surveySaveStorage(gender_type, birth_date, result_status = "N") {
  if (is_survey_result === true) {
    return;
  }
  // 임시저장 API
  let set_storage_param = {
    survey_hierarchy_ids: [...survey_history_hierarchy],
    member: {
      product_name: null,
      birth_date: birth_date,
      member_id: survey_member_id,
    },
    result_status: result_status,
  };

  if (gender_type) {
    set_storage_param.member.gender = gender_type;
  }

  if (
    survey_question_answer_etc_history_hierarchy &&
    survey_question_answer_etc_history_hierarchy.gender
  ) {
    set_storage_param.member.gender = survey_question_answer_etc_history_hierarchy.gender;
    gender_type = survey_question_answer_etc_history_hierarchy.gender;
  }
  if (
    survey_question_answer_etc_history_hierarchy &&
    survey_question_answer_etc_history_hierarchy.birth
  ) {
    set_storage_param.member.birth_date = survey_question_answer_etc_history_hierarchy.birth;
    birth_date = survey_question_answer_etc_history_hierarchy.birth;
  }

  // 세트 일때
  if (survey_product_no == survey_set_product_no) {
    set_storage_param = {
      surveys: [
        {
          product_no: survey_shampoo_no,
          hierarchy_ids: [...survey_history_hierarchy],
        },
        {
          product_no: survey_treatment_no,
          hierarchy_ids: [...treatment_survey_history_hierarchy],
        },
      ],
      member: {
        product_name: null,
        birth_date: birth_date,
        member_id: survey_member_id,
      },
      result_status: result_status,
    };
    if (gender_type) {
      set_storage_param.member.gender = gender_type;
    }
  }
  if (survey_member_id) {
    setSurveyStorage(set_storage_param);
  }
}

// 결과 페이지
function surveyResult() {
  let survey_input_product_name = survey_jQuery("#survey_input_product_name").val();
  if (!survey_input_product_name.trim()) {
    survey_input_product_name = survey_jQuery("#survey_input_product_name").attr("placeholder");
    product_name = survey_input_product_name;
    survey_jQuery("#survey_input_product_name").val(survey_input_product_name);
  }
  if (!product_name) {
    product_name = survey_jQuery("#survey_input_product_name").attr("placeholder");
  }
  if (is_survey_result == true) {
    return;
  }
  // 로딩 사용시 여기에 작업
  // 결과 전송
  let survey_hierarchy_ids = [];

  // 인트로 hierarchy_id 제거
  surveyDeleteIntroHierarchyId(Number(survey_product_no));

  for (const hierarchy_id of survey_history_hierarchy) {
    survey_hierarchy_ids.push(hierarchy_id);
  }

  hair_loss_base_array = [];
  // 탈모 베이스 체크
  for (const hierarchy of survey.qna_hierarchy) {
    for (const hierarchy_children of hierarchy.children) {
      let base_index = hair_loss_base_question_hierarchy_id_list[survey_mall_id].findIndex(
        (e) => e.hierarchy_id == Number(hierarchy_children.hierarchy_id)
      );
      if (base_index > -1) {
        if (!hair_loss_base_array[hair_loss_base_question_hierarchy_id_list[survey_mall_id][base_index].key]) {
          hair_loss_base_array[hair_loss_base_question_hierarchy_id_list[survey_mall_id][base_index].key] = [];
        }
        for (const answer of hierarchy_children.children) {
          hair_loss_base_array[hair_loss_base_question_hierarchy_id_list[survey_mall_id][base_index].key].push(
            answer.hierarchy_id
          );
        }
      }
    }
  }

  let set_param = {
    survey_hierarchy_ids,
    member: {
      product_name: product_name,
      gender: gender,
      birth_date: birth,
      member_id: survey_member_id,
    },
  };

  let total_score = 0;
  // 세트 일때
  if (is_set_product == true) {
    for (const hierarchy_id of survey_history_hierarchy) {
      let formula = searchFormulaByHierarchyId(hierarchy_id);
      if (formula) {
        total_score += formula.score;
        if (
          Number(survey_hair_loss_relax[survey_mall_id]) == Number(formula.hierarchy_id)
        ) {
          is_hair_loss = true;
        }
      }
    }

    // 탈모 정보 추가
    if (is_hair_loss == true) {
      let base_hierarchy_ids = [];
      if (gender == "male") {
        if (total_score >= 20) {
          base_hierarchy_ids = hair_loss_base_array["m_20_up"];
        } else if (total_score >= 0) {
          base_hierarchy_ids = hair_loss_base_array["m_0_up"];
        } else {
          base_hierarchy_ids = hair_loss_base_array["m_0_down"];
        }
      } else {
        if (total_score >= 20) {
          base_hierarchy_ids = hair_loss_base_array["w_20_up"];
        } else if (total_score >= 0) {
          base_hierarchy_ids = hair_loss_base_array["w_0_up"];
        } else {
          base_hierarchy_ids = hair_loss_base_array["w_0_down"];
        }
      }

      let fragrance_hierarchy_id = null;
      for (let _hierarchy_id of survey_hierarchy_ids) {
        let scent_hierarchy_id = searchQuestionScentHierarchyId(_hierarchy_id);
        if (scent_hierarchy_id) {
          fragrance_hierarchy_id = [scent_hierarchy_id];
        }
      }
      // let fragrance_hierarchy_id = [survey_hierarchy_ids[survey_hierarchy_ids.length - 1]];
      const bom_hierarchy_ids = [...fragrance_hierarchy_id, ...base_hierarchy_ids];

      set_param = {
        surveys: [
          {
            product_no: survey_shampoo_no,
            // hierarchy_ids: survey_history_hierarchy,
            hierarchy_ids: survey_history_hierarchy,
            // bom_hierarchy_ids: [
            //   ...add_survey_history_hierarchy,
            //   ...add_hair_loss_info_hierarchy_ids,
            // ],
            bom_hierarchy_ids,
            // bom_hierarchy_ids: [...add_survey_history_hierarchy, ...base_hierarchy_ids],
          },
          {
            product_no: survey_treatment_no,
            hierarchy_ids: treatment_survey_history_hierarchy,
            bom_hierarchy_ids: [...treatment_survey_history_hierarchy],
          },
        ],
        member: {
          product_name: product_name,
          gender: gender,
          birth_date: birth,
          member_id: survey_member_id,
        },
        // is_hair_loss,
      };
    } else {
      set_param = {
        surveys: [
          {
            product_no: survey_shampoo_no,
            hierarchy_ids: survey_history_hierarchy,
            bom_hierarchy_ids: [...survey_history_hierarchy],
          },
          {
            product_no: survey_treatment_no,
            hierarchy_ids: treatment_survey_history_hierarchy,
            bom_hierarchy_ids: [...treatment_survey_history_hierarchy],
          },
        ],
        member: {
          product_name: product_name,
          gender: gender,
          birth_date: birth,
          member_id: survey_member_id,
        },
        // is_hair_loss,
      };
    }
    // 샴푸 or 트리트먼트 일때
  } else {
    for (const hierarchy_id of survey_history_hierarchy) {
      let formula = searchFormulaByHierarchyId(hierarchy_id);
      if (formula) {
        total_score += formula.score;
        if (
          Number(survey_hair_loss_relax[survey_mall_id]) == Number(formula.hierarchy_id)
        ) {
          is_hair_loss = true;
        }
      }
    }

    if (is_hair_loss == true && survey_shampoo_no == survey_product_no) {
      let base_hierarchy_ids = [];
      if (gender == "male") {
        if (total_score >= 20) {
          base_hierarchy_ids = hair_loss_base_array["m_20_up"];
        } else if (total_score >= 0) {
          base_hierarchy_ids = hair_loss_base_array["m_0_up"];
        } else {
          base_hierarchy_ids = hair_loss_base_array["m_0_down"];
        }
      } else {
        if (total_score >= 20) {
          base_hierarchy_ids = hair_loss_base_array["w_20_up"];
        } else if (total_score >= 0) {
          base_hierarchy_ids = hair_loss_base_array["w_0_up"];
        } else {
          base_hierarchy_ids = hair_loss_base_array["w_0_down"];
        }
      }

      let fragrance_hierarchy_id = [survey_hierarchy_ids[survey_hierarchy_ids.length - 1]];
      const bom_hierarchy_ids = [...fragrance_hierarchy_id, ...base_hierarchy_ids];

      set_param = {
        product_no: Number(survey_product_no),
        survey_hierarchy_ids,
        // bom_hierarchy_ids: [...add_survey_history_hierarchy, ...add_hair_loss_info_hierarchy_ids],
        bom_hierarchy_ids,
        // bom_hierarchy_ids: [...add_survey_history_hierarchy, ...base_hierarchy_ids],
        member: {
          product_name: product_name,
          gender: gender,
          birth_date: birth,
          member_id: survey_member_id,
        },
        // is_hair_loss,
      };
    } else {
      set_param = {
        survey_hierarchy_ids,
        bom_hierarchy_ids: [...survey_hierarchy_ids],
        member: {
          product_name: product_name,
          gender: gender,
          birth_date: birth,
          member_id: survey_member_id,
        },
        // is_hair_loss,
      };
    }
  }

  // 트리트먼트 or 세트 상품 일때 앰플 선택개수에 따라 고정 앰플 추가 START
  if (survey_product_no == survey_treatment_no || survey_product_no == survey_set_product_no) {
    let fix_answer_hierarchy_info = {
      P: null,
      D: null,
      I: null,
    };

    let treatment_answer_ampoule_hierarchy_ids = [];

    // 트리트먼트일때
    if (survey_product_no == survey_treatment_no) {
      for (const hierarchy of survey.qna_hierarchy) {
        for (const question of hierarchy.children) {
          for (const answer of question.children) {
            //
            if (answer.subject == "P") {
              fix_answer_hierarchy_info.P = answer.hierarchy_id;
            }
            if (answer.subject == "D") {
              fix_answer_hierarchy_info.D = answer.hierarchy_id;
            }
          }
        }
      }
      // 중복 안되게 타입별로 배열에 push
      for (const hierarchy_id of survey_history_hierarchy) {
        let formula = searchFormulaByHierarchyId(hierarchy_id);
        if (formula) {
          for (let answer_ampoule in treatment_answer_ampoule_type_info[survey_mall_id]) {
            for (let answer of treatment_answer_ampoule_type_info[survey_mall_id][answer_ampoule]) {
              if (Number(formula.hierarchy_id) == answer) {
                let index = treatment_answer_ampoule_hierarchy_ids.findIndex(
                  (e) => e.type == answer_ampoule
                );
                if (index == -1) {
                  treatment_answer_ampoule_hierarchy_ids.push({
                    type: answer_ampoule,
                    hierarchy_id: Number(hierarchy_id),
                  });
                }
              }
            }
          }
        }
      }
      if (treatment_answer_ampoule_hierarchy_ids.length < 3) {
        let index_type_P = treatment_answer_ampoule_hierarchy_ids.findIndex((e) => e.type == "P");

        if (index_type_P == -1) {
          let index_p = treatment_answer_ampoule_hierarchy_ids.findIndex(
            (e) => Number(e.hierarchy_id) == Number(fix_answer_hierarchy_info.P)
          );
          if (index_p == -1) {
            let bom_hierarchy_ids_index = set_param.bom_hierarchy_ids.findIndex(
              (e) => Number(e) == Number(fix_answer_hierarchy_info.P)
            );
            if (bom_hierarchy_ids_index == -1) {
              set_param.bom_hierarchy_ids.push(Number(fix_answer_hierarchy_info.P));
            }
          }
        }

        let index_type_D = treatment_answer_ampoule_hierarchy_ids.findIndex((e) => e.type == "D");
        if (index_type_D == -1) {
          let index_d = treatment_answer_ampoule_hierarchy_ids.findIndex(
            (e) => Number(e.hierarchy_id) == Number(fix_answer_hierarchy_info.D)
          );
          if (index_d == -1) {
            let bom_hierarchy_ids_index = set_param.bom_hierarchy_ids.findIndex(
              (e) => Number(e) == Number(fix_answer_hierarchy_info.D)
            );
            if (bom_hierarchy_ids_index == -1) {
              set_param.bom_hierarchy_ids.push(Number(fix_answer_hierarchy_info.D));
            }
          }
        }
      } else if (treatment_answer_ampoule_hierarchy_ids.length == 3) {
        let index_type_D = treatment_answer_ampoule_hierarchy_ids.findIndex((e) => e.type == "D");
        if (index_type_D == -1) {
          let index_d = treatment_answer_ampoule_hierarchy_ids.findIndex(
            (e) => Number(e.hierarchy_id) == Number(fix_answer_hierarchy_info.D)
          );
          if (index_d == -1) {
            let bom_hierarchy_ids_index = set_param.bom_hierarchy_ids.findIndex(
              (e) => Number(e) == Number(fix_answer_hierarchy_info.D)
            );
            if (bom_hierarchy_ids_index == -1) {
              set_param.bom_hierarchy_ids.push(Number(fix_answer_hierarchy_info.D));
            }
          }
        } else {
          let index_type_P = treatment_answer_ampoule_hierarchy_ids.findIndex((e) => e.type == "P");
          if (index_type_P == -1) {
            let index_p = treatment_answer_ampoule_hierarchy_ids.findIndex(
              (e) => Number(e.hierarchy_id) == Number(fix_answer_hierarchy_info.P)
            );
            if (index_p == -1) {
              let bom_hierarchy_ids_index = set_param.bom_hierarchy_ids.findIndex(
                (e) => Number(e) == Number(fix_answer_hierarchy_info.P)
              );
              if (bom_hierarchy_ids_index == -1) {
                set_param.bom_hierarchy_ids.push(Number(fix_answer_hierarchy_info.P));
              }
            }
          }
        }
      }
    } else {
      for (const hierarchy of treatment_survey.qna_hierarchy) {
        for (const question of hierarchy.children) {
          for (const answer of question.children) {
            //
            if (answer.subject == "P") {
              fix_answer_hierarchy_info.P = answer.hierarchy_id;
            }
            if (answer.subject == "D") {
              fix_answer_hierarchy_info.D = answer.hierarchy_id;
            }
            if (answer.subject == "I") {
              fix_answer_hierarchy_info.I = answer.hierarchy_id;
            }
          }
        }
      }

      // 세트일때
      for (const hierarchy_id of treatment_survey_history_hierarchy) {
        let formula = searchTreatmentFormulaByHierarchyId(hierarchy_id);
        if (formula) {
          for (let answer_ampoule in treatment_answer_ampoule_type_info[survey_mall_id]) {
            for (let answer of treatment_answer_ampoule_type_info[survey_mall_id][answer_ampoule]) {
              if (Number(formula.hierarchy_id) == answer) {
                let index = treatment_answer_ampoule_hierarchy_ids.findIndex(
                  (e) => e.type == answer_ampoule
                );
                if (index == -1) {
                  treatment_answer_ampoule_hierarchy_ids.push({
                    type: answer_ampoule,
                    hierarchy_id: Number(hierarchy_id),
                  });
                }
              }
            }
          }
        }
      }
      if (treatment_answer_ampoule_hierarchy_ids.length < 4) {
        let index_type_I = treatment_answer_ampoule_hierarchy_ids.findIndex((e) => e.type == "I");
        if (index_type_I == -1) {
          let index_i = treatment_answer_ampoule_hierarchy_ids.findIndex(
            (e) => Number(e.hierarchy_id) == Number(fix_answer_hierarchy_info.I)
          );
          if (index_i == -1) {
            let bom_hierarchy_ids_index = set_param.surveys[1].bom_hierarchy_ids.findIndex(
              (e) => Number(e) == Number(fix_answer_hierarchy_info.I)
            );
            if (bom_hierarchy_ids_index == -1) {
              set_param.surveys[1].bom_hierarchy_ids.push(Number(fix_answer_hierarchy_info.I));
            }
          }
        }
      }

      /*
      if (treatment_answer_ampoule_hierarchy_ids.length < 3) {
        let index_type_P = treatment_answer_ampoule_hierarchy_ids.findIndex((e) => e.type == "P");
        if (index_type_P == -1) {
          let index_p = treatment_answer_ampoule_hierarchy_ids.findIndex(
            (e) => Number(e.hierarchy_id) == Number(fix_answer_hierarchy_info.P)
          );
          if (index_p == -1) {
            let bom_hierarchy_ids_index = set_param.surveys[1].bom_hierarchy_ids.findIndex(
              (e) => Number(e) == Number(fix_answer_hierarchy_info.P)
            );
            if (bom_hierarchy_ids_index == -1) {
              set_param.surveys[1].bom_hierarchy_ids.push(Number(fix_answer_hierarchy_info.P));
            }
          }
        }

        let index_type_D = treatment_answer_ampoule_hierarchy_ids.findIndex((e) => e.type == "D");
        if (index_type_D == -1) {
          let index_d = treatment_answer_ampoule_hierarchy_ids.findIndex(
            (e) => Number(e.hierarchy_id) == Number(fix_answer_hierarchy_info.D)
          );
          if (index_d == -1) {
            let bom_hierarchy_ids_index = set_param.surveys[1].bom_hierarchy_ids.findIndex(
              (e) => Number(e) == Number(fix_answer_hierarchy_info.D)
            );
            if (bom_hierarchy_ids_index == -1) {
              set_param.surveys[1].bom_hierarchy_ids.push(Number(fix_answer_hierarchy_info.D));
            }
          }
        }
      } else if (treatment_answer_ampoule_hierarchy_ids.length == 3) {
        let index_type_D = treatment_answer_ampoule_hierarchy_ids.findIndex((e) => e.type == "D");
        if (index_type_D == -1) {
          let index_d = treatment_answer_ampoule_hierarchy_ids.findIndex(
            (e) => Number(e.hierarchy_id) == Number(fix_answer_hierarchy_info.D)
          );
          if (index_d == -1) {
            let bom_hierarchy_ids_index = set_param.surveys[1].bom_hierarchy_ids.findIndex(
              (e) => Number(e) == Number(fix_answer_hierarchy_info.D)
            );
            if (bom_hierarchy_ids_index == -1) {
              set_param.surveys[1].bom_hierarchy_ids.push(Number(fix_answer_hierarchy_info.D));
            }
          }
        } else {
          let index_type_P = treatment_answer_ampoule_hierarchy_ids.findIndex((e) => e.type == "P");
          if (index_type_P == -1) {
            let index_p = treatment_answer_ampoule_hierarchy_ids.findIndex(
              (e) => Number(e.hierarchy_id) == Number(fix_answer_hierarchy_info.P)
            );
            if (index_p == -1) {
              let bom_hierarchy_ids_index = set_param.surveys[1].bom_hierarchy_ids.findIndex(
                (e) => Number(e) == Number(fix_answer_hierarchy_info.P)
              );
              if (bom_hierarchy_ids_index == -1) {
                set_param.surveys[1].bom_hierarchy_ids.push(Number(fix_answer_hierarchy_info.P));
              }
            }
          }
        }
      }
      */
    }
  }

  // 임시저장 API
  if (Number(survey_product_no) == Number(survey_set_product_no)) {
    let set_storage_param = {
      surveys: set_param.surveys,
      member: set_param.member,
      result_status: "Y",
    };
    if (survey_member_id) {
      setSurveyStorage(set_storage_param);
    }
  } else {
    let set_storage_param = {
      survey_hierarchy_ids: set_param.survey_hierarchy_ids,
      member: set_param.member,
      result_status: "Y",
    };
    if (survey_member_id) {
      setSurveyStorage(set_storage_param);
    }
  }

  // 트리트먼트 or 세트 상품 일때 앰플 선택개수에 따라 고정 앰플 추가 END
  is_survey_result = true;
  let session_set_param = set_param;
  session_set_param.scent_type = survey_scent_type;
  sessionStorage.setItem("survey_set_param", JSON.stringify(session_set_param));

  // 임직원 경우 전송
  if (survey_discount_type && survey_discount_type.indexOf("employees") > -1) {
    set_param.discount_type = survey_discount_type;
  }
  survey_jQuery.ajax({
    url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}`,
    type: "POST",
    accept: "application/json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(set_param),
    dataType: "json",
    success: function (result) {
      sessionStorage.setItem("survey_result", JSON.stringify(result));
      localStorage.setItem("survey_result", JSON.stringify(result));
      if (
        survey_member_id == "rahul1" ||
        survey_member_id == "zdsa529" ||
        survey_member_id == "rahul3"
      ) {
        return;
      }
      let add_params = "";
      if (survey_gift_key) {
        add_params += "&gift_key=" + survey_gift_key;
      }

      if (survey_product_type) {
        add_params += "&product_type=" + survey_product_type;
      }

      if (survey_discount_type) {
        add_params += "&discount_type=" + survey_discount_type;
      }

      if (survey_buy_type) {
        add_params += "&buy_type=" + survey_buy_type;
      }

      if (order_id) {
        add_params += "&order_id=" + order_id;
      }

      location.href =
        "/m/survey/result.html?product_no=" +
        survey_product_no +
        "&hash=" +
        result[0].hash +
        "&qna_at=" +
        dayjs().format("YYYY.MM.DD") + add_params;
    },
  });
}

function setSurveyQuestionAnswerHistory(answer_hierarchy_id, max, type = null) {
  let question_hierarchy_id = searchQuestionHierarchyId(answer_hierarchy_id);
  if (question_hierarchy_id) {
    let index = survey_question_answer_history_hierarchy.findIndex(
      (e) => Number(e.question_hierarchy_id) == Number(question_hierarchy_id)
    );
    if (index == -1) {
      survey_question_answer_history_hierarchy.push({
        question_hierarchy_id,
        answer_list: [answer_hierarchy_id],
      });
    } else {
      // 최대 선택 1개이면 배열 비우고 시작
      if (max == 1) {
        survey_question_answer_history_hierarchy[index].answer_list = [];
      }
      if (!type) {
        let answer_list_index =
          survey_question_answer_history_hierarchy[index].answer_list.indexOf(answer_hierarchy_id);
        if (answer_list_index == -1) {
          survey_question_answer_history_hierarchy[index].answer_list.push(answer_hierarchy_id);
        } else {
          survey_question_answer_history_hierarchy[index].answer_list.splice(answer_list_index, 1);
        }
      }
    }
  }
}

// 프리셋 선택한 답변
function surveyAnswerPresetClick(element) {
  let data_preset = survey_jQuery(".swiper-slide-active").attr("data-preset");
  if (data_preset) {
    // return;
  }
  if (survey_jQuery(element).hasClass("checked line_checked")) {
    survey_jQuery(element).removeClass("checked line_checked");
  } else {
    survey_jQuery(element).addClass("checked line_checked");
  }
  let min = survey_jQuery(element).attr("min");
  let max = survey_jQuery(element).attr("max");
  let select_answer_count = survey_jQuery(".line_checked").length;
  if (select_answer_count > max) {
    alert("최대 " + max + "개까지 선택할 수 있어요.");
    survey_jQuery(element).removeClass("checked line_checked");
  } else {
    let hierarchy_id = survey_jQuery(element).attr("hierarchy_id");
    setSurveyQuestionAnswerHistory(Number(hierarchy_id), Number(select_answer_count));
  }

  let first_preset_text_answer = [];
  let question_hierarchy_id = Number(survey_jQuery(".survey_worry_question.swiper-slide-active").attr("hierarchy_id"));
  if (question_hierarchy_id == survey_my_worry[survey_mall_id]) {
    if (select_answer_count > 0) {
      for (let element of survey_jQuery(".line_checked")) {
        first_preset_text_answer.push(Number(survey_jQuery(element).attr("hierarchy_id")));
      }
    }
    localStorage.setItem("survey_worry_selected", JSON.stringify(first_preset_text_answer));
  }
}
// 선택한 답변
function surveyAnswerClick(element, answer_subject) {
  if (answer_subject == "해당 없음") {
    survey_jQuery(element).siblings().removeClass("line_checked");
  } else {
    let element_list = survey_jQuery(element).siblings();
    for (let sibling of element_list) {
      let subject = survey_jQuery(sibling).attr("subject");
      if (subject == "해당 없음") {
        survey_jQuery(sibling).removeClass("line_checked");
      }
    }
  }
  let min = survey_jQuery(element).attr("min");
  let max = survey_jQuery(element).attr("max");
  if (min == max && max == 1) {
    survey_jQuery(element).siblings().removeClass("line_checked");
  }

  if (survey_jQuery(element).hasClass("line_checked")) {
    survey_jQuery(element).removeClass("line_checked");
  } else {
    survey_jQuery(element).addClass("line_checked");
  }

  let select_answer_count = survey_jQuery(".line_checked").length;
  if (select_answer_count > max) {
    alert("최대 " + max + "개까지 선택할 수 있어요.");
    survey_jQuery(element).removeClass("line_checked");
  }
  let hierarchy_id = survey_jQuery(element).attr("hierarchy_id");
  if (survey_jQuery(element).hasClass("line_checked")) {
    setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);
  } else {
    setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1, "delete");
  }

  let element_list = survey_jQuery(element).siblings();
  for (let sibling of element_list) {
    let hierarchy_id = survey_jQuery(sibling).attr("hierarchy_id");
    if (survey_jQuery(sibling).hasClass("line_checked")) {
      setSurveyQuestionAnswerHistory(Number(hierarchy_id), Number(max));
    }
  }
}
// OX 선택한 답변
function surveyAnswerOXClick(element) {
  let is_true = survey_jQuery(element).attr("is_true");
  if (survey_jQuery(element).hasClass("line_checked")) {
    return;
  } else {
    survey_jQuery(element).addClass("line_checked");
  }

  if (is_true == "true") {
    survey_jQuery(element).next().removeClass("line_checked");
  } else {
    survey_jQuery(element).prev().removeClass("line_checked");
  }
  let hierarchy_id = survey_jQuery(element).attr("hierarchy_id");
  setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);
}
// 라디오 버튼 클릭
function surveyRadioClick(element) {
  let element_list = survey_jQuery(element).siblings();
  for (let sibling of element_list) {
    survey_jQuery(sibling).removeClass("line_checked");
  }
  survey_jQuery(element).addClass("line_checked");

  let hierarchy_id = survey_jQuery(".swiper-slide-active.line_checked").attr("hierarchy_id");
  let value = survey_jQuery(element).val();
  if (value == "strong") {
    survey_scent_type = "strong";
  } else {
    survey_scent_type = "";
  }
  setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);
}

// 향 선택
function surveyFragranceClick(element) {
  let queston_subject = survey_jQuery(".swiper-slide-active.line_checked .txt h4").text();
  if (fragrance_hierarchy_array[queston_subject]) {
    let normal_index = survey_history_hierarchy.findIndex(
      (e) => Number(e) == Number(fragrance_hierarchy_array[queston_subject][0])
    );
    if (normal_index > -1) {
      survey_history_hierarchy.splice(normal_index, 1);
    }

    let strong_index = survey_history_hierarchy.findIndex(
      (e) => Number(e) == Number(fragrance_hierarchy_array[queston_subject][1])
    );
    if (strong_index > -1) {
      survey_history_hierarchy.splice(strong_index, 1);
    }

    let is_type = survey_jQuery(element).attr("is_type");
    if (is_type == "normal") {
      survey_history_hierarchy.push(Number(fragrance_hierarchy_array[queston_subject][0]));
    } else {
      survey_history_hierarchy.push(Number(fragrance_hierarchy_array[queston_subject][1]));
    }
  }
}

// 성별 선택한 답변
function surveyAnswerGenderClick(type) {
  gender = type;
  survey_question_answer_etc_history_hierarchy.gender = type;
  if (type == "male") {
    if (survey_jQuery("#survey_men").hasClass("line_checked")) {
      return;
    } else {
      survey_jQuery("#survey_men").addClass("line_checked");
      survey_jQuery("#survey_women").removeClass("line_checked");
    }
  } else {
    if (survey_jQuery("#survey_women").hasClass("line_checked")) {
      return;
    } else {
      survey_jQuery("#survey_women").addClass("line_checked");
      survey_jQuery("#survey_men").removeClass("line_checked");
    }
  }
}

function surveyChangeBirth(element) {
  let value = survey_jQuery("#survey_birth").val();
  survey_jQuery("#survey_birth option").each(function () {
    $(this).removeClass("line_checked");
  });

  survey_jQuery("#survey_old").text("");
  if (value) {
    survey_jQuery(`#birth_${value}`).addClass("line_checked");
    birth = value;

    let now_year = dayjs().format("YYYY");
    let old = Number(now_year) - Number(value);
    let old_text = `${old}세`;
    survey_jQuery("#survey_old").text(old_text);
  }

  survey_question_answer_etc_history_hierarchy.birth = value;
}

// 분기 후 질문 체크
function surveyProcessWhereCheck(hierarchy_id) {
  if (!survey_process_question_list[hierarchy_id]) {
    return false;
  }

  for (index in survey_process_question_list) {
    let i = 0;
    let befor_boolean = false;
    let now_boolean = false;
    if (survey_process_question_list[index].checked == true) {
      continue;
    }
    if (Number(index) != Number(hierarchy_id)) {
      continue;
    }
    for (const process_question of survey_process_question_list[index].list) {
      if (process_question) {
        let survey_history_hierarchy_index = survey_history_hierarchy.indexOf(
          Number(process_question.select_answer_hierarchy_id)
        );
        if (survey_history_hierarchy_index > -1) {
          now_boolean = true;
          if (i == 0) {
            befor_boolean = true;
          }
        } else {
          now_boolean = false;
        }
        if (i > 0) {
          if (process_question.where == "OR") {
            if (befor_boolean || now_boolean) {
              befor_boolean = true;
            } else {
              befor_boolean = false;
            }
          } else {
            if (befor_boolean && now_boolean) {
              befor_boolean = true;
            } else {
              befor_boolean = false;
              break;
            }
          }
        }
      }
      i++;
    }
    if (befor_boolean === true && survey_process_question_list[index].checked === false) {
      survey_process_question_list[index].checked = true;
      return index;
    } else {
      return null;
    }
  }
}

// 뒤로가기시 선택 내용 삭제
function deleteSurveyHiearchyId() {
  let last_hierarchy_id = survey_history_hierarchy[survey_history_hierarchy.length - 1];
  // hierarchy_id 찾기
  let search_hierarchy_id = searchQuestionHierarchyId(last_hierarchy_id);
  let index = survey_history_hierarchy.indexOf(Number(search_hierarchy_id));
  if (index > -1) {
    survey_history_hierarchy.splice(index, 1);
  }
  // 질문의 답변 값 모두 삭제
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      // 인트로
      if (Number(survey.qna_hierarchy[j].hierarchy_id) == Number(search_hierarchy_id)) {
        let index = survey_history_hierarchy.indexOf(Number(search_hierarchy_id));
        if (index > -1) {
          survey_history_hierarchy.splice(index, 1);

          // 세트 상품일때 트리트먼트 hierarchy_id 삭제
          if (is_set_product == true) {
            let hierarchy_index_info = searchHierarchyIndexInfo(Number(search_hierarchy_id));
            let treatment_hierarchy_id = searchTreatmentHierarchyId(hierarchy_index_info);
            if (treatment_hierarchy_id) {
              let treatment_index = treatment_survey_history_hierarchy.indexOf(
                Number(treatment_hierarchy_id)
              );
              if (treatment_index > -1) {
                treatment_survey_history_hierarchy.splice(treatment_index, 1);
              }
            }
          }
          break;
        }
      }
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(search_hierarchy_id)) {
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            // 조건 분기 진행 체크 변경
            for (survey_process_question_index in survey_process_question_list) {
              if (!survey_process_question_list[Number(survey_process_question_index)]) {
                continue;
              }
              for (let survey_process_question of survey_process_question_list[survey_process_question_index].list) {
                if (
                  Number(answer_list[l].hierarchy_id) ==
                  Number(survey_process_question.select_answer_hierarchy_id)
                ) {
                  survey_process_question_list[survey_process_question_index].checked = false;
                }
              }
            }

            let index = survey_history_hierarchy.indexOf(Number(answer_list[l].hierarchy_id));
            if (index > -1) {
              survey_history_hierarchy.splice(index, 1);
              // 세트 상품일때 트리트먼트 hierarchy_id 삭제
              if (is_set_product == true) {
                let hierarchy_index_info = searchHierarchyIndexInfo(
                  Number(answer_list[l].hierarchy_id)
                );
                let treatment_hierarchy_id = searchTreatmentHierarchyId(hierarchy_index_info);
                if (treatment_hierarchy_id) {
                  let treatment_index = treatment_survey_history_hierarchy.indexOf(
                    Number(treatment_hierarchy_id)
                  );
                  if (treatment_index > -1) {
                    treatment_survey_history_hierarchy.splice(treatment_index, 1);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (survey_history_hierarchy.length > 0) {
    return true;
  } else {
    return false;
  }
}

// hierarchy_id로 hierarchy 정보 찾기
function searchHierarchyInfoById(hierarchy_id) {
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      // 인트로
      if (Number(survey.qna_hierarchy[j].hierarchy_id) == Number(hierarchy_id)) {
        return survey.qna_hierarchy[j];
      }
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          return children[i];
        }
        let answer_list = children[i].children;
        for (let l = 0; l < answer_list.length; l++) {
          if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
            return answer_list[l];
          }
        }
      }
    }
  }
  return null;
}

// 답변 hierarchy_id로 질문 hierarchy_id 찾기
function searchQuestionHierarchyId(hierarchy_id) {
  let search_hierarchy_id = 0;
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      // 인트로
      if (Number(survey.qna_hierarchy[j].hierarchy_id) == Number(hierarchy_id)) {
        search_hierarchy_id = hierarchy_id;
      }
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(hierarchy_id) == Number(children[i].hierarchy_id)) {
          search_hierarchy_id = children[i].hierarchy_id;
        }
        let answer_list = children[i].children;
        for (let l = 0; l < answer_list.length; l++) {
          if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
            search_hierarchy_id = children[i].hierarchy_id;
          }
        }
      }
    }
  }
  return search_hierarchy_id;
}

// 질문 hierarchy_id로 답변 찾기
function searchQuestionChildren(hierarchy_id) {
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          //
          return children[i].children;
        }
      }
    }
  }
  return null;
}
// 트리트먼트 질문 hierarchy_id로 답변 찾기
function searchTreatmentQuestionChildren(hierarchy_id) {
  for (let j = 0; j < treatment_survey.qna_hierarchy.length; j++) {
    if (treatment_survey.qna_hierarchy[j].type == "folder") {
      let children = treatment_survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          return children[i].children;
        }
      }
    }
  }
  return null;
}
// 답변 hierarchy_id로 질문 hierarchy_id 찾기
function searchHierarchyIndexInfo(hierarchy_id) {
  let return_array = [];
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      // 인트로
      if (Number(survey.qna_hierarchy[j].hierarchy_id) == Number(hierarchy_id)) {
        return_array.push({
          type: "intro",
          depth: survey.qna_hierarchy[j].depth,
          sequence: survey.qna_hierarchy[j].sequence,
        });
      }
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        let answer_list = children[i].children;
        for (let l = 0; l < answer_list.length; l++) {
          if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
            search_hierarchy_id = children[i].hierarchy_id;
            return_array.push({
              type: "answer",
              depth: survey.qna_hierarchy[j].depth,
              sequence: survey.qna_hierarchy[j].sequence,
            });
            return_array.push({
              type: "answer",
              depth: children[i].depth,
              sequence: children[i].sequence,
            });
            return_array.push({
              type: "answer",
              depth: answer_list[l].depth,
              sequence: answer_list[l].sequence,
            });
          }
        }
      }
    }
  }
  return return_array;
}

function searchTreatmentHierarchyId(params) {
  if (!params || params.length == 0) {
    return null;
  }
  if (params[0].type == "intro") {
    for (const param of params) {
      if (param.type == "intro") {
        for (const hierarchy of treatment_survey.qna_hierarchy) {
          if (Number(hierarchy.sequence) == Number(param.sequence)) {
            return hierarchy.hierarchy_id;
          }
        }
      }
    }
  } else {
    for (const hierarchy of treatment_survey.qna_hierarchy) {
      if (Number(hierarchy.sequence) == Number(params[0].sequence)) {
        for (const question of hierarchy.children) {
          if (Number(question.sequence) == Number(params[1].sequence)) {
            for (const answer of question.children) {
              //
              if (Number(answer.sequence) == Number(params[2].sequence)) {
                return answer.hierarchy_id;
              }
            }
          }
        }
      }
    }
  }
  return null;
}

// hierarchy_id로 트리트먼트 formula_score 찾기
function searchTreatmentFormulaByHierarchyId(hierarchy_id) {
  for (let j = 0; j < treatment_survey.qna_hierarchy.length; j++) {
    if (treatment_survey.qna_hierarchy[j].type == "folder") {
      let children = treatment_survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        let answer_list = children[i].children;
        for (let l = 0; l < answer_list.length; l++) {
          if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
            return {
              hierarchy_id,
              score: answer_list[l].formula_score,
              subject: answer_list[l].subject,
            };
          }
        }
      }
    }
  }
  return null;
}

// hierarchy_id로 formula_score 찾기
function searchFormulaByHierarchyId(hierarchy_id) {
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        let answer_list = children[i].children;
        for (let l = 0; l < answer_list.length; l++) {
          if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
            return {
              hierarchy_id,
              score: answer_list[l].formula_score,
              subject: answer_list[l].subject,
            };
          }
        }
      }
    }
  }
  return null;
}

function clearInputProductName() {
  survey_jQuery("#survey_input_product_name").val(null);
  survey_jQuery("#survey_product_name").text("");
}

// 새로고침시 #progress 제거
history.replaceState({}, null, location.pathname + location.search);

// 뒤로 가기 시 이벤트
survey_jQuery(window).bind("hashchange", function () {
  if (is_fragrance == true) {
    is_fragrance = false;
  }
  // 선택한 답변이 있으면 삭제 한다
  if (survey_history_hierarchy.length > 0) {
    let delete_result = deleteSurveyHiearchyId();
    if (delete_result) {
      let question_hierarchy_id = searchQuestionHierarchyId(
        survey_history_hierarchy[survey_history_hierarchy.length - 1]
      );
      let next_question_hierarchy_id = surveyNextQuestionHierarchyId(question_hierarchy_id);
      let next_next_hierarchy_id = surveyNextQuestionHierarchyId(next_question_hierarchy_id);
      // 분기 처리 체크 초기화
      if (survey_process_question_list[next_next_hierarchy_id]) {
        survey_process_question_list[next_next_hierarchy_id].checked = false;
      }
      if (survey_process_question_list[next_question_hierarchy_id]) {
        survey_process_question_list[next_question_hierarchy_id].checked = false;
      }
      showSurveyQuestion(next_question_hierarchy_id, "back");
      history.pushState(null, null, location.search + "#progress");
    } else {
      // 인트로
      if (survey.qna_hierarchy[0].children.length == 0) {
        showSurveyQuestion(survey.qna_hierarchy[0].hierarchy_id);
      } else {
        showSurveyQuestion(survey.qna_hierarchy[0].children[0].hierarchy_id);
        history.pushState(null, null, location.search + "#progress");
      }
    }
  } else {
    // 시작 페이지 노출
  }
});

// 상품명 입력
function surveyInputProductName() {
  let survey_input_product_name = survey_jQuery("#survey_input_product_name").val();
  const reg = /[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9\|#\|\s|\ㆍ|\ᆢ]/g;
  let reg_text = survey_input_product_name.replace(reg, "");
  if (survey_input_product_name.length != reg_text.length) {
    alert("특수문자는 입력할 수 없습니다.");
  }
  let result = surveyGetStringByte(reg_text);
  survey_jQuery("#survey_input_product_name").val(result);
  survey_jQuery("#survey_product_name").text("#" + result);
  product_name = result;
  survey_question_answer_etc_history_hierarchy.product_name = result;
}

// 바이트 계산
function surveyGetStringByte(contents) {
  let length = 11;
  let int_contents_length = contents.length;

  if (int_contents_length > length) {
    return contents.substr(0, 11);
  } else {
    return contents;
  }
}

function surveyAutoSelectAnswer(hierarchy_id) {
  if (survey_storage_history_hierarchy) {
    // 세트

    let index = survey_storage_history_hierarchy.survey_hierarchy_ids.findIndex(
      (e) => Number(e) == Number(hierarchy_id)
    );
    if (index >= 0) {
      return true;
    } else {
      return false;
    }

    // 아닐때
  } else {
    return false;
  }
}

function surveyHistoryAutoSelectAnswer(hierarchy_id) {
  if (survey_question_answer_history_hierarchy) {
    for (const survey_question_answer of survey_question_answer_history_hierarchy) {
      for (const answer of survey_question_answer.answer_list) {
        if (Number(hierarchy_id) == Number(answer)) {
          return true;
        }
      }
    }
  }
  return false;
}

function surveyHistoryAutoSelectQuestion(hierarchy_id) {
  let question_hierarchy_id = searchQuestionHierarchyId(hierarchy_id);
  if (question_hierarchy_id && survey_question_answer_history_hierarchy) {
    for (const survey_question_answer of survey_question_answer_history_hierarchy) {
      if (Number(survey_question_answer.question_hierarchy_id) == Number(question_hierarchy_id)) {
        return true;
      }
    }
  }
  return false;
}

// 향 정보 조회
async function surveyGetScent() {
  // {{domain}}/app/{{app_name}}/mall/{{mallid}}/api/survey/shops/{{shop_no}}/front/scent
  let product_no = Number(survey_product_no);
  if (product_no == survey_set_product_no) {
    product_no = survey_treatment_no;
  }
  survey_jQuery.ajax({
    url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/scent`,
    type: "get",
    data: {
      product_no,
    },
    dataType: "json",
    success: function (result) {
      survey_scent_list = result;
    },
    error: function (e) {
      console.log("e", e);
    },
  });
}
// 인트로 hierarchy_id 제거
function surveyDeleteIntroHierarchyId(product_no) {
  let survey_shampoo_hierarchy_list = [];
  for (const hierarchy_id of survey_history_hierarchy) {
    let hierarchy_index_info = searchHierarchyIndexInfo(Number(hierarchy_id));
    if (hierarchy_index_info && hierarchy_index_info.length > 0) {
      if (hierarchy_index_info[0].type != "intro") {
        survey_shampoo_hierarchy_list.push(Number(hierarchy_id));
      } else {
        if (treatment_survey && treatment_survey.qna_hierarchy) {
          let treatment_hierarchy_id = searchTreatmentHierarchyId(hierarchy_index_info);
          let index = treatment_survey_history_hierarchy.indexOf(treatment_hierarchy_id);
          if (index > -1) {
            treatment_survey_history_hierarchy.splice(index, 1);
          }
        }
      }
    }
  }
  survey_history_hierarchy = survey_shampoo_hierarchy_list;
}

// 향 답변 hierarchy_id로 향 찾기
function searchQuestionScentHierarchyId(hierarchy_id, type = null) {
  let search_hierarchy_id = null;
  let scent_name = null;
  let scent_bulk_code = null;
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    if (survey.qna_hierarchy[j].type == "folder") {
      let children = survey.qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        let answer_list = children[i].children;
        if (children[i].question_type != "scent") {
          continue;
        }
        for (let l = 0; l < answer_list.length; l++) {
          if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
            search_hierarchy_id = answer_list[l].hierarchy_id;
            scent_name = answer_list[l].subject;
            scent_bulk_code = answer_list[l].bulk_code;
          }
          if (survey_scent_type == "strong" || type == "strong") {
            let _scent_name = scent_name + " - 강하게";
            if (
              _scent_name == answer_list[l].subject &&
              scent_bulk_code == answer_list[l].bulk_code &&
              answer_list[l].answer_description == "strong"
            ) {
              search_hierarchy_id = answer_list[l].hierarchy_id;
            }
          }
        }
      }
    }
  }
  return Number(search_hierarchy_id);
}

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {

      // 새로고침 막기
      document.body.style.overscrollBehaviorY = 'none';

      setTimeout(async function () {
        await CAFE24API.getCustomerInfo(function (err, res) {
          return new Promise(function (resolve, reject) {
            survey_member_name = null;
            survey_member_id = null;
            if (res) {
              if (res.customer) {
                survey_member_name = res.customer.name;
                survey_member_id = res.customer.member_id;
              }
            }
            resolve(res);
          });
        });

        // 설정 조회
        await getSurveyConfig();
        // 히든된 화면 노출
        setTimeout(async function () {
          if (survey) {
            // step 정보 담기
            getSurveyStep();
            // 분기 후 질문 정보 담기
            getSurveyProcessQuestion();

            // 임시저장 조회
            let type = shoplusGetParameters("type");

            if (type && type == "connect") {
              await getSurveyQnaStorage();
            }

            showSurveyFirst();
            survey_jQuery("#survey_area").show();
            surveyGetScent();

            survey_gift_key = shoplusGetParameters("gift_key");
            survey_product_type = shoplusGetParameters("product_type");
            survey_discount_type = shoplusGetParameters("discount_type");
            survey_buy_type = shoplusGetParameters("buy_type");
            order_id = shoplusGetParameters("order_id");
          }
        }, 100);
      }, 500);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
  },
  false
);
