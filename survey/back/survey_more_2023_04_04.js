// 수신 데이터
let survey = null;

// 트리트먼트 수신 데이터
let treatment_survey = null;

// 선택한 트리트먼트 hierarchy_id 히스토리
let treatment_survey_history_hierarchy = [];

// 선택한 hierarchy_id 히스토리
let survey_history_hierarchy = [];

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

// 샴푸 향
let survey_shampoo_scent_array = [];

let fragrance_hierarchy_array = [];

let section = [];

// 분기 후 질문 여부 리스트
let survey_process_question_list = [];

// 샵 번호
let survey_shop_no = 1;

// 상품 번호
let survey_product_no = null;

// 해시
let survey_hash = null;

let survey_member_name = null;

let is_shampoo_ampoule = false;
let is_treatment_ampoule = false;

// 수신 데이터
let re_survey = null;

// 트리트먼트 수신 데이터
let re_treatment_survey = null;

// 이전 문진의 해결하고 싶은 고민 선택 답변 리스트
let befor_shampoo_answer_list = [];
let befor_treatment_answer_list = [];

// 이전 문진 bom
let befor_bom_info = {
  shampoo: [],
  treatment: [],
};

let re_qna_hierarchy_count = 0;

let survey_next_count = 1;

let is_loss_hair = false;

// 한번 사용해본 고민 솔루션은 더 세밀하게 조정할 수 있어요! 진행여부
let is_ampoule_status = false;
let is_treatment_ampoule_status = false;
let is_shampoo_ampoule_status = false;

// 기능선택 질문 시작 여부 체크 배열
let ampoule_status_array = [];

let product_name = "";

// 세트상품일때 마지막 문진(트리트먼트) 시작 여부
let is_set_product_last_re_qna = false;

let is_set_product = false;

let next_click_count = 1;

let is_befor_hair_loss = false;
let is_hair_loss = false;

// 이전 문진 결과 조회
let survey_befor_qna_result = null;

// 성별
let survey_gender = null;

// 향
let survey_scent = {};

let survey_product_nick_name = null;

let survey_shampoo_befor_select_text = "";
let survey_treatment_befor_select_text = "";

let survey_scent_list = [];

// 트리트먼트 D, P 추가
let treatment_answer_ampoule_tpye_D_name = "모발 보습";
let treatment_answer_ampoule_tpye_P_name = "모발 부드러움";
let treatment_answer_ampoule_tpye_I_bulk_code = "3C2A00007110";
let treatment_answer_ampoule_tpye_D_info = {};
let treatment_answer_ampoule_tpye_P_info = {};

// 이전 선택 엠플 리스트
let survey_answer_ampoule_array = [];

// 이전 선택 향 강도
let survey_answer_scent = null;

let befor_percent = [];

let befor_left = "";

let is_survey_result = false;

// 조회
async function getSurveyConfig() {
  survey_mall_id = CAFE24API.MALL_ID;
  survey_shop_no = CAFE24API.SHOP_NO;
  survey_product_no = Number(shoplusGetParameters("product_no"));
  // 세트 상품일 때

  return new Promise(function (resolve, reject) {
    /*
    if (Number(survey_product_no) == Number(survey_set_product_no)) {
      is_set_product = true;
      let treatment_survey_product_no = survey_treatment_no;
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${treatment_survey_product_no}`,
        type: "get",
        data: {},
        async: true,
        dataType: "json",
        success: function (result) {
          treatment_survey = result;
        },
      });
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_shampoo_no}`,
        type: "get",
        data: {},
        async: true,
        dataType: "json",
        success: function (result) {
          survey = result;
          resolve(true);
        },
      });
    } else {
      // 세트 상품 아닐때
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}`,
        type: "get",
        data: {},
        async: true,
        dataType: "json",
        success: function (result) {
          survey = result;
          if (Number(survey_product_no) == Number(survey_treatment_no)) {
            //
            treatment_survey = result;
          }
          resolve(survey);
        },
      });
    }
    */

    if (Number(survey_product_no) == Number(survey_set_product_no)) {
      is_set_product = true;
    }
    let treatment_survey_product_no = survey_treatment_no;
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${treatment_survey_product_no}`,
      type: "get",
      data: {},
      async: true,
      dataType: "json",
      success: function (result) {
        treatment_survey = result;
      },
    });
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_shampoo_no}`,
      type: "get",
      data: {},
      async: true,
      dataType: "json",
      success: function (result) {
        survey = result;
        resolve(true);
      },
    });
  });
}

// 조회
async function getSurveyReQnaConfig() {
  survey_mall_id = CAFE24API.MALL_ID;
  survey_shop_no = CAFE24API.SHOP_NO;
  survey_product_no = Number(shoplusGetParameters("product_no"));
  survey_hash = shoplusGetParameters("hash");
  let hash_param = "";
  if (survey_hash) {
    hash_param = "&hash=" + survey_hash;
  }
  return new Promise(function (resolve, reject) {
    // 세트 상품일 때
    if (survey_product_no == survey_set_product_no) {
      is_set_product = true;
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}/re_qna?member_id=${survey_member_id}${hash_param}`,
        type: "get",
        data: {},
        dataType: "json",
        success: function (result) {
          for (const survey of result.surveys) {
            if (Number(survey.product_no) == Number(survey_shampoo_no)) {
              re_survey = {
                survey_result: survey.survey_result,
                type: survey.type,
                survey_bom_result: survey.survey_bom_result,
              };

              for (const hierarchy_id of survey.survey_result) {
                let question = searchQuestionHierarchyName(
                  hierarchy_id,
                  survey_befor_qna_result.qna_type
                );

                let question_type = searchQuestionHierarchyQuestionType(
                  hierarchy_id,
                  survey_befor_qna_result.qna_type
                );
                if (question_type == "main") {
                  setSurveyQuestionAnswerHistory(Number(hierarchy_id), 30, "add");
                }
              }
            }
            if (Number(survey.product_no) == Number(survey_treatment_no)) {
              re_treatment_survey = {
                survey_result: survey.survey_result,
                type: survey.type,
                survey_bom_result: survey.survey_bom_result,
              };

              for (const hierarchy_id of survey.survey_result) {
                setSurveyQuestionAnswerHistory(Number(hierarchy_id), 30, "add");
              }
            }
          }
          resolve(result);
        },
      });
    } else {
      // 세트 상품 아닐때
      survey_jQuery.ajax({
        url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}/re_qna?member_id=${survey_member_id}${hash_param}`,
        type: "get",
        data: {},
        dataType: "json",
        success: function (result) {
          for (const survey of result.surveys) {
            if (Number(survey.product_no) == Number(survey_shampoo_no)) {
              re_survey = {
                survey_result: survey.survey_result,
                type: survey.type,
                survey_bom_result: survey.survey_bom_result,
              };
            } else {
              re_survey = {
                survey_result: survey.survey_result,
                type: survey.type,
                survey_bom_result: survey.survey_bom_result,
              };
              re_treatment_survey = {
                survey_result: survey.survey_result,
                type: survey.type,
                survey_bom_result: survey.survey_bom_result,
              };
            }
          }
          /*
          re_survey = {
            survey_result: result.surveys[0].survey_result,
            type: result.surveys[0].type,
            survey_bom_result: result.surveys[0].survey_bom_result,
          };

          if (Number(result.surveys[0].product_no) == Number(survey_treatment_no)) {
            re_treatment_survey = {
              survey_result: result.surveys[0].survey_result,
              type: result.surveys[0].type,
              survey_bom_result: result.surveys[0].survey_bom_result,
            };
          }
          */
          resolve(result);
        },
      });
    }
  });
}

