// 문진, 문진 결과, 재문진, 재문진 결과
class EssenceSurvey {
  product_no = null; // 상품 번호
  qna_hierarchy = []; // 문진 정보
  re_qna_hierarchy = []; // 재문진 정보
  process_question_list = []; // 질문별 분기 처리 내용
  process_where_list = []; // 분기 처리 내용
  qna_menu_list = []; // 메뉴 진행 바 리스트
  folder_sequence = 0;
  qna_sequence = 0;
  survey_history_hierarchy = []; // 답변 선택 내용
  survey_temp_history_hierarchy = []; // 선택 답변 입력 (자동 선택 용도) or 임시저장 조회 후 자동선택
  gender = "";
  birth = 0;
  product_name = "";
  intro = false;
  re_qna_menu_list = [];
  worry_select = {
    first: null,
    second: null,
  };
  worry_type_list = {
    dry: "보습",
    sensitive: "진정",
    wrinkle: "탄력",
    color: "색소",
    pore: "트러블·모공",
  };

  survey_qna_product_no = {
    cosmaxtest: 23,
    threewaau: 15
  };

  // 이전 문진 결과 정보
  parent_survey_result = null;

  // 배정 순서 정보
  ampoule_assign = null;

  // 케미컬 엠플 원료 유지 or 다음 순번 원료
  re_qna_worry_ampoule = {
    first_worry: null,
    second_worry: null,
  }

  // 자극과 트러블이 지속적으로 발생했어요 hierarchy_id
  re_qna_panthenol = {
    cosmaxtest: {
      question_hierarchy_id: 5140,
      answer_hierarchy_id: 5144
    },
    threewaau: {
      question_hierarchy_id: 3987,
      answer_hierarchy_id: 3991
    }
  };

  // 자극과 트러블이 지속적으로 발생했어요 선택 여부
  is_re_qna_panthenol = false;

  // 어떤 부분이 불편하셨어요? - 서술형 textarea 노출 hierarchy_id
  re_qna_text_content_textarea = {
    cosmaxtest: 5207, 
    threewaau: 4064
  };

  // 불편사항 서술형
  inconvenience_text = "";

  // 불편사항 서술형 textarea 높이
  inconvenience_text_height = "";

  // 피드백이나 개선 사항
  feed_back_memo = "";

  // 피드백이나 개선 사항 textarea 높이
  feed_back_memo_height = "";

  // 이전 문진 결과 > 고민 정보
  parent_worry_info = [];

  // 결과 전송 여부
  is_result_sned = false;

  // 고민 타입에 따른 벌크 코드
  worry_type_bulk_code_list = {
    cosmaxtest: {
      dry: "3WAU00014110",
      sensitive: "3WAU00014130",
      wrinkle: "3WAU00014110",
      color: "3WAU00014120",
      pore: "3WAU00014130",
    },
    threewaau: {
      dry: "3WAU00029110",
      sensitive: "3WAU00031110",
      wrinkle: "3WAU00029110",
      color: "3WAU00030110",
      pore: "3WAU00031110",
    }
  }

  // 아쿠아실앰플 벌크 코드
  aquasill_bulk_code = {
    cosmaxtest: "3WAU00010120",
    threewaau: "3WAU00016110",
  }

  // 베타인 벌크 코드
  betaine_bulk_code = {
    cosmaxtest: "3WAU00009110",
    threewaau: "3WAU00011110",
  }

  // 판테놀 벌크 코드
  panthenol_bulk_code = {
    cosmaxtest: "3WAU00010110",
    threewaau: "3WAU00015110",
  }

  constructor(product_no) {
    this.product_no = product_no;
  }