// 분기 후 질문 내용 담기
function getSurveyProcessQuestion() {
  for (const re_qna_hierarchy of survey.re_qna_hierarchy) {
    for (const children of re_qna_hierarchy.children) {
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

// 첫 화면 노출
function showSurveyFirst() {
  if (survey.re_qna_hierarchy.length == 0) {
    alert("등록된 질문이 없습니다.");
    return false;
  }
  showSurveyQuestion(survey.re_qna_hierarchy[0].children[0].hierarchy_id);
}

// 질문 노출 하기
function showSurveyQuestion(hierarchy_id, type = null) {
  // hierarchy_id가 없으면 질문 끝까지 다함
  if (!hierarchy_id) {
    surveyQuestionAfter();
    return;
  }
  let hierarchy_id_copy = hierarchy_id;
  // 분기 질문 체크
  let process_where_result = surveyProcessWhereCheck(hierarchy_id);
  let is_process_where_result = false;

  if (
    process_where_result !== null &&
    process_where_result !== false &&
    typeof process_where_result !== "undefined"
  ) {
    is_process_where_result = true;
    hierarchy_id = process_where_result;
  } else if (process_where_result === null || typeof process_where_result == "undefined") {
    is_process_where_result = true;
    let next_hierarchy_id = surveyNextQuestionHierarchyId(hierarchy_id);
    showSurveyQuestion(next_hierarchy_id);
    return;
  }

  // 기능 질문 진행 후 조건문에 걸리지 않으면 노출
  let is_ampoule_question_show = false;
  if (is_process_where_result == false) {
    // 기능 노출
    if (ampoule_status_array.length > 0) {
      let is_show = true;
      let ampoule = ampoule_status_array[ampoule_status_array.length - 1];
      if (ampoule.status == false) {
        for (const answer of ampoule.answer_list) {
          if (
            answer.subject.indexOf("탈모증상완화") > -1 ||
            befor_shampoo_answer_list.indexOf("탈모증상완화") > -1 ||
            answer.subject.indexOf("탈모 증상 완화") > -1 ||
            befor_shampoo_answer_list.indexOf("탈모 증상 완화") > -1
          ) {
            is_show = false;
          }
        }
        // 트리트먼트
        if (ampoule_status_array.length - 1 > 0) {
          is_show = true;
        }
        if (is_show) {
          is_ampoule_question_show = true;
          hierarchy_id = ampoule.hierarchy_id;
          ampoule.status = true;
        }
      }
    }
  }
  let question_html = "";
  let answer_type = "";
  // 질문 노출
  for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
    if (survey.re_qna_hierarchy[j].children && survey.re_qna_hierarchy[j].children.length > 0) {
      let children = survey.re_qna_hierarchy[j].children;

      for (let i = 0; i < children.length; i++) {
        let question_sequence = 0;
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          question_sequence = i + 1;
          answer_type = children[i].answer_type;
          if (children[i].question_type != "normal") {
            answer_type = children[i].question_type;
          }
          let min = "";
          let max = "";
          if (children[i].select_count) {
            min = children[i].select_count.min;
            max = children[i].select_count.max;
          }

          let survey_next_hierarchy_id = surveyNextQuestionHierarchyId(hierarchy_id);
          let _is_treatment = surveyNextQuestionIsTreatment(hierarchy_id);
          let is_last_shampoo_question = false;
          if (children[i].is_treatment == false && _is_treatment == true) {
            is_last_shampoo_question = true;
          }
          // 다음 버튼
          let survey_next_btn = `
            <a href="javascript:history.back();" class="btnPrev surveyNext">이전</a>
            <a href="javascript:void(0)" class="btnNext surveyPrev" onClick="showNextSurveyQuestion(this, ${survey_next_hierarchy_id})" answer_type="${answer_type}" min="${min}" max="${max}">다음</a>
          `;

          // 베이스 조절 질문
          if (answer_type == "base") {
            survey_next_btn =  `
              <a href="javascript:void(0)" class="btnFunc" onClick="showNextSurveyQuestion(this, ${survey_next_hierarchy_id})" answer_type="${answer_type}" min="${min}" max="${max}">다음</a>
            `;
          }

          re_qna_hierarchy_count = survey.re_qna_hierarchy[0].children.length;

          let attr_question_sequence = Number(
            survey_jQuery(".progress-percent").attr("question_sequence")
          );
          if (!attr_question_sequence) {
            attr_question_sequence = re_qna_hierarchy_count;
          }
          if (attr_question_sequence == question_sequence && type != "back") {
            question_sequence += 1;
          }
          if (type == "back") {
            if (attr_question_sequence > question_sequence) {
              question_sequence = attr_question_sequence;
            }
            if (attr_question_sequence == question_sequence) {
              question_sequence -= 1;
            } else {
              question_sequence = attr_question_sequence;
            }
          }

          let start_persent = ((question_sequence - 1) / re_qna_hierarchy_count) * 100;
          let progress_percent = (question_sequence / re_qna_hierarchy_count) * 100;

          let left = "0";
          let data_start = survey_jQuery(".progress-percent").attr("data-start");
          if (data_start) {
            left = data_start;
          }
          let active_class = "";
          left = data_start;
          if (data_start >= 100) {
            active_class = "active";
          }
          if (data_start == 100 && !left) {
            left = 100;
          }
          let survey_progress_bar = `
          <div id="stepArea">
            <div class="step re_step">
              <div><img src="/web/upload/mynomy/kr_mobile/diagnosis/feedbackloop.svg" alt="피드백루프" /></div>
              <div class="percent percent-dummy ${active_class}" style="left: ${left}%"></div>
              <div class="percent percent-gradient"></div>
            </div>
          </div>
          <div class="progress-percent" data-start="${data_start}" data-progress="${progress_percent}" question_sequence="${question_sequence}"></div>
          `;
          if (is_ampoule_question_show) {
            if (is_loss_hair == false || _is_treatment == true) {
              let select = JSON.parse(localStorage.getItem("survey_worry_selected"));
              if (
                ((select.indexOf("탈모증상완화") == -1 || select.indexOf("탈모 증상 완화") == -1) &&
                  (befor_shampoo_answer_list.indexOf("탈모증상완화") == -1 || befor_shampoo_answer_list.indexOf("탈모 증상 완화") == -1)) ||
                _is_treatment == true
              ) {
                survey_next_btn = `
                <a href="javascript:history.back();" class="btnPrev surveyNext">이전</a>
                <a href="javascript:void(0)" class="btnNext surveyPrev" onClick="showNextSurveyQuestion(this, ${hierarchy_id_copy})" answer_type="scent" min="${min}" max="${max}" is_ampoule="${is_ampoule_question_show}" hierarchy_id="${hierarchy_id}">다음</a>
                `;
                for (const _hierarchy_id of survey_history_hierarchy) {
                  let question = searchHierarchyInfoById(hierarchy_id, "re_qna", "shampoo");
                  if (survey_product_no == survey_set_product_no) {
                    if (question.is_treatment) {
                      select = JSON.parse(localStorage.getItem("survey_treatment_worry_selected"));
                    } else {
                      select = JSON.parse(localStorage.getItem("survey_shampoo_worry_selected"));
                    }
                  }
                  
                  if (
                    ((select.indexOf("탈모증상완화") == -1 || select.indexOf("탈모 증상 완화") == -1) &&
                      (befor_shampoo_answer_list.indexOf("탈모증상완화") == -1 || befor_shampoo_answer_list.indexOf("탈모 증상 완화") == -1)) ||
                    _is_treatment == true
                  ) {
                    if (question.question_type == "main") {
                      let ampoule_subject = question.ampoule_subject.replace(/(\n|\r\n)/g, "<br>");
                      let ampoule_description = question.ampoule_description.replace(
                        /(\n|\r\n)/g,
                        "<br>"
                      );
                      let answer_html = "";
                      let count = 0;

                      for (const answer of question.children) {
                        if (answer.regulate_status == "disabled" || answer.children.length == 0) {
                          continue;
                        }
                        if (select.indexOf(answer.subject) > -1) {
                          let subject = answer.subject.replace(/(\n|\r\n)/g, "<br>");
                          let answer_info_html = "";
                          let answer_list_html = "";
                          let index = 0;

                          if (
                            (survey_product_no == survey_shampoo_no ||
                              survey_product_no == survey_set_product_no) &&
                            !_is_treatment
                          ) {
                            if (befor_shampoo_answer_list.indexOf(answer.subject) == -1) {
                              continue;
                            }
                          }

                          if (survey_product_no == survey_treatment_no || _is_treatment == true) {
                            if (befor_treatment_answer_list.indexOf(answer.subject) == -1) {
                              continue;
                            }
                          }

                          // befor_treatment_answer_list.indexOf("탈모증상완화") > -1
                          let is_question_history = true;
                          let is_survey_answer_ampoule_result = false;
                          for (const answer_children of answer.children) {
                            let is_result = getSurveyAnswerAmpoule(answer_children.hierarchy_id);
                            if (is_result) {
                              is_survey_answer_ampoule_result = true;
                            }
                          }
                          for (const answer_children of answer.children) {
                            let answer_subject = answer_children.subject.replace(
                              /(\n|\r\n)/g,
                              "<br>"
                            );
                            answer_info_html += `<div ratio="${answer_children.ratio}" class="swiper-slide"></div>`;
                            let _class = "";
                            if (index == 1 && !is_survey_answer_ampoule_result) {
                              _class = "checked line_checked";
                            }

                            let is_survey_answer_ampoule = getSurveyAnswerAmpoule(
                              answer_children.hierarchy_id
                            );

                            if (is_survey_answer_ampoule) {
                              _class = "checked line_checked";
                            }

                            answer_list_html += `<li class="${_class}" is_treatment="${question.is_treatment}" ratio="${answer_children.ratio}" parent_hierarchy_id="${question.hierarchy_id}" hierarchy_id="${answer.hierarchy_id}" answer_children_hierarchy_id=${answer_children.hierarchy_id} max_ratio="${answer.max_ratio}" bulk_code="${answer.bulk_code}" section="Y">${answer_subject}</li>`;
                            index++;
                          }

                          answer_html += `
                          <div class="select">
                            <div class="controlSlide plus">
                                <h3>${subject}</h3>
                                <div class="slide-draggable${count}">
                                    <div class="swiper-wrapper">
                                        <!-- 아래 선택메뉴 개수에 맞춰서 유지 -->
                                        ${answer_info_html}
                                    </div>
                                </div>
                                <div class="control_bar${count}">
                                    <ol>
                                        ${answer_list_html}
                                    </ol>
                                    <div class="bar"><div class="blank-top"></div><div class="blank-bt"></div></div>
                                </div>
                            </div>
                          </div>
                          <script>
                          setTimeout(function () {
                            setHPlus${count}();
                            $(window).on("load resize", function () {
                              setHPlus${count}();
                            });
                            function setHPlus${count}() {
                              $('.select [class*="plus"] [class*="control_bar${count}"] .bar .blank-top').css(
                                "width",
                                $('.select [class*="plus"] [class*="control_bar${count}"] ol li').width() / 2 - 12
                              );
                              $('.select [class*="plus"] [class*="control_bar${count}"] .bar .blank-bt').css(
                                "width",
                                $('.select [class*="plus"] [class*="control_bar${count}"] ol li').width() / 2 - 12
                              );
                            }
                            var draggablePlus${count} = new Swiper('.select [class*="plus"] .slide-draggable${count}', {
                              initialSlide: 1,
                              direction: "horizontal",
                              loop: false,
                              allowTouchMove: false,
                              effect: "fade",
                              fadeEffect: {
                                crossFade: true,
                              },
                              scrollbar: {
                                el: '.select [class*="plus"] .control_bar${count} .bar',
                                hide: false,
                                draggable: true,
                              },
                              on: {
                                slideChange: function () {
                                  $('.select [class*="plus"] .control_bar${count} ol li')
                                    .removeClass("checked line_checked")
                                    .eq(draggablePlus${count}.activeIndex)
                                    .addClass("checked line_checked");
                                    let hierarchy_id = $('.select [class*="plus"] .control_bar${count} ol li.line_checked').attr("answer_children_hierarchy_id");
                                    setSurveyAnswerAmpoule(Number(${count}), Number(hierarchy_id));
                                },
                              },
                            });
                            $('.select [class*="plus"] .control_bar${count} ol li').on("click", function () {
                              draggablePlus${count}.slideTo($(this).index());
                            });
                            let hierarchy_id = $('.select [class*="plus"] .control_bar${count} ol li.line_checked').attr("answer_children_hierarchy_id");
                            setSurveyAnswerAmpoule(${count}, Number(hierarchy_id));
                            $('.select [class*="plus"] .control_bar${count} ol li.line_checked').click();
                          }, 100);
                          </script>`;
                        }
                        count++;
                      }

                      question_html = `
                        ${survey_progress_bar}
                        <div class="contentBox re_pre">
                          <div class="txt">
                              <h3>${ampoule_subject}</h3>
                              <p>${ampoule_description}</p>
                          </div>
                          <div class="inner">
                            ${answer_html}
                          </div>
                          <div class="dBtn gColumn gFixed">
                            ${survey_next_btn}
                          </div>  
                        </div> 
                      `;
                      survey_jQuery("#survey_area").empty();
                      survey_jQuery("#survey_area").append(question_html);
                      survey_jQuery("#stepArea").show();
                      survey_jQuery("#stepArea").addClass("active");
                      setSurveyProgressBar();
                      if (answer_html) {
                        return;
                      } else {
                        showSurveyQuestion(hierarchy_id_copy);
                        return;
                      }
                    }
                  }
                }
              }
            }
          }

          let question_subject = children[i].subject.replace(/(\n|\r\n)/g, "<br>");

          let question_description = "";
          if (children[i].question_description) {
            question_description = children[i].question_description.replace(/(\n|\r\n)/g, "<br>");
          }

          let answer_children = children[i].children;

          let involved_text = children[i].involved_text;
          let bottom_info_text = children[i].bottom_info_text;
          if (answer_type == "base") {
            let swiper_html = "";
            let answer_html = "";
            let index = 0;
            for (const answer of answer_children) {
              let answer_subject = answer.subject.replace(/(\n|\r\n)/g, "<br>");
              swiper_html += "<div class='swiper-slide'></div>";
              let _class = "";
              if (index == 1) {
                _class = "checked line_checked";
              }

              let is_question_history_select = surveyHistoryAutoSelectQuestion(answer.hierarchy_id);
              if (is_question_history_select) {
                _class = "";
              }
              let is_history_select = surveyHistoryAutoSelectAnswer(answer.hierarchy_id);
              if (is_history_select) {
                _class = "checked line_checked";
              }

              let answer_description = "";
              if (answer.answer_description) {
                answer_description =
                  "<span>" + answer.answer_description.replace(/(\n|\r\n)/g, "<br>") + "</span>";
              }
              answer_html += `<li class="${_class}" is_treatment="${children[i].is_treatment}" hierarchy_id="${answer.hierarchy_id}" score="${answer.score}">${answer_subject}${answer_description}</li>`;
              index++;
            }

            question_html = `
            ${survey_progress_bar}
              <div class="contentBox re_pre">
                <div class="inner">
                    <div class="txt">
                        <h3>${question_subject}</h3>
                        <p><span class="survey_product_nick_name">#${survey_product_nick_name}</span> ${question_description}</p>
                    </div>                
                    <div class="select">
                        <div class="controlSlide plus">
                            <div class="slide-draggable">
                                <div class="swiper-wrapper">
                                  ${swiper_html}
                                </div>
                            </div>
                            <div class="control_bar">
                                <ol>
                                  ${answer_html}
                                </ol>
                                <div class="bar"><div class="blank-top"></div><div class="blank-bt"></div></div>
                            </div>
                        </div>
                    </div>   
                </div>    
                <div class="dBtn gColumn gFixed">
                  ${survey_next_btn}
                </div>
              </div>  
            `;
          } else if (answer_type == "main") {
            let is_question_history = true;
            let answer_html = "";
            let survey_worry_selected_array = [];

            for (const answer of answer_children) {
              let answer_subject = answer.subject.replace(/(\n|\r\n)/g, "<br>");
              let _class = "";

              if (
                survey_product_no == survey_shampoo_no ||
                survey_product_no == survey_set_product_no
              ) {
                if (!_is_treatment) {
                  let select = JSON.parse(localStorage.getItem("survey_shampoo_worry_selected"));
                  let is_select = false;
                  for (const answer of answer_children) {
                    let answer_subject = answer.subject.replace(/(\n|\r\n)/g, "<br>");
                    if (select.indexOf(answer_subject) > -1) {
                      is_select = true;
                    }
                  }

                  if (
                    befor_shampoo_answer_list.indexOf(answer_subject) > -1 &&
                    is_select == false
                  ) {
                    _class = "checked line_checked";
                    survey_worry_selected_array.push(answer_subject);
                  }
                }
              }

              if (
                survey_product_no == survey_treatment_no ||
                survey_product_no == survey_set_product_no
              ) {
                if (_is_treatment) {
                  let select = JSON.parse(localStorage.getItem("survey_treatment_worry_selected"));
                  let is_select = false;
                  for (const answer of answer_children) {
                    let answer_subject = answer.subject.replace(/(\n|\r\n)/g, "<br>");
                    if (select.indexOf(answer_subject) > -1) {
                      is_select = true;
                    }
                  }

                  if (
                    befor_treatment_answer_list.indexOf(answer_subject) > -1 &&
                    is_select == false
                  ) {
                    _class = "checked line_checked";
                    survey_worry_selected_array.push(answer_subject);
                  }
                }
              }
              // 없으면 입력
              if (_class) {
                let is_question_history_select = surveyHistoryAutoSelectQuestion(
                  answer.hierarchy_id
                );
                if (!is_question_history_select) {
                  is_question_history = false;
                }
                if (!is_question_history) {
                  setSurveyQuestionAnswerHistory(Number(answer.hierarchy_id), 5);
                }
              }

              let is_question_history_select = surveyHistoryAutoSelectQuestion(answer.hierarchy_id);
              if (is_question_history_select) {
                // _class = "";
              }
              let is_history_select = surveyHistoryAutoSelectAnswer(answer.hierarchy_id);
              if (is_history_select) {
                _class = "checked line_checked";
                survey_worry_selected_array.push(answer_subject);
              }

              answer_html += `<li class="${_class}" is_treatment="${children[i].is_treatment}" hierarchy_id="${answer.hierarchy_id}" onclick="surveyAnswerCheckClick(this)" max="5">${answer_subject}</li>`;
            }

            localStorage.setItem(
              "survey_worry_selected",
              JSON.stringify(survey_worry_selected_array)
            );
            if (survey_product_no == survey_set_product_no) {
              if (children[i].is_treatment) {
                localStorage.setItem(
                  "survey_treatment_worry_selected",
                  JSON.stringify(survey_worry_selected_array)
                );
              } else {
                localStorage.setItem(
                  "survey_shampoo_worry_selected",
                  JSON.stringify(survey_worry_selected_array)
                );
              }
            }

            let befor_select_text = "";
            if (survey_product_no == survey_set_product_no) {
              if (_is_treatment) {
                befor_select_text = survey_treatment_befor_select_text;
              } else {
                befor_select_text = survey_shampoo_befor_select_text;
              }
            } else {
              if (survey_product_no == survey_shampoo_no) {
                befor_select_text = survey_shampoo_befor_select_text;
              } else {
                befor_select_text = survey_treatment_befor_select_text;
              }
            }

            question_html = `
              ${survey_progress_bar}
              <div class="contentBox selectArea re_pre">
                <div class="txt">
                    <h3>${question_subject}</h3>
                    <p><span class="survey_product_nick_name">#${survey_product_nick_name}</span> ${question_description}</p>
                </div> 
                <div class="exist">
                  <h4>${involved_text}</h4>
                    <p>${befor_select_text}</p>
                </div>
                <div class="inner">
                    <div class="re_select">
                        <ul class="view">
                          ${answer_html}
                        </ul>
                    </div>
                    <p class="notice">${bottom_info_text}</p>
                </div>
                <div class="dBtn gColumn gFixed">
                  ${survey_next_btn}
                </div>   
              </div>
            `;
          } else if (answer_type == "image") {
            let answer_list_html = setSurveyAnswer(
              children[i].answer_type,
              children[i].children,
              children[i].hierarchy_id,
              survey_next_hierarchy_id,
              children[i].select_count,
              children[i].display_array_count
            );

            question_html = `
              ${survey_progress_bar}
              <div class="contentBox selectArea re_pre">
                <div class="txt">
                    <h3>${question_subject}</h3>
                </div>
                <div class="inner">
                    <div class="select">
                      ${answer_list_html}
                    </div>
                </div>
                <div class="dBtn gColumn gFixed">
                  ${survey_next_btn}
                </div>  
              </div>
              `;
          } else if (answer_type == "scent") {
            let answer_html = ``;
            let index = 0;

            for (let answer of answer_children) {
              let _class = "";
              if (index == 0) {
                _class = "line_checked";
              }
              let answer_subject = answer.subject.replace(/(\n|\r\n)/g, "<br>");
              let answer_description = answer.answer_description.replace(/(\n|\r\n)/g, "<br>");

              let aswer_subject = answer.subject.trim();
              if (!fragrance_hierarchy_array[aswer_subject]) {
                fragrance_hierarchy_array[aswer_subject] = [];
              }
              fragrance_hierarchy_array[aswer_subject].push(answer.hierarchy_id);

              // 강하게는 미노출
              if (answer_subject.indexOf("- 강하게") > -1) {
                continue;
              }
              let frag_gray_style = "display: none;";
              if (index == 0) {
                frag_gray_style = "";
              }
              let scent_top = "";
              let scent_mid = "";
              let scent_bottom = "";
              let scent_find = survey_scent_list.find((e) => e.bulk_code == answer.bulk_code);
              if (scent_find && scent_find.text) {
                scent_top = scent_find.text.top;
                scent_mid = scent_find.text.mid;
                scent_bottom = scent_find.text.bottom;
              }

              let is_question_history_select = surveyHistoryAutoSelectQuestion(answer.hierarchy_id);
              if (is_question_history_select) {
                _class = "";
              }
              let is_history_select = surveyHistoryAutoSelectAnswer(answer.hierarchy_id);
              if (is_history_select) {
                _class = "line_checked";
              }

              answer_html += `
              <div class="survey_scent_image swiper-slide ${_class}" is_treatment="${children[i].is_treatment}" answer_type="${answer_type}" min="1" max="1" hierarchy_id="${answer.hierarchy_id}" bulk_code="${answer.bulk_code}" normal_ratio="${answer.normal_ratio}" strong_ratio="${answer.strong_ratio}" answer_subject="${answer_subject}">
                <div class="trans_area">
                    <div class="img_area"><img src="${answer.image}" alt="${answer_subject}" /></div>
                </div>
                <div class="txt">
                    <h4 status="${answer.ratio_status}">${answer_subject}</h4>
                  <p>${answer_description}</p>
                    <div class="frag_gray" style="${frag_gray_style}">
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
                </div>
              </div>
              `;

              index++;
            }

            let scent_strong_hide = "";
            let sub_scent_html = `
            <div class="strength">
              <span>부향율</span>
              <span>
                  <input type="radio" name="strength" class="radiobox survey_scent_normal" onClick="surveyRadioClick(this)" value="normal"><label>보통</label>
                  <input type="radio" name="strength" class="radiobox survey_scent_strong" onClick="surveyRadioClick(this)" value="strong"><label>강하게</label>      
              </span>
            </div>
            `;
            if (ampoule_status_array.length > 0) {
              for (const ampoule_status of ampoule_status_array) {
                for (const answer_list of ampoule_status.answer_list) {
                  if (
                    ampoule_status.question_type == "main" &&
                    (answer_list.subject == "탈모증상완화" ||
                      answer_list.subject == "탈모 증상 완화")
                  ) {
                    sub_scent_html = `
                    <div class="strength displaynone">
                      <span>부향율</span>
                      <span>
                          <input type="radio" name="strength" class="radiobox survey_scent_strong line_checked" checked onClick="surveyRadioClick(this)" value="strong"><label>강하게</label>      
                      </span>    
                    </div>
                    `;
                  }
                }
              }
            }

            question_html = `
              ${survey_progress_bar}
              <div class="contentBox re_pre">
                <div class="txt">
                    <h3>${question_subject}</h3>
                    <p>${question_description}</p>
                </div>
                <div class="select">
                    <div class="controlSlide fragrance plus">

                        <!--@import(/diagnosis/fragrance_slide01.html)-->

                        <div class="slideArea">
                          <div class="swiper-container fragranceSlide">
                              <div class="swiper-wrapper">
                                  ${answer_html}
                              </div>
                              <!-- Add Pagination -->
                              <div class="swiper-pagination swiper-pagination-fragrance"></div>
                          </div>
                        </div>


                        ${sub_scent_html}
                    </div> 
                </div>   
                <div class="dBtn gColumn gFixed">
                  ${survey_next_btn}
                </div>    
              </div>    
              <script>
              setTimeout(function () {
                var fragrance_slide = new Swiper(".fragranceSlide", {
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
                      let fragrance_status = survey_jQuery(".fragranceSlide .swiper-slide-active h4").attr('status');
                      survey_jQuery(".frag_gray").hide();
                      if (fragrance_status == "disabled") {
                        survey_jQuery(".strength").hide();
                      } else {
                        survey_jQuery(".strength").show();
                        survey_jQuery(".fragranceSlide .swiper-slide-active .frag_gray").show();
                      }
                    },
                    slideChangeTransitionEnd: function () {
                      let fragrance_status = survey_jQuery(".fragranceSlide .swiper-slide-active h4").attr('status');
                      if (
                        survey_jQuery(".fragranceSlide .swiper-slide-active").hasClass("slide-free") ||
                        fragrance_status == "disabled"
                      ) {
                        survey_jQuery(".strength").hide();
                      } else {
                        survey_jQuery(".strength").show();
                        survey_jQuery(".fragranceSlide .swiper-slide-active .frag_gray").show();
                      }
                      survey_jQuery(".fragranceSlide .swiper-slide").removeClass("line_checked");
                      survey_jQuery(".fragranceSlide .swiper-slide-active").addClass("line_checked");
                      let hierarchy_id = survey_jQuery(".line_checked").attr("hierarchy_id");
                      setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);
                    },
                  },
                });

                let survey_slide_list = survey_jQuery(".survey_scent_image.swiper-slide");
                

                // 이전 선택 여부 체크
                let index = 0;
                let is_history_select_result = false;
                for (let survey_slide of survey_slide_list) {
                  let hierarchy_id = survey_jQuery(survey_slide).attr("hierarchy_id");
                  is_history_select = surveyHistoryAutoSelectAnswer(Number(hierarchy_id));
                  if (is_history_select == true) {
                    is_history_select_result = true;
                    fragrance_slide.slideTo(Number(index));
                    if (survey_answer_scent == 'normal') {
                      survey_jQuery(".survey_scent_normal").click();
                    } else {
                      survey_jQuery(".survey_scent_strong").click();
                    }
                  }
                  index++;
                }

                // 이전에 향 선택 안되었으면 진행
                if (is_history_select_result == false) {
                  let count = 0;
                  for (let survey_slide of survey_slide_list) {
                    let bulk_code = survey_jQuery(survey_slide).attr("bulk_code");
                    if (bulk_code && bulk_code == survey_scent.bulk_code) {
                      fragrance_slide.slideTo(Number(count));
                      if (survey_scent.ratio >= 1) {
                        survey_jQuery(".survey_scent_strong").click();
                      } else {
                        survey_jQuery(".survey_scent_normal").click();
                      }
                    }
                    if ((typeof survey_scent.bulk_code == "undefined" || survey_scent.bulk_code == null) && (bulk_code == null || bulk_code == "null")) {
                      fragrance_slide.slideTo(Number(count));
                    }
                    count++;
                  } 
                }
                
              }, 50);
              </script>
            `;
          } else if (answer_type == "nick_name") {
            let placeholder = null;
            if (children[i].placeholder) {
              placeholder = children[i].placeholder;
            } else {
              placeholder = survey_product_nick_name;
            }
            let input_product_name = "";
            if (product_name) {
              input_product_name = product_name;
              placeholder = product_name;
            }

            question_html = `
            <div class="contentBox recipeBox re_pre">
              <div class="inner">
                  <div class="txt">
                      <h3>${question_subject}</h3>
                  </div>
                  <div class="nameBox">
                      <input id="survey_input_product_name" type="text" placeholder="${placeholder}" onKeyup="surveyInputProductName()" onKeydown="surveyInputProductName()" value="${input_product_name}"/>
                      <button class="btnClear" onClick="clearInputProductName()"><i class="xi-close"></i></button>
                  </div>
                  <div class="img_area">
                      <img src="/web/upload/mynomy/kr_mobile/diagnosis/recipe01.png" alt="샴푸 이미지" />
                      <span id="survey_product_name" class="name">#${placeholder}</span>
                      <span class="date">05<br/>28</span>
                  </div>
              </div>   
              <div class="dBtn gColumn gFixed">
                ${survey_next_btn}
              </div>    
            </div>
            `;
          } else {
            let answer_list_html = setSurveyAnswer(
              children[i].answer_type,
              children[i].children,
              children[i].hierarchy_id,
              survey_next_hierarchy_id,
              children[i].select_count,
              children[i].display_array_count
            );

            question_html = `
              <div id="stepArea">
                <div class="step re_step">
                    <div class="menu progress ing" data-start="25%" data-progress="50%"><div class="title"><img src="/web/upload/mynomy/kr/diagnosis/feedbackloop.svg" alt="피드백루프" /></div><div class="percent"></div></div> 
                    <div class="contentWrap">
                        <div class="contentBox re_pre">
                            <div class="inner">
                                <div class="txt">
                                    <h3>${question_subject}</h3>
                                </div> 
                                ${answer_list_html}
                            </div>
                            <div class="dBtn gColumn">
                                ${survey_next_btn}
                            </div>
                        </div>
                    </div>
                </div> 
              </div>`;
          }
        }
      }
      survey_jQuery("#survey_area").empty();
      survey_jQuery("#survey_area").append(question_html);

      if (answer_type == "base" || answer_type == "width_slide_text") {
        // 베이스 일때
        setTimeout(function () {
          setHPlus();
          $(window).on("load resize", function () {
            setHPlus();
          });
          function setHPlus() {
            $('.select [class*="plus"] [class*="control_bar"] .bar .blank-top').css(
              "width",
              $('.select [class*="plus"] [class*="control_bar"] ol li').width() / 2 - 12
            );
            $('.select [class*="plus"] [class*="control_bar"] .bar .blank-bt').css(
              "width",
              $('.select [class*="plus"] [class*="control_bar"] ol li').width() / 2 - 12
            );
          }
          var draggablePlus = new Swiper('.select [class*="plus"] .slide-draggable', {
            initialSlide: 1,
            direction: "horizontal",
            loop: false,
            allowTouchMove: false,
            effect: "fade",
            fadeEffect: {
              crossFade: true,
            },
            scrollbar: {
              el: '.select [class*="plus"] .control_bar .bar',
              hide: false,
              draggable: true,
            },
            on: {
              slideChange: function () {
                $('.select [class*="plus"] .control_bar ol li')
                  .removeClass("checked line_checked")
                  .eq(draggablePlus.activeIndex)
                  .addClass("checked line_checked");

                let hierarchy_id = survey_jQuery(
                  '.select [class*="plus"] .control_bar ol li.line_checked'
                ).attr("hierarchy_id");
                setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);
              },
            },
          });

          $('.select [class*="plus"] .control_bar ol li').on("click", function () {
            draggablePlus.slideTo($(this).index());
          });
          $('.select [class*="plus"] .control_bar ol li.line_checked').click();
        }, 100);
      }

      // 세로 슬라이드 일때
      if (answer_type == "height_slide_image") {
        survey_jQuery(".swiper-wrapper").children().css("visibility", "hidden");
        setTimeout(function () {
          survey_jQuery(".swiper-wrapper").children().first().css("visibility", "");
        }, 100);
        setTimeout(function () {
          settingHeightSlideImage();
        }, 500);
      }
      // 가로 슬라이드 일때
      if (answer_type == "width_slide_image") {
        setTimeout(function () {
          settingWidthSlideImage();
        }, 50);
      }
    }
  }
  survey_jQuery("#stepArea").show();
  survey_jQuery("#stepArea").addClass("active");
  setSurveyProgressBar();
  return null;
}

function setSurveyProgressBar() {
  let total_count = survey.re_qna_hierarchy[0].children.length;
  let main_count = 0;
  let nick_name_count = 0;
  for (const hierarchy of survey.re_qna_hierarchy[0].children) {
    if (hierarchy.question_type == "main") {
      total_count++;
      main_count++;
    }

    if (hierarchy.question_type == "nick_name") {
      nick_name_count++;
    }
  }
  let percent = 100 / total_count;
  let total_percent = percent * next_click_count;
  let befor_percent = percent * (next_click_count - 1);

  let last_survey_history_hierarchy = survey_history_hierarchy[survey_history_hierarchy.length - 1];

  let is_ampoule = survey_jQuery(".surveyPrev").attr("is_ampoule");
  let answer_type = survey_jQuery(".surveyPrev").attr("answer_type");
  let now_question = searchQuestionHierarchyId(last_survey_history_hierarchy, "re_qna");
  let find = survey.re_qna_hierarchy[0].children.find((e) => e.hierarchy_id == now_question);
  if (find) {
    if (survey_product_no == survey_set_product_no) {
      let next_hierarchy_id = surveyNextQuestionHierarchyId(find.hierarchy_id);
      let next_question = searchQuestionHierarchyId(next_hierarchy_id, "re_qna");
      let next_find = survey.re_qna_hierarchy[0].children.find(
        (e) => e.hierarchy_id == next_question
      );
      if (next_find && next_find.question_type == "scent") {
        if (!is_ampoule || is_ampoule != "true") {
          total_percent = 100;
        }
      }
      if (next_find && next_find.question_type == "scent") {
        if (!is_ampoule || is_ampoule != "true") {
          total_percent = 100;
        }
      }
    } else {
      let next_hierarchy_id = surveyNextQuestionHierarchyId(find.hierarchy_id);
      let next_question = searchQuestionHierarchyId(next_hierarchy_id, "re_qna");
      let next_find = survey.re_qna_hierarchy[0].children.find(
        (e) => e.hierarchy_id == next_question
      );

      let is_where = false;
      if (next_find && next_find.process_question_status == "enabled") {
        for (const process_where of next_find.process_where) {
          let index = survey_history_hierarchy.indexOf(
            Number(process_where.select_answer_hierarchy_id)
          );
          if (index > -1) {
            is_where = true;
          }
        }
        if (is_where == false) {
          next_hierarchy_id = surveyNextQuestionHierarchyId(next_find.hierarchy_id);
          next_question = searchQuestionHierarchyId(next_hierarchy_id, "re_qna");
          next_find = survey.re_qna_hierarchy[0].children.find(
            (e) => e.hierarchy_id == next_question
          );
        }
      }
      if (answer_type && answer_type == "scent" && (!is_ampoule || is_ampoule != "true")) {
        total_percent = 100;
      }
    }
  }
  let befor_total_percent = total_percent;
  let data_start = survey_jQuery(".progress-percent").attr("data-start");
  if (data_start == "100") {
    befor_total_percent = 100;
  }
  survey_jQuery(".progress-percent").attr("data-start", total_percent);
  setTimeout(function () {
    survey_jQuery("#stepArea .percent-dummy").addClass("active");
    survey_jQuery("#stepArea .percent-dummy").css("left", `${total_percent}%`);

    befor_left = befor_percent;
  }, 100);
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

// 다음 질문 hierarchy_id 찾기
function surveyNextQuestionHierarchyId(hierarchy_id) {
  let qna_hierarchy_sequence = 1;

  for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
    if (survey.re_qna_hierarchy[j].type == "re_qna_folder") {
      // 다음 질문 체크
      let children = survey.re_qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          qna_hierarchy_sequence = Number(survey.re_qna_hierarchy[j].sequence);
          if (children[i + 1]) {
            return children[i + 1].hierarchy_id;
          } else {
            continue;
          }
        }
      }
    }
  }
}

// 다음 질문 IsTreatment 찾기
function surveyNextQuestionIsTreatment(hierarchy_id) {
  let qna_hierarchy_sequence = 1;

  for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
    if (survey.re_qna_hierarchy[j].type == "re_qna_folder") {
      // 다음 질문 체크
      let children = survey.re_qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          qna_hierarchy_sequence = Number(survey.re_qna_hierarchy[j].sequence);
          if (children[i + 1]) {
            return children[i + 1].is_treatment;
          } else {
            continue;
          }
        }
      }
    }
  }

  // 다음 폴더 체크
  qna_hierarchy_sequence += 1;
  for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
    if (survey.re_qna_hierarchy[j].type == "re_qna_folder") {
      let children = survey.re_qna_hierarchy[j].children;
      if (
        Number(survey.re_qna_hierarchy[j].sequence) == qna_hierarchy_sequence &&
        children.length > 0
      ) {
        return children[0].is_treatment;
      }
    }
  }
  return null;
}