  // 문진 조회
  async getSurveyQna() {
    let self = this;

    let product_no = self.survey_qna_product_no[surveyCommon.survey_mall_id];
    let url = `/front/product/${product_no}`;
    await surveyCommon
      .getSurveyAjax(url)
      .then(function (res) {
        self.qna_hierarchy = res.qna_hierarchy;
        self.re_qna_hierarchy = res.re_qna_hierarchy;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // 메뉴 배열로 생성
  getMenuProgressHtml() {
    // 메뉴 진행 바 리스트 만들기
    let count = 1;
    for (const qna of this.qna_hierarchy) {
      if (qna.intro_status == "disabled") {
        this.qna_menu_list.push(count);
        count++;
      }
    }
  }

  // 메뉴 화면 노출
  setMenuProgressHtml() {
    let question_count = 0;
    let minus_count = 0;
    for (const qna of this.qna_hierarchy) {
      for (const question of qna.children) {
        question_count++;
        if (question.answer_type == "nick_name" || question.answer_type == "gender_age") {
          minus_count++;
        }
      }
    }

    question_count = question_count - minus_count;

    let now_qna_sequence = 0;
    let count = 1;
    for (const qna of this.qna_hierarchy) {
      for (const question of qna.children) {
        if (qna.sequence == this.folder_sequence && this.qna_sequence == question.sequence) {
          now_qna_sequence = count;
          break;
        }
        count++;
      }
    }

    let befor_qna_sequence = 0;
    if (now_qna_sequence > 1) {
      befor_qna_sequence = now_qna_sequence - 1;
    }

    let data_progress = (Number(now_qna_sequence) / question_count) * 100;
    let befor_data_progress = (Number(befor_qna_sequence) / question_count) * 100;

    let progress_html = `
      <div id="stepArea">
        <div class="step">
    `;
    for (const qna_menu of this.qna_menu_list) {
      progress_html += `<div>${qna_menu}</div>`;
    }
    progress_html += `
        <div class="percent percent-dummy percent_dummy"></div>
        <div class="percent percent-gradient"></div>
      </div>
    </div>
    <div class="progress-percent progress_percent_bar" data-start="${befor_data_progress}%" data-progress="${data_progress}%"></div>
    `;

    return progress_html;
  }

  getResetUse(answer_param) {
    let onclick = "essenceSurvey.answerCilck(this);";
    let reset_class = "";
    if (answer_param.answer_select_reset == "use") {
      reset_class = "survey_reset";
      onclick = "essenceSurvey.answerCilckReset(this);";
    }
    return {
      reset_class,
      onclick,
    };
  }

  setIdontKnowHtml(
    parent_hierarchy_id,
    hierarchy_id,
    subject,
    answer_type,
    is_auto_select = false
  ) {
    let onclick = "essenceSurvey.answerCilckReset(this);";
    if (answer_type == "height_slide_button") {
      onclick = "essenceSurvey.answerHeightSlideButtonCilckReset(this);";
    }
    let line_checked = "";
    if (is_auto_select) {
      line_checked = "line_checked checked";
    }
    let html = `
    <div
      question_hierarchy_id="${parent_hierarchy_id}"
      answer_hierarchy_id="${hierarchy_id}"
      class="dontKnow"
      answer_type="${answer_type}"
    >
      <a 
        href="javascript:void(0);" 
        class="idontKnow survey_reset ${line_checked}" 
        onClick="${onclick}"
        question_hierarchy_id="${parent_hierarchy_id}"
        answer_hierarchy_id="${hierarchy_id}"
        answer_type="${answer_type}"
        >${subject}</a>
    </div>
    `;
    return html;
  }

  // 문진 화면 노출
  setQnaHtml(params) {
    survey_jQuery("#survey_area").hide();
    survey_jQuery("#survey_area").removeClass("active");
    if (params?.intro_status == "enabled") {
      // 인트로 체크
      this.setQnaIntroHtml(params);
    } else {
      // 일반 문진 체크
      if (location.href.indexOf("#progress") == -1) {
        history.pushState(null, null, location.search);
        history.pushState(null, null, location.search + "#progress");
      }
      this.setQnaQuestionHtml(params);
    }
    let height = survey_jQuery('body').height();
    survey_jQuery('#container').css({'min-height':height});

    // 프로그래스바 입력
    let progress_percent_end = survey_jQuery(".progress_percent_bar").data("progress");
    survey_jQuery(".percent_dummy").addClass("active");
    survey_jQuery(".percent_dummy").css("left", progress_percent_end);

    setTimeout(function () {
      survey_jQuery("#survey_area").show();
      survey_jQuery("#survey_area").addClass("active");
    }, 800);
  }

  // 선택 답변 체크
  selectAnswerCheck(e) {
    // 인트로 인경우
    if (survey_jQuery(e).hasClass("surveyIntro")) {
      let is_checked = survey_jQuery(".surveyAgree").is(":checked");
      if (is_checked === false) {
        alert("민감정보수집 및 이용동의를 체크해주세요.");
        return false;
      }
    }
    let answer_type = survey_jQuery(e).attr("answer_type");
    let question_type = survey_jQuery(e).attr("question_type");
    // 성별일 경우
    if (answer_type && answer_type == "gender_age") {
      if (survey_jQuery(".select ul li.line_checked").length == 0) {
        alert("성별을 선택해주세요.");
        return false;
      }
      let birth = survey_jQuery("#survey_birth").val();
      if (!birth) {
        alert("출생연도를 선택해주세요.");
        return false;
      }
      return true;
    }

    // 닉네임 경우
    if (question_type && question_type == "nick_name") {
      const survey_input_product_name = survey_jQuery("#survey_input_product_name").val();
      if (!survey_input_product_name) {
        this.product_name = survey_jQuery("#survey_input_product_name").attr("placeholder");
      }
      return true;
    }

    let min = Number(survey_jQuery(e).attr("min"));
    let max = Number(survey_jQuery(e).attr("max"));
    let select_answer_count = survey_jQuery(".line_checked").length;

    if (select_answer_count > max) {
      alert("최대 " + max + "개까지 선택할 수 있어요.");
      return false;
    }
    if (select_answer_count < min) {
      if (answer_type == "image_answer_select") {
        alert("신경쓰이는 피부고민\n" + max + "개를 모두 선택해주세요.");
        return false;
      } else {
        alert("해당되는 항목을 선택해주세요.\n최대 " + max + "개까지 선택할 수 있어요.");
        return false;
      }
    }

    return true;
  }
  // 재문진 선택 답변 체크
  selectReQnaAnswerCheck(e) {
    let answer_type = survey_jQuery(e).attr("answer_type");
    let question_type = survey_jQuery(e).attr("question_type");
    // 성별일 경우
    if (answer_type && answer_type == "gender_age") {
      if (survey_jQuery(".select ul li.line_checked").length == 0) {
        alert("성별을 선택해주세요.");
        return false;
      }
      let birth = survey_jQuery("#survey_birth").val();
      if (!birth) {
        alert("출생연도를 선택해주세요.");
        return false;
      }
      return true;
    }

    // 닉네임 경우
    if (question_type && question_type == "nick_name") {
      const survey_input_product_name = survey_jQuery("#survey_input_product_name").val();
      if (!survey_input_product_name) {
        this.product_name = survey_jQuery("#survey_input_product_name").attr("placeholder");
      }
      return true;
    }

    let min = Number(survey_jQuery(e).attr("min"));
    let max = Number(survey_jQuery(e).attr("max"));
    let select_answer_count = survey_jQuery(".line_checked").length;

    if (select_answer_count > max) {
      alert("최대 " + max + "개까지 선택할 수 있어요.");
      return false;
    }
    if (select_answer_count < min) {
      alert("해당되는 항목을 선택해주세요.\n최대 " + max + "개까지 선택할 수 있어요.");
      return false;
    }

    return true;
  }
  // 선택 답변 입력
  inputAnswerHierarchyId() {
    let select_answer = survey_jQuery(".line_checked");
    for (let i = 0; i < select_answer.length; i++) {
      let hierarchy_id = survey_jQuery(select_answer[i]).attr("answer_hierarchy_id");
      if (hierarchy_id) {
        this.survey_history_hierarchy.push(Number(hierarchy_id));
      }
    }
  }
  // 재문진 선택 답변 입력
  inputReQnaAnswerHierarchyId(e) {
    let select_answer = survey_jQuery(".line_checked");
    let question_type = survey_jQuery(e).attr("question_type");
    if (question_type == "worry") {
        this.re_qna_worry_ampoule = {
          first_worry: survey_jQuery(select_answer[0]).attr("score"),
          second_worry: survey_jQuery(select_answer[1]).attr("score"),
        }
    }
    if (question_type && question_type == "worry_select") {
      this.worry_select.first = survey_jQuery(select_answer[0]).attr("type");
      this.worry_select.second = survey_jQuery(select_answer[1]).attr("type");
    }
    for (let i = 0; i < select_answer.length; i++) {
      let hierarchy_id = survey_jQuery(select_answer[i]).attr("answer_hierarchy_id");
      if (hierarchy_id) {
        let find_index = this.survey_history_hierarchy.findIndex(
          (e) => Number(e) == Number(hierarchy_id)
        );
        if (find_index < 0) {
          this.survey_history_hierarchy.push(Number(hierarchy_id));
        }
      }
    }

    let question_hierarchy_id = survey_jQuery(e).attr("question_hierarchy_id");
    if (question_hierarchy_id) {
      let find_index = this.survey_history_hierarchy.findIndex(
        (e) => Number(e) == Number(question_hierarchy_id)
      );
      if (find_index < 0) {
        this.survey_history_hierarchy.push(Number(question_hierarchy_id));
      }
    }

    // 자극과 트러블이 지속적으로 발생했어요 선택 여부 체크
    let is_panthenol_question = false;
    for (let j = 0; j < select_answer.length; j++) {
      let answer_type = survey_jQuery(select_answer[j]).attr("answer_type");
      let hierarchy_id = survey_jQuery(select_answer[j]).attr("answer_hierarchy_id");
      if (answer_type == "text_content" && Number(question_hierarchy_id) == Number(this.re_qna_panthenol[surveyCommon.survey_mall_id].question_hierarchy_id)) {
        is_panthenol_question = true;
        if (this.re_qna_panthenol[surveyCommon.survey_mall_id].answer_hierarchy_id == Number(hierarchy_id)) {
          this.is_re_qna_panthenol = true;
        }
      }
    }
    if (is_panthenol_question == true) {
      this.is_re_qna_panthenol = false;
      for (let l = 0; l < select_answer.length; l++) {
        let hierarchy_id = survey_jQuery(select_answer[l]).attr("answer_hierarchy_id");
        if (this.re_qna_panthenol[surveyCommon.survey_mall_id].answer_hierarchy_id == Number(hierarchy_id)) {
          this.is_re_qna_panthenol = true;
        }
      }
    }
  }
  // 선택 답변 입력 (자동 선택 용도) or 임시저장 조회 후 자동선택
  inputAnswerTempHierarchyId() {
    let select_answer = survey_jQuery(".line_checked");
    
    // 기존 등록된 답변 hierarchy_id 삭제
    let answer_hierarchy_id = survey_jQuery(select_answer[0]).attr("answer_hierarchy_id");
    if (answer_hierarchy_id) {
      let question_info = this.searchQuestionHierarchyInfo(Number(answer_hierarchy_id));
      if (question_info) {
        for (const children of question_info.children) {
          this.removeAnswerTempHierarchyId(Number(children.hierarchy_id));
        }
        this.removeAnswerTempHierarchyId(Number(question_info.hierarchy_id));
      }
    }

    
    // 답변 hierarchy_id 등록
    for (let i = 0; i < select_answer.length; i++) {
      let hierarchy_id = survey_jQuery(select_answer[i]).attr("answer_hierarchy_id");
      if (hierarchy_id) {
        let find_index = this.survey_temp_history_hierarchy.findIndex(
          (e) => e == Number(hierarchy_id)
        );
        if (find_index < 0) {
          this.survey_temp_history_hierarchy.push(Number(hierarchy_id));
        }
      }
    }
  }

  inputReQnaAnswerTempHierarchyId() {
    let select_answer = survey_jQuery(".line_checked");
    
    // 기존 등록된 답변 hierarchy_id 삭제
    let answer_hierarchy_id = survey_jQuery(select_answer[0]).attr("answer_hierarchy_id");
    if (answer_hierarchy_id) {
      let question_info = this.searchReQuestionHierarchyInfo(Number(answer_hierarchy_id));
      if (question_info) {
        for (const children of question_info.children) {
          this.removeAnswerTempHierarchyId(Number(children.hierarchy_id));
        }
        this.removeAnswerTempHierarchyId(Number(question_info.hierarchy_id));
      }
    }

    
    // 답변 hierarchy_id 등록
    for (let i = 0; i < select_answer.length; i++) {
      let hierarchy_id = survey_jQuery(select_answer[i]).attr("answer_hierarchy_id");
      if (hierarchy_id) {
        let find_index = this.survey_temp_history_hierarchy.findIndex(
          (e) => e == Number(hierarchy_id)
        );
        if (find_index < 0) {
          this.survey_temp_history_hierarchy.push(Number(hierarchy_id));
        }
      }
    }
  }

  // 인트로 화면 노출
  setQnaIntroHtml(params) {
    survey_jQuery("#survey_area").empty();
    survey_jQuery("#survey_area").html(params.intro_html);
    survey_jQuery("#survey_area").show();
    if (surveyCommon.survey_is_moile_device === false) {
      survey_jQuery("#survey_pc_intro").show();
    } else {
      survey_jQuery("#survey_mobile_intro").show();
    }
    // 나만의 맞춤 에센스 만들기에 함수 입력
    survey_jQuery(".surveyIntro").attr(
      "onclick",
      `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`
    );
  }

  // 질문/답변 화면 노출
  setQnaQuestionHtml(params) {
    let html = this.getQuestionHtml(params.question_type, params.answer_type, params);
    survey_jQuery("#survey_area").empty();
    survey_jQuery("#survey_area").html(html);
    survey_jQuery("#survey_area").show();
    if (
      params.answer_type == "width_slide_both_side_image" ||
      params.answer_type == "width_slide_text" ||
      params.answer_type == "width_slide_image" ||
      params.answer_type == "width_slide_select"
    ) {
      this.draggableWidthSlideScript();
    }

    // 잘모르겠어요 클릭 시 슬라이드 선택 미노출 스크립트
    if (params.answer_type?.indexOf("width_slide") > -1) {
      this.draggableWidthSlideDontKnowScript();
    }

    this.setAutoSelect(params.answer_type);

    let progress_percent_start = survey_jQuery(".progress_percent_bar").data("start");
    survey_jQuery(".percent_dummy").css("left", progress_percent_start);
  }

  // 질문 타입별 화면 그리기
  getQuestionHtml(question_type, answer_type, params) {
    // 텍스트 (제목+내용)
    if (answer_type == "text_subject_content") {
      return this.getAnswerTypeTextSubjectContent(params);
    }
    // 이미지 (답변 선택 노출)
    if (answer_type == "image_answer_select") {
      return this.getAnswerTypeImageAnswerSelect(params);
    }
    // 가로슬라이드 (좌/우 이미지 노출형)
    if (answer_type == "width_slide_both_side_image") {
      return this.getAnswerTypeWidthSlideBothSideImage(params);
    }

    // 가로슬라이드 (라디오 버튼형)
    if (answer_type == "width_slide_radio") {
      return this.getAnswerTypeWidthSlideRadio(params);
    }

    // 이미지 (우측 썸네일형)
    if (answer_type == "image_right_thumb") {
      return this.getAnswerTypeImageRightThumb(params);
    }

    // 가로슬라이드 (텍스트형)
    if (answer_type == "width_slide_text") {
      return this.getAnswerTypeWidthSlideText(params);
    }
    // 가로슬라이드 (아이콘 선택형) width_slide_icon_select
    if (answer_type == "width_slide_icon_select") {
      return this.getAnswerTypeWidthSlideIconSelect(params);
    }

    // 세로슬라이드 (버튼형)
    if (answer_type == "height_slide_button") {
      return this.getAnswerTypeHeightSlideImage(params);
    }

    // 가로슬라이드 (선택형)
    if (answer_type == "width_slide_image") {
      return this.getAnswerTypeWidthSlideImage(params);
    }

    // 텍스트 (내용)
    if (answer_type == "text_content") {
      return this.getAnswerTypeTextContentt(params);
    }

    // 가로슬라이드 (선택형)
    if (answer_type == "width_slide_select") {
      return this.getAnswerTypeWidthSlideSelect(params);
    }

    // 성별/나이
    if (answer_type == "gender_age") {
      return this.getAnswerTypeGenderAge(params);
    }

    // 닉네임
    if (answer_type == "nick_name") {
      return this.getAnswerTypeNickName(params);
    }
  }

  getToolTipHtml(tooltip) {
    if (tooltip?.status == "enabled") {
      return tooltip.content;
    } else {
      return "";
    }
  }

  // befor progress html

  // afrer progress html

  // 베이스 질문 HTML
  getAnswerTypeTextSubjectContent(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }
    let answer_html = "";
    let dont_know_html = "";
    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select = this.getAutoSelect(Number(answer.hierarchy_id), params.answer_type);
      if (is_auto_select) {
        reset_class += " line_checked";
      }

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select
        );
        continue;
      }

      answer_html += `
        <li
          question_hierarchy_id="${params.hierarchy_id}" 
          answer_hierarchy_id="${answer.hierarchy_id}"
          answer_type="${params.answer_type}"
          min="${params.select_count.min}" 
          max="${params.select_count.max}"
          onClick="${onclick}"
          class="${reset_class}"
        >
          <span class="item">${surveyCommon.surveyEnter(answer.subject)}</span>
          <span class="ipCon">${surveyCommon.surveyEnter(answer.answer_description)}</span>
        </li>
      `;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    return `
      ${menu_progress}
      <div class="contentBox">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select">
            <ul class="row gFlex2">
              ${answer_html}
            </ul>
          </div>
          ${dont_know_html}
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a 
          href="javascript:void(0);" 
          class="btnNext" 
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
  }
  getAnswerTypeImageAnswerSelect(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let answer_html = "";
    let dont_know_html = "";
    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select = this.getAutoSelect(Number(answer.hierarchy_id), params.answer_type);
      if (is_auto_select) {
        reset_class += " line_checked";
      }

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select
        );
        continue;
      }

      answer_html += `
      <span 
        class="tag ${reset_class}"
        question_hierarchy_id="${params.hierarchy_id}"
        answer_hierarchy_id="${answer.hierarchy_id}"
        answer_type="${params.answer_type}"
        min="${params.select_count.min}" 
        max="${params.select_count.max}"
        image="${answer.image}"
        onClick="${onclick}"
        class="${reset_class}"
      >
        ${surveyCommon.surveyEnter(answer.subject)}
      </span>
      `;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select wide">
            <div class="multiSelect">
              <div class="photoSelected">
                <div class="pThumb">
                  <div class="img">
                    <span 
                      class="photoDel displaynone" onclick="essenceSurvey.answerDeleteImageCilck(this);"
                    ></span>
                    <img src="" />
                  </div>
                  <span class="cau">피부 고민을<br/>골라 주세요</span>
                </div>
                <div class="pThumb">
                  <div class="img">
                    <span class="photoDel displaynone" onclick="essenceSurvey.answerDeleteImageCilck(this);"></span>
                    <img src="" />
                  </div>
                  <span class="cau">피부 고민을<br/>골라 주세요</span>
                </div>
                <div class="pThumb">
                  <div class="img">
                    <span class="photoDel displaynone" onclick="essenceSurvey.answerDeleteImageCilck(this);"></span>
                    <img src="" />
                  </div>
                  <span class="cau">피부 고민을<br/>골라 주세요</span>
                </div>
              </div>
              <div class="keywordBox">
                ${answer_html}
              </div>
            </div>
          </div>
          ${dont_know_html}
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a 
          href="javascript:void(0);" 
          class="btnNext" 
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
          answer_type="${params.answer_type}"
        >다음</a>
      </div>
    `;
  }
  getReQnaAnswerTypeImageAnswerSelect(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let answer_html = "";
    let dont_know_html = "";
    let count = 0;
    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select = this.getAutoSelect(Number(answer.hierarchy_id), params.answer_type);
      if (is_auto_select) {
        reset_class += " line_checked";
      }

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select
        );
        continue;
      }

      if (
        answer.worry_type != this.worry_select.first &&
        answer.worry_type != this.worry_select.second
      ) {
        continue;
      }

      answer_html += `
      <span 
        class="tag ${reset_class}"
        question_hierarchy_id="${params.hierarchy_id}"
        answer_hierarchy_id="${answer.hierarchy_id}"
        answer_type="${params.answer_type}"
        min="${params.select_count.min}" 
        max="${params.select_count.max}"
        image="${answer.image}"
        onClick="${onclick}"
        class="${reset_class}"
      >
        ${surveyCommon.surveyEnter(answer.subject)}
      </span>
      `;
      count++;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }

    params.subject = params.subject.replace(
      "{#worry1}",
      `<strong>${this.worry_type_list[this.worry_select.first]}</strong>`
    );
    params.subject = params.subject.replace(
      "{#worry2}",
      `<strong>${this.worry_type_list[this.worry_select.second]}</strong>`
    );
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox re_pre">
        <div class="inner">
          <div class="txt subDesc">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
            <p>${surveyCommon.surveyEnter(params.question_description)}</p>
          </div>
          <div class="select wide">
            <div class="multiSelect">
              <div class="photoSelected">
                <div class="pThumb">
                  <div class="img">
                    <span 
                      class="photoDel displaynone" onclick="essenceSurvey.answerDeleteImageCilck(this);"
                    ></span>
                    <img src="" />
                  </div>
                  <span class="cau">피부 고민을<br/>골라 주세요</span>
                </div>
                <div class="pThumb">
                  <div class="img">
                    <span class="photoDel displaynone" onclick="essenceSurvey.answerDeleteImageCilck(this);"></span>
                    <img src="" />
                  </div>
                  <span class="cau">피부 고민을<br/>골라 주세요</span>
                </div>
                <div class="pThumb">
                  <div class="img">
                    <span class="photoDel displaynone" onclick="essenceSurvey.answerDeleteImageCilck(this);"></span>
                    <img src="" />
                  </div>
                  <span class="cau">피부 고민을<br/>골라 주세요</span>
                </div>
              </div>
              <div class="keywordBox">
                ${answer_html}
              </div>
            </div>
            ${dont_know_html}
          </div>
          ${this.getToolTipHtml(params.tooltip)}
        </div>
        <div class="dBtn gColumn gFixed">
          <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
          <a 
            href="javascript:void(0);" 
            class="btnNext" 
            onclick="${next_button_onclick}"
            min="${params.select_count.min}"
            max="${params.select_count.max}"
          >다음</a>
        </div>
      </div>
    `;
  }
  getAnswerTypeWidthSlideBothSideImage(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let answer_html = "";
    let answer_slide_html = "";
    let dont_know_html = "";
    let count = 0;
    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }
    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        reset_class += " line_checked";
      }

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select_result
        );
        continue;
      }

      let checked = "";
      if (count == 1 && is_auto_select == false) {
        checked = "checked line_checked";
      }
      answer_html += `
      <span 
        question_hierarchy_id="${params.hierarchy_id}"
        answer_hierarchy_id="${answer.hierarchy_id}"
        answer_type="${params.answer_type}"
        min="${params.select_count.min}" 
        max="${params.select_count.max}"
        onClick="${onclick}"
        class="${checked} ${reset_class}"
      >
        ${surveyCommon.surveyEnter(answer.subject)}
      </span>
      `;

      answer_slide_html += `
        <div 
          class="swiper-slide"
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          answer_type="${params.answer_type}"
          min="${params.select_count.min}" 
          max="${params.select_count.max}"
          onClick="essenceSurvey.answerCilck(this);"
        ></div>
      `;
      count++;
    }
    let ty01_class = "";
    let answer_length_class = "fourth";
    if (count > 4) {
      ty01_class = "ty01";
      answer_length_class = "fifth";
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select wide">
            <div class="controlSlide horizen ${ty01_class}">
              <div class="slide-draggable">
                <div class="swiper-wrapper">
                  <!-- 아래 선택메뉴 개수에 맞춰서 유지 -->
                  ${answer_slide_html}
                </div>
              </div>
              <div class="control_bar">
                <p class="swipeTitle">
                  ${answer_html}
                </p>
                <div class="statsPhoto ${answer_length_class}">
                  <div class="img dirLess">
                    <img src="${params.first_answer_image}" />
                    <p>${params.first_answer_text}</p>
                  </div>
                  <div class="img dirMore">
                    <img src="${params.last_answer_image}" />
                    <p>${params.last_answer_text}</p>
                  </div>
                </div>
                <div class="bar">
                  <div class="inBar"></div>
                </div>
              </div>
            </div>
          </div>
          ${dont_know_html}
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a 
          href="javascript:void(0);" 
          class="btnNext"
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
  }
  // 원형 선택
  getAnswerTypeWidthSlideRadio(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let count = 0;
    let answer_html = "";
    let button_html = "";

    // 자동 선택 가능 여부 체크
    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }

    for (let answer of params.children) {
      let active = "";
      if (count == 0 && is_auto_select == false) {
        active = "active";
      }

      if (is_auto_select) {
        let is_auto_select_result = this.getAutoSelect(
          Number(answer.hierarchy_id),
          params.answer_type
        );
        if (is_auto_select_result) {
          active = " active";
        }
      }

      answer_html += `
        <span
          id="ty${count}"
          class="${active}"
        >
          ${surveyCommon.surveyEnter(answer.subject)}
        </span>
      `;

      let button_class = "btnMid";
      if (count == 0 || params.children.length == count + 1) {
        button_class = "btnMost";
        if (count == 0 && is_auto_select == false) {
          button_class += " line_checked";
        }
      }

      if (count == 2) {
        button_class = "btnMin";
      }
      if (active) {
        button_class += " line_checked";
      }

      button_html += `
        <button 
          class="${button_class}" 
          id="solve${count}"
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          answer_type="${params.answer_type}"
          min="${params.select_count.min}" 
          max="${params.select_count.max}"
          sequence="${answer.sequence}"
          onClick="essenceSurvey.answerCilck(this);"
        ></button>
      `;
      count++;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select wide">
            <div class="tyLessMore">
              <div class="tyInner">
                <p class="tyTitle">
                  ${answer_html}
                </p>
                <div class="itemVote">
                  <span class="itemTxt">건성</span>
                  ${button_html}
                  <span class="itemTxt">지성</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a
          href="javascript:void(0);" 
          class="btnNext"
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
  }
  // 텍스트 + 이미지
  getAnswerTypeImageRightThumb(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let count = 1;
    let answer_html = "";
    let dont_know_html = "";
    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select = this.getAutoSelect(Number(answer.hierarchy_id), params.answer_type);
      if (is_auto_select) {
        reset_class += " line_checked";
      }

      let answer_description = surveyCommon.surveyEnter(answer.answer_description)
        ? surveyCommon.surveyEnter(answer.answer_description)
        : "";

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select
        );
        continue;
      }
      answer_html += `
        <li
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          answer_type="${params.answer_type}"
          min="${params.select_count.min}" 
          max="${params.select_count.max}"
          sequence="${answer.sequence}"
          onClick="${onclick};"
          class="${reset_class}"
        >
          <div class="itemTy01">
            <p class="itemTxt">${surveyCommon.surveyEnter(answer.subject)}</p>
            <span>${answer_description}</span>
          </div>
          <span class="thumb"><img src="${answer.image}" /></span>
        </li>
      `;

      count++;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select">
            <ul class="multi">
              ${answer_html}
            </ul>
            ${dont_know_html}
          </div>
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a
          href="javascript:void(0);" 
          class="btnNext"
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
  }

  // 가로슬라이드 (텍스트형)
  getAnswerTypeWidthSlideText(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let answer_html = "";
    let answer_slide_html = "";
    let dont_know_html = "";
    let count = 0;
    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }
    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        reset_class += " line_checked";
      }

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select_result
        );
        continue;
      }
      let checked = "";
      if (count == 1 && is_auto_select == false) {
        checked = "checked line_checked";
      }
      answer_html += `
        <span
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          class="${reset_class} ${checked}"
          onClick="${onclick}"
        >
          ${surveyCommon.surveyEnter(answer.subject)}
        </span>
      `;

      answer_slide_html += `
        <div class="swiper-slide"></div>
      `;
      count++;
    }

    let ty01_class = "";
    let side_class = "fourth";
    if (count > 4) {
      ty01_class = "ty01";
      side_class = "fifth";
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox">
        <div class="inner">
          <div class="txt">
            <h3>
              ${surveyCommon.surveyEnter(params.subject)}
            </h3>
          </div>
          <div class="select wide">
            <div class="controlSlide horizen ${ty01_class}">
              <div class="slide-draggable">
                <div class="swiper-wrapper">
                  <!-- 아래 선택메뉴 개수에 맞춰서 유지 -->
                  ${answer_slide_html}
                </div>
              </div>
              <div class="control_bar">
                <p class="swipeTitle marSet">
                ${answer_html}
                </p>
                <div class="bar">
                  <div class="inBar"></div>
                </div>
                <div class="statsTxt ${side_class}">
                  <div class="word dirLess">${params.first_answer_text}</div>
                  <div class="word dirMore">${params.last_answer_text}</div>
                </div>
              </div>
            </div>
          </div>
          ${dont_know_html}
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a
          href="javascript:void(0);" 
          class="btnNext"
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
  }

  // 이미지
  getAnswerTypeWidthSlideIconSelect(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let count = 0;
    let answer_html = "";
    let answer_image_html = "";
    let dont_know_html = "";

    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }
    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = "essenceSurvey.answerIconCilck(this);";

      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select_result
        );
        continue;
      }
      let active_class = "";
      let line_checked_class = "";
      if (count == 0 && is_auto_select == false) {
        active_class = "active";
        line_checked_class = "line_checked";
      }

      if (is_auto_select_result) {
        active_class = "active";
        line_checked_class = "line_checked";
      }

      answer_html += `
        <span 
          id="ty${count}"
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          class="${reset_class} ${active_class}"
        >
          ${surveyCommon.surveyEnter(answer.subject)}
        </span>
      `;

      answer_image_html += `
        <span 
          id="rate${count}"
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          class="${reset_class} ${line_checked_class}"
          onClick="${onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >
          <img src="/web/survey/ico_satisfy0${count + 1}.svg" />
        </span>`;
      count++;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select wide">
            <div class="satisfySec">
              <p class="tyTitle">
                ${answer_html}
              </p>
              <div class="selRate">
                ${answer_image_html}
              </div>
            </div>
          </div>
          ${dont_know_html}
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a
          href="javascript:void(0);" 
          class="btnNext"
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
  }

  // 세로슬라이드 (버튼형)
  getAnswerTypeHeightSlideImage(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let count = 1;
    let answer_html = "";
    let answer_base_image_html = "";
    let answer_image_html = "";
    let dont_know_html = "";

    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }

    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select_result
        );
        answer_base_image_html += `<span id="partImg0" class="checked"><img src="${answer.image}" /></span>`;
        continue;
      }

      let checked = "";
      if (is_auto_select_result) {
        checked = "line_checked";
      }
      answer_html += `
        <span 
          id="part${count}"
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          answer_type="${params.answer_type}"
          class="${reset_class} ${checked}"
          onClick="${onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >
          ${surveyCommon.surveyEnter(answer.subject)}
        </span>
      `;
      answer_image_html += `<span id="partImg${count}"><img src="${answer.image}" /></span>`;
      count++;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select wide">
            <div class="tyMultiPhoto">
              <div class="thumbSec">
                ${answer_base_image_html}
                ${answer_image_html}
              </div>
              <div class="items">
                ${answer_html}
              </div>
            </div>
          </div>
          ${dont_know_html}
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a
          href="javascript:void(0);" 
          class="btnNext"
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
  }
  // 가로 슬라이드 텍스트
  getAnswerTypeWidthSlideSelect(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let dont_know_html = "";

    let answer_html = "";
    let answer_slide_html = "";
    let count = 0;

    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }

    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select_result
        );
        continue;
      }

      let checked = "";
      if (count == 1 && is_auto_select == false) {
        checked = "checked line_checked";
      }

      if (is_auto_select_result) {
        checked = "checked line_checked";
      }

      answer_html += `
        <div
          question_hierarchy_id="${params.hierarchy_id}" 
          answer_hierarchy_id="${answer.hierarchy_id}"
          class="word ${checked}"
        >
          ${surveyCommon.surveyEnter(answer.subject)}
        </div>
      `;
      answer_slide_html += `<div class="swiper-slide"></div>`;
      count++;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox scroll">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select wide">
            <div class="controlSlide horizen ty02">
              <div class="slide-draggable">
                <div class="swiper-wrapper">
                  <!-- 아래 선택메뉴 개수에 맞춰서 유지 -->
                  ${answer_slide_html}
                </div>
              </div>
              <div class="control_bar">
                <div class="bar">
                  <div class="inBar"></div>
                </div>
                <div class="quantity">
                  ${answer_html}
                </div>
              </div>
            </div>
            ${dont_know_html}
          </div>
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a
          href="javascript:void(0);" 
          class="btnNext"
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
    count++;
  }
  getAnswerTypeWidthSlideImage(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }

    let answer_html = "";
    let answer_slide_html = "";
    let dont_know_html = "";
    let count = 0;

    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }

    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select_result
        );
        answer_image_html += `<span id="partImg0" class="checked"><img src="${answer.image}" /></span>`;
        continue;
      }

      let checked = "";
      if (count == 1 && is_auto_select == false) {
        checked = "checked line_checked";
      }

      if (is_auto_select_result) {
        checked = "checked line_checked";
      }

      answer_html += `
        <div 
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          answer_type="${params.answer_type}"
          onClick="${onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
          class="thumb ${reset_class} ${checked}"
        >
          <p>
            <img src="${answer.image}" />
          </p>
          <span>${surveyCommon.surveyEnter(answer.subject)}</span>
        </div>
      `;
      answer_slide_html += `<div class="swiper-slide"></div>`;
      count++;
    }

    let ty01_class = "";
    let side_class = "fourth";
    if (count > 4) {
      ty01_class = "ty01";
      side_class = "fifth";
    }

    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox scroll">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select wide">
            <div class="controlSlide horizen ${ty01_class}">
              <div class="slide-draggable">
                <div class="swiper-wrapper">
                  <!-- 아래 선택메뉴 개수에 맞춰서 유지 -->
                  ${answer_slide_html}
                </div>
              </div>
              <div class="control_bar">
                <div class="swipeTitle imgSet">
                  ${answer_html}
                </div>
                <div class="bar">
                  <div class="inBar"></div>
                </div>
                <div class="statsTxt ${side_class}">
                  <div class="word dirLess">${params.first_answer_text}</div>
                  <div class="word dirMore">${params.last_answer_text}</div>
                </div>
              </div>
            </div>
            ${dont_know_html}
          </div>
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a
          href="javascript:void(0);" 
          class="btnNext"
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
  }
  // 재문진 세로슬라이드
  getReQnaAnswerTypeHeightSlideImage(params) {
    // 메뉴 바 생성
    let menu_progress = this.setReQnaMenuProgressHtml();
    let next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;


    let count = 1;
    let answer_html = "";
    let answer_image_html =
      "<span id='partImg0' style='opacity: 1.0;'><img src='/web/survey/img_fb00.png' /></span>";
    let dont_know_html = "";

    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }

    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      let checked = "";
      if (is_auto_select_result) {
        checked = "line_checked";
      }
      answer_html += `
        <span 
          id="part0${count}"
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          answer_type="${params.answer_type}"
          class="${reset_class} ${checked}"
          onClick="${onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >
          ${surveyCommon.surveyEnter(answer.subject)}
        </span>
      `;
      answer_image_html += `<span id="partImg0${count}"><img src="${answer.image}" /></span>`;
      count++;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox re_pre">
        <div class="inner">
          <div class="txt subDesc">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
            <p>${surveyCommon.surveyEnter(params.question_description)}</p>
          </div>
          <div class="select wide">
            
            <div class="tyMultiPhoto">
              <div class="thumbSec feedback">
                ${answer_image_html}
              </div>
              <div class="items">
                ${answer_html}
              </div>
            </div>
            ${dont_know_html}
          </div>
          ${this.getToolTipHtml(params.tooltip)}
        </div>
        <div class="dBtn gColumn gFixed">
          <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
          <a
            href="javascript:void(0);" 
            class="btnNext"
            onclick="${next_button_onclick}"
            min="${params.select_count.min}"
            max="${params.select_count.max}"
          >다음</a>
        </div>
      </div>
    `;
  }
  // 텍스트 (내용)
  getAnswerTypeTextContentt(params) {
    // 메뉴 바 생성
    let menu_progress = null;
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      menu_progress = this.setReQnaMenuProgressHtml();
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    } else {
      menu_progress = this.setMenuProgressHtml();
    }
    let dont_know_html = "";
    let answer_html = "";
    let count = 0;

    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }

    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        reset_class += " line_checked";
      }

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select_result
        );
        continue;
      }

      answer_html += `
        <li
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          answer_type="${params.answer_type}"
          onClick="${onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
          class="${reset_class}"
        >
          <div class="itemTy${count} onlyTxt">
            <p class="itemTxt">${surveyCommon.surveyEnter(answer.subject)}</p>
          </div>
        </li>
      `;
      count++;
    }
    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select">
            <ul class="multi">
              ${answer_html}
            </ul>
            ${dont_know_html}
          </div>
        </div>
        ${this.getToolTipHtml(params.tooltip)}
      </div>
      <div class="dBtn gColumn gFixed">
        <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
        <a
          href="javascript:void(0);" 
          class="btnNext"
          onclick="${next_button_onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
        >다음</a>
      </div>
    `;
  }

  // 텍스트 (내용)
  getReQnaAnswerTypeTextContentt(params) {
    // 메뉴 바 생성
    let menu_progress = this.setReQnaMenuProgressHtml();
    let next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;

    let dont_know_html = "";
    let answer_html = "";
    let count = 1;

    let is_auto_select = false;
    for (let answer of params.children) {
      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        is_auto_select = true;
      }
    }
    let reset_hierarchy_id = [];
    for (let answer of params.children) {
      let reset_use_result = this.getResetUse(answer);
      let reset_class = reset_use_result.reset_class;
      let onclick = reset_use_result.onclick;

      let is_auto_select_result = this.getAutoSelect(
        Number(answer.hierarchy_id),
        params.answer_type
      );
      if (is_auto_select_result) {
        reset_class += " line_checked";
      }

      if (answer.answer_select_reset == "bottom_button") {
        dont_know_html = this.setIdontKnowHtml(
          params.hierarchy_id,
          answer.hierarchy_id,
          surveyCommon.surveyEnter(answer.subject),
          params.answer_type,
          is_auto_select_result
        );
        continue;
      }

      if (reset_class.indexOf("survey_reset") > -1) {
        reset_hierarchy_id.push({
          hierarchy_id: Number(answer.hierarchy_id),
          reset_class: reset_class,
        });
      }
      answer_html += `
        <li
          question_hierarchy_id="${params.hierarchy_id}"
          answer_hierarchy_id="${answer.hierarchy_id}"
          answer_type="${params.answer_type}"
          onClick="${onclick}"
          min="${params.select_count.min}"
          max="${params.select_count.max}"
          class="${reset_class}"
        >
          <div class="itemTy01 onlyTxt">
            <p class="itemTxt">${surveyCommon.surveyEnter(answer.subject)}</p>
          </div>
        </li>
      `;
      count++;
    }

    if (Number(this.re_qna_text_content_textarea[surveyCommon.survey_mall_id]) == Number(params.hierarchy_id)) {
      let style = "display: none;";
      let find_index = reset_hierarchy_id.findIndex((e) => e.reset_class.indexOf("line_checked") > -1 );
      if (find_index > -1) {
        style = "";
      }
      answer_html += `
        <li class="etcInput inconvenience_text" style="${style}">
          <span class="delInput" onClick="textAreaHide();"></span>
          <textarea class="autoTextarea inconvenience" onkeyup="essenceSurvey.surveyTextAreaReSize();" style="height: ${this.inconvenience_text_height}">${this.inconvenience_text}</textarea>
        </li>
      `;
    }

    let re_step = "";
    if (params.type == "re_qna_question") {
      re_step = "re_step";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox re_pre">
        <div class="inner">
          <div class="txt subDesc">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
            <p class="txtDesc">${surveyCommon.surveyEnter(params.question_description)}</p>
          </div>
          <div class="select">
            <ul class="single">
              ${answer_html}
            </ul>
            ${dont_know_html}
          </div>
          ${this.getToolTipHtml(params.tooltip)}
        </div>
        <div class="dBtn gColumn gFixed">
          <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
          <a
            href="javascript:void(0);" 
            class="btnNext"
            question_hierarchy_id="${params.hierarchy_id}"
            onclick="${next_button_onclick}"
            min="${params.select_count.min}"
            max="${params.select_count.max}"
          >다음</a>
        </div>
      </div>
    `;
  }

  // 성별/출생연도
  getAnswerTypeGenderAge(params) {
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    }

    let option_html = "<option selected value=''>출생연도</option>";
    let start_year = Number(dayjs().format("YYYY"));
    let end_year = Number(dayjs().subtract(84, "year").format("YYYY"));
    let birth_date = Number(this.birth);

    for (let i = start_year; i > end_year; i--) {
      let selected = "";
      if (birth_date == i) {
        selected = "selected='selected'";
      }
      option_html += `<option id="birth_${i}" value='${i}' ${selected}>${i}년생</option>`;
    }

    let male_class = "";
    if (this.gender == "male") {
      male_class = "line_checked";
    }
    let female_class = "";
    if (this.gender == "female") {
      female_class = "line_checked";
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      <ul>
        <li class="step selected">
          <div class="contentWrap recipeBox">
            <div class="contentBox scroll">
              <div class="inner">
                <div class="txt">
                  <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
                </div>
                <div class="select">
                  <ul class="gFlex2">
                    <li 
                      question_hierarchy_id="${params.hierarchy_id}"
                      answer_hierarchy_id="${params.hierarchy_id}"
                      answer_type="${params.answer_type}"
                      onClick="essenceSurvey.genderClick(this, 'male')"
                      class="${male_class}"
                    >
                      남자
                    </li>
                    <li 
                      question_hierarchy_id="${params.hierarchy_id}"
                      answer_hierarchy_id="${params.hierarchy_id}"
                      answer_type="${params.answer_type}"
                      onClick="essenceSurvey.genderClick(this, 'female')"
                      class="${female_class}"
                    >
                      여자
                    </li>
                  </ul>
                  <div class="selectBox">
                    <select id="survey_birth" name="birth" question_hierarchy_id="${
                      params.hierarchy_id
                    }" onChange="essenceSurvey.surveyChangeBirth(this)" class="line_checked" value="${
      this.birth
    }">
                      <!-- 2010년 ~ 1940년까지 범위 잡아주세요 //-->
                      ${option_html}
                    </select>
                    <div id="survey_old" class="age">
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dBtn gColumn gFixed">
              <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
              <a
                href="javascript:void(0);" 
                class="btnNext"
                onclick="${next_button_onclick}"
                min="${params.select_count.min}"
                max="${params.select_count.max}"
                question_hierarchy_id="${params.hierarchy_id}"
                answer_type="${params.answer_type}"
              >다음</a>
            </div>
          </div>
        </li>
      </ul>
    `;
  }
  // 닉네임
  getAnswerTypeNickName(params) {
    let next_button_onclick = `essenceSurvey.getNextQuestionShow(this, ${params.hierarchy_id})`;
    if (this.re_qna_menu_list.length > 0) {
      next_button_onclick = `essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})`;
    }
    let placeholder = params.placeholder;
    if (this.parent_survey_result?.manage_product_nick_name) {
      placeholder = this.parent_survey_result.manage_product_nick_name;
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      <ul>
        <li class="step selected">
          <div class="contentWrap recipeBox">
            <div class="contentBox last">
              <div class="inner">
                <div class="txt">
                  <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
                </div>
                <div class="nameBox">
                  <input 
                    id="survey_input_product_name" 
                    type="text" 
                    placeholder="${placeholder}"
                    onKeyup="essenceSurvey.surveyInputProductName()" 
                    onKeydown="essenceSurvey.surveyInputProductName()"
                    />
                  <button class="btnClear" onClick="essenceSurvey.clearInputProductName()"><i class="xi-close"></i></button>
                </div>
                <div class="img_area">
                  <img src="/web/survey/mo/recipe01.png" /><span id="survey_product_name" class="name">#${
                    placeholder
                  }</span
                  >
                </div>
              </div>
            </div>
            <div class="dBtn gColumn gFixed">
              <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
              <a
                href="javascript:void(0);" 
                class="btnNext"
                onclick="${next_button_onclick}"
                min="${params.select_count.min}"
                max="${params.select_count.max}"
                answer_type="${params.answer_type}"
                question_type="${params.question_type}"
              >다음</a>
            </div>
          </div>
        </li>
      </ul>
    `;
  }

  surveyChangeBirth(element) {
    let value = survey_jQuery("#survey_birth").val();
    survey_jQuery("#survey_birth option").each(function () {
      $(this).removeClass("line_checked");
    });

    survey_jQuery("#survey_old").text("");
    if (value) {
      survey_jQuery(`#birth_${value}`).addClass("line_checked");
      this.birth = value;

      let now_year = dayjs().format("YYYY");
      let old = Number(now_year) - Number(value);
      let old_text = `${old}세`;
      survey_jQuery("#survey_old").text(old_text);
    }
  }

  // 다음 질문 보여주기
  async getNextQuestionShow(e, hierarchy_id) {
    if (!hierarchy_id) {
      return null;
    }

    // 선택 답변 체크
    let is_check = this.selectAnswerCheck(e);
    if (is_check === false) {
      return false;
    }

    // 인트로 진행함
    this.intro = true;

    // 선택 답변 입력
    this.inputAnswerHierarchyId();

    // 선택 답변 입력 (자동 선택 용도) or 임시저장 조회 후 자동선택
    this.inputAnswerTempHierarchyId();

    let next_info = this.getNextQuestionHierarchyId(Number(hierarchy_id));
    if (next_info == null) {
      // 결과 전송 하기
      this.setSurveyStorage("Y");
      await this.surveyResult();
      return;
    } else {
      // 다음 질문 노출하기
      this.folder_sequence = next_info.folder_sequence;
      this.qna_sequence = next_info.qna_sequence;

      this.setQnaHtml(next_info.params);

      // 임시저장
      this.setSurveyStorage("N");
    }

    // history.pushState(null, null, location.search);
    // history.pushState(null, null, location.search + "#progress");
  }
  // 첫문진 결과 전송
  async surveyResult() {

    if (this.is_result_sned == false) {
      this.is_result_sned = true;
    } else {
      return;
    }

    // 베이스 합산점수
    let total_base_score = 0;

    // 고민 1위, 2위 합산점수
    let type_score = [
      {
        type: "sensitive",
        score: 0,
        rank: 1,
      },
      {
        type: "dry",
        score: 0,
        rank: 2,
      },
      {
        type: "pore",
        score: 0,
        rank: 3,
      },
      {
        type: "wrinkle",
        score: 0,
        rank: 4,
      },
      {
        type: "color",
        score: 0,
        rank: 5,
      },
    ];

    let bulk_code_list = [];
    let question_hierarchy_id_list = [];
    for (const id of this.survey_history_hierarchy) {
      let result = essenceSurvey.searchQuestionHierarchyInfo(id);
      if (Number(id) == Number(result.hierarchy_id)) {
        question_hierarchy_id_list.push(Number(id));
      }
      // 베이스 점수 계산
      for (const children of result.children) {
        if (Number(children.hierarchy_id) == Number(id)) {
          if (children.worry_type == "base") {
            total_base_score += Number(children.formula_score);
          }
          // 고민 타입 별 점수 계산
          if (children.worry_type && children.worry_type != "base") {
            let find = type_score.find((e) => e.type == children.worry_type);
            if (find) {
              find.score += Number(children.formula_score);
            }
          }
          // 벌크코드 입력
          if (children.bulk_code) {
            let index = bulk_code_list.findIndex((e) => e.bulk_code == children.bulk_code);
            if (index == -1) {
              bulk_code_list.push({
                bulk_name: null,
                bulk_code: children.bulk_code,
              });
            }
          }
        }
      }
    }
    if (question_hierarchy_id_list.length > 0) {
      for (const question_hierarchy_id of question_hierarchy_id_list) {
        let index = this.survey_history_hierarchy.findIndex(
          (e) => Number(e) == Number(question_hierarchy_id)
        );
        if (index > -1) {
          this.survey_history_hierarchy.splice(index, 1);
        }
      }
    }

    let custom_survey_history_hierarchy = [];
    for (const hierarchy_id of this.survey_history_hierarchy) {
      let question_info = this.searchQuestionHierarchyInfo(Number(hierarchy_id));
      if (question_info) {
        for (const answer of question_info.children) {
          if (Number(answer.hierarchy_id) == Number(hierarchy_id)) {
            custom_survey_history_hierarchy.push({
              hierarchy_id,
              question: question_info.subject,
              answer: null
            });
          }
        }
      }
    }

    // 1. 고민 타입 총점 높은대로 정렬
    // 2. 동률일 경우, 민감→건조→모공→주름→색소 순 배정
    let type_score_result = type_score.sort(function (a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      if (a.rank > b.rank) return 1;
      if (a.rank < b.rank) return -1;
    });

    let section = [
      {
        type: "base",
        score: total_base_score,
      },
      {
        type: "worry",
        worry_type: type_score_result[0].type,
        score: type_score_result[0].score,
        rank: 1,
      },
      {
        type: "worry",
        worry_type: type_score_result[1].type,
        score: type_score_result[1].score,
        rank: 2,
      },
    ];

    if (section[1].score <= 0) {
      section[1].worry_type = null;
    }

    if (section[2].score <= 0) {
      section[2].worry_type = null;
    }

    // 1순위: 없음, 2순위: 없음 인경우
    // 1순위: 민감(30), 2순위: 건조 (20) 준다
    if (section[1].worry_type == null && section[2].worry_type == null) {
      section[1].worry_type = "sensitive";
      section[1].score = 30;
      section[2].worry_type = "dry";
      section[2].score = 20;
    }


    // 건조 없음 - 보습, 아쿠아실앰플 >> 보습(합산점수), 진정30
    if (section[1].worry_type == "dry" && section[2].worry_type == null) {
      section[2] = {
        type: "worry",
        worry_type: "sensitive",
        score: 30,
        rank: 2,
        ampoule: this.aquasill_bulk_code[surveyCommon.survey_mall_id],
        ampoule_type: "chemical",
        ampoule_sequence: 1,
      };
    }

    // 주름 없음 - 탄력, 11.베타인 >> 탄력(합산점수), 보습20
    // 색소 없음 - 미백, 11.베타인 >> 미백(합산점수), 보습20
    // 민감 없음 - 진정, 11.베타인 >> 진정(합산점수), 보습20
    // 모공 없음 - 모공, 11.베타인 >> 모공(합산점수), 보습20
    if ((section[1].worry_type == "wrinkle" || section[1].worry_type == "color" || section[1].worry_type == "sensitive" || section[1].worry_type == "pore") && section[2].worry_type == null) {
      section[2] = {
        type: "worry",
        worry_type: "dry",
        score: 20,
        rank: 2,
        ampoule: this.betaine_bulk_code[surveyCommon.survey_mall_id],
        ampoule_type: "chemical",
        ampoule_sequence: 1,
      };
    }

    // 1순위: 모공, 2순위: 민감 - 예외처리
    // 1순위:모공, 2순위: 민감, 1순위 엠플: 진정,	2순위 엠플: 모공(컨셉2.트러블개선&진정)
    // 민감 -> 진정, 모공 -> 모공(컨셉2.트러블개선&진정) 주기 위함
    if (section[1].worry_type == "pore" && section[2].worry_type == "sensitive") {
      let first_worry_info = section[2];
      first_worry_info.rank = 1;
      let second_worry_info = section[1];
      second_worry_info.rank = 2;

      section[1] = first_worry_info;
      section[2] = second_worry_info;
    }

    let result = {
      product_no: this.survey_qna_product_no[surveyCommon.survey_mall_id],
      hierarchy_ids: custom_survey_history_hierarchy,
      section,
      ampoule: bulk_code_list,
      member: {
        product_name: this.product_name,
        member_id: surveyCommon.survey_member_id,
        birth_date: this.birth,
        gender: this.gender,
      },
    };

    // 임직원 경우 전송
    let add_params = "";
    let discount_type = surveyCommon.shoplusGetParameters("discount_type");
    if (discount_type && discount_type.indexOf("employees") > -1) {
      result.discount_type = discount_type;
    }

    if (discount_type) {
      add_params += "&discount_type=" + discount_type;
    }
  
    let buy_type = surveyCommon.shoplusGetParameters("buy_type");
    if (buy_type) {
      add_params += "&buy_type=" + buy_type;
    }

    try {
      let url = `/front/skin_care/product/${this.survey_qna_product_no[surveyCommon.survey_mall_id]}`;
      let survey_result = await surveyCommon.postSurveyAjax(url, result);

      // 선물하기
      let gift_key = surveyCommon.shoplusGetParameters("gift_key");
      if (gift_key) {
        add_params = "&gift_key=" + gift_key;
      }

      location.replace(`/m/survey_essence/result.html?product_no=${this.product_no}&hash=${survey_result.hash}${add_params}`);
    } catch (e) {
      console.log(e);
    }
  }

  // 다음 질문 hierarchy_id + 정보 찾기
  getNextQuestionHierarchyId(hierarchy_id) {
    let qna_hierarchy_sequence = 1;
    for (let j = 0; j < this.qna_hierarchy.length; j++) {
      if (this.qna_hierarchy[j].type == "folder") {
        // 인트로 체크
        if (Number(this.qna_hierarchy[j].hierarchy_id) == Number(hierarchy_id)) {
          let folder_index = j + 1;
          if (this.qna_hierarchy[folder_index]) {
            if (this.qna_hierarchy[folder_index].intro_status == "enabled") {
              return {
                folder_sequence: Number(this.qna_hierarchy[folder_index].sequence),
                qna_sequence: Number(this.qna_hierarchy[folder_index].sequence),
                hierarchy_id: Number(this.qna_hierarchy[folder_index].hierarchy_id),
                params: Number(this.qna_hierarchy[folder_index]),
              };
            } else {
              return {
                folder_sequence: Number(this.qna_hierarchy[folder_index].sequence),
                qna_sequence: Number(this.qna_hierarchy[folder_index].children[0].sequence),
                hierarchy_id: Number(this.qna_hierarchy[folder_index].children[0].hierarchy_id),
                params: this.qna_hierarchy[folder_index].children[0],
              };
            }
          }
        }

        // 다음 질문 체크
        let children = this.qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
            qna_hierarchy_sequence = Number(this.qna_hierarchy[j].sequence);
            if (children[i + 1]) {
              return {
                folder_sequence: Number(this.qna_hierarchy[j].sequence),
                qna_sequence: Number(children[i + 1].sequence),
                hierarchy_id: Number(children[i + 1].hierarchy_id),
                params: children[i + 1],
              };
            } else {
              continue;
            }
          }
        }
      }
    }

    // 다음 폴더 체크
    qna_hierarchy_sequence += 1;
    for (let j = 0; j < this.qna_hierarchy.length; j++) {
      if (this.qna_hierarchy[j].type == "folder") {
        let children = this.qna_hierarchy[j].children;
        if (
          Number(this.qna_hierarchy[j].sequence) == qna_hierarchy_sequence &&
          children.length > 0
        ) {
          return {
            folder_sequence: Number(this.qna_hierarchy[j].sequence),
            qna_sequence: Number(children[0].sequence),
            hierarchy_id: Number(children[0].hierarchy_id),
            params: children[0],
          };
        }
      }
    }
    return null;
  }
  // 답변 hierarchy_id로 질문 정보 찾기
  searchQuestionHierarchyInfo(hierarchy_id) {
    let question_info = null;
    for (let j = 0; j < this.qna_hierarchy.length; j++) {
      if (this.qna_hierarchy[j].type == "folder") {
        // 인트로
        if (Number(this.qna_hierarchy[j].hierarchy_id) == Number(hierarchy_id)) {
          question_info = this.qna_hierarchy;
        }
        let children = this.qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (Number(hierarchy_id) == Number(children[i].hierarchy_id)) {
            question_info = children[i];
          }
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
              question_info = children[i];
            }
          }
        }
      }
    }
    return question_info;
  }
  // 분기 조건 담기
  getProcessWhere() {
    for (const qna_hierarchy of this.qna_hierarchy) {
      for (const children of qna_hierarchy.children) {
        if (children.process_question_status == "enabled") {
          if (children.process_where.length > 0) {
            this.process_where_list = {
              hierarchy_id: Number(children.hierarchy_id),
              checked: false,
              list: children.process_where,
            };
          }
        }
      }
    }
  }
  // 분기 후 질문 체크
  checkProcessWhere(hierarchy_id) {
    if (!this.process_where_list[hierarchy_id]) {
      return false;
    }

    for (index in this.process_where_list) {
      let i = 0;
      let befor_boolean = false;
      let now_boolean = false;
      if (this.process_where_list[index].checked == true) {
        continue;
      }
      if (Number(index) != Number(hierarchy_id)) {
        continue;
      }
      for (const process_question of this.process_where_list[index].list) {
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
      if (befor_boolean === true && this.process_where_list[index].checked === false) {
        this.process_where_list[index].checked = true;
        return index;
      } else {
        return null;
      }
    }
  }

  // 분기 후 질문 내용 담기
  getReQnaProcessQuestion() {
    for (const qna_hierarchy of this.re_qna_hierarchy) {
      for (const children of qna_hierarchy.children) {
        if (children.process_question_status == "enabled") {
          if (children.process_where.length > 0) {
            this.process_question_list.push({
              hierarchy_id: children.hierarchy_id,
              checked: false,
              list: children.process_where,
            });
          }
        }
      }
    }
  }

  // 분기 후 질문 체크
  checkReQnaProcessWhere(hierarchy_id) {
    if (!hierarchy_id) {
      return null;
    }
    let find_index = this.process_question_list.findIndex(
      (e) => Number(e.hierarchy_id) == Number(hierarchy_id)
    );
    if (find_index == -1) {
      return null;
    }
    let i = 0;
    let befor_boolean = false;
    let now_boolean = false;
    for (const process_question of this.process_question_list[find_index].list) {
      if (process_question) {
        let survey_history_hierarchy_index = this.survey_history_hierarchy.indexOf(
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
    if (befor_boolean === true && this.process_question_list[find_index].checked === false) {
      this.process_question_list[find_index].checked = true;
      return true;
    } else {
      return false;
    }

    /*
    for (index in this.process_question_list) {
      let i = 0;
      let befor_boolean = false;
      let now_boolean = false;
      if (this.process_question_list[index].checked == true) {
        continue;
      }
      if (Number(index) != Number(hierarchy_id)) {
        continue;
      }
      for (const process_question of this.process_question_list[index].list) {
        if (process_question) {
          let survey_history_hierarchy_index = this.survey_history_hierarchy.indexOf(
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
      if (befor_boolean === true && this.process_question_list[index].checked === false) {
        this.process_question_list[index].checked = true;
        return index;
      } else {
        return null;
      }
    }
    */
  }

  // 답변 선택
  answerCilck(e) {
    // 초기화 버튼 미선택 처리
    survey_jQuery(".survey_reset").removeClass("line_checked");
    survey_jQuery(".survey_reset").removeClass("active");

    // 선택 개수
    const answer_type = survey_jQuery(e).attr("answer_type");
    const min = Number(survey_jQuery(e).attr("min"));
    const max = Number(survey_jQuery(e).attr("max"));

    let select_class = "line_checked";
    let select_count = survey_jQuery(`.${select_class}`).length;

    // 
    if (survey_jQuery(".inconvenience_text").length > 0) {
      survey_jQuery(".inconvenience_text").hide();
    }

    // 1개 선택일때
    if (min == 1 && max == 1) {
      survey_jQuery(`.${select_class}`).removeClass(select_class);
      survey_jQuery(e).toggleClass(select_class);
      // 가로슬라이드 (라디오 버튼형) - 답변명 노출
      this.showAnswerSubject(e, answer_type);
      // 세로슬라이드 (버튼형) - 이미지 입력
      this.inputImageHeightSlideButtonOne(e, answer_type, select_class);
      return;
    }

    if (survey_jQuery(e).hasClass(select_class) === false) {
      if (select_count >= max) {
        alert("최대 " + max + "개까지 선택할 수 있어요.");
        return;
      }
    }

    survey_jQuery(e).toggleClass(select_class);

    // 이미지 (답변 선택 노출형) - 이미지 입력
    this.inputImageAnswerSelect(e, answer_type, select_class);

    // 세로슬라이드 (버튼형) - 이미지 입력
    this.inputImageHeightSlideButton(e, answer_type, select_class);
  }

  answerCilckReset(e) {
    let is_check = survey_jQuery(e).hasClass("line_checked");

    // 선택된 답변 미선택 처리
    survey_jQuery(".line_checked").removeClass("line_checked");

    if (is_check === false) {
      survey_jQuery(e).addClass("line_checked");
    }

    let answer_type = survey_jQuery(e).attr("answer_type");
    if (answer_type == "text_content") {
      if (survey_jQuery(".inconvenience_text").length  > 0) {
        if (survey_jQuery(e).hasClass("survey_reset")) {
          survey_jQuery("li.inconvenience_text").show();
        } else {
          survey_jQuery("li.inconvenience_text").hide();
        }
      }

    }
  }

  inputImageAnswerSelect(e, answer_type, select_class) {
    if (answer_type == "image_answer_select") {
      if (survey_jQuery(e).hasClass(select_class) === true) {
        const image = survey_jQuery(e).attr("image");
        let image_area_list = survey_jQuery(".pThumb");
        const question_hierarchy_id = survey_jQuery(e).attr("question_hierarchy_id");
        const answer_hierarchy_id = survey_jQuery(e).attr("answer_hierarchy_id");

        for (let i = 0; i < image_area_list.length; i++) {
          if (image) {
            let image_src = survey_jQuery(image_area_list[i]).children(".img").children("img").attr("src");
            if (image_src?.length > 0) {
              continue;
            }
            survey_jQuery(image_area_list[i]).children(".img").children("img").attr("src", image);
            survey_jQuery(image_area_list[i]).children(".img").children(".photoDel").removeClass("displaynone");

            survey_jQuery(image_area_list[i]).children(".img").children(".photoDel").attr("question_hierarchy_id", question_hierarchy_id);
            survey_jQuery(image_area_list[i]).children(".img").children(".photoDel").attr("answer_hierarchy_id", answer_hierarchy_id);
            return;
          }
        }
      } else {
        const image = survey_jQuery(e).attr("image");
        let image_area_list = survey_jQuery(".pThumb");
        for (let i = 0; i < image_area_list.length; i++) {
          let image_src = survey_jQuery(image_area_list[i]).children(".img").children("img").attr("src");
          if (image_src?.indexOf(image) > -1) {
            survey_jQuery(image_area_list[i]).children(".img").children("img").attr("src", null);
            survey_jQuery(image_area_list[i]).children(".img").children(".photoDel").addClass("displaynone");
          }
        }
      }
    }
  }

  // 이미지 (답변 선택 노출형) 이미지 X 클릭 시 호출
  answerDeleteImageCilck(e) {
    let answer_hierarchy_id = survey_jQuery(e).attr("answer_hierarchy_id");
    let line_checked_list = survey_jQuery(".keywordBox .line_checked");
    if (line_checked_list.length > 0) {
      for (let i=0; i < line_checked_list.length; i++) {
        let line_checked_answer_hierarchy_id = survey_jQuery(line_checked_list[i]).attr("answer_hierarchy_id");
        if (Number(answer_hierarchy_id) == Number(line_checked_answer_hierarchy_id)) {
          survey_jQuery(line_checked_list[i]).click();
        }
      }
    }

  }

  inputImageHeightSlideButton(e, answer_type, select_class) {
    if (answer_type != "height_slide_button") {
      return;
    }
  
    survey_jQuery(".dontKnow a").removeClass("active");
    let id = survey_jQuery(e).attr("id");
    let id_no = id.replace("part", "");
  
    let is_line_checked = survey_jQuery(e).hasClass("line_checked");
    if (is_line_checked) {
      survey_jQuery(`#partImg${id_no}`).addClass("active");
    } else {
      survey_jQuery(`#partImg${id_no}`).removeClass("active");
    }
  }
  inputImageHeightSlideButtonOne(e, answer_type, select_class){
    if (answer_type != "height_slide_button") {
      return;
    }

    survey_jQuery(".tyMultiPhoto .items span").removeClass("line_checked");
    survey_jQuery(".tyMultiPhoto .thumbSec span.active").removeClass("active");

    survey_jQuery(e).addClass("line_checked");
    let id = survey_jQuery(e).attr("id");
    let id_no = id.replace("part", "");
    survey_jQuery(`#partImg${id_no}`).addClass("active");
  }

  // 가로슬라이드 (라디오 버튼형) - 답변명 노출
  showAnswerSubject(e, answer_type) {
    if (answer_type == "width_slide_radio") {
      let sequence = survey_jQuery(e).attr("sequence");
      survey_jQuery(".tyTitle").children().removeClass("active");
      survey_jQuery(".tyTitle")
        .children()
        .eq(sequence - 1)
        .addClass("active");
    }
  }

  // 가로슬라이드 스크립트 실행
  draggableWidthSlideScript() {
    var draggableHorizen = new Swiper('.select [class*="horizen"] .slide-draggable', {
      initialSlide: 1,
      direction: "horizontal",
      loop: false,
      allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      scrollbar: {
        el: '.select [class*="horizen"] .control_bar .bar',
        hide: false,
        draggable: true,
      },
      slidesPerView: 3,
      on: {
        slideChange: function () {
          survey_jQuery(".checked").removeClass("checked");

          survey_jQuery(".dontKnow a").removeClass("active");
          survey_jQuery('.select [class*="horizen"] .control_bar p span')
            .removeClass("checked")
            .eq(draggableHorizen.activeIndex)
            .addClass("checked");
          survey_jQuery('.select [class*="horizen"] .control_bar .swipeTitle .thumb')
            .removeClass("checked")
            .eq(draggableHorizen.activeIndex)
            .addClass("checked");
          survey_jQuery(".select .quantity .word")
            .removeClass("active")
            .eq(draggableHorizen.activeIndex)
            .addClass("active");
          survey_jQuery(".bar .swiper-scrollbar-drag").removeClass("dis");

          survey_jQuery(".select .quantity .word")
            .removeClass("checked")
            .eq(draggableHorizen.activeIndex)
            .addClass("checked");

          // 선택 체크
          survey_jQuery(".line_checked").removeClass("line_checked");
          survey_jQuery(".checked").addClass("line_checked");
        },
      },
    });

    survey_jQuery(".third .dirMore").on("click", function () {
      draggableHorizen.slideTo(2, 500, false);
    });
    survey_jQuery(".third .dirMid").on("click", function () {
      draggableHorizen.slideTo(1, 500, false);
    });
    survey_jQuery(".third .dirLess").on("click", function () {
      draggableHorizen.slideTo(0, 500, false);
    });

    survey_jQuery(".fourth .dirMore").on("click", function () {
      draggableHorizen.slideTo(3, 500, false);
    });
    survey_jQuery(".fourth .dirLess").on("click", function () {
      draggableHorizen.slideTo(0, 500, false);
    });

    survey_jQuery(".fifth .dirMore").on("click", function () {
      draggableHorizen.slideTo(4, 500, false);
    });
    survey_jQuery(".fifth .dirLess").on("click", function () {
      draggableHorizen.slideTo(0, 500, false);
    });

    survey_jQuery('.select [class*="horizen"] .control_bar p span').on("click", function () {
      draggableHorizen.slideTo(survey_jQuery(this).index());
    });
    survey_jQuery(".select .quantity .word").on("click", function () {
      draggableHorizen.slideTo(survey_jQuery(this).index());
    });

    setTimeout(function () {
      // 자동 선택때 필요
      let span_list = survey_jQuery(".swipeTitle span");
      for (let i = 0; i < span_list.length; i++) {
        if (survey_jQuery(span_list[i]).hasClass("line_checked")) {
          draggableHorizen.slideTo(i, 0, false);
        }
      }

      let thumb_list = survey_jQuery(".swipeTitle .thumb");
      for (let i = 0; i < thumb_list.length; i++) {
        if (survey_jQuery(thumb_list[i]).hasClass("line_checked")) {
          draggableHorizen.slideTo(i, 0, false);
        }
      }

      let word_list = survey_jQuery(".quantity .word");
      for (let i = 0; i < word_list.length; i++) {
        if (survey_jQuery(word_list[i]).hasClass("line_checked")) {
          draggableHorizen.slideTo(i, 0, false);
        }
      }

      let reset_length = survey_jQuery(".survey_reset.checked").length;
      if (reset_length > 0) {
        survey_jQuery(".survey_reset.checked").click();
        survey_jQuery(".survey_reset.checked").addClass("line_checked");
      }
    }, 100);
  }

  draggableWidthSlideDontKnowScript() {
    survey_jQuery(".dontKnow a").click(function () {
      survey_jQuery(this).addClass("active");
      survey_jQuery(".tyTitle span").removeClass("active");
      survey_jQuery(".control_bar .swipeTitle span").removeClass("checked");
      survey_jQuery(".itemVote button").removeClass("active");

      survey_jQuery(".select ul.multi li").removeClass("line_checked");
      survey_jQuery(".selRate span").removeClass("active");
      survey_jQuery(".tyMultiPhoto .items span").removeClass("active");
      survey_jQuery(".tyMultiPhoto .thumbSec span").removeClass("active");
      survey_jQuery(".quantity .word").removeClass("active");
      survey_jQuery(".bar .swiper-scrollbar-drag").addClass("dis");

      survey_jQuery(".essenTy li").removeClass("line_checked");

      // 선택 체크
      survey_jQuery(".line_checked").removeClass("line_checked");
      survey_jQuery(".dontKnow .active").addClass("line_checked");
    });
  }

  // 아이콘 클릭
  answerIconCilck(e) {
    survey_jQuery(".dontKnow a").removeClass("active");
    let icon_id = survey_jQuery(e).attr("id");
    let icon_no = icon_id.replace("rate", "");
    survey_jQuery(".tyTitle span").removeClass("active");
    survey_jQuery(`#ty${icon_no}`).addClass("active");

    survey_jQuery(".line_checked").removeClass("line_checked");
    survey_jQuery(e).addClass("line_checked");
  }

  answerHeightSlideButtonCilckReset(e) {
    let is_check = survey_jQuery(e).hasClass("line_checked");

    // 선택된 답변 미선택 처리
    survey_jQuery(".line_checked").removeClass("line_checked");

    if (is_check === false) {
      survey_jQuery(e).addClass("line_checked");
    }
    // 선택된 답변 미선택 처리
    survey_jQuery(".checked").removeClass("checked");
    survey_jQuery("#partImg0").addClass("checked");

    survey_jQuery(".thumbSec .active").removeClass("active");
  }

  genderClick(e, gender) {
    survey_jQuery(".line_checked").removeClass("line_checked");
    survey_jQuery(e).addClass("line_checked");
    this.gender = gender;
  }

  surveyInputProductName() {
    let survey_input_product_name = survey_jQuery("#survey_input_product_name").val();

    //const reg = /[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9\|#\|\s]/g;
    const reg = /[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9\|#\|\s|\ㆍ|\ᆢ]/g;
    let reg_text = survey_input_product_name.replace(reg, "");

    if (survey_input_product_name.length != reg_text.length) {
      alert("특수문자는 입력할 수 없습니다.");
    }
    let result = this.surveyGetStringByte(reg_text);
    survey_jQuery("#survey_input_product_name").val(result);
    survey_jQuery("#survey_product_name").text("#" + result);
    this.product_name = result;
  }

  // 바이트 계산
  surveyGetStringByte(contents) {
    let length = 11;
    let int_contents_length = contents.length;

    if (int_contents_length > length) {
      return contents.substr(0, 11);
    } else {
      return contents;
    }
  }
  clearInputProductName() {
    survey_jQuery("#survey_input_product_name").val(null);
    survey_jQuery("#survey_product_name").text("");
  }

  // 뒤로가기
  async backWards() {
    // 선택한 답변이 있으면 삭제 한다
    if (this.survey_history_hierarchy.length > 0) {
      let hierarchy_id = this.survey_history_hierarchy[this.survey_history_hierarchy.length - 1];
      let question_info = this.searchQuestionHierarchyInfo(Number(hierarchy_id));
      if (question_info) {
        for (const children of question_info.children) {
          this.removeAnswerHierarchyId(Number(children.hierarchy_id));
        }
        this.removeAnswerHierarchyId(Number(question_info.hierarchy_id));
      }

      // 선택한 답변이 남아 있으면 해당 질문 노출
      if (this.survey_history_hierarchy.length > 0) {
        let hierarchy_id = this.survey_history_hierarchy[this.survey_history_hierarchy.length - 1];
        let question_info = this.searchQuestionHierarchyInfo(Number(hierarchy_id));
        let next_info = this.getNextQuestionHierarchyId(Number(question_info.hierarchy_id));
        if (next_info) {
          this.folder_sequence = next_info.folder_sequence;
          this.qna_sequence = next_info.qna_sequence;
          this.setQnaHtml(next_info.params);
        }
      } else {
        let next_info = this.getNextQuestionHierarchyId(Number(this.qna_hierarchy[0].hierarchy_id));
        if (next_info) {
          this.folder_sequence = next_info.folder_sequence;
          this.qna_sequence = next_info.qna_sequence;
          this.setQnaHtml(next_info.params);
        }
      }
      history.pushState(null, null, location.search);
      history.pushState(null, null, location.search + "#progress");
    } else {
      // 인트로 노출
      if (this.intro == true) {
        this.intro = false;
        this.setQnaHtml(this.qna_hierarchy[0]);
      } else {
        location.href = document.referrer;
      }
    }
  }

  // 재문진 뒤로가기
  async backWardsReQna() {
    // 선택한 답변이 있으면 삭제 한다
    if (this.survey_history_hierarchy.length > 0) {
      // 분기 조건 체크 수정 시작
      let process_index_list = [];
      for (let history_hierarchy_id of this.survey_history_hierarchy) {
        let question_info = this.searchReQuestionHierarchyInfo(Number(history_hierarchy_id));
        let find_index = this.process_question_list.findIndex(
          (e) => Number(e.hierarchy_id) == Number(question_info.hierarchy_id)
        );
        if (find_index > -1) {
          process_index_list.push(find_index);
        }
      }

      for (let process_question of this.process_question_list) {
        process_question.checked = false;
      }

      for (const process_index of process_index_list) {
        this.process_question_list[process_index].checked = false;
      }
      // 분기 조건 체크 수정 끝

      let hierarchy_id = this.survey_history_hierarchy[this.survey_history_hierarchy.length - 1];

      let question_info = this.searchReQuestionHierarchyInfo(Number(hierarchy_id));
      if (question_info) {
        for (const children of question_info.children) {
          this.removeAnswerHierarchyId(Number(children.hierarchy_id));
        }
        this.removeAnswerHierarchyId(Number(question_info.hierarchy_id));
      }

      // 선택한 답변이 남아 있으면 해당 질문 노출
      if (this.survey_history_hierarchy.length > 0) {
        let hierarchy_id = this.survey_history_hierarchy[this.survey_history_hierarchy.length - 1];
        let question_info = this.searchReQuestionHierarchyInfo(Number(hierarchy_id));
        let next_info = this.getNextReQuestion(Number(question_info.hierarchy_id));
        this.qna_sequence = next_info.qna_sequence;
        this.setReQnaHtml(question_info);
        if (next_info) {
          this.qna_sequence = next_info.qna_sequence;
          this.setReQnaHtml(next_info.params);
        }
        history.pushState(null, null, location.search);
        history.pushState(null, null, location.search + "#progress");
      } else {
        this.qna_sequence = 0;
        this.setReQnaHtml(this.re_qna_hierarchy[0].children[0]);
      }
    } else {
    }
  }

  // 선택 답변 HierarchyId 삭제
  removeAnswerHierarchyId(hierarchy_id) {
    let find_index = this.survey_history_hierarchy.findIndex(
      (e) => Number(e) == Number(hierarchy_id)
    );
    if (find_index > -1) {
      this.survey_history_hierarchy.splice(find_index, 1);
    }
  }
  // 선택 답변 입력 (자동 선택 용도) or 임시저장 조회 후 자동선택 HierarchyId 삭제
  removeAnswerTempHierarchyId(hierarchy_id) {
    let find_index = this.survey_temp_history_hierarchy.findIndex(
      (e) => Number(e) == Number(hierarchy_id)
    );
    if (find_index > -1) {
      this.survey_temp_history_hierarchy.splice(find_index, 1);
    }
  }
  // 진단이어하기 저장
  async setSurveyStorage(status) {
    let params = {
      surveys: [
        {
          product_no: this.product_no,
          hierarchy_ids: this.survey_temp_history_hierarchy,
        },
      ],
      member: {
        product_name: this.product_name,
        member_id: surveyCommon.survey_member_id,
        birth_date: this.birth,
      },
      result_status: status,
    };
    if (this.gender) {
      params.member.gender = this.gender;
    }
    let url = `/front/product/${this.product_no}/storage`;
    surveyCommon.putSurveyAjax(url, params);
  }
  // 진단이어하기 조회
  async getSurveyStorage() {
    if (surveyCommon.survey_member_id) {
      try {
        let url = `/front/product/${this.product_no}/storage?member_id=${surveyCommon.survey_member_id}`;
        let storage_result = await surveyCommon.getSurveyAjax(url);
        if (storage_result && storage_result.result_status == "N") {
          this.product_name = storage_result.member.product_name;
          this.gender = storage_result.member.gender;
          this.birth = storage_result.member.birth_date;
          for (const survey of storage_result.surveys) {
            for (const hierarchy_id of survey.hierarchy_ids) {
              this.survey_temp_history_hierarchy.push(Number(hierarchy_id));
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  getAutoSelect(hierarchy_id, type) {
    if (!hierarchy_id) {
      return false;
    }
    let find_index = this.survey_temp_history_hierarchy.findIndex(
      (e) => Number(e) == Number(hierarchy_id)
    );
    if (find_index > -1) {
      return true;
    }
    return false;
  }

  // 자동 선택 시 이미지 넣기
  setAutoSelect(answer_type) {
    if (answer_type == "image_answer_select") {
      if (survey_jQuery(".line_checked").length > 0) {
        let answer_list = survey_jQuery(".line_checked");
        for (const answer of answer_list) {
          let image = survey_jQuery(answer).attr("image");
          const question_hierarchy_id = survey_jQuery(answer).attr("question_hierarchy_id");
          const answer_hierarchy_id = survey_jQuery(answer).attr("answer_hierarchy_id");
          if (image) {
            let image_area_list = survey_jQuery(".pThumb");
            for (let i = 0; i < image_area_list.length; i++) {
              if (image) {
                let image_src = survey_jQuery(image_area_list[i]).children(".img").children("img").attr("src");
                if (image_src?.length > 0) {
                  continue;
                }

                survey_jQuery(image_area_list[i]).children(".img").children("img").attr("src", image);
                survey_jQuery(image_area_list[i]).children(".img").children(".photoDel").removeClass("displaynone");
    
                survey_jQuery(image_area_list[i]).children(".img").children(".photoDel").attr("question_hierarchy_id", question_hierarchy_id);
                survey_jQuery(image_area_list[i]).children(".img").children(".photoDel").attr("answer_hierarchy_id", answer_hierarchy_id);
                break;
              }
            }
          }
        }
      }
    }
    if (answer_type == "height_slide_button") {
      if (survey_jQuery(".line_checked").length > 0) {
        let id_no = 0;
        let answer_list = survey_jQuery(".line_checked");
        for (const answer of answer_list) {
          let id = survey_jQuery(answer).attr("id");
          if (id) {
            id_no = id.replace("part", "");
          }
          survey_jQuery(`#partImg${id_no}`).toggleClass("active");
        }
      }
    }
  }

  // 재문진 화면 노출
  setReQnaHtml(params) {
    survey_jQuery("#survey_area").hide();
    survey_jQuery("#survey_area").removeClass("active");
    this.setReQnaQuestionHtml(params);

    let height = survey_jQuery('body').height();
    survey_jQuery('#container').css({'min-height':height});

    setTimeout(function () {
      survey_jQuery("#survey_area").show();
      survey_jQuery("#survey_area").addClass("active");
    }, 600);
  }
  // 재문진 질문/답변 화면 노출
  setReQnaQuestionHtml(params) {

    if (params.question_type == "worry") {
      // 1순위 없음, 2순위 없음인 경우 다음 질문으로 넘긴다
      if (this.parent_survey_result.essence_result.essence_result.care_point.worry_list.length == 0) {
        let next_info = this.getNextReQuestionHierarchyId(Number(params.hierarchy_id));
        params = next_info.params;
      }
    }

    let html = this.getReQuestionHtml(params.question_type, params.answer_type, params);
    survey_jQuery("#survey_area").empty();
    survey_jQuery("#survey_area").html(html);
    survey_jQuery("#survey_area").show();
    // width_slide_radio
    if (
      params.answer_type == "width_slide_both_side_image" ||
      params.answer_type == "width_slide_text" ||
      params.answer_type == "width_slide_image" ||
      params.answer_type == "width_slide_select" ||
      params.question_type == "base"
    ) {
      this.draggableWidthSlideScript();
    }
    // 잘모르겠어요 클릭 시 슬라이드 선택 미노출 스크립트
    if (params.answer_type?.indexOf("width_slide") > -1) {
      this.draggableWidthSlideDontKnowScript();
    }
    if (params.answer_type == "text_content" && this.inconvenience_text == "") {
      this.surveyTextAreaReSize();
    }
    this.setAutoSelect(params.answer_type);
    let progress = survey_jQuery(".menu.progress.ing").data("progress");
    survey_jQuery(".step .menu.ing .percent.active").css("top", progress);
  }
  // 재문진 메뉴 배열로 생성
  getReQnaMenuProgressHtml() {
    // 메뉴 진행 바 리스트 만들기
    for (const qna of this.re_qna_hierarchy) {
      if (qna.intro_status == "disabled") {
        this.re_qna_menu_list.push(qna.subject);
      }
    }
  }
  // 재문진 메뉴 화면 노출
  setReQnaMenuProgressHtml() {
    let progress_html = "";
    let minus_count = 0;
    for (const children of this.re_qna_hierarchy[0].children) {
      if (children.answer_type == "nick_name" || children.answer_type == "gender_age") {
        minus_count++;
      }
    }

    let question_count = this.re_qna_hierarchy[0].children.length - minus_count;
    let data_progress = (Number(this.qna_sequence + 1) / question_count) * 100;
    for (let i = 0; i < this.re_qna_menu_list.length; i++) {
      progress_html += `
        <div id="stepArea">
          <div class="step re_step">
              <div><img src="/web/upload/mynomy/kr_mobile/diagnosis/feedbackloop.svg" alt="피드백루프" /></div>
          <div class="percent percent-dummy" style="left: ${data_progress}%;"></div>
          <div class="percent percent-gradient"></div>
          </div>
        </div>
        <div class="progress-percent" data-start="0" data-progress="${data_progress}%"></div>
        `;
    }
    return progress_html;
  }

  // 질문 타입별 화면 그리기
  getReQuestionHtml(question_type, answer_type, params) {
    // 고민 해결
    if (question_type == "worry") {
      return this.getReQnaAnswerTypeWorry(params);
    }
    // 고민선택
    if (question_type == "worry_select") {
      return this.getReQnaQuestionTypeWorrySelect(params);
    }
    // 추가 고민선택
    if (question_type == "add_worry_select") {
      return this.getReQnaQuestionTypeAddWorrySelect(params);
    }
    // 베이스
    if (question_type == "base") {
      return this.getReQnaQuestionTypeBase(params);
    }
    // 피드백
    if (question_type == "feedback") {
      return this.getReQnaQuestionTypeFeedBack(params);
    }
    // 닉네임
    if (question_type == "nick_name") {
      return this.getAnswerTypeNickName(params);
    }
    // 이미지 (답변 선택 노출)
    if (answer_type == "image_answer_select") {
      return this.getReQnaAnswerTypeImageAnswerSelect(params);
    }
    // 가로슬라이드 (좌/우 이미지 노출형)
    if (answer_type == "width_slide_both_side_image") {
      return this.getAnswerTypeWidthSlideBothSideImage(params);
    }

    // 가로슬라이드 (라디오 버튼형)
    if (answer_type == "width_slide_radio") {
      return this.getAnswerTypeWidthSlideRadio(params);
    }

    // 이미지 (우측 썸네일형)
    if (answer_type == "image_right_thumb") {
      return this.getAnswerTypeImageRightThumb(params);
    }

    // 가로슬라이드 (텍스트형)
    if (answer_type == "width_slide_text") {
      return this.getAnswerTypeWidthSlideText(params);
    }
    // 가로슬라이드 (아이콘 선택형) width_slide_icon_select
    if (answer_type == "width_slide_icon_select") {
      return this.getAnswerTypeWidthSlideIconSelect(params);
    }

    // 세로슬라이드 (버튼형)
    if (answer_type == "height_slide_button") {
      return this.getReQnaAnswerTypeHeightSlideImage(params);
    }

    // 가로슬라이드 (선택형)
    if (answer_type == "width_slide_image") {
      return this.getAnswerTypeWidthSlideImage(params);
    }

    // 텍스트 (내용)
    if (answer_type == "text_content") {
      return this.getReQnaAnswerTypeTextContentt(params);
    }

    // 가로슬라이드 (선택형)
    if (answer_type == "width_slide_select") {
      return this.getAnswerTypeWidthSlideSelect(params);
    }

    // 성별/나이
    if (answer_type == "gender_age") {
      return this.getAnswerTypeGenderAge(params);
    }
  }

  // 고민 해결
  getReQnaAnswerTypeWorry(params) {
    // 메뉴 바 생성
    let menu_progress = this.setReQnaMenuProgressHtml();

    let min = 2;
    let max = 2;

    let first_worry = surveyCommon.worry_type_list[this.parent_survey_result.essence_result.essence_result.care_point.worry_list[0].worry_type];
    let second_worry = surveyCommon.worry_type_list[this.parent_survey_result.essence_result.essence_result.care_point.worry_list[1]?.worry_type];
    let subject = "";
    if (second_worry) {
      subject = `<strong>#${this.parent_survey_result.manage_product_nick_name}</strong> 에센스는<br><strong>‘${first_worry}/${second_worry}’</strong>에 집중했어요`;
    } else {
      second_worry = "";
      min = 1;
      max = 1;
      subject = `<strong>#${this.parent_survey_result.manage_product_nick_name}</strong> 에센스는<br><strong>‘${first_worry}’</strong>에 집중했어요`;
    }
    
    let first_worry_description = `<strong>‘${first_worry}’</strong>고민이<br>어느 정도 해결되셨나요?`;
    let second_worry_description = `<strong>‘${second_worry}’</strong>고민이<br>어느 정도 해결되셨나요?`;

    let default_class = "line_checked";
    let auto_select_list = [];
    for (let answer of params.children) {
      let is_auto_select = this.getAutoSelect(Number(answer.hierarchy_id), params.answer_type);
      if (is_auto_select == true) {
        default_class = "";
        auto_select_list.push("line_checked");
      } else {
        auto_select_list.push("");
      }
    }

    let first_html = `
      <div class="partCont">
          <div class="txt">
              <h3>${first_worry_description}</h3>
          </div>
          <div class="select wide">
              <div class="satisfySec">
                  <div class="selRate">
                      <span id="rate01" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="first_worry ${auto_select_list[0]}" score="next" answer_hierarchy_id="${params.children[0].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy01.svg" /><i>매우<br>불만족</i></span>
                      <span id="rate02" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="first_worry ${auto_select_list[1]}" score="next" answer_hierarchy_id="${params.children[1].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy02.svg" /><i>불만족</i></span>
                      <span id="rate03" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="first_worry ${auto_select_list[2]}" score="next" answer_hierarchy_id="${params.children[2].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy03.svg" /><i>보통</i></span>
                      <span id="rate04" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="first_worry ${auto_select_list[3]}" score="keep" answer_hierarchy_id="${params.children[3].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy04.svg" /><i>만족</i></span>
                      <span id="rate05" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="first_worry ${default_class} ${auto_select_list[4]}" score="keep" answer_hierarchy_id="${params.children[4].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy05.svg" /><i>매우<br>만족</i></span>
                  </div>
              </div>
          </div>
      </div>
    `;
  
    let second_html = "";
    if (second_worry) {
      second_html = `
        <div class="partCont">
              <div class="txt">
                  <h3>${second_worry_description}</h3>
              </div>
              <div class="select wide">
                  <div class="satisfySec">
                      <div class="selRate">
                          <span id="rate01" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="second_worry ${auto_select_list[5]}" score="next" answer_hierarchy_id="${params.children[5].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy01.svg" /><i>매우<br>불만족</i></span>
                          <span id="rate02" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="second_worry ${auto_select_list[6]}" score="next" answer_hierarchy_id="${params.children[6].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy02.svg" /><i>불만족</i></span>
                          <span id="rate03" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="second_worry ${auto_select_list[7]}" score="next" answer_hierarchy_id="${params.children[7].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy03.svg" /><i>보통</i></span>
                          <span id="rate04" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="second_worry ${auto_select_list[8]}" score="keep" answer_hierarchy_id="${params.children[8].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy04.svg" /><i>만족</i></span>
                          <span id="rate05" onclick="essenceSurvey.reQnaAnswerIconCilck(this);" class="second_worry ${default_class} ${auto_select_list[9]}" score="keep" answer_hierarchy_id="${params.children[9].hierarchy_id}"><img src="/web/survey/ico_fb_satisfy05.svg" /><i>매우<br>만족</i></span>
                      </div>
                  </div>
              </div>
          </div>
      `;
    }

    return `
      ${menu_progress}
      <div class="contentBox re_step">
        <div class="contentWrap">
            <div class="contentBox re_pre scroll">
                <div class="inner">
                    <div class="myCareTxt">
                        <p class="myCare">${subject}</p>
                    </div>
                    ${first_html}
                    ${second_html}
                </div>
            </div>
            <div class="dBtn gColumn gFixed">
                <a
                  href="javascript:void(0);" 
                  class="btnNext"
                  onclick="essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})"
                  question_type="${params.question_type}"
                  min="${min}"
                  max="${max}"
                  question_hierarchy_id="${params.hierarchy_id}"
                >다음</a>
            </div>
        </div>
      </div>
    `;
  }

  getReQnaQuestionTypeWorrySelect(params) {
    // 메뉴 바 생성
    let menu_progress = this.setReQnaMenuProgressHtml();

    let type_list = [
      "dry",
      "sensitive",
      "wrinkle",
      "color",
      "pore"
    ];

    let answer_html = "";
    let count = 0;
    for (let answer of params.children) {
      let reset_class = "";
      let is_auto_select = this.getAutoSelect(Number(answer.hierarchy_id), params.answer_type);
      if (is_auto_select) {
        reset_class += "line_checked";
      }

      answer_html += `
        <li min="2" max="2"  class="color0${count + 1} ${reset_class}" onclick="essenceSurvey.answerCilck(this);" type="${type_list[count]}" answer_hierarchy_id="${answer.hierarchy_id}">
          <span>${surveyCommon.surveyEnter(answer.subject)}</span>
        </li>
      `;
      count++;
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox re_pre">
        <div class="inner">
          <div class="txt subDesc">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
            <p>${surveyCommon.surveyEnter(params.question_description)}</p>
          </div>
          <div class="select wide">
            <ul class="essenTy">
              ${answer_html}
            </ul>
          </div>
        </div>
        <div class="dBtn gColumn gFixed">
          <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
          <a
            href="javascript:void(0);" 
            class="btnNext"
            onclick="essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})"
            question_type="${params.question_type}"
            min="${params.select_count.min}" 
            max="${params.select_count.max}"
            question_hierarchy_id="${params.hierarchy_id}"
          >다음</a>
        </div>
      </div>
    `;
  }

  getReQnaQuestionTypeAddWorrySelect(params) {
    // 메뉴 바 생성
    let menu_progress = this.setReQnaMenuProgressHtml();

    params.subject = params.subject.replace(
      "{#worry1}",
      `<strong>${this.worry_type_list[this.worry_select.first]}`
    );
    params.subject = params.subject.replace(
      "{#worry2}",
      `${this.worry_type_list[this.worry_select.second]}</strong>`
    );

    let answer_html = "";
    let count = 1;

    for (let answer of params.children) {
      if (answer.subject == this.worry_type_list[this.worry_select.first] || answer.subject == this.worry_type_list[this.worry_select.second]) {
        continue;
      }
      // 모공 체크
      if (answer.subject.indexOf("모공") > -1 && (this.worry_type_list[this.worry_select.first].indexOf("모공") > -1 || this.worry_type_list[this.worry_select.second].indexOf("모공") > -1)) {
        continue;
      }
      let worry_type = "";
      if (answer.subject == "보습") {
        worry_type = "dry";
        count = 1;
      }
      if (answer.subject == "진정") {
        worry_type = "sensitive";
        count = 2;
      }
      if (answer.subject == "탄력") {
        worry_type = "wrinkle";
        count = 3;
      }
      if (answer.subject == "색소") {
        worry_type = "color";
        count = 4;
      }
      if (answer.subject.indexOf("모공") > -1) {
        worry_type = "pore";
        count = 5;
      }

      let reset_class = "";
      let is_auto_select = this.getAutoSelect(Number(answer.hierarchy_id), params.answer_type);
      if (is_auto_select) {
        reset_class += "line_checked";
      }

      answer_html += `
        <li class="color0${count} ${reset_class}" onclick="essenceSurvey.answerCilck(this);" worry_type="${worry_type}" answer_hierarchy_id="${answer.hierarchy_id}">
          <span>${surveyCommon.surveyEnter(answer.subject)}</span>
        </li>
      `;
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox re_pre">
        <div class="inner">
          <div class="txt subDesc">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
            <p>${surveyCommon.surveyEnter(params.question_description)}</p>
          </div>
          <div class="select wide">
            <ul class="essenTy">
              ${answer_html}
            </ul>
            <div class="dontKnow">
              <a href="javascript:void(0);" class="idontKnow survey_reset" onClick="essenceSurvey.answerHeightSlideButtonCilckReset(this);">추가 고민 없음</a>
            </div>
          </div>
        </div>
        <div class="dBtn gColumn gFixed">
          <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
          <a
            href="javascript:void(0);" 
            class="btnNext"
            onclick="essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})"
            min="1"
            max="3"
            question_hierarchy_id="${params.hierarchy_id}"
            question_type="${params.question_type}"
          >다음</a>
        </div>
      </div>
    `;
  }

  getReQnaQuestionTypeBase(params) {
    // 메뉴 바 생성
    let menu_progress = this.setReQnaMenuProgressHtml();

    let default_class = "line_checked";
    let auto_select_list = [];
    for (let answer of params.children) {
      let is_auto_select = this.getAutoSelect(Number(answer.hierarchy_id), params.answer_type);
      if (is_auto_select == true) {
        default_class = "";
        auto_select_list.push("line_checked");
      } else {
        auto_select_list.push("");
      }
    }
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      ${menu_progress}
      <div class="contentBox re_pre">
        <div class="inner">
          <div class="txt">
            <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
          </div>
          <div class="select wide">
            <div class="controlSlide horizen ty03">
              <div class="slide-draggable">
                <div class="swiper-wrapper">
                  <!-- 아래 선택메뉴 개수에 맞춰서 유지 -->
                  <div class="swiper-slide"></div>
                  <div class="swiper-slide"></div>
                  <div class="swiper-slide"></div>
                </div>
              </div>
              <div class="control_bar">
                <p class="swipeTitle">
                  <span answer_hierarchy_id="${params.children[0].hierarchy_id}" score="${params.children[0].score}" class="${auto_select_list[0]}">${surveyCommon.surveyEnter(params.children[0].answer_description)}</span>
                  <span answer_hierarchy_id="${params.children[1].hierarchy_id}" score="${params.children[1].score}" class="${default_class} ${auto_select_list[1]}">${surveyCommon.surveyEnter(params.children[1].answer_description)}</span>
                  <span answer_hierarchy_id="${params.children[2].hierarchy_id}" score="${params.children[2].score}" class="${auto_select_list[2]}">${surveyCommon.surveyEnter(params.children[2].answer_description)}</span>
                </p>
                <div class="statsPhoto third">
                  <div class="img dirLess"><img src="/web/survey/img_fb_case11_01.png" />
                    <p>${surveyCommon.surveyEnter(params.children[0].subject)}</p>
                  </div>
                  <div class="img dirMid"><img src="/web/survey/img_fb_case11_empty.png" />
                    <p>${surveyCommon.surveyEnter(params.children[1].subject)}</p>
                  </div>
                  <div class="img dirMore"><img src="/web/survey/img_fb_case11_02.png" />
                    <p>${surveyCommon.surveyEnter(params.children[2].subject)}</p>
                  </div>
                </div>
                <div class="bar">
                  <div class="inBar none">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dBtn gColumn gFixed">
          <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
          <a
            href="javascript:void(0);" 
            class="btnNext"
            onclick="essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})"
            min="1"
            max="1"
            question_type="${params.question_type}"
            question_hierarchy_id="${params.hierarchy_id}"
          >다음</a>
        </div>
      </div>
    `;
  }
  // 피드백
  getReQnaQuestionTypeFeedBack(params) {
    // 메뉴 바 생성
    let menu_progress = this.setReQnaMenuProgressHtml();
    let befor_btn_class = "";
    if (this.survey_history_hierarchy.length == 0) {
      befor_btn_class = "displaynone";
    }
    return `
      <div class="step re_step">
        ${menu_progress}
          <div class="contentWrap">
              <div class="contentBox re_pre scroll">
                  <div class="inner">
                      <div class="txt subDesc">
                          <h3>${surveyCommon.surveyEnter(params.subject)}</h3>
                          <p>${surveyCommon.surveyEnter(params.question_description)}</p>
                      </div>
                      <div class="select">
                          <ul class="single">
                              <li class="etcInput line_checked" style="display:block;" answer_hierarchy_id="${params.children[0].hierarchy_id}">
                                  <span class="eraserInput" onClick="essenceSurvey.feedbackClear()"></span>
                                  <textarea class="autoTextarea" onkeyup="essenceSurvey.surveyFeedBackTextAreaReSize();" style="height: ${this.feed_back_memo_height}">${this.feed_back_memo}</textarea>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div class="dBtn gColumn gFixed">
              <a href="javascript:history.back(-1)" class="btnPrev ${befor_btn_class}">이전</a>
              <a
                href="javascript:void(0);" 
                class="btnNext"
                onclick="essenceSurvey.getNextReQuestionShow(this, ${params.hierarchy_id})"
                min="1"
                max="1"
                question_hierarchy_id="${params.hierarchy_id}"
              >다음</a>
              </div>
          </div>
      </div>
    `;
  }

  // 재문진 다음 질문 보여주기
  async getNextReQuestionShow(e, hierarchy_id) {
    if (!hierarchy_id) {
      return null;
    }

    // 재문진 선택 답변 체크
    let is_check = this.selectReQnaAnswerCheck(e);
    if (is_check === false) {
      return false;
    }

    // 재문진 선택 답변 입력
    this.inputReQnaAnswerHierarchyId(e);

    // 선택 답변 입력 (자동 선택 용도) or 임시저장 조회 후 자동선택
    this.inputReQnaAnswerTempHierarchyId();

    let next_info = this.getNextReQuestionHierarchyId(Number(hierarchy_id));

    if (next_info?.hierarchy_id) {
      let process_where_result = this.checkReQnaProcessWhere(Number(next_info.hierarchy_id));
      if (process_where_result == false) {
        this.getNextReQuestionShow(e, Number(next_info.hierarchy_id));
        return;
      }
    }
    if (next_info?.params?.question_type == "base") {

      // 고민 1위, 2위 합산점수
      let type_score = [
        {
          type: "sensitive",
          score: 0,
          rank: 1,
          is_select: false,
        },
        {
          type: "dry",
          score: 0,
          rank: 2,
          is_select: false,
        },
        {
          type: "pore",
          score: 0,
          rank: 3,
          is_select: false,
        },
        {
          type: "wrinkle",
          score: 0,
          rank: 4,
          is_select: false,
        },
        {
          type: "color",
          score: 0,
          rank: 5,
          is_select: false,
        },
      ];

      for (const id of this.survey_history_hierarchy) {
        let result = essenceSurvey.searchReQuestionHierarchyInfo(id);
        for (const children of result.children) {
          if (Number(children.hierarchy_id) == Number(id)) {
            // 고민 타입 별 점수 계산
            if (children.worry_type && children.worry_type != "base") {
              let find = type_score.find((e) => e.type == children.worry_type);
              if (find) {
                find.score += Number(children.formula_score);
              }
            }
          }
        }
      }

      // 1. 고민 타입 총점 높은대로 정렬
      // 2. 동률일 경우, 민감→건조→모공→주름→색소 순 배정
      let type_score_result = type_score.sort(function (a, b) {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        if (a.rank > b.rank) return 1;
        if (a.rank < b.rank) return -1;
      });

      let worry_type_score_result = [];
      for (let i = 0; i < type_score_result.length; i++) {
        worry_type_score_result.push(type_score_result[i]);
      }

      // 모공/건조, 모공/주름, 모공/색소
      if (
        (worry_type_score_result[0].type == "pore" && worry_type_score_result[1].type == "dry") ||
        (worry_type_score_result[0].type == "dry" && worry_type_score_result[1].type == "pore") ||
        (worry_type_score_result[0].type == "pore" && worry_type_score_result[1].type == "wrinkle") ||
        (worry_type_score_result[0].type == "pore" && worry_type_score_result[1].type == "color")
      ) {
        this.getNextReQuestionShow(e, Number(next_info.hierarchy_id));
        return;
      }
    }

    if (next_info == null) {
      // 결과 전송 하기
      await this.surveyReQnaResult();
      return;
    } else {
      // 다음 질문 노출하기
      this.qna_sequence = next_info.qna_sequence;
      this.setReQnaHtml(next_info.params);
    }

    history.pushState(null, null, location.search);
    history.pushState(null, null, location.search + "#progress");

  }
  async surveyReQnaResult() {

    if (this.is_result_sned == false) {
      this.is_result_sned = true;
    } else {
      return;
    }
    

    // 이전 문진 고민 정보
    let parnet_worry_rank = {
      base: {
        score: 0,
      },
      first: {
        worry_type: "",
        score: 0,
        keep_ampoule: "",
        keep_sequence: 0,
        next_ampoule: "",
        next_sequence: 0,
        ampoule_type: "",
      },
      second: {
        worry_type: "",
        score: 0,
        keep_ampoule: "",
        keep_sequence: 0,
        next_ampoule: "",
        next_sequence: 0,
        ampoule_type: "",
      },
    };

    for (const parent_worry of this.parent_worry_info) {
      if (parent_worry.type == "base") {
        parnet_worry_rank.base.score = parent_worry.score;
      }
      if (parent_worry.type == "worry") {
        if (parent_worry.rank == 1) {
          parnet_worry_rank.first.worry_type = parent_worry.worry_type;
          parnet_worry_rank.first.score = parent_worry.score;
          parnet_worry_rank.first.ampoule_type = parent_worry.ampoule_type;
          parnet_worry_rank.first.ampoule_sequence = parent_worry.ampoule_sequence;
          let is_keep_ampoule = false;
          let is_next_ampoule = false;
          for (const assign of this.ampoule_assign) {
            if (assign.worry_type == parent_worry.worry_type && assign.score == parent_worry.score) {
              parnet_worry_rank.first.next_ampoule = assign.ampoules[0].bulk_code;
              parnet_worry_rank.first.next_sequence = assign.ampoules[0].sequence;
              for (const assign_ampoule of assign.ampoules) {
                // 유지 했을떄 엠플 찾는다
                if (Number(parnet_worry_rank.first.ampoule_sequence) == Number(assign_ampoule.sequence)) {
                  parnet_worry_rank.first.keep_ampoule = assign_ampoule.bulk_code;
                  parnet_worry_rank.first.keep_sequence = assign_ampoule.sequence;
                  is_keep_ampoule = true;
                  continue;
                }
                if (is_keep_ampoule == true && is_next_ampoule == false) {
                  parnet_worry_rank.first.next_ampoule = assign_ampoule.bulk_code;
                  parnet_worry_rank.first.next_sequence = assign_ampoule.sequence;
                  is_next_ampoule = true;
                  continue;
                }
              }
            }
          }
        }
        if (parent_worry.rank == 2) {
          parnet_worry_rank.second.worry_type = parent_worry.worry_type;
          parnet_worry_rank.second.score = parent_worry.score;
          parnet_worry_rank.second.ampoule_type = parent_worry.ampoule_type;
          parnet_worry_rank.second.ampoule_sequence = parent_worry.ampoule_sequence;
          let is_keep_ampoule = false;
          let is_next_ampoule = false;
          for (const assign of this.ampoule_assign) {
            if (assign.worry_type == parent_worry.worry_type && assign.score == parent_worry.score) {
              parnet_worry_rank.second.next_ampoule = assign.ampoules[0].bulk_code;
              parnet_worry_rank.second.next_sequence = assign.ampoules[0].sequence;
              for (const assign_ampoule of assign.ampoules) {
                // 유지 했을떄 엠플 찾는다
                if (Number(parnet_worry_rank.second.ampoule_sequence) == Number(assign_ampoule.sequence)) {
                  parnet_worry_rank.first.keep_ampoule = assign_ampoule.bulk_code;
                  parnet_worry_rank.first.keep_sequence = assign_ampoule.sequence;
                  is_keep_ampoule = true;
                  continue;
                }
                if (is_keep_ampoule == true && is_next_ampoule == false) {
                  parnet_worry_rank.second.next_ampoule = assign_ampoule.bulk_code;
                  parnet_worry_rank.second.next_sequence = assign_ampoule.sequence;
                  is_next_ampoule = true;
                  continue;
                }
              }
            }
          }
        }
      }
    }

    let re_qna_section = [
      {
        type: "base",
        score: 0,
      },
      {
        type:"worry",
        worry_type: "",
        score: 0,
        rank: 1,
        ampoule: null,
        ampoule_sequence: null,
      },
      {
        type:"worry",
        worry_type: "",
        score: 0,
        rank: 2,
        ampoule: null,
        ampoule_sequence: null,
      },
    ];

    let is_pore = false;
    let case1_rank1 = this.parent_worry_info.find((e) => e.type == "worry" && e.worry_type == "dry" && e.rank == 1);
    let case1_rank2 = this.parent_worry_info.find((e) => e.type == "worry" && e.worry_type == "pore" && e.rank == 2);
    if (case1_rank1 && case1_rank2) {
      is_pore = true;
    }

    let case2_rank1 = this.parent_worry_info.find((e) => e.type == "worry" && e.worry_type == "pore" && e.rank == 1);
    let case2_rank2 = this.parent_worry_info.find((e) => e.type == "worry" && (e.worry_type == "dry" || e.worry_type == "wrinkle" || e.worry_type == "color") && e.rank == 2);
    let case2_null = this.parent_worry_info.find((e) => e.type == null || e.worry_type == null);
    if (case2_rank1 && (case2_rank2 || case2_null)) {
      is_pore = true;
    }

    if (!this.worry_select.first && !this.worry_select.second) {
      this.worry_select.first = this.parent_survey_result.essence_result.essence_result.care_point.worry_list[0]?.worry_type;
      this.worry_select.second = this.parent_survey_result.essence_result.essence_result.care_point.worry_list[1]?.worry_type;
    }
    // 이전문진 순위 1위 2위와 에센스의 기능을 바꿔볼까요? 선택한 답변 비교

    // 베이스 합산점수
    let total_base_score = 0;

    // 고민 1위, 2위 합산점수
    let type_score = [
      {
        type: "sensitive",
        score: 0,
        rank: 1,
        is_select: false,
      },
      {
        type: "dry",
        score: 0,
        rank: 2,
        is_select: false,
      },
      {
        type: "pore",
        score: 0,
        rank: 3,
        is_select: false,
      },
      {
        type: "wrinkle",
        score: 0,
        rank: 4,
        is_select: false,
      },
      {
        type: "color",
        score: 0,
        rank: 5,
        is_select: false,
      },
    ];

    let bulk_code_list = [];
    let question_hierarchy_id_list = [];
    for (const id of this.survey_history_hierarchy) {
      let result = essenceSurvey.searchReQuestionHierarchyInfo(id);
      if (Number(id) == Number(result.hierarchy_id)) {
        question_hierarchy_id_list.push(Number(id));
      }
      // 베이스 점수 계산
      for (const children of result.children) {
        if (Number(children.hierarchy_id) == Number(id)) {
          if (result.question_type == "base") {
            total_base_score += Number(children.score);
          }
          // 고민 타입 별 점수 계산
          if (children.worry_type && children.worry_type != "base") {
            let find = type_score.find((e) => e.type == children.worry_type);
            if (find) {
              find.score += Number(children.formula_score);
              find.is_select = true;
            }
          }
          // 벌크코드 입력
          if (children.bulk_code) {
            let index = bulk_code_list.findIndex((e) => e.bulk_code == children.bulk_code);
            if (index == -1) {
              bulk_code_list.push({
                bulk_name: null,
                bulk_code: children.bulk_code,
              });
            }
          }
        }
      }
    }

    if (question_hierarchy_id_list.length > 0) {
      for (const question_hierarchy_id of question_hierarchy_id_list) {
        let index = this.survey_history_hierarchy.findIndex(
          (e) => Number(e) == Number(question_hierarchy_id)
        );
        if (index > -1) {
          this.survey_history_hierarchy.splice(index, 1);
        }
      }
    }

    // 1. 고민 타입 총점 높은대로 정렬
    // 2. 동률일 경우, 민감→건조→모공→주름→색소 순 배정
    let type_score_result = type_score.sort(function (a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      if (a.rank > b.rank) return 1;
      if (a.rank < b.rank) return -1;
    });

    let worry_type_score_result = [];
    for (let i = 0; i < type_score_result.length; i++) {
      // if (type_score_result[i].is_select === true) {
      worry_type_score_result.push(type_score_result[i]);
      // }
    }

    let section = [
      {
        type: "base",
        score: total_base_score,
      },
      {
        type: "worry",
        worry_type: worry_type_score_result[0].type,
        score: worry_type_score_result[0].score,
        rank: 1,
      },
      {
        type: "worry",
        worry_type: worry_type_score_result[1].type,
        score: worry_type_score_result[1].score,
        rank: 2,
      },
    ];

    if (this.is_re_qna_panthenol == false) {


      // this.worry_select.first, this.worry_select.second

      // 2순위가 0점이고
      if (section[2].score == 0) {
        // 전 문진 순위에 있는 고민을
        // 재문진때 선택한 고민 있으면 이전 순위의 score 입력
        let section_index1 = section.findIndex((e) => e.worry_type == this.worry_select.first);
        let section_index2 = section.findIndex((e) => e.worry_type == this.worry_select.second);
        if (section_index1 < 0) {
          if (parnet_worry_rank.first.worry_type == this.worry_select.first) {
            section[2].worry_type = parnet_worry_rank.first.worry_type;
            section[2].score = parnet_worry_rank.first.score;
          }
          if (parnet_worry_rank.second.worry_type == this.worry_select.first) {
            section[2].worry_type = parnet_worry_rank.second.worry_type;
            section[2].score = parnet_worry_rank.second.score;
          }
        }
        if (section_index2 < 0) {
          if (parnet_worry_rank.first.worry_type == this.worry_select.second) {
            section[2].worry_type = parnet_worry_rank.first.worry_type;
            section[2].score = parnet_worry_rank.first.score;
          }
          if (parnet_worry_rank.second.worry_type == this.worry_select.second) {
            section[2].worry_type = parnet_worry_rank.second.worry_type;
            section[2].score = parnet_worry_rank.second.score;
          }
        }
      }

      re_qna_section[1] = {
        type: "worry",
        worry_type: section[1].worry_type,
        score: section[1].score,
        rank: 1,
        ampoule: null,
        ampoule_sequence: null,
      };

      re_qna_section[2] = {
        type: "worry",
        worry_type: section[2].worry_type,
        score: section[2].score,
        rank: 2,
        ampoule: null,
        ampoule_sequence: null,
      };

      let find_index1 = re_qna_section.findIndex((e) => e.worry_type == parnet_worry_rank.first.worry_type);
      if (find_index1 > -1) {
        re_qna_section[find_index1].score = parnet_worry_rank.first.score;
        if (this.re_qna_worry_ampoule.first_worry == "keep") {
          re_qna_section[find_index1].ampoule = parnet_worry_rank.first.keep_ampoule;
          re_qna_section[find_index1].ampoule_sequence = parnet_worry_rank.first.keep_sequence;
        } else {
          re_qna_section[find_index1].ampoule = parnet_worry_rank.first.next_ampoule;
          re_qna_section[find_index1].ampoule_sequence = parnet_worry_rank.first.next_sequence;
        }
      }

      if (parnet_worry_rank.first.worry_type != parnet_worry_rank.second.worry_type) {
        let find_index2 = re_qna_section.findIndex((e) => e.worry_type == parnet_worry_rank.second.worry_type);
        if (find_index2 > -1) {
          re_qna_section[find_index2].score = parnet_worry_rank.second.score;
          if (this.re_qna_worry_ampoule.second_worry == "keep") {
            re_qna_section[find_index2].ampoule = parnet_worry_rank.second.keep_ampoule;
            re_qna_section[find_index2].ampoule_sequence = parnet_worry_rank.second.keep_sequence;
            if (parnet_worry_rank.second.ampoule_type == "concept") {
              re_qna_section[find_index2].ampoule_sequence = 0;
            }
          } else {
            re_qna_section[find_index2].ampoule = parnet_worry_rank.second.next_ampoule;
            re_qna_section[find_index2].ampoule_sequence = parnet_worry_rank.second.next_sequence;
            if (parnet_worry_rank.second.ampoule_type == "concept") {
              re_qna_section[find_index2].ampoule_sequence = 3;
            }
          }
        }
      }

      // 전 문진의 2순위 컨셉 엠플이고
      // 재문진의 2순위가 컨셉 엠플이 X 현재 스코어 입력 한다
      // 주름/모공, 색소/모공, 민감/모공, 모공/민감 ( 컨셉 엠플 나오는 케이스 )
      let parent_first_worry = this.parent_worry_info.find((e) => e.rank == 1);
      let parent_second_worry = this.parent_worry_info.find((e) => e.rank == 2);
      let concept_first_worry_list = [
        "wrinkle",
        "color",
        "sensitive"
      ];
      if (
        (concept_first_worry_list.indexOf(parent_first_worry.worry_type) > -1 && parent_second_worry.worry_type == "pore") ||
        (parent_first_worry.worry_type == "pore" && parent_second_worry.worry_type == "sensitive")
      ) {
        // 전 문진의 2순위 컨셉 엠플이고
        if (
          (concept_first_worry_list.indexOf(re_qna_section[1].worry_type) > -1 && re_qna_section[2].worry_type == "pore") ||
          (re_qna_section[1].worry_type == "pore" && re_qna_section[2].worry_type == "sensitive")
        ) {
            //
        } else {
          // 재문진의 2순위가 컨셉 엠플이 X 현재 스코어 입력 한다
          re_qna_section[2] = {
            type: "worry",
            worry_type: section[2].worry_type,
            score: section[2].score,
            rank: 2,
            ampoule: null,
            ampoule_sequence: null,
          };
        }
      }
    }

    // 민감 20으로 보낸다
    if (this.is_re_qna_panthenol == true) {
      // 민감 20이면
      // > 엠플 다음 단계

      // 민감 20이 아니면
      // > 판테놀이 아니면 > 20점의 엠플 첫 단계
      // > 판테놀이면 > 20점의 2번째 단계

      let panthenol_code = this.panthenol_bulk_code[surveyCommon.survey_mall_id];
      const find_ampoule_assign = this.ampoule_assign.find((e) => e.worry_type == "sensitive" && e.score == 20);
      let sensitive_find = this.parent_worry_info.find((e) => e.type == "worry" && e.worry_type == "sensitive");
      // 이전 문진에서 민감 엠플 받은 경우
      if (sensitive_find) {
        // 다음 차순 엠플 엠플 입력
        let count = sensitive_find.ampoule_sequence;
        if (count < 4) {
          count++;
        } else {
          count = 1;
        }
        const _find_ampoule_assign = this.ampoule_assign.find((e) => e.worry_type == "sensitive" && Number(sensitive_find.score) == Number(e.score));
        let find_ampoule = _find_ampoule_assign.ampoules.find((e) => e.sequence == count);
        for (let _section of re_qna_section) {
          if (_section.type == "worry" && _section.rank == 1) {
            _section.worry_type = "sensitive";
            _section.score = Number(sensitive_find.score);
            _section.ampoule = find_ampoule.bulk_code;
            _section.ampoule_sequence = count;
          }
          if (_section.type == "worry" && _section.rank == 2) {
            _section.worry_type = "sensitive";
            _section.score = 0;
            _section.ampoule = null;
            _section.ampoule_sequence = null;
          }
        }
        /*
        // 민감 20보다 크면
        if (sensitive_find.score > 20) {
          // 판테놀 엠플일떄 다음 엠플
          if (sensitive_find.ampoule == panthenol_code) {
            let find_ampoule = find_ampoule_assign.ampoules.find((e) => e.sequence == 2);
            for (let _section of re_qna_section) {
              if (_section.type == "worry" && _section.rank == 1) {
                _section.worry_type = "sensitive";
                _section.score = 20;
                _section.ampoule = find_ampoule.bulk_code;
                _section.ampoule_sequence = 2;
              }
              if (_section.type == "worry" && _section.rank == 2) {
                _section.worry_type = "sensitive";
                _section.score = 0;
                _section.ampoule = null;
                _section.ampoule_sequence = null;
              }
            }
          // 판테놀 엠플 아닐때 판테놀 엠플
          } else {
            let find_ampoule = find_ampoule_assign.ampoules.find((e) => e.sequence == 1);
            for (let _section of re_qna_section) {
              if (_section.type == "worry" && _section.rank == 1) {
                _section.worry_type = "sensitive";
                _section.score = 20;
                _section.ampoule = find_ampoule.bulk_code;
                _section.ampoule_sequence = 1;
              }
              if (_section.type == "worry" && _section.rank == 2) {
                _section.worry_type = "sensitive";
                _section.score = 0;
                _section.ampoule = null;
                _section.ampoule_sequence = null;
              }
            }
          }
        // 민감 20 이거나 작으면
        } else {
          let count = sensitive_find.ampoule_sequence;
          if (count < 4) {
            count++;
          } else {
            count = 1;
          }
          let find_ampoule = find_ampoule_assign.ampoules.find((e) => e.sequence == count);
          for (let _section of re_qna_section) {
            if (_section.type == "worry" && _section.rank == 1) {
              _section.worry_type = "sensitive";
              _section.score = 20;
              _section.ampoule = find_ampoule.bulk_code;
              _section.ampoule_sequence = count;
            }
            if (_section.type == "worry" && _section.rank == 2) {
              _section.worry_type = "sensitive";
              _section.score = 0;
              _section.ampoule = null;
              _section.ampoule_sequence = null;
            }
          }
        }
        */
      } else {
        // 이전 문진에서 민감 엠플을 받지 않은 경우
        let find_ampoule = find_ampoule_assign.ampoules.find((e) => e.sequence == 1);
        for (let _section of re_qna_section) {
          if (_section.type == "worry" && _section.rank == 1) {
            _section.worry_type = "sensitive";
            _section.score = 20;
            _section.ampoule = find_ampoule.bulk_code;
            _section.ampoule_sequence = 1;
          }
          if (_section.type == "worry" && _section.rank == 2) {
            _section.worry_type = "sensitive";
            _section.score = 0;
            _section.ampoule = null;
            _section.ampoule_sequence = null;
          }
        }
      }
    }

    let custom_survey_history_hierarchy = [];
    let worry_count = 1;
    for (const hierarchy_id of this.survey_history_hierarchy) {
      let question_info = this.searchReQuestionHierarchyInfo(Number(hierarchy_id));
      if (question_info) {
        let question_subject = question_info.subject;
        let answer_text = null;
        if (question_info.question_type == "worry") {
          // 닉네임 치환
          question_subject = question_info.question_description;
          let _worry = this.parent_worry_info.find((e) => e.type == "worry" && Number(e.rank) == worry_count);
          question_subject = question_subject.replace("{#worry}", this.worry_type_list[_worry.worry_type]);
          worry_count++;
        }
    
        if (question_info.question_type == "feedback") {
          if (this.feed_back_memo) {
            answer_text = this.feed_back_memo;
          }
        }
    
        if (Number(question_info.hierarchy_id) == Number(this.re_qna_text_content_textarea[surveyCommon.survey_mall_id]) && this.inconvenience_text != "") {
          answer_text = this.inconvenience_text;
        }
    
        for (const answer of question_info.children) {
          if (Number(answer.hierarchy_id) == Number(hierarchy_id)) {
            custom_survey_history_hierarchy.push({
              hierarchy_id,
              question: question_subject,
              answer: answer_text
            });
          }
        }
      }
    }
    re_qna_section[0].score = total_base_score;

    console.log("parnet_worry_rank", JSON.parse(JSON.stringify(parnet_worry_rank)));
    console.log("re_qna_section", JSON.parse(JSON.stringify(re_qna_section)));

    // 자극과 트러블이 지속적으로 발생했어요 (판테놀) 선택 안했을때
    if (this.is_re_qna_panthenol == false) {

      /*
        1. 1순위 / 2순위 동일한 경우 : 건조/주름 -> 건조/주름
          > 이전 문진의 스코어 그대로 따라간다
          > 유지, 다음에 따라 엠플 찾아 입력
      */
      if (section[1].worry_type == parnet_worry_rank.first.worry_type && section[2].worry_type == parnet_worry_rank.second.worry_type) {
        re_qna_section[1].score = parnet_worry_rank.first.score;
        re_qna_section[1].worry_type = parnet_worry_rank.first.worry_type;
        re_qna_section[1].rank = 1;

        if (this.re_qna_worry_ampoule.first_worry == "keep") {
          re_qna_section[1].ampoule = parnet_worry_rank.first.keep_ampoule;
          re_qna_section[1].ampoule_sequence = parnet_worry_rank.first.keep_sequence;
        } else {
          re_qna_section[1].ampoule = parnet_worry_rank.first.next_ampoule;
          re_qna_section[1].ampoule_sequence = parnet_worry_rank.first.next_sequence;
        }

        re_qna_section[2].score = parnet_worry_rank.second.score;
        re_qna_section[2].worry_type = parnet_worry_rank.second.worry_type;
        re_qna_section[2].rank = 2;

        if (this.re_qna_worry_ampoule.second_worry == "keep") {
          re_qna_section[2].ampoule = parnet_worry_rank.second.keep_ampoule;
          re_qna_section[2].ampoule_sequence = parnet_worry_rank.second.keep_sequence;
          /*
            2순위가
            모공(컨셉2.트러블개선&진정)
            미백(컨셉3.미백&안티에이징)
            일경우 0
            유지일때 0 전송
          */
          if (parnet_worry_rank.second.ampoule_type == "concept") {
            re_qna_section[2].ampoule_sequence = 0;
          }
        } else {
          re_qna_section[2].ampoule = parnet_worry_rank.second.next_ampoule;
          re_qna_section[2].ampoule_sequence = parnet_worry_rank.second.next_sequence;
          /*
            2순위가
            모공(컨셉2.트러블개선&진정)
            미백(컨셉3.미백&안티에이징)
            일경우 3
            3%일때 3 전송
          */
          if (parnet_worry_rank.second.ampoule_type == "concept") {
            re_qna_section[2].ampoule_sequence = 3;
          }
        }
      }
      // 주름/모공 -> 모공/주름
      // 색소/모공 -> 모공/색소
      // 모공/색소 -> 색소/모공
      // 모공/민감 -> 민감/모공
      // 모공/주름 -> 주름/모공
      else if (
        (parnet_worry_rank.first.worry_type == "wrinkle" && parnet_worry_rank.second.worry_type == "pore" && section[1].worry_type == "pore" && section[2].worry_type == "wrinkle") ||
        (parnet_worry_rank.first.worry_type == "color" && parnet_worry_rank.second.worry_type == "pore" && section[1].worry_type == "pore" && section[2].worry_type == "color") ||
        (parnet_worry_rank.first.worry_type == "pore" && parnet_worry_rank.second.worry_type == "color" && section[1].worry_type == "color" && section[2].worry_type == "pore") ||
        (parnet_worry_rank.first.worry_type == "pore" && parnet_worry_rank.second.worry_type == "sensitive" && section[1].worry_type == "sensitive" && section[2].worry_type == "pore") ||
        (parnet_worry_rank.first.worry_type == "pore" && parnet_worry_rank.second.worry_type == "wrinkle" && section[1].worry_type == "wrinkle" && section[2].worry_type == "pore")
      ) {
        re_qna_section[1].score = section[1].score;
        re_qna_section[1].worry_type = section[1].worry_type;
        re_qna_section[1].rank = 1;
        re_qna_section[1].ampoule = null;
        re_qna_section[1].ampoule_sequence = null;
    
        re_qna_section[2].score = section[2].score;
        re_qna_section[2].worry_type = section[2].worry_type;
        re_qna_section[2].rank = 2;
        re_qna_section[2].ampoule = null;
        re_qna_section[2].ampoule_sequence = null;
      }
      else if (section[1].worry_type == parnet_worry_rank.second.worry_type && section[2].worry_type == parnet_worry_rank.first.worry_type) {

        re_qna_section[1].score = parnet_worry_rank.second.score;
        re_qna_section[1].worry_type = parnet_worry_rank.second.worry_type;
        re_qna_section[1].rank = 1;

        if (this.re_qna_worry_ampoule.second_worry == "keep") {
          re_qna_section[1].ampoule = parnet_worry_rank.second.keep_ampoule;
          re_qna_section[1].ampoule_sequence = parnet_worry_rank.second.keep_sequence;
          if (parnet_worry_rank.second.ampoule_type == "concept") {
            re_qna_section[1].ampoule_sequence = 0;
          }
        } else {
          re_qna_section[1].ampoule = parnet_worry_rank.second.next_ampoule;
          re_qna_section[1].ampoule_sequence = parnet_worry_rank.second.next_sequence;
          if (parnet_worry_rank.second.ampoule_type == "concept") {
            re_qna_section[1].ampoule_sequence = 3;
          }
        }

        re_qna_section[2].score = parnet_worry_rank.first.score;
        re_qna_section[2].worry_type = parnet_worry_rank.first.worry_type;
        re_qna_section[2].rank = 2;

        if (this.re_qna_worry_ampoule.first_worry == "keep") {
          re_qna_section[2].ampoule = parnet_worry_rank.first.keep_ampoule;
          re_qna_section[2].ampoule_sequence = parnet_worry_rank.first.keep_sequence;
          if (parnet_worry_rank.first.ampoule_type == "concept") {
            re_qna_section[2].ampoule_sequence = 0;
          }
        } else {
          re_qna_section[2].ampoule = parnet_worry_rank.first.next_ampoule;
          re_qna_section[2].ampoule_sequence = parnet_worry_rank.first.next_sequence;
          if (parnet_worry_rank.first.ampoule_type == "concept") {
            re_qna_section[2].ampoule_sequence = 3;
          }
        }
      }
      else {
        //
      }

      if (re_qna_section[1].score <= 0) {
        re_qna_section[1].worry_type = null;
      }
  
      if (re_qna_section[2].score <= 0) {
        re_qna_section[2].worry_type = null;
      }
    }

    // 이전 문진이 모공베이스인 경우 에센스 베이스 1 변경
    if (this.is_re_qna_panthenol == true && is_pore == true) {
      re_qna_section[0].score = 1;
    }

    // 컨셉원료 앱플인 경우 함량을 3% 고정 하기 위해
    // 추가 앰플 예외 처리
    if (this.re_qna_worry_ampoule.second_worry == "next" && re_qna_section[2].ampoule_sequence && re_qna_section[2].ampoule_sequence == 3) {
      // 주름/모공, 색소/모공, 민감/모공, 모공/민감
      let exception_bulk_list = [
        {
          first_bulk: "wrinkle",
          second_bulk: "pore"
        },
        {
          first_bulk: "color",
          second_bulk: "pore"
        },
        {
          first_bulk: "sensitive",
          second_bulk: "pore"
        },
        {
          first_bulk: "pore",
          second_bulk: "sensitive"
        },
      ];
      let exception_bulk_index = exception_bulk_list.findIndex((e) => e.first_bulk == re_qna_section[1]?.worry_type && e.second_bulk == re_qna_section[2]?.worry_type);
      if (exception_bulk_index > -1) {
        let find_bulk_code_index = bulk_code_list.findIndex((e) => e.bulk_code == this.worry_type_bulk_code_list[surveyCommon.survey_mall_id].sensitive);
        if (find_bulk_code_index > -1) {
          bulk_code_list.splice(find_bulk_code_index, 1);
        }
      }
      // 모공/색소
      if (re_qna_section[1]?.worry_type == "pore" && re_qna_section[2]?.worry_type == "color") {
        let find_bulk_code_index = bulk_code_list.findIndex((e) => e.bulk_code == this.worry_type_bulk_code_list[surveyCommon.survey_mall_id].color);
        if (find_bulk_code_index > -1) {
          bulk_code_list.splice(find_bulk_code_index, 1);
        }
      }
    }

    // 1순위: 없음, 2순위: 없음 인경우
    // 1순위: 민감(30), 2순위: 건조 (20) 준다
    if (re_qna_section[1]?.worry_type == null && re_qna_section[2]?.worry_type == null) {
      re_qna_section[1].worry_type = "sensitive";
      re_qna_section[1].score = 30;
      re_qna_section[1].ampoule = null;
      re_qna_section[1].ampoule_sequence = null;

      re_qna_section[2].worry_type = "dry";
      re_qna_section[2].score = 20;
      re_qna_section[2].ampoule = null;
      re_qna_section[2].ampoule_sequence = null;
    }


    // 1순위: 모공, 2순위: 민감 - 예외처리
    // 1순위:모공, 2순위: 민감, 1순위 엠플: 진정,	2순위 엠플: 모공(컨셉2.트러블개선&진정)
    // 민감 -> 진정, 모공 -> 모공(컨셉2.트러블개선&진정) 주기 위함
    if (re_qna_section[1].worry_type == "pore" && re_qna_section[2].worry_type == "sensitive") {
      let first_worry_info = re_qna_section[2];
      first_worry_info.rank = 1;
      let second_worry_info = re_qna_section[1];
      second_worry_info.rank = 2;

      re_qna_section[1] = first_worry_info;
      re_qna_section[2] = second_worry_info;
    }


    let result = {
      hash,
      product_no: this.survey_qna_product_no[surveyCommon.survey_mall_id],
      hierarchy_ids: custom_survey_history_hierarchy,
      section: re_qna_section,
      ampoule: bulk_code_list,
      member: {
        product_name: this.product_name,
        member_id: surveyCommon.survey_member_id,
        birth_date: this.parent_survey_result?.birth_date,
        gender: this.parent_survey_result.essence_result.gender,
        feed_back_memo: this.feed_back_memo
      },
    };
    try {
      let url = `/front/skin_care/product/${this.survey_qna_product_no[surveyCommon.survey_mall_id]}/re_qna`;
      let survey_result = await surveyCommon.postSurveyAjax(url, result);
      if (surveyCommon?.survey_member_id == "zdsa529" || surveyCommon?.survey_member_id == "rahul") {
        return;
      }
     location.replace(`/survey_essence/result.html?product_no=${this.product_no}&hash=${hash}&re_qna_hash=${survey_result.hash}&qna_at=${qna_at}`);
    } catch (e) {
      console.log(e);
    }
  }

  // 아이콘 클릭
  reQnaAnswerIconCilck(e) {
    survey_jQuery(".dontKnow a").removeClass("active");
    let icon_id = survey_jQuery(e).attr("id");
    let icon_no = icon_id.replace("rate", "");
    survey_jQuery(".tyTitle span").removeClass("active");
    survey_jQuery(`#ty${icon_no}`).addClass("active");

    let target_class = ".first_worry";
    if (survey_jQuery(e).hasClass("first_worry") == false) {
      target_class = ".second_worry";
    }

    survey_jQuery(target_class + ".line_checked").removeClass("line_checked");
    survey_jQuery(e).addClass("line_checked");
  }
  // 다음 질문 hierarchy_id + 정보 찾기
  getNextReQuestionHierarchyId(hierarchy_id) {
    let qna_hierarchy_sequence = 1;
    for (let j = 0; j < this.re_qna_hierarchy.length; j++) {
      if (this.re_qna_hierarchy[j].type == "re_qna_folder") {
        // 인트로 체크
        if (Number(this.re_qna_hierarchy[j].hierarchy_id) == Number(hierarchy_id)) {
          let folder_index = j + 1;
          if (this.re_qna_hierarchy[folder_index]) {
            if (this.re_qna_hierarchy[folder_index].intro_status == "enabled") {
              return {
                folder_sequence: Number(this.re_qna_hierarchy[folder_index].sequence),
                qna_sequence: Number(this.re_qna_hierarchy[folder_index].sequence),
                hierarchy_id: Number(this.re_qna_hierarchy[folder_index].hierarchy_id),
                params: Number(this.re_qna_hierarchy[folder_index]),
              };
            } else {
              return {
                folder_sequence: Number(this.re_qna_hierarchy[folder_index].sequence),
                qna_sequence: Number(this.re_qna_hierarchy[folder_index].children[0].sequence),
                hierarchy_id: Number(this.re_qna_hierarchy[folder_index].children[0].hierarchy_id),
                params: this.re_qna_hierarchy[folder_index].children[0],
              };
            }
          }
        }

        // 다음 질문 체크
        let children = this.re_qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (Number(children[i].hierarchy_id) == Number(hierarchy_id)) {
            qna_hierarchy_sequence = Number(this.re_qna_hierarchy[j].sequence);
            if (children[i + 1]) {
              return {
                folder_sequence: Number(this.re_qna_hierarchy[j].sequence),
                qna_sequence: Number(children[i + 1].sequence),
                hierarchy_id: Number(children[i + 1].hierarchy_id),
                params: children[i + 1],
              };
            } else {
              continue;
            }
          }
        }
      }
    }

    // 다음 폴더 체크
    qna_hierarchy_sequence += 1;
    for (let j = 0; j < this.re_qna_hierarchy.length; j++) {
      if (this.re_qna_hierarchy[j].type == "re_qna_folder") {
        let children = this.re_qna_hierarchy[j].children;
        if (
          Number(this.re_qna_hierarchy[j].sequence) == qna_hierarchy_sequence &&
          children.length > 0
        ) {
          return {
            folder_sequence: Number(this.re_qna_hierarchy[j].sequence),
            qna_sequence: Number(children[0].sequence),
            hierarchy_id: Number(children[0].hierarchy_id),
            params: children[0],
          };
        }
      }
    }
    return null;
  }
  feedbackClear() {
    survey_jQuery(".autoTextarea").val("");
  }
  // 답변 hierarchy_id로 질문 정보 찾기
  searchReQuestionHierarchyInfo(hierarchy_id) {
    let question_info = null;
    for (let j = 0; j < this.re_qna_hierarchy.length; j++) {
      if (this.re_qna_hierarchy[j].type == "re_qna_folder") {
        // 인트로
        if (Number(this.re_qna_hierarchy[j].hierarchy_id) == Number(hierarchy_id)) {
          question_info = this.re_qna_hierarchy;
        }
        let children = this.re_qna_hierarchy[j].children;
        for (let i = 0; i < children.length; i++) {
          if (Number(hierarchy_id) == Number(children[i].hierarchy_id)) {
            question_info = children[i];
          }
          let answer_list = children[i].children;
          for (let l = 0; l < answer_list.length; l++) {
            if (Number(answer_list[l].hierarchy_id) == Number(hierarchy_id)) {
              question_info = children[i];
            }
          }
        }
      }
    }
    return question_info;
  }
  // 재문진 다음 질문 찾기
  getNextReQuestion(hierarchy_id) {
    if (!hierarchy_id) {
      return null;
    }
    let next_info = this.getNextReQuestionHierarchyId(Number(hierarchy_id));
    let process_where_result = this.checkReQnaProcessWhere(Number(next_info.hierarchy_id));
    if (process_where_result == false) {
      return this.getNextReQuestion(Number(next_info.hierarchy_id));
    }
    return next_info;
  }

  // 처방 앰플 배정 순서 조회
  async getAmpouleAssign() {
    let self = this;
    let url = `/front/skin_care/ampoule_assign`;
    return new Promise(async function (resolve, reject) {
      await surveyCommon
        .getSurveyAjax(url)
        .then(function (res) {
          self.ampoule_assign = res;
          resolve(res);
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  }
  surveyTextAreaReSize() {

    /* textarea 높이 자동 조절 */
    const SURVEY_DEFAULT_HEIGHT = 24; // textarea 기본 height

    const $survey_textarea = document.querySelector('.autoTextarea');

    if ($survey_textarea) {
      $survey_textarea.oninput = (event) => {
        const $survey_target = event.target;
        $survey_target.style.height = 0;
        $survey_target.style.height = SURVEY_DEFAULT_HEIGHT + $survey_target.scrollHeight + 'px';
        this.inconvenience_text_height = $survey_target.style.height;
      };

      this.inconvenience_text = survey_jQuery(".autoTextarea").val();
    }
  }
  surveyFeedBackTextAreaReSize() {

    /* textarea 높이 자동 조절 */
    let SURVEY_DEFAULT_HEIGHT = 24; // textarea 기본 height

    let $survey_textarea = document.querySelector('.autoTextarea');

    if ($survey_textarea) {
      $survey_textarea.oninput = (event) => {
        let $survey_target = event.target;
        $survey_target.style.height = 0;
        $survey_target.style.height = SURVEY_DEFAULT_HEIGHT + $survey_target.scrollHeight + 'px';
        this.feed_back_memo_height = $survey_target.style.height;
      };

      this.feed_back_memo = survey_jQuery(".autoTextarea").val();
    }
  }

  async getSurveyResultWorry(hash) {
    let self = this;
    let url = `/front/skin_care/worry?hash=${hash}`;
    await surveyCommon
      .getSurveyAjax(url)
      .then(function (res) {
        self.parent_worry_info = res;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  // 예외 처리
  setExceptionWorry() {

    let first_worry = this.parent_survey_result.essence_result.essence_result.care_point?.worry_list[0];
    let second_worry = this.parent_survey_result.essence_result.essence_result.care_point?.worry_list[1];

    // 건조 없음 - 보습, 아쿠아실앰플 >> 보습(합산점수), 진정30
    if (first_worry.worry_type == "dry" && !second_worry) {
      this.parent_worry_info[2] = {
        type: "worry",
        worry_type: "sensitive",
        score: 30,
        rank: 2,
        ampoule: this.aquasill_bulk_code[surveyCommon.survey_mall_id],
        ampoule_type: "chemical",
        ampoule_sequence: 1,
      };
      this.parent_survey_result.essence_result.essence_result.care_point.worry_list.push({
        worry_type: "sensitive",
      });
    }

    // 주름 없음 - 탄력, 11.베타인 >> 탄력(합산점수), 보습20
    // 색소 없음 - 미백, 11.베타인 >> 미백(합산점수), 보습20
    // 민감 없음 - 진정, 11.베타인 >> 진정(합산점수), 보습20
    // 모공 없음 - 모공, 11.베타인 >> 모공(합산점수), 보습20
    if ((first_worry.worry_type == "wrinkle" || first_worry.worry_type == "color" || first_worry.worry_type == "sensitive" || first_worry.worry_type == "pore") && !second_worry) {
      this.parent_worry_info[2] = {
        type: "worry",
        worry_type: "dry",
        score: 20,
        rank: 2,
        ampoule: this.betaine_bulk_code[surveyCommon.survey_mall_id],
        ampoule_type: "chemical",
        ampoule_sequence: 1,
      };
      this.parent_survey_result.essence_result.essence_result.care_point.worry_list.push({
        worry_type: "dry",
      });
    }
  }
}