// 답변 타입별 리스트 만들기 ( 타입, 답변 리스트, 부모 hierarchy_id, 다음 hierarchy_id, 선택가능수, 화면배열 )
function setSurveyAnswer(
  answer_type,
  answer_list,
  parent_hierarchy_id,
  next_hierarchy_id,
  select_count,
  display_array_count
) {
  let answer_html = "";
  // 텍스트
  if (answer_type == "text") {
    answer_html += `<div class="select"><ul class="row">`;

    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].display_status == "enabled") {
        answer_html += `
        <li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}">
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
      let _class = "";
      let is_question_history_select = surveyHistoryAutoSelectQuestion(answer_list[i].hierarchy_id);
      if (is_question_history_select) {
        _class = "";
      }
      let is_history_select = surveyHistoryAutoSelectAnswer(answer_list[i].hierarchy_id);
      if (is_history_select) {
        _class = "line_checked";
      }
      if (answer_list[i].display_status == "enabled") {
        if (answer_list[i].image) {
          answer_html += `
          <li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}" class="${_class}">
            <span>${answer_list[i].subject}</span>
            <div class="img_area"><img src="${answer_list[i].image}" alt="지성아이콘" /></div>
          </li>
          `;
        } else {
          answer_html += `<li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}">${answer_list[i].subject}</li>`;
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

    answer_html += `<div class="select wide"><ul class="gFlex${display_array_count}">`;
    for (let i = 0; i < answer_list.length; i++) {
      let _class = "";
      let is_question_history_select = surveyHistoryAutoSelectQuestion(answer_list[i].hierarchy_id);
      if (is_question_history_select) {
        _class = "";
      }
      let is_history_select = surveyHistoryAutoSelectAnswer(answer_list[i].hierarchy_id);
      if (is_history_select) {
        _class = "line_checked";
      }
      if (answer_list[i].display_status == "enabled") {
        if (answer_list[i].image) {
          answer_html += `
          <li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}" class="${_class}">
              <a href="javascript:void(0);">
                  <div class="img_area"><img src="${answer_list[i].image}" alt="비듬각질 이미지" /></div>
                  <span>${answer_list[i].subject}</span>
              </a>    
          </li>`;
        } else {
          answer_html += `
          <li answer_type="${answer_type}" onClick="surveyAnswerClick(this, '${answer_list[i].subject}')" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}" subject="${answer_list[i].subject}" class="${_class}">
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
        image_html += `<div class="swiper-slide"><img src="${answer_list[i].image}" alt="모래시계 이미지" /></div>`;
      }
    }
    let answer_li_html = "";
    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].display_status == "enabled") {
        let checked = "";
        if (i == 0) {
          checked = "checked line_checked";
        }
        answer_li_html += `
        <li class="${checked}" answer_type="${answer_type}" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}">
          ${answer_list[i].subject}
        </li>`;
      }
    }

    answer_html += `<div class="select"><div class="controlArea half">`;
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
        let icon_class = "xi-radiobox-blank";
        let is_true = "true";
        if (i == 1) {
          icon_class = "xi-close";
          is_true = "false";
        }
        answer_html += `
        <li answer_type="${answer_type}" onClick="surveyAnswerOXClick(this)" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" is_true="${is_true}" next_hierarchy_id="${next_hierarchy_id}">
          <a href="javascript:void(0);">
            <span>
              <i class="${icon_class}"></i>
            </span>${answer_list[i].subject}
          </a>
        </li>`;
      }
    }
    answer_html += `</ul></div>`;
  } else if (answer_type == "width_slide_image") {
    fragrance_hierarchy_array = [];
    answer_html += `
    <div class="select fragrance">
      <div class="controlSlide plus">
        <div class="slideArea">
          <div class="swiper-container fragranceSlide">
            <div class="swiper-wrapper">
    `;

    for (let i = 0; i < answer_list.length; i++) {
      if (answer_list[i].display_status == "enabled") {
        let line_checked = "";
        if (i == 0) {
          line_checked = "line_checked";
        }

        let aswer_subject = answer_list[i].subject.replace("- 강하게", "").trim();
        if (!fragrance_hierarchy_array[aswer_subject]) {
          fragrance_hierarchy_array[aswer_subject] = [];
        }
        fragrance_hierarchy_array[aswer_subject].push(answer_list[i].hierarchy_id);
        // 강하게는 미노출
        if (answer_list[i].subject.indexOf("- 강하게") > -1) {
          continue;
        }

        answer_html += `
          <div class="swiper-slide ${line_checked}" answer_type="${answer_type}" min="${select_count.min}" max="${select_count.max}" hierarchy_id="${answer_list[i].hierarchy_id}" next_hierarchy_id="${next_hierarchy_id}">
            <div class="img_area">
              <img
                src="${answer_list[i].image}"
              />
            </div>
            <div class="txt">
              <h4>${answer_list[i].subject}</h4>
              <p>${answer_list[i].answer_description}</p>
            </div>
          </div>
        `;
      }
    }
    let next_answer_html = "";
    let i = 0;
    for (let j = 0; j < survey.qna_hierarchy.length; j++) {
      if (survey.qna_hierarchy[j].children && survey.qna_hierarchy[j].children.length > 0) {
        for (const children of survey.qna_hierarchy[j].children) {
          if (Number(children.hierarchy_id) == Number(next_hierarchy_id)) {
            let count = 0;
            for (const answer of children.children) {
              let line_checked = "";
              checked = "";
              if (i == 0) {
                line_checked = "line_checked";
                checked = "checked";
              }
              if (answer.display_status == "enabled") {
                next_answer_html += `<input type="radio" name="strength" class="radiobox ${line_checked}" onClick="surveyRadioClick(this)" ${checked} hierarchy_id="${answer.hierarchy_id}"><label>${answer.subject}</label>`;
              }
              i++;
            }
          }
        }
      }
    }
    let fix_asnwer_html = `
      <input type="radio" name="strength" class="radiobox survey_scent_normal" onClick="surveyRadioClick(this)" checked value="normal"><label>보통</label>
      <input type="radio" name="strength" class="radiobox survey_scent_strong" onClick="surveyRadioClick(this)" value="strong"><label>강하게</label>
    `;
    answer_html += `
            </div>
          </div>
        </div>
        <div class="strength">
          <span>부향율</span>
          <span>
            ${fix_asnwer_html}
          </span>
        </div>
      </div>
    </div>
    `;
  } else if (answer_type == "width_slide_text") {
    let _swiper_html = "";
    let _answer_html = "";
    let index = 0;
    for (let i = 0; i < answer_list.length; i++) {
      let answer_subject = answer_list[i].subject.replace(/(\n|\r\n)/g, "<br>");
      _swiper_html += "<div class='swiper-slide'></div>";
      let _class = "";
      if (index == 1) {
        _class = "checked line_checked";
      }

      let is_question_history_select = surveyHistoryAutoSelectQuestion(answer_list[i].hierarchy_id);
      if (is_question_history_select) {
        _class = "";
      }
      let is_history_select = surveyHistoryAutoSelectAnswer(answer_list[i].hierarchy_id);
      if (is_history_select) {
        _class = "checked line_checked";
      }

      let answer_description = "";
      if (answer_list[i].answer_description) {
        answer_description =
          "<span>" + answer_list[i].answer_description.replace(/(\n|\r\n)/g, "<br>") + "</span>";
      }
      _answer_html += `<li class="${_class}" hierarchy_id="${answer_list[i].hierarchy_id}">${answer_subject}${answer_description}</li>`;
      index++;
    }

    answer_html += `
    <div class="select">
      <div class="controlSlide plus">
          <div class="slide-draggable">
              <div class="swiper-wrapper">
                  ${_swiper_html}
              </div>
          </div>
          <div class="control_bar">
              <ol>
                  ${_answer_html}
              </ol>
              <div class="bar"><div class="blank-top"></div><div class="blank-bt"></div></div>
          </div>
      </div>
    </div> 
    `;
  } else {
    //
  }
  return answer_html;
}

// 다음 질문 노출
function showNextSurveyQuestion(element, next_hierarchy_id) {
  history.pushState(null, null, location.search);
  history.pushState(null, null, location.search + "#progress");
  survey_jQuery("#header .header").removeClass("slideUp");
  survey_jQuery("#header .header").addClass("slideDown");
  let answer_type = survey_jQuery(element).attr("answer_type");

  let select_answer = survey_jQuery(".line_checked");

  if (answer_type == "scent") {
    let survey_scent_normal = survey_jQuery(".survey_scent_normal").length;
    let survey_scent_strong = survey_jQuery(".survey_scent_strong").length;
    if (survey_scent_normal > 0 && survey_scent_strong > 0) {
      let answer_subject = survey_jQuery(".swiper-slide.swiper-slide-active.line_checked").attr(
        "answer_subject"
      );
      if (answer_subject == "Fragrance Free") {
        survey_jQuery(".survey_scent_strong").click();
      }
      let is_survey_scent_normal = survey_jQuery(".survey_scent_normal").hasClass("line_checked");
      let is_survey_scent_strong = survey_jQuery(".survey_scent_strong").hasClass("line_checked");
      if (!is_survey_scent_normal && !is_survey_scent_strong) {
        alert("부향율을 선택해주세요.");
        return;
      }
    }

    let scent_subject = survey_jQuery(select_answer[0]).attr("answer_subject");
    let strength = survey_jQuery(select_answer[1]).val();
    sessionStorage.setItem(
      "survey_fragrance",
      JSON.stringify({
        subject: scent_subject,
        strength,
      })
    );
  }

  // 일반 질문일때
  if (
    answer_type == "image" ||
    answer_type == "text" ||
    answer_type == "width_slide_image" ||
    answer_type == "width_slide_text" ||
    answer_type == "height_slide_image" ||
    answer_type == "OX"
  ) {
    let min = survey_jQuery(element).attr("min");
    let max = survey_jQuery(element).attr("max");

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
    if (answer_type == "nick_name") {
      let nick_name = survey_jQuery("#survey_input_product_name").val();
      if (!nick_name.trim()) {
        let placeholder = survey_jQuery("#survey_input_product_name").attr("placeholder");
        if (!placeholder.trim()) {
          alert("닉네임을 입력해주세요");
          return;
        }
        survey_jQuery("#survey_input_product_name").val(placeholder);
        product_name = placeholder;
      }
    }
    if (select_answer.length == 0 && answer_type != "nick_name") {
      alert("선택된 답변이 없습니다.");
      return;
    }
  }

  for (let i = 0; i < select_answer.length; i++) {
    let hierarchy_id = survey_jQuery(select_answer[i]).attr("hierarchy_id");

    let question_info = null;
    let answer_subject = null;
    let question_info_type = null;
    for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
      let children = survey.re_qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
          question_info = children[i];
        }
        let answer_list = children[i].children;
        for (let l = 0; l < answer_list.length; l++) {
          if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
            question_info = children[i];
            answer_subject = answer_list[l].subject;
            question_info_type = children[i].question_type;
          }
        }
      }
    }

    // 기능 선택
    if (question_info && question_info.question_type == "main") {
      let ampoule_status_array_index = ampoule_status_array.findIndex(
        (e) => Number(e.hierarchy_id) == Number(question_info.hierarchy_id)
      );
      if (ampoule_status_array_index == -1) {
        ampoule_status_array.push({
          hierarchy_id: question_info.hierarchy_id,
          subject: question_info.subject,
          answer_list: [],
          status: false,
          question_type: question_info_type
        });
        ampoule_status_array_index = ampoule_status_array.length - 1;
      } else {
        let index = ampoule_status_array[ampoule_status_array_index].answer_list.findIndex(
          (e) => Number(e.hierarchy_id) == Number(hierarchy_id)
        );
        if (index > -1) {
          ampoule_status_array[ampoule_status_array_index].answer_list.splice(index, 1);
        }
      }
      ampoule_status_array[ampoule_status_array_index].answer_list.push({
        subject: answer_subject,
        hierarchy_id: hierarchy_id
      });
    }
    if (hierarchy_id) {
      survey_history_hierarchy.push(Number(hierarchy_id));
    }

    let section_find_idex = section.findIndex(
      (e) => Number(e.hierarchy_id) == Number(hierarchy_id)
    );
    if (section_find_idex > -1) {
      section.splice(section_find_idex, 1);
    }

    // 처음에 한번만 삭제
    if (i == 0) {
      for (const children of question_info.children) {
        let find_index = section.findIndex(
          (e) => Number(e.hierarchy_id) == Number(children.hierarchy_id)
        );
        if (find_index > -1) {
          section.splice(find_index, 1);
        }
      }
    }

    let score = survey_jQuery(select_answer[i]).attr("score");
    if (score) {
      section.push({
        hierarchy_id,
        type: "base",
        score: Number(score),
      });
    }

    let ampoule_ratio = survey_jQuery(select_answer[i]).attr("ratio");
    let ampoule_max_ratio = survey_jQuery(select_answer[i]).attr("max_ratio");
    let bulk_code = survey_jQuery(select_answer[i]).attr("bulk_code");
    if (ampoule_ratio) {
      section.push({
        hierarchy_id,
        type: "ampoule",
        ampoule_max_ratio: Number(ampoule_max_ratio),
        bulk_code,
        ampoule_ratio: Number(ampoule_ratio),
      });
    }

    let normal_ratio = survey_jQuery(select_answer[i]).attr("normal_ratio");
    let strong_ratio = survey_jQuery(select_answer[i]).attr("strong_ratio");

    let checked_value = survey_jQuery("input[name=strength]:checked").val();
    if (normal_ratio && strong_ratio && checked_value) {
      let scent_ratio = "";
      if (checked_value == "normal") {
        scent_ratio = normal_ratio;
      } else {
        scent_ratio = strong_ratio;
      }
      section.push({
        hierarchy_id,
        type: "scent",
        bulk_code,
        scent_ratio: Number(scent_ratio),
      });
    }

    if (survey_jQuery(select_answer[i]).attr("section") == "Y") {
      let _is_treatment = survey_jQuery(select_answer[i]).attr("is_treatment");
      let section = survey_jQuery(select_answer[i]).attr("section");
      if (_is_treatment === "false") {
        is_shampoo_ampoule_status = true;
      } else {
        is_treatment_ampoule_status = true;
      }
    }
  }
  next_click_count++;
  // 질문 노출
  showSurveyQuestion(next_hierarchy_id);
}

// 프리셋 선택한 답변
function surveyAnswerCheckClick(element) {
  if (survey_jQuery(element).hasClass("checked line_checked")) {
    survey_jQuery(element).removeClass("checked line_checked");
  } else {
    survey_jQuery(element).addClass("checked line_checked");
  }

  let max = survey_jQuery(element).attr("max");
  let select_answer_count = survey_jQuery(".line_checked").length;
  if (select_answer_count > max) {
    alert("최대 " + max + "개까지 선택할 수 있어요.");
    survey_jQuery(element).removeClass("checked line_checked");
  }
  let first_preset_text_answer = [];
  if (select_answer_count > 0) {
    for (let element of survey_jQuery(".line_checked")) {
      first_preset_text_answer.push(survey_jQuery(element).text());
    }
  }
  localStorage.setItem("survey_worry_selected", JSON.stringify(first_preset_text_answer));

  let is_treatment = survey_jQuery(element).attr("is_treatment");

  if (is_treatment == "true") {
    localStorage.setItem(
      "survey_treatment_worry_selected",
      JSON.stringify(first_preset_text_answer)
    );
  } else {
    localStorage.setItem("survey_shampoo_worry_selected", JSON.stringify(first_preset_text_answer));
  }

  // 선택 이력
  let hierarchy_id = survey_jQuery(element).attr("hierarchy_id");
  setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);
  setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1, "delete");
  let list = survey_jQuery(".re_select .view").children();
  for (const _element of list) {
    if (survey_jQuery(_element).hasClass("line_checked")) {
      let _hierarchy_id = survey_jQuery(_element).attr("hierarchy_id");
      setSurveyQuestionAnswerHistory(Number(_hierarchy_id), Number(select_answer_count));
    }
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

  // 선택 이력
  let hierarchy_id = survey_jQuery(element).attr("hierarchy_id");
  setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1);
  setSurveyQuestionAnswerHistory(Number(hierarchy_id), 1, "delete");
  let list = survey_jQuery(".select ul").children();
  for (const _element of list) {
    if (survey_jQuery(_element).hasClass("line_checked")) {
      let _hierarchy_id = survey_jQuery(_element).attr("hierarchy_id");
      setSurveyQuestionAnswerHistory(Number(_hierarchy_id), Number(select_answer_count));
    }
  }
}

// 답변 hierarchy_id로 질문 hierarchy_id 찾기
function searchQuestionHierarchyId(hierarchy_id, type, product_type = null) {
  let search_hierarchy_id = 0;

  if (type == "qna") {
    let qna_hierarchy = survey.qna_hierarchy;
    if (product_type == "treatment") {
      qna_hierarchy = treatment_survey.qna_hierarchy;
    }
    for (let j = 0; j < qna_hierarchy.length; j++) {
      if (qna_hierarchy[j].type == "folder") {
        let children = qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
              search_hierarchy_id = children[i].hierarchy_id;
            }
          }
        }
      }
    }
  } else {
    let re_qna_hierarchy = survey.re_qna_hierarchy;
    if (product_type == "treatment") {
      re_qna_hierarchy = treatment_survey.re_qna_hierarchy;
    }
    for (let j = 0; j < re_qna_hierarchy.length; j++) {
      if (re_qna_hierarchy[j].type == "re_qna_folder") {
        let children = re_qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
            search_hierarchy_id = children[i].hierarchy_id;
          }
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
              search_hierarchy_id = children[i].hierarchy_id;
            }
            let answer_list_children = answer_list[l].children;
            for (let ii = 0; ii < answer_list_children.length; ii++) {
              if (Number(answer_list_children[ii].hierarchy_id) == Number(hierarchy_id)) {
                search_hierarchy_id = children[i].hierarchy_id;
              }
            }
          }
        }
      }
    }
  }
  return search_hierarchy_id;
}

// 답변 hierarchy_id로 질문명 찾기
function searchQuestionHierarchyName(hierarchy_id, type) {
  let search_subject = "";
  if (type == "qna") {
    for (let j = 0; j < survey.qna_hierarchy.length; j++) {
      if (survey.qna_hierarchy[j].type == "folder") {
        let children = survey.qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
              search_subject = children[i].subject;
            }
          }
        }
      }
    }
  } else {
    for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
      if (survey.re_qna_hierarchy[j].type == "re_qna_folder") {
        let children = survey.re_qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
            search_subject = children[i].subject;
          }
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
              search_subject = children[i].subject;
            }
          }
        }
      }
    }
  }
  return search_subject;
}

// 답변 hierarchy_id로 질문타입 찾기
function searchQuestionHierarchyQuestionType(hierarchy_id, type) {
  let question_type = "";
  if (type == "qna") {
    for (let j = 0; j < survey.qna_hierarchy.length; j++) {
      if (survey.qna_hierarchy[j].type == "folder") {
        let children = survey.qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
              question_type = children[i].question_type;
            }
          }
        }
      }
    }
  } else {
    for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
      if (survey.re_qna_hierarchy[j].type == "re_qna_folder") {
        let children = survey.re_qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
            question_type = children[i].question_type;
          }
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
              question_type = children[i].question_type;
            }
          }
        }
      }
    }
  }
  return question_type;
}

// hierarchy_id로 hierarchy 정보 찾기
function searchHierarchyInfoById(hierarchy_id, type, product_type = null) {
  if (type == "qna") {
    let qna_hierarchy = survey.qna_hierarchy;
    if (product_type == "treatment") {
      qna_hierarchy = treatment_survey.qna_hierarchy;
    }
    for (let j = 0; j < qna_hierarchy.length; j++) {
      if (qna_hierarchy[j].type == "folder") {
        let children = qna_hierarchy[j].children;
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
  } else {
    let re_qna_hierarchy = survey.re_qna_hierarchy;
    if (product_type == "treatment") {
      re_qna_hierarchy = treatment_survey.re_qna_hierarchy;
    }
    for (let j = 0; j < re_qna_hierarchy.length; j++) {
      if (re_qna_hierarchy[j].type == "re_qna_folder") {
        let children = re_qna_hierarchy[j].children;
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
  }
  return null;
}

function searchReQnaAutoSelect() {
  befor_shampoo_answer_list = [];
  befor_treatment_answer_list = [];

  let is_loss_hair = "";
  // 탈모증상완화
  if (survey_product_no == survey_shampoo_no || survey_product_no == survey_set_product_no) {
    // 답변 hierarchy_id로 질문 찾기
    for (const hierarchy_id of re_survey.survey_result) {
      let question_hierarchy_id = searchQuestionHierarchyId(
        hierarchy_id,
        re_survey.type,
        "shampoo"
      );
      if (question_hierarchy_id > 0) {
        let question = searchHierarchyInfoById(question_hierarchy_id, re_survey.type, "shampoo");
        if (question.question_type == "main") {
          for (let answer of question.children) {
            if (hierarchy_id == answer.hierarchy_id) {
              befor_shampoo_answer_list.push(answer.subject);
            }
            if (answer.subject == "탈모증상완화" || answer.subject == "탈모 증상 완화") {
              is_loss_hair = true;
            }
          }
        }
      }
    }
  }

  if (survey_product_no == survey_treatment_no || survey_product_no == survey_set_product_no) {
    // 답변 hierarchy_id로 질문 찾기
    for (const hierarchy_id of re_treatment_survey.survey_result) {
      let question_hierarchy_id = searchQuestionHierarchyId(
        hierarchy_id,
        re_treatment_survey.type,
        "treatment"
      );
      if (question_hierarchy_id > 0) {
        let question = searchHierarchyInfoById(
          question_hierarchy_id,
          re_treatment_survey.type,
          "treatment"
        );
        if (question && question.subject && question.question_type == "main") {
          for (let answer of question.children) {
            if (Number(hierarchy_id) == Number(answer.hierarchy_id)) {
              befor_treatment_answer_list.push(answer.subject);
            }
          }
        }
      }
    }
  }
}
// 라디오 버튼 클릭
function surveyRadioClick(element) {
  let element_list = survey_jQuery(element).siblings();
  for (let sibling of element_list) {
    survey_jQuery(sibling).removeClass("line_checked");
  }
  survey_jQuery(element).addClass("line_checked");
  survey_answer_scent = survey_jQuery(element).val();
}

function settingWidthSlideImage() {
  var fragranceSlide = new Swiper(".fragranceSlide", {
    speed: 600,
    slidesPerView: "auto",
    spaceBetween: 0,
    slideToClickedSlide: true,
    centeredSlides: true,
    mousewheel: true,
    on: {
      slideChangeTransitionStart: function () {
        let fragrance_text = survey_jQuery(".fragranceSlide .swiper-slide-active h4").text();
        if (fragrance_text == "무향") {
          survey_jQuery(".strength").hide();
        } else {
          survey_jQuery(".strength").show();
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
      },
    },
  });
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
      },
    },
  });
  survey_jQuery(".controlArea:not(.plus) .control_bar ol li").on("click", function () {
    draggable.slideTo($(this).index());
  });
  survey_jQuery(".swiper-slide").css("visibility", "");
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
}

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

  if (!product_name || product_name.length == 0) {
    survey_jQuery("#survey_product_name").text("#" + survey_product_nick_name);
    survey_jQuery("#survey_input_product_name").attr("placeholder", survey_product_nick_name);
  }
}

// 바이트 계산
function surveyGetStringByte(contents) {
  let length = 10;
  let int_contents_length = contents.length;
  if (int_contents_length > length) {
    return contents.substr(0, 10);
  } else {
    return contents;
  }
}

// 답변 hierarchy_id로 질문 hierarchy_id 찾기
function searchSetProducIsTreatmentHierarchy(hierarchy_id) {
  for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
    let children = survey.re_qna_hierarchy[j].children;
    for (let i = 0; i < children.length; i++) {
      if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
        return children[i].is_treatment;
      }
      for (const answer of children[i].children) {
        if (Number(answer.hierarchy_id) == Number(hierarchy_id)) {
          return children[i].is_treatment;
        }
      }
    }
  }
  return false;
}

// hierarchy_id로 formula_score 찾기
function searchFormulaByHierarchyId(hierarchy_id, type) {
  if (type == "qna") {
    for (let j = 0; j < survey.qna_hierarchy.length; j++) {
      if (survey.qna_hierarchy[j].type == "folder") {
        let children = survey.qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
              return {
                score: answer_list[l].formula_score,
                subject: answer_list[l].subject,
              };
            }
          }
        }
      }
    }
  } else {
    for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
      let children = survey.re_qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        let answer_list = children[i].children;
        for (let l = 0; l < answer_list.length; l++) {
          if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
            return {
              subject: answer_list[l].subject,
            };
          }
        }
      }
    }
  }
  return null;
}

function surveyGetShampooResultParams(product_no, sections, history_hierarchy) {
  let set_param = {};
  let section_result = [...sections];
  let set_ampoule = [];
  // NEW 엠플 추가
  for (let survey_hierarchy_id of history_hierarchy) {
    for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
      let children = survey.re_qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].question_type == "main") {
          for (const answer of children[i].children) {
            if (Number(survey_hierarchy_id) == Number(answer.hierarchy_id)) {
              let index = sections.findIndex(
                (e) => Number(e.hierarchy_id) == Number(survey_hierarchy_id)
              );
              if (index == -1) {
                sections.push({
                  hierarchy_id: answer.hierarchy_id,
                  type: "ampoule",
                  ampoule_max_ratio: answer.max_ratio,
                  bulk_code: answer.bulk_code,
                  ampoule_ratio: 0,
                });
              } else {
                let find = set_ampoule.find((e) => e.hierarchy_id == answer.hierarchy_id);
                if (!find) {
                  set_ampoule.push({
                    hierarchy_id: answer.hierarchy_id,
                    answer: answer.subject,
                    bulk_code: answer.bulk_code,
                    ampoule_ratio: sections[index].ampoule_ratio,
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  // 엠플을 bulk_code별로 체크
  let section_param = [];
  for (const section_item of sections) {
    if (section_item.type == "ampoule") {
      let index = section_param.findIndex((e) => e.bulk_code == section_item.bulk_code);
      if (index == -1) {
        section_param.push(section_item);
      } else {
        section_param[index].ampoule_ratio += section_item.ampoule_ratio;
      }
    }
  }

  if (re_survey.type == "qna") {
    qna_hierarchy = survey.qna_hierarchy;
  } else {
    qna_hierarchy = survey.re_qna_hierarchy;
  }

  // 이전 선택 앰플 체크
  let befor_select_ampoule = [];
  let ampoule_result = getAmpouleRatio(product_no);
  for (const ampoule of ampoule_result) {
    befor_select_ampoule.push(ampoule.bulk_code);
  }

  // 현재 선택된 앰플 이전 선택 앰플 비교
  for (let param of section_param) {
    let index = befor_select_ampoule.indexOf(param.bulk_code);
    // 없으면 2
    if (index == -1) {
      param.ampoule_ratio = 2;
    }
  }

  // 엠플 아닌것만 입력
  section_result = [];
  for (const section_item of sections) {
    if (section_item.type != "ampoule") {
      section_result.push(section_item);
    }
  }

  let _is_hair_loss = false;

  // 탈모증상완화 선택 체크

  for (const hierarchy_id of re_survey.survey_result) {
    let formula = searchFormulaByHierarchyId(hierarchy_id, re_survey.type);
    if (formula) {
      if (
        formula.subject == "탈모증상완화" ||
        formula.subject == "탈모증상 완화" ||
        formula.subject == "탈모 증상 완화"
      ) {
        is_befor_hair_loss = true;
      }
    }
  }

  for (const hierarchy_id of history_hierarchy) {
    let formula = searchFormulaByHierarchyId(hierarchy_id, "re_qna");
    if (formula) {
      if (
        formula.subject == "탈모증상완화" ||
        formula.subject == "탈모증상 완화" ||
        formula.subject == "탈모 증상 완화"
      ) {
        _is_hair_loss = true;
        is_hair_loss = true;
      }
    }
  }
  if (_is_hair_loss) {
    let base_result = surveyBaseChange(section_result);
    for (let section_item of section_result) {
      if (section_item.type == "base") {
        section_item.score = Number(base_result.base_score);
      }
    }
    if (base_result.ampoule_list) {
      for (let ampoule of base_result.ampoule_list) {
        if (befor_bom_info.shampoo) {
          for (const shampoo of befor_bom_info.shampoo) {
            if (
              shampoo.bulk_group_name == "기능앰플" &&
              shampoo.composition.bulk_code == ampoule.bulk_code
            ) {
              ampoule.ampoule_ratio = 0;
            }
          }
        }
        section_result.push(ampoule);
      }
    }
  }

  if (_is_hair_loss == false && is_befor_hair_loss == false) {
    // 엠플 입력
    for (const ampoule of section_param) {
      section_result.push(ampoule);
    }
  }

  if (_is_hair_loss == false && is_befor_hair_loss == true) {
    // 엠플 입력
    for (const ampoule of section_param) {
      section_result.push(ampoule);
    }

    for (let ampoule of section_param) {
      if (befor_bom_info.shampoo) {
        for (const shampoo of befor_bom_info.shampoo) {
          if (
            shampoo.bulk_group_name == "기능앰플" &&
            shampoo.composition.bulk_code == ampoule.bulk_code
          ) {
            ampoule.ampoule_ratio = 0;
          }
        }
      }
      section_result.push(ampoule);
    }

  }
  set_param = {
    hash: survey_hash,
    survey_hierarchy_ids: [...history_hierarchy],
    section: section_result,
    ampoule: set_ampoule,
    member: {
      product_name,
      member_id: survey_member_id,
      gender: survey_gender,
    },
  };

  return set_param;
}

function surveyGetTreatmentResultParams(product_no, sections, history_hierarchy) {
  let set_param = {};
  let section_result = [...sections];
  let set_ampoule = [];

  let treatment_answer_ampoule_tpye_I_info = null;

  // NEW 엠플 추가
  for (let survey_hierarchy_id of history_hierarchy) {
    for (let j = 0; j < treatment_survey.re_qna_hierarchy.length; j++) {
      let children = treatment_survey.re_qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].question_type == "main") {
          for (const answer of children[i].children) {
            if (treatment_answer_ampoule_tpye_I_bulk_code == answer.bulk_code) {
              treatment_answer_ampoule_tpye_I_info = {
                hierarchy_id: answer.hierarchy_id,
                type: "ampoule",
                ampoule_max_ratio: answer.max_ratio,
                bulk_code: answer.bulk_code,
                ampoule_ratio: 2,
              }
            }
            if (Number(survey_hierarchy_id) == Number(answer.hierarchy_id)) {
              let index = sections.findIndex(
                (e) => Number(e.hierarchy_id) == Number(survey_hierarchy_id)
              );
              if (index == -1) {
                sections.push({
                  hierarchy_id: answer.hierarchy_id,
                  type: "ampoule",
                  ampoule_max_ratio: answer.max_ratio,
                  bulk_code: answer.bulk_code,
                  ampoule_ratio: 0,
                });
              } else {
                let find = set_ampoule.find((e) => e.hierarchy_id == answer.hierarchy_id);
                if (!find) {
                  set_ampoule.push({
                    hierarchy_id: answer.hierarchy_id,
                    answer: answer.subject,
                    bulk_code: answer.bulk_code,
                    ampoule_ratio: sections[index].ampoule_ratio,
                  });
                }
              }
            }
            /*
            if (treatment_answer_ampoule_tpye_D_name == answer.subject) {
              treatment_answer_ampoule_tpye_D_info = {
                hierarchy_id: answer.hierarchy_id,
                type: "ampoule",
                bulk_code: answer.bulk_code,
                ampoule_ratio: 0,
              };
            }
            if (treatment_answer_ampoule_tpye_P_name == answer.subject) {
              treatment_answer_ampoule_tpye_P_info = {
                hierarchy_id: answer.hierarchy_id,
                type: "ampoule",
                bulk_code: answer.bulk_code,
                ampoule_ratio: 0,
              };
            }
            */
          }
        }
      }
    }
  }

  // 엠플을 bulk_code별로 체크 (중복 bulk_code 계산)
  let section_param = [];
  for (const section_item of sections) {
    if (section_item.type == "ampoule") {
      let index = section_param.findIndex((e) => e.bulk_code == section_item.bulk_code);
      if (index == -1) {
        section_param.push(section_item);
      } else {
        section_param[index].ampoule_ratio += section_item.ampoule_ratio;
      }
    }
  }

  let ampoule_count = 0;
  for (let section of section_param) {
    if (section.type == "ampoule") {
      if (section.bulk_code) {
        ampoule_count++;
      }
    }
  }

  /*
  if (ampoule_count <= 2) {
    let find_D_index = section_param.findIndex(
      (e) => e.bulk_code == treatment_answer_ampoule_tpye_D_info.bulk_code
    );
    if (find_D_index == -1) {
      section_param.push(treatment_answer_ampoule_tpye_D_info);
    }
    let find_P_index = section_param.findIndex(
      (e) => e.bulk_code == treatment_answer_ampoule_tpye_P_info.bulk_code
    );
    if (find_P_index == -1) {
      section_param.push(treatment_answer_ampoule_tpye_P_info);
    }
  }
  if (ampoule_count == 3) {
    let is_D = false;
    let find_D_index = section_param.findIndex(
      (e) => e.bulk_code == treatment_answer_ampoule_tpye_D_info.bulk_code
    );
    if (find_D_index == -1) {
      is_D = true;
      section_param.push(treatment_answer_ampoule_tpye_D_info);
    }
    let find_P_index = section_param.findIndex(
      (e) => e.bulk_code == treatment_answer_ampoule_tpye_P_info.bulk_code
    );
    if (is_D == false && find_P_index == -1) {
      section_param.push(treatment_answer_ampoule_tpye_P_info);
    }
  }
  */

  if (re_treatment_survey.type == "qna") {
    qna_hierarchy = treatment_survey.qna_hierarchy;
  } else {
    qna_hierarchy = treatment_survey.re_qna_hierarchy;
  }

  // 이전 선택 앰플 체크
  let befor_select_ampoule = [];
  let ampoule_result = getAmpouleRatio(product_no);
  for (const ampoule of ampoule_result) {
    befor_select_ampoule.push(ampoule.bulk_code);
  }

  // 현재 선택된 앰플 이전 선택 앰플 비교
  // ex 1) 현재 선택한 A 앰플 있고, 이전에 선택한 앰플중 A 앰플 없으면
  //    > A 앰플 함량은 2준다
  // ex 2) 현재 선택한 A 앰플 없고, 이전에 선택한 앰플중 A 앰플 있으면
  //    > A 앰플 함량은 0준다

  // 이전에 있고
  // 지금 없으면 0



  // 지금 있고
  for (let param of section_param) {
    // 이전에 없으면
    let index = befor_select_ampoule.indexOf(param.bulk_code);
    if (index == -1) {
      param.ampoule_ratio = 2;
    }
  }
  
  // 이전에 있고
  for (let befor_ampoule of befor_select_ampoule) {
    let befor_find = section_param.find((e) => e.bulk_code == befor_ampoule);
    // 지금 없으면
    if (!befor_find) {
      /*
      for (let j = 0; j < treatment_survey.re_qna_hierarchy.length; j++) {
        let children = treatment_survey.re_qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (children[i].question_type == "main") {
            for (const answer of children[i].children) {
              if (befor_ampoule == answer.bulk_code) {

                let find_index = section_param.findIndex(
                  (e) => e.bulk_code == answer.bulk_code
                );
                if (find_index > -1) {
                  continue;
                }
                section_param.push({
                  hierarchy_id: answer.hierarchy_id,
                  type: "ampoule",
                  ampoule_max_ratio: answer.max_ratio,
                  bulk_code: answer.bulk_code,
                  ampoule_ratio: 0,
                });
              }
            }
          }
        }
      }
      */
    }
  }

  // I 추가
  if (section_param.length < 4) {
    let find_I_index = section_param.findIndex(
      (e) => e.bulk_code == treatment_answer_ampoule_tpye_I_info.bulk_code
    );
    if (find_I_index == -1) {
      // 이전에 I가 있으면 0을 준다
      let ampoule_tpye_I_index = befor_select_ampoule.indexOf(treatment_answer_ampoule_tpye_I_info.bulk_code);
      if (ampoule_tpye_I_index > -1) {
        treatment_answer_ampoule_tpye_I_info.ampoule_ratio = 0;
      }
      section_param.push(treatment_answer_ampoule_tpye_I_info);
    }
  }

  // 엠플 아닌것만 입력
  section_result = [];
  for (const section_item of sections) {
    if (section_item.type != "ampoule") {
      section_result.push(section_item);
    }
  }

  // 엠플 입력
  for (const ampoule of section_param) {
    section_result.push(ampoule);
  }

  // 트리트먼트 베이스 변경
  let treatment_change_section = surveyBaseTreatmentChange(section_result, history_hierarchy);
  section_result = treatment_change_section;

  set_param = {
    hash: survey_hash,
    survey_hierarchy_ids: [...history_hierarchy],
    section: section_result,
    ampoule: set_ampoule,
    member: {
      product_name,
      member_id: survey_member_id,
      gender: survey_gender,
    },
  };

  return set_param;
}

function surveyQuestionAfter() {
  let set_param = {};
  if (is_survey_result == true) {
    return;
  }
  // 세트 상품 아닐때
  if (Number(survey_set_product_no) != Number(survey_product_no)) {
    // set_param = surveyGetResultParams(survey_product_no, section, survey_history_hierarchy);
    if (survey_product_no == survey_shampoo_no) {
      set_param = surveyGetShampooResultParams(
        survey_shampoo_no,
        section,
        survey_history_hierarchy
      );
    } else {
      set_param = surveyGetTreatmentResultParams(
        survey_treatment_no,
        section,
        survey_history_hierarchy
      );
    }
  } else {
    let set_shampoo_hierarchy_ids = [];
    let set_shampoo_section = [];
    let set_treatment_hierarchy_ids = [];
    let set_treatment_section = [];
    let scent_section = {};

    for (let survey_hierarchy_id of survey_history_hierarchy) {
      let index = section.findIndex((e) => Number(e.hierarchy_id) == Number(survey_hierarchy_id));
      let is_treatment = searchSetProducIsTreatmentHierarchy(Number(survey_hierarchy_id));
      if (index >= 0) {
        if (section[index].type == "scent") {
          scent_section = section[index];
        }

        // 트리트먼트 일떄
        if (is_treatment) {
          if (section[index]) {
            let find_index = set_treatment_section.findIndex(
              (e) => Number(e.hierarchy_id) == Number(survey_hierarchy_id)
            );
            if (find_index > -1) {
              set_treatment_section.splice(find_index, 1);
            }
            set_treatment_section.push(section[index]);
          }
          // 샴푸 일떄
        } else {
          if (section[index]) {
            let find_index = set_shampoo_section.findIndex(
              (e) => Number(e.hierarchy_id) == Number(survey_hierarchy_id)
            );
            if (find_index > -1) {
              set_shampoo_section.splice(find_index, 1);
            }
            set_shampoo_section.push(section[index]);
          }
        }
      }
      if (is_treatment) {
        set_treatment_hierarchy_ids.push(survey_hierarchy_id);
      } else {
        set_shampoo_hierarchy_ids.push(survey_hierarchy_id);
      }
    }
    /*
    let shampoo_section_result = surveyGetResultParams(
      survey_product_no,
      set_shampoo_section,
      set_shampoo_hierarchy_ids
    );
    let treatment_section_result = surveyGetResultParams(
      survey_product_no,
      set_treatment_section,
      set_treatment_hierarchy_ids
    );
    */
    let shampoo_section_result = surveyGetShampooResultParams(
      survey_shampoo_no,
      set_shampoo_section,
      set_shampoo_hierarchy_ids
    );

    let treatment_section_result = surveyGetTreatmentResultParams(
      survey_treatment_no,
      set_treatment_section,
      set_treatment_hierarchy_ids
    );

    let treatment_scent = treatment_section_result.section.find((e) => e.type == "scent");
    if (treatment_scent.bulk_code == "null") {
      treatment_scent.bulk_code = null;
    }
    if (treatment_scent) {
      let find = survey_shampoo_scent_array.find((e) => e.bulk_code == treatment_scent.bulk_code);
      if (find) {
        shampoo_section_result.section.push({
          hierarchy_id: find.hierarchy_id,
          type: "scent",
          bulk_code: find.bulk_code,
          scent_ratio: treatment_scent.scent_ratio,
        });
        set_shampoo_hierarchy_ids.push(find.hierarchy_id);
      }
    }

    set_param = {
      hash: survey_hash,
      surveys: [
        {
          product_no: survey_shampoo_no,
          hierarchy_ids: set_shampoo_hierarchy_ids,
          // section: set_shampoo_section,
          section: shampoo_section_result.section,
          ampoule: shampoo_section_result.ampoule,
        },
        {
          product_no: survey_treatment_no,
          hierarchy_ids: set_treatment_hierarchy_ids,
          // section: set_treatment_section,
          section: treatment_section_result.section,
          ampoule: treatment_section_result.ampoule,
        },
      ],
      member: {
        product_name,
        member_id: survey_member_id,
        gender: survey_gender,
      },
      // is_hair_loss: is_hair_loss_result,
    };
  }

  sessionStorage.setItem("survey_re_qna_set_param", JSON.stringify(set_param));
  sessionStorage.setItem("SURVEY_ORIGIANL_RE_QNA_SET_PARAM", JSON.stringify(set_param));

  let qna_at = shoplusGetParameters("qna_at");

  // 엠플 성분 수정
  if (Number(survey_product_no) != Number(survey_set_product_no)) {
    set_param = surveySectionUpdate(Number(survey_product_no), set_param);
    // 지금 탈모 X + 탈모 벌크 있으면 삭제 ( 백단에서 처리와 연관 : -2 도 안보낸다 )   
    if (is_hair_loss == false) {
      let find_loss_hair_section = set_param.section.findIndex((e) => e.bulk_code == "3C2A11984110");
      if (find_loss_hair_section > -1) {
        set_param.section.splice(find_loss_hair_section, 1);
      }
    }
  } else {
    set_param.surveys[0] = surveySectionUpdate(Number(survey_shampoo_no), set_param.surveys[0]);
    set_param.surveys[1] = surveySectionUpdate(Number(survey_treatment_no), set_param.surveys[1]);
    // 지금 탈모 X + 탈모 벌크 있으면 삭제 ( 백단에서 처리와 연관 : -2 도 안보낸다 )
    if (is_hair_loss == false) {
      let find_loss_hair_section = set_param.surveys[0].section.findIndex((e) => e.bulk_code == "3C2A11984110");
      if (find_loss_hair_section > -1) {
        set_param.surveys[0].section.splice(find_loss_hair_section, 1);
      }
    }
  }

  if (
    survey_member_id == "rahuls" ||
    survey_member_id == "zdsa529" ||
    survey_member_id == "rahul"
  ) {
    // return;
  }
  is_survey_result = true;
  survey_jQuery.ajax({
    url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/product/${survey_product_no}/re_qna`,
    type: "POST",
    accept: "application/json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(set_param),
    dataType: "json",
    success: function (result) {
      sessionStorage.setItem("survey_re_qna_result", JSON.stringify(result));
      localStorage.setItem("survey_re_qna_result", JSON.stringify(result));

      if (
        survey_member_id == "rahuls" ||
        survey_member_id == "zdsa529" ||
        survey_member_id == "rahul"
      ) {
        return;
      }
      location.href =
        "/survey/more_result.html?product_no=" +
        survey_product_no +
        "&hash=" +
        survey_hash +
        "&qna_at=" +
        qna_at +
        "&re_qna_hash=" +
        result[0].hash;
    },
  });
}

function surveySearchFixBaseAmpoule(type) {
  let answer_ampoule_list = [];
  for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
    let children = survey.re_qna_hierarchy[j].children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].question_type == "main") {
        for (const answer of children[i].children) {
          answer_ampoule_list.push({
            hierarchy_id: answer.hierarchy_id,
            type: "ampoule",
            ampoule_max_ratio: answer.ampoule_max_ratio,
            bulk_code: answer.bulk_code,
            ampoule_ratio: 0,
          });
        }
      }
    }
  }

  let fix_base_list = [
    {
      type: "m_20_up",
      bulk_code_list: [
        "3C2A00001110",
        "3C2A00002110",
        "3C2A00003110",
        "3C2A11980110",
        "3C2A11984110",
      ],
    },
    {
      type: "w_20_up",
      bulk_code_list: [
        "3C2A00002110",
        "3C2A11980110",
        "3C2A00008110",
        "3C2A00006110",
        "3C2A11984110",
      ],
    },
    {
      type: "m_0_up",
      bulk_code_list: [
        "3C2A00002110",
        "3C2A00003110",
        "3C2A00004110",
        "3C2A11980110",
        "3C2A11984110",
      ],
    },
    {
      type: "w_0_up",
      bulk_code_list: [
        "3C2A00002110",
        "3C2A00004110",
        "3C2A11982110",
        "3C2A00007110",
        "3C2A11984110",
      ],
    },
    {
      type: "m_0_down",
      bulk_code_list: [
        "3C2A00002110",
        "3C2A00004110",
        "3C2A11981110",
        "3C2A11982110",
        "3C2A11984110",
      ],
    },
    {
      type: "w_0_down",
      bulk_code_list: [
        "3C2A00004110",
        "3C2A11981110",
        "3C2A00006110",
        "3C2A11982110",
        "3C2A11984110",
      ],
    },
  ];

  let return_array = [];
  for (const fix_base of fix_base_list) {
    if (fix_base.type == type) {
      for (const bulk_code of fix_base.bulk_code_list) {
        let find = answer_ampoule_list.find((e) => e.bulk_code == bulk_code);
        if (find) {
          return_array.push(find);
        }
      }
    }
  }

  // 이전 선택 앰플 체크
  let befor_select_ampoule = [];
  for (let j = 0; j < survey.qna_hierarchy.length; j++) {
    let children = survey.qna_hierarchy[j].children;
    for (let i = 0; i < children.length; i++) {
      if (
        children[i].question_type == "main" ||
        children[i].subject.indexOf("탈모 프리셋") > -1
      ) {
        for (const answer of children[i].children) {
          let find = re_survey.survey_bom_result.find((e) => e == answer.hierarchy_id);
          if (find && answer.bulk_code) {
            befor_select_ampoule.push(answer.bulk_code);
          }
        }
      }
    }
  }

  // 현재 선택된 앰플 이전 선택 앰플 비교
  for (let param of return_array) {
    let index = befor_select_ampoule.indexOf(param.bulk_code);
    // 없으면 2
    if (index == -1) {
      param.ampoule_ratio = 2;
    }
  }

  return return_array;
}

function surveyBaseChange(sections) {
  let base_score = 0;
  let ampoule_list = [];
  for (const sectio of sections) {
    if (sectio.type == "base") {
      base_score = sectio.score;
    }
  }
  let gender = null;
  if (survey_gender == "male") {
    gender = "m";
  } else {
    gender = "w";
  }

  /*
  if (is_befor_hair_loss == true) {
    let score = 0;
    for (const qna of survey.qna_hierarchy) {
      for (const question of qna.children) {
        for (const answer of question.children) {
          let find = re_survey.survey_bom_result.find((e) => e == answer.hierarchy_id);
          if (find) {
            score += answer.formula_score;
          }
        }
      }
    }
    // 전 문진에서 탈모 O
    // Sㄹ 다운이면 -2
    if (score == 15 && base_score == -1) {
      base_score = -2;
      // m_0_down, w_0_down
      let type = gender + "_0_down";
      ampoule_list = surveySearchFixBaseAmpoule(type);
    } else {
      if (score == 50) {
        let type = gender + "_20_up";
        ampoule_list = surveySearchFixBaseAmpoule(type);
      }
      if (score == 15) {
        let type = gender + "_0_up";
        ampoule_list = surveySearchFixBaseAmpoule(type);
      }
      if (score == -5) {
        let type = gender + "_0_down";
        ampoule_list = surveySearchFixBaseAmpoule(type);
      }
      base_score = 0;
    }
  } else {
    // 전 문진에서 탈모 X

    if (survey_befor_qna_result.point1.shampoo_keyword == "지성용 Lv3") {
      // m_20_up, w_20_up
      base_score = 0;
      let type = gender + "_20_up";
      ampoule_list = surveySearchFixBaseAmpoule(type);
    }
    if (survey_befor_qna_result.point1.shampoo_keyword == "지성용 Lv2") {
      base_score = 1;
      // m_20_up, w_20_up
      let type = gender + "_20_up";
      ampoule_list = surveySearchFixBaseAmpoule(type);
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "지성용 Lv1") {
      if (base_score == 1) {
        base_score = 2;
        // m_20_up, w_20_up
        let type = gender + "_20_up";
        ampoule_list = surveySearchFixBaseAmpoule(type);
      } else {
        base_score = -1;
        // m_0_up, w_0_up
        let type = gender + "_0_up";
        ampoule_list = surveySearchFixBaseAmpoule(type);
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "중성용 Lv2") {
      if (base_score == 1 || base_score == 0) {
        base_score = 0;
        // m_0_up, w_0_up
        let type = gender + "_0_up";
        ampoule_list = surveySearchFixBaseAmpoule(type);
      } else {
        base_score = -2;
        // m_0_down, w_0_down
        let type = gender + "_0_down";
        ampoule_list = surveySearchFixBaseAmpoule(type);
      }
    }

    // sㅁ 이고 업이면 업
    if (survey_befor_qna_result.point1.shampoo_keyword == "중성용 Lv1") {
      if (base_score == 1) {
        base_score = 1;
        // m_0_up, w_0_up
        let type = gender + "_0_up";
        ampoule_list = surveySearchFixBaseAmpoule(type);
      } else {
        base_score = -1;
        // m_0_down, w_0_down
        let type = gender + "_0_down";
        ampoule_list = surveySearchFixBaseAmpoule(type);
      }
    }

    // sㅂ 이면
    if (survey_befor_qna_result.point1.shampoo_keyword == "건성용 Lv1") {
      base_score = 0;
      // m_0_down, w_0_down
      let type = gender + "_0_down";
      ampoule_list = surveySearchFixBaseAmpoule(type);
    }
    // sㅅ 이면
    if (survey_befor_qna_result.point1.shampoo_keyword == "건성용 Lv2") {
      base_score = 1;
      // m_0_down, w_0_down
      let type = gender + "_0_down";
      ampoule_list = surveySearchFixBaseAmpoule(type);
    }
  }
  */

  let score = 0;
  for (const qna of survey.qna_hierarchy) {
    for (const question of qna.children) {
      for (const answer of question.children) {
        // 이전 문진 bom 결과의 hierarchy_id로 재문진의 답변을 찾아 score 더한다
        let find = re_survey.survey_bom_result.find((e) => e == answer.hierarchy_id);
        if (find) {
          score += answer.formula_score;
        }
      }
    }
  }
  if (is_befor_hair_loss == true) {
    /*
    if (score == 50) {
      if (base_score == -1) {
        base_score = -3;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      } else {
        base_score = 0;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      }
    }

    if (score == 15) {
      if (base_score == 1) {
        base_score = 3;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      }
      if (base_score == 0) {
        base_score = 0;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      }
      if (base_score == -1) {
        base_score = -2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
      }
    }

    if (score == -5) {
      if (base_score == 1) {
        base_score = 2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      } else {
        base_score = 0;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
      }
    }
    */

    if (survey_befor_qna_result.point1.shampoo_keyword == "지성용 Lv3") {
      if (base_score == -1) {
        base_score = -3;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      } else {
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "지성용 Lv2") {
      if (base_score == -1) {
        base_score = -2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      } else {
        base_score = 1;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "지성용 Lv1") {
      if (base_score == 1 || base_score == 0) {
        base_score = 2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      } else {
        base_score = -1;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "중성용 Lv2") {
      if (base_score == 1) {
        base_score = 3;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      }
      if (base_score == 0) {
        base_score = 0;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      }
      if (base_score == -1) {
        base_score = -2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "중성용 Lv1") {
      if (base_score == 1 || base_score == 0) {
        base_score = 1;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      }
      if (base_score == -1) {
        base_score = -1;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "건성용 Lv1") {
      if (base_score == 1) {
        base_score = 2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      } else {
        base_score = 0;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "건성용 Lv2") {
      base_score = 1;
      ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
    }
  } else {
    // 이전 문진에 탈모 선택 X

    if (survey_befor_qna_result.point1.shampoo_keyword == "지성용 Lv3") {
      if (base_score == -1) {
        base_score = -3;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      } else {
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "지성용 Lv2") {
      if (base_score == -1) {
        base_score = -2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      } else {
        base_score = 1;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "지성용 Lv1") {
      if (base_score == 1 || base_score == 0) {
        base_score = 2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      } else {
        base_score = -1;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "중성용 Lv2") {
      if (base_score == 1) {
        base_score = 3;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_20_up");
      }
      if (base_score == 0) {
        base_score = 0;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      }
      if (base_score == -1) {
        base_score = -2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "중성용 Lv1") {
      if (base_score == 1 || base_score == 0) {
        base_score = 1;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      }
      if (base_score == -1) {
        base_score = -1;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "건성용 Lv1") {
      if (base_score == 1) {
        base_score = 2;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_up");
      } else {
        base_score = 0;
        ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
      }
    }

    if (survey_befor_qna_result.point1.shampoo_keyword == "건성용 Lv2") {
      base_score = 1;
      ampoule_list = surveySearchFixBaseAmpoule(gender + "_0_down");
    }
  }

  return { base_score, ampoule_list };
}

function surveyBaseTreatmentChange(sections, history_hierarchy) {
  let is_no_silicone = false;
  for (let survey_hierarchy_id of history_hierarchy) {
    for (let j = 0; j < treatment_survey.re_qna_hierarchy.length; j++) {
      let children = treatment_survey.re_qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].question_type == "main") {
          for (const answer of children[i].children) {
            if (Number(survey_hierarchy_id) == Number(answer.hierarchy_id)) {
              if (answer.subject == "무실리콘") {
                is_no_silicone = true;
              }
            }
          }
        }
      }
    }
  }

  let base_score = 0;
  for (const section of sections) {
    if (section.type == "base") {
      base_score = section.score;
    }
  }
  if (is_no_silicone) {
    if (survey_befor_qna_result.point1.treatment_keyword == "약손상모용 Lv2") {
      if (base_score == -1) {
        base_score = -2;
      }
    }

    if (survey_befor_qna_result.point1.treatment_keyword == "손상모용 Lv1") {
      if (base_score == 0) {
        base_score = -1;
      }
    }

    if (survey_befor_qna_result.point1.treatment_keyword == "손상모용 Lv2") {
      if (base_score == 1) {
        base_score = 2;
      }
      if (base_score == -1) {
        base_score = 0;
      }
    }

    if (survey_befor_qna_result.point1.treatment_keyword == "극손상모용 Lv1") {
      if (base_score == 0) {
        base_score = 1;
      }
      if (base_score == -1) {
        base_score = 1;
      }
    }

    if (survey_befor_qna_result.point1.treatment_keyword == "극손상모용 Lv2") {
      if (base_score == 1) {
        base_score = 2;
      }
      if (base_score == 0) {
        base_score = 2;
      }
      if (base_score == -1) {
        base_score = 2;
      }
    }
  }
  for (let section of sections) {
    if (section.type == "base") {
      section.score = base_score;
    }
  }
  return sections;
}

function surveyQnaHierarchySum() {
  let hierarchy = [];
  let re_qna_hierarchy = survey.re_qna_hierarchy[0].children;
  let treatment_re_qna_hierarchy = treatment_survey.re_qna_hierarchy[0].children;

  for (let i = 0; i < re_qna_hierarchy.length; i++) {
    if (
      re_qna_hierarchy[i].question_type == "scent" ||
      re_qna_hierarchy[i].question_type == "nick_name"
    ) {
      if (re_qna_hierarchy[i].question_type == "scent") {
        survey_shampoo_scent_array = re_qna_hierarchy[i].children;
      }
      continue;
    }
    re_qna_hierarchy[i].is_treatment = false;
    hierarchy.push(re_qna_hierarchy[i]);
  }

  for (let i = 0; i < treatment_re_qna_hierarchy.length; i++) {
    treatment_re_qna_hierarchy[i].is_treatment = true;
    hierarchy.push(treatment_re_qna_hierarchy[i]);
  }
  survey.re_qna_hierarchy[0].children = [...hierarchy];
}

// 뒤로가기시 선택 내용 삭제
function deleteSurveyHiearchyId() {
  next_click_count = next_click_count - 1;
  if (next_click_count < 0) {
    next_click_count = 0;
  }
  survey_jQuery("#header .header").removeClass("slideUp");
  survey_jQuery("#header .header").addClass("slideDown");
  let answer_hierarchy_ids = [];
  let last_hierarchy_id = survey_history_hierarchy[survey_history_hierarchy.length - 1];
  // hierarchy_id 찾기
  let search_hierarchy_id = searchQuestionHierarchyId(last_hierarchy_id, "re_qna");
  // 질문의 답변 값 모두 삭제
  let survey_history_hierarchy_reverse = [...survey_history_hierarchy];
  survey_history_hierarchy_reverse = survey_history_hierarchy_reverse.reverse();
  let is_question_answer = true;
  for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
    let children = survey.re_qna_hierarchy[j].children;
    for (let i = 0; i < children.length; i++) {
      if (Number(children[i].hierarchy_id) == Number(search_hierarchy_id)) {
        let answer_list = children[i].children;
        for (let l = 0; l < answer_list.length; l++) {
          answer_hierarchy_ids.push(Number(answer_list[l].hierarchy_id));
          // 조건 분기 진행 체크 변경
          for (survey_process_question_index in survey_process_question_list) {
            if (!survey_process_question_list[Number(survey_process_question_index)]) {
              continue;
            }
            for (let survey_process_question of survey_process_question_list[Number(survey_process_question_index)].list) {
              if (
                Number(answer_list[l].hierarchy_id) ==
                Number(survey_process_question.select_answer_hierarchy_id)
              ) {
                survey_process_question_list[survey_process_question_index].checked = false;
              }
              if (survey_process_question_list[search_hierarchy_id]) {
                survey_process_question_list[search_hierarchy_id].checked = false;
              }
            }
          }
        }
      }
    }
  }

  let survey_history_hierarchy_reverse_array = [];
  let overlap_check = [];
  let input_hierarchy_ids = [];
  for (let jj = 0; jj < survey_history_hierarchy_reverse.length; jj++) {
    //
    if (overlap_check.indexOf(survey_history_hierarchy_reverse[jj]) == -1) {
      overlap_check.push(survey_history_hierarchy_reverse[jj]);
    } else {
      input_hierarchy_ids.push(Number(survey_history_hierarchy_reverse[jj]));
    }
    let find = answer_hierarchy_ids.findIndex((e) => e == survey_history_hierarchy_reverse[jj]);
    if (find < 0) {
      survey_history_hierarchy_reverse_array = survey_history_hierarchy_reverse.splice(
        jj,
        survey_history_hierarchy_reverse.length - jj
      );
    }
  }
  survey_history_hierarchy = [
    ...survey_history_hierarchy_reverse_array.reverse(),
    ...input_hierarchy_ids.reverse(),
  ];
  let index = survey_history_hierarchy.indexOf(Number(search_hierarchy_id));
  if (index > -1) {
    survey_history_hierarchy.splice(index, 1);
  }
  // 앰플 선택 상태 변경
  let ampoule_status_array_index = ampoule_status_array.findIndex(
    (e) => Number(e.hierarchy_id) == Number(search_hierarchy_id)
  );
  if (ampoule_status_array_index > -1) {
    ampoule_status_array[ampoule_status_array_index].status = false;
  }

  // 앰플 선택 다시 체크
  let re_last_hierarchy_id = survey_history_hierarchy[survey_history_hierarchy.length - 1];
  // hierarchy_id 찾기
  let re_search_hierarchy_id = searchQuestionHierarchyId(re_last_hierarchy_id, "re_qna");
  if (Number(re_search_hierarchy_id) == Number(search_hierarchy_id)) {
    for (const answer_hierarchy_id of answer_hierarchy_ids) {
      let _index = survey_history_hierarchy.findIndex(
        (e) => Number(e) == Number(answer_hierarchy_id)
      );
      if (_index > -1) {
        // survey_history_hierarchy.splice(_index, 1);
      }
    }
    //
  }

  // 엠플 진행 여부 삭제 start
  let is_survey_history_hierarchy = false;
  for (const answer_hierarchy_id of answer_hierarchy_ids) {
    let _index = survey_history_hierarchy.findIndex(
      (e) => Number(e) == Number(answer_hierarchy_id)
    );
    if (_index > -1) {
      is_survey_history_hierarchy = true;
    }
  }
  if (is_survey_history_hierarchy == false) {
    let ampoule_status_array_index = ampoule_status_array.findIndex(
      (e) => Number(e.hierarchy_id) == Number(search_hierarchy_id)
    );
    if (ampoule_status_array_index > -1) {
      ampoule_status_array.splice(ampoule_status_array_index, 1);
    }
  } else {
    // overlap_check
    for (const overlap_hierarchy_id of overlap_check) {
      let _index = survey_history_hierarchy.findIndex(
        (e) => Number(e) == Number(overlap_hierarchy_id)
      );
      if (_index == -1) {
        survey_history_hierarchy.push(Number(overlap_hierarchy_id));
      }
    }
  }
  // 엠플 진행 여부 삭제 end

  if (survey_history_hierarchy.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function getBeforResult() {
  let qna_at = shoplusGetParameters("qna_at");
  if (qna_at.indexOf("#progress") > -1) {
    qna_at = qna_at.replace("#progress", "");
  }
  if (qna_at.indexOf("#none") > -1) {
    qna_at = qna_at.replace("#none", "");
  }
  if (qna_at && qna_at.indexOf(".") > -1) {
    qna_at = qna_at.replace(/\./gi, '-');
  }
  qna_at = dayjs(qna_at).format("YYYY-MM-DD");

  let hash = shoplusGetParameters("hash");

  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis?hash=${hash}&member_id=${survey_member_id}&from=${qna_at}&to=${qna_at}`,
      type: "get",
      data: {},
      dataType: "json",
      success: async function (result) {
        /*
        for (let befor_qna of result) {
          if (befor_qna.hash == hash) {
            survey_befor_qna_result = { ...befor_qna, ...befor_qna.osdl_result };
            await delete survey_befor_qna_result.osdl_result;
            survey_gender = survey_befor_qna_result.gender;
            survey_product_nick_name = survey_befor_qna_result.manage_product_nick_name;
          }
        }
        */
        resolve(result);
      },
    });
  });
}

async function setBeforResult(result) {
  let hash = shoplusGetParameters("hash");
  let qna_at = shoplusGetParameters("qna_at");
  if (qna_at.indexOf("#progress") > -1) {
    qna_at = qna_at.replace("#progress", "");
  }
  if (qna_at.indexOf("#none") > -1) {
    qna_at = qna_at.replace("#none", "");
  }
  if (qna_at && qna_at.indexOf(".") > -1) {
    qna_at = qna_at.replace(/\./gi, '-');
  }
  qna_at = dayjs(qna_at).format("YYYY-MM-DD");
  for (let befor_qna of result) {
    if (befor_qna.hash == hash) {
      survey_befor_qna_result = { ...befor_qna, ...befor_qna.osdl_result };
      await delete survey_befor_qna_result.osdl_result;
      survey_gender = survey_befor_qna_result.gender;
      survey_product_nick_name = survey_befor_qna_result.manage_product_nick_name;
    }
    for (const diagnosis_product_id of befor_qna.product_id) {
      let keyword = await getSurveyMoreDiagnosisDetail(
        hash,
        qna_at,
        diagnosis_product_id
      );
      if (keyword) {
        if (keyword.type == "shampoo") {
          survey_befor_qna_result.point1.shampoo_keyword = keyword.text;
        }
        if (keyword.type == "treatment") {
          survey_befor_qna_result.point1.treatment_keyword = keyword.text;
        }
      }
    }
  }
}

async function getSurveyMoreDiagnosisDetail(hash, qna_at, product_id) {
  if (qna_at && qna_at.indexOf(".") > -1) {
    qna_at = qna_at.replace(/\./gi, '-');
  }
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

function setSurveyQuestionAnswerHistory(answer_hierarchy_id, max, type = null) {
  // type
  let question_hierarchy_id = searchQuestionHierarchyId(answer_hierarchy_id, "re_qna");

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
      if (type == "add") {
        let answer_list_index =
          survey_question_answer_history_hierarchy[index].answer_list.indexOf(answer_hierarchy_id);
        if (answer_list_index == -1) {
          survey_question_answer_history_hierarchy[index].answer_list.push(answer_hierarchy_id);
        }
      }
    }
  }
}

function surveyHistoryAutoSelectQuestion(hierarchy_id) {
  let question_hierarchy_id = searchQuestionHierarchyId(hierarchy_id, "re_qna");
  if (question_hierarchy_id && survey_question_answer_history_hierarchy) {
    for (const survey_question_answer of survey_question_answer_history_hierarchy) {
      if (Number(survey_question_answer.question_hierarchy_id) == Number(question_hierarchy_id)) {
        return true;
      }
    }
  }
  return false;
}

async function getSurveyBeforBom() {
  for (const bom_code of survey_befor_qna_result.bom_code) {
    let bom_info = await getSurveyBom(bom_code);
    if (bom_code.indexOf("CSP") > -1) {
      befor_bom_info.shampoo = bom_info;
    }
    if (bom_code.indexOf("CHT") > -1) {
      befor_bom_info.treatment = bom_info;
    }
    let scent = bom_info.find((e) => e.bulk_group_name == "향");
    if (scent) {
      survey_scent = {
        bulk_code: scent.composition.bulk_code,
        ratio: scent.composition.ratio,
      };
    }
  }
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

// 새로고침시 #progress 제거
history.replaceState({}, null, location.pathname + location.search);

// 뒤로 가기 시 이벤트
survey_jQuery(window).bind("hashchange", function () {
  // let is_next = false;
  // 선택한 답변이 있으면 삭제 한다
  if (survey_history_hierarchy.length > 0) {
    let hierarchy_id = survey_history_hierarchy[survey_history_hierarchy.length - 1];
    let search_subject = searchQuestionHierarchyName(hierarchy_id);
    let delete_result = deleteSurveyHiearchyId();
    if (delete_result) {
      // 기능 질문 상태 변경
      if (ampoule_status_array.length > 0) {
        //
        let _question_hierarchy_id = searchQuestionHierarchyId(
          survey_history_hierarchy[survey_history_hierarchy.length - 1],
          "re_qna"
        );
      }

      let question_hierarchy_id = searchQuestionHierarchyId(
        survey_history_hierarchy[survey_history_hierarchy.length - 1],
        "re_qna"
      );

      // 분기 처리 체크 초기화
      let next_question_hierarchy_id = surveyNextQuestionHierarchyId(question_hierarchy_id);
      let next_next_hierarchy_id = surveyNextQuestionHierarchyId(next_question_hierarchy_id);

      showSurveyQuestion(next_question_hierarchy_id, "back");
      history.pushState(null, null, location.search + "#progress");
    } else {
      // 첫 화면 노출
      showSurveyFirst();
      history.replaceState({}, null, location.pathname + location.search);
    }
  } else {
    location.href = document.referrer;
  }
});

function setBeforSelectAmpoule(re_survey, re_treatment_survey) {
  let shampoo_befor_select_array = [];
  let treatment_befor_select_array = [];
  let qna_hierarchy = null;
  if (re_survey.type == "qna") {
    qna_hierarchy = survey.qna_hierarchy;
    if (treatment_survey) {
      treatment_qna_hierarchy = treatment_survey.qna_hierarchy;
    }
  } else {
    qna_hierarchy = survey.re_qna_hierarchy;
    if (treatment_survey) {
      treatment_qna_hierarchy = treatment_survey.re_qna_hierarchy;
      if (survey_product_no == survey_treatment_no) {
        qna_hierarchy = treatment_survey.re_qna_hierarchy;
      }
    }
  }
  if (survey_product_no != survey_set_product_no) {
    for (let j = 0; j < qna_hierarchy.length; j++) {
      let children = qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].question_type == "main") {
          for (const answer of children[i].children) {
            let find = re_survey.survey_result.find((e) => e == answer.hierarchy_id);
            if (find) {
              if (Number(survey_product_no) == Number(survey_shampoo_no)) {
                shampoo_befor_select_array.push(answer.subject);
              } else {
                treatment_befor_select_array.push(answer.subject);
              }
            }
          }
        }
      }
    }
    survey_shampoo_befor_select_text = "";
    for (let i = 0; i < shampoo_befor_select_array.length; i++) {
      survey_shampoo_befor_select_text += "#" + shampoo_befor_select_array[i] + ",";
      if (i == 2 && shampoo_befor_select_array.length > 3) {
        survey_shampoo_befor_select_text += "<br>";
      }
    }

    survey_shampoo_befor_select_text = survey_shampoo_befor_select_text.slice(0, -1);
    for (let i = 0; i < treatment_befor_select_array.length; i++) {
      survey_treatment_befor_select_text += "#" + treatment_befor_select_array[i] + ",";
      if (i == 2 && treatment_befor_select_array.length > 3) {
        survey_treatment_befor_select_text += "<br>";
      }
    }
    survey_treatment_befor_select_text = survey_treatment_befor_select_text.slice(0, -1);
  } else {
    // 세트
    // 샴푸
    for (let j = 0; j < qna_hierarchy.length; j++) {
      let children = qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].question_type == "main") {
          for (const answer of children[i].children) {
            let find = re_survey.survey_result.find((e) => e == answer.hierarchy_id);
            if (find) {
              shampoo_befor_select_array.push(answer.subject);
            }
          }
        }
      }
    }
    survey_shampoo_befor_select_text = "";
    for (let i = 0; i < shampoo_befor_select_array.length; i++) {
      survey_shampoo_befor_select_text += "#" + shampoo_befor_select_array[i] + ",";
      if (i == 2 && shampoo_befor_select_array.length != i) {
        survey_shampoo_befor_select_text += "<br>";
      }
    }
    survey_shampoo_befor_select_text = survey_shampoo_befor_select_text.slice(0, -1);
    //
    // 트리트먼트
    for (let j = 0; j < treatment_qna_hierarchy.length; j++) {
      let children = treatment_qna_hierarchy[j].children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].question_type == "main") {
          for (const answer of children[i].children) {
            let find = re_treatment_survey.survey_result.find((e) => e == answer.hierarchy_id);
            if (find) {
              treatment_befor_select_array.push(answer.subject);
            }
          }
        }
      }
    }
    //
    for (let i = 0; i < treatment_befor_select_array.length; i++) {
      survey_treatment_befor_select_text += "#" + treatment_befor_select_array[i] + ",";
      if (i == 2 && treatment_befor_select_array.length != i) {
        survey_treatment_befor_select_text += "<br>";
      }
    }
    survey_treatment_befor_select_text = survey_treatment_befor_select_text.slice(0, -1);
  }
}

function clearInputProductName() {
  survey_jQuery("#survey_input_product_name").val(null);
  survey_jQuery("#survey_product_name").text("");

  survey_jQuery("#survey_product_name").text("#" + survey_product_nick_name);
  survey_jQuery("#survey_input_product_name").attr("placeholder", survey_product_nick_name);
}

async function surveyGetScent() {
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
      survey_scent_list = result;
    },
    error: function (e) {},
  });
}

function getAmpouleRatio(product_no) {
  let data = [];
  let infos = null;
  if (product_no == survey_shampoo_no) {
    infos = befor_bom_info.shampoo;
  }
  if (product_no == survey_treatment_no) {
    infos = befor_bom_info.treatment;
  }

  for (const info of infos) {
    if (info.bulk_group_name == "기능앰플") {
      data.push(info.composition);
    }
  }
  return data;
}

function surveySectionUpdate(product_no, params) {
  /*
    // 이전 문진 앰플 선택 내용
    let befor_shampoo_answer_list = [];
    let befor_treatment_answer_list = [];
    treatment_survey
  */
  // 샴푸 일때
  if (product_no == survey_shampoo_no) {
    let shampoo_answer_list = [];
    for (let survey_hierarchy_id of survey_history_hierarchy) {
      for (let j = 0; j < survey.re_qna_hierarchy.length; j++) {
        let children = survey.re_qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (children[i].question_type == "main") {
            for (const answer of children[i].children) {
              // 현재 선택한 앰플 체크
              if (Number(survey_hierarchy_id) == Number(answer.hierarchy_id)) {
                shampoo_answer_list.push({
                  subject: answer.subject,
                  bulk_code: answer.bulk_code,
                });
              }
            }
          }
        }
      }
    }

    // 이전 문진 bom 가져오기
    let ampoule_result = getAmpouleRatio(product_no);

    let is_reset = true;
    for (const answer of shampoo_answer_list) {
      let find_index = befor_shampoo_answer_list.findIndex((e) => e == answer.subject);
      if (find_index > -1) {
        is_reset = false;
      }
    }
    // 이전 선택한 엠플과 다르면 초기화
    if (is_reset === true) {
      let survey_hierarchy = [];
      let add_section = [];
      // 이전 문진이 qna 인지 re_qna인지 체크
      if (re_survey.type == "qna") {
        survey_hierarchy = survey.qna_hierarchy;
      } else {
        survey_hierarchy = survey.re_qna_hierarchy;
      }
      for (let j = 0; j < survey_hierarchy.length; j++) {
        let children = survey.qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (
            children[i].question_type == "main" ||
            children[i].subject.indexOf("탈모 프리셋") > -1
          ) {
            for (const answer of children[i].children) {
              let find_ampoule_result = ampoule_result.find((e) => e.bulk_code == answer.bulk_code);

              let find = befor_shampoo_answer_list.find((e) => e == answer.subject);
              if (find && find_ampoule_result) {
                // 이전 선택 엠플 함량 초기화
                add_section.push({
                  hierarchy_id: answer.hierarchy_id,
                  type: "ampoule",
                  bulk_code: answer.bulk_code,
                  // ampoule_ratio: 0,
                  ampoule_ratio: Number(find_ampoule_result.ratio) * -1,
                });

                if (answer.ampoule_max_ratio) {
                  add_section[add_section.length - 1].ampoule_max_ratio = answer.ampoule_max_ratio;
                }
              }
            }
          }
        }
      }
      // 현재 선택 엠플 함량 2 로 수정
      for (let section of params.section) {
        if (section.type == "ampoule") {
          let index = add_section.findIndex((e) => e.bulk_code == section.bulk_code);
          if (index < 0) {
            section.ampoule_ratio = 2;
          } else {
            section.ampoule_ratio = 0;
          }
        }
      }
      let return_data = [...params.section, ...add_section];
      params.section = return_data;
      return params;
    }

    // 이전 문진에 탈모 체크
    let is_befor_hair_loss = false;
    if (befor_shampoo_answer_list.indexOf("탈모증상완화") > -1 ||
    befor_shampoo_answer_list.indexOf("탈모 증상 완화") > -1) {
      is_befor_hair_loss = true;
    }

    // 지금 문진에 탈모 체크
    let is_hair_loss = false;
    let find_index = shampoo_answer_list.findIndex((e) => e.subject == "탈모증상완화" || e.subject == "탈모 증상 완화");
    if (find_index > -1) {
      is_hair_loss = true;
    }

    // 이전 문진, 현재 문진 탈모 체크가 다르면 초기화
    if (is_befor_hair_loss != is_hair_loss) {
      let add_section = [];
      if (re_survey.type == "qna") {
        survey_hierarchy = survey.qna_hierarchy;
      } else {
        survey_hierarchy = survey.re_qna_hierarchy;
      }
      for (let j = 0; j < survey_hierarchy.length; j++) {
        let children = survey_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (
            children[i].question_type == "main" ||
            children[i].subject.indexOf("탈모 프리셋") > -1
          ) {
            for (const answer of children[i].children) {
              let find = ampoule_result.find((e) => e.bulk_code == answer.bulk_code);

              let find_index = add_section.findIndex((e) => e.bulk_code == answer.bulk_code);
              if (find && find_index == -1) {
                // 이전 선택 엠플 함량 0 초기화
                add_section.push({
                  hierarchy_id: answer.hierarchy_id,
                  type: "ampoule",
                  bulk_code: answer.bulk_code,
                  ampoule_ratio: Number(find.ratio) * -1,
                });
                if (answer.ampoule_max_ratio) {
                  add_section[add_section.length - 1].ampoule_max_ratio = answer.ampoule_max_ratio;
                }
              }
            }
          }
        }
      }

      // 현재 선택 엠플 함량 2 로 수정
      for (let section of params.section) {
        if (section.type == "ampoule") {
          let index = add_section.findIndex((e) => e.bulk_code == section.bulk_code);
          if (index < 0) {
            section.ampoule_ratio = 2;
          } else {
            let find = ampoule_result.find((e) => e.bulk_code == section.bulk_code);
            section.ampoule_ratio = 2 - Number(find.ratio);
          }
        }
      }

      let return_data = [...params.section, ...add_section];
      params.section = return_data;
      return params;
    }
  }

  // 트리트먼트 일때
  if (product_no == survey_treatment_no) {
    let treatment_answer_list = [];
    for (let survey_hierarchy_id of survey_history_hierarchy) {
      for (let j = 0; j < treatment_survey.re_qna_hierarchy.length; j++) {
        let children = treatment_survey.re_qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (children[i].question_type == "main") {
            for (const answer of children[i].children) {
              // 현재 선택한 앰플 체크
              if (Number(survey_hierarchy_id) == Number(answer.hierarchy_id)) {
                treatment_answer_list.push({
                  subject: answer.subject,
                  bulk_code: answer.bulk_code,
                });
              }
            }
          }
        }
      }
    }

    // 이전 문진 bom 가져오기
    let ampoule_result = getAmpouleRatio(product_no);
    let is_reset = true;
    for (const answer of treatment_answer_list) {
      let find_index = befor_treatment_answer_list.findIndex((e) => e == answer.subject);
      if (find_index > -1) {
        is_reset = false;
      }
    }
    // 이전 선택한 엠플과 다르면 초기화
    if (is_reset === true) {
      let survey_hierarchy = [];
      let add_section = [];
      // 이전 문진이 qna 인지 re_qna인지 체크
      if (re_survey.type == "qna") {
        survey_hierarchy = treatment_survey.qna_hierarchy;
      } else {
        survey_hierarchy = treatment_survey.re_qna_hierarchy;
      }

      for (let j = 0; j < survey_hierarchy.length; j++) {
        let children = survey_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (
            children[i].question_type == "main" ||
            children[i].subject.indexOf("탈모 프리셋") > -1
          ) {
            for (const answer of children[i].children) {
              let find_ampoule_result = ampoule_result.find((e) => e.bulk_code == answer.bulk_code);
              let add_section_index = add_section.find((e) => e.bulk_code == answer.bulk_code);
              if (find_ampoule_result && !add_section_index) {
                // 이전 선택 엠플 함량 초기화
                add_section.push({
                  hierarchy_id: answer.hierarchy_id,
                  type: "ampoule",
                  bulk_code: answer.bulk_code,
                  // ampoule_ratio: 0,
                  ampoule_ratio: Number(find_ampoule_result.ratio) * -1,
                  is_add_section: true,
                });

                if (answer.ampoule_max_ratio) {
                  add_section[add_section.length - 1].ampoule_max_ratio = answer.ampoule_max_ratio;
                }
              }
            }
          }
        }
      }
      // 현재 선택 엠플 함량 2 로 수정
      for (let section of params.section) {
        if (section.type == "ampoule") {
          let index = add_section.findIndex((e) => e.bulk_code == section.bulk_code);
          if (index < 0) {
            section.ampoule_ratio = 2;
          } else {
            let find = ampoule_result.find((e) => e.bulk_code == section.bulk_code);
            section.ampoule_ratio = 2 - Number(find.ratio);
          }
        }
      }
      let return_data = [...params.section, ...add_section];
      params.section = return_data;
      return params;
    }
  }
  return params;
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

function setSurveyAnswerAmpoule(count, answer_hierarchy_id) {
  let li_list = survey_jQuery(`.select [class*="plus"] .control_bar${count} ol li`);
  for (const li of li_list) {
    let hierarchy_id = Number(survey_jQuery(li).attr("answer_children_hierarchy_id"));
    let index = survey_answer_ampoule_array.indexOf(hierarchy_id);
    if (index > -1) {
      survey_answer_ampoule_array.splice(index, 1);
    }
  }
  survey_answer_ampoule_array.push(answer_hierarchy_id);
}

function getSurveyAnswerAmpoule(answer_hierarchy_id) {
  let index = survey_answer_ampoule_array.indexOf(answer_hierarchy_id);
  if (index > -1) {
    return true;
  } else {
    return false;
  }
}

//
window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {

      // 새로고침 막기
      document.body.style.overscrollBehaviorY = 'none';

      setTimeout(async function () {
        await CAFE24API.getCustomerInfo(async function (err, res) {
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

        localStorage.setItem("survey_worry_selected", JSON.stringify([]));
        localStorage.setItem("survey_treatment_worry_selected", JSON.stringify([]));
        localStorage.setItem("survey_shampoo_worry_selected", JSON.stringify([]));

        // 설정 조회
        await getSurveyConfig();

        // 이전 문진 결과 조회
        let result = await getBeforResult();
        setBeforResult(result);

        // 이전 문진 bom 조회
        await getSurveyBeforBom();

        // 이전 문진 선택 내용 조회
        await getSurveyReQnaConfig();

        // 기존 포함되었던 기능들 > 이전 선택 엠플 text 노출
        await setBeforSelectAmpoule(re_survey, re_treatment_survey);

        // 히든된 화면 노출
        setTimeout(function () {
          if (Number(survey_set_product_no) == Number(survey_product_no)) {
            surveyQnaHierarchySum();
          }
          if (Number(survey_treatment_no) == Number(survey_product_no)) {
            let hierarchy = [];
            let treatment_re_qna_hierarchy = treatment_survey.re_qna_hierarchy[0].children;
            for (let i = 0; i < treatment_re_qna_hierarchy.length; i++) {
              treatment_re_qna_hierarchy[i].is_treatment = true;
              hierarchy.push(treatment_re_qna_hierarchy[i]);
            }
            survey.re_qna_hierarchy[0].children = [...hierarchy];
          }

          searchReQnaAutoSelect();

          if (survey) {
            // 분기 후 질문 정보 담기
            getSurveyProcessQuestion();

            // 첫 화면 노출
            showSurveyFirst();

            survey_jQuery("#survey_area").show();
            surveyGetScent();
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
