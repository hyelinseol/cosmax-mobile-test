const surveyCommon = new SurveyCommon();
let product_no = surveyCommon.shoplusGetParameters("product_no");
let type = surveyCommon.shoplusGetParameters("type");
const essenceSurvey = new EssenceSurvey(Number(product_no));

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {

      await surveyCommon.getCafe24CustomerInfo(CAFE24API);

      // 문진 조회
      await essenceSurvey.getSurveyQna();

      if (type && type == "connect") {
        // 임시저장 조회하기
        await essenceSurvey.getSurveyStorage();
      }

      // 메뉴바 리스트 가져오기
      essenceSurvey.getMenuProgressHtml();

      // 분기 조건 담기
      essenceSurvey.getProcessWhere();

      // 화면 노출
      if (type && type == "connect") {
        // 인트로 진행함
        essenceSurvey.intro = true;
        let next_info = essenceSurvey.getNextQuestionHierarchyId(Number(essenceSurvey.qna_hierarchy[0].hierarchy_id));
        essenceSurvey.folder_sequence = next_info.folder_sequence;
        essenceSurvey.qna_sequence = next_info.qna_sequence;
        essenceSurvey.setQnaHtml(next_info.params);
      } else {
        essenceSurvey.setQnaHtml(essenceSurvey.qna_hierarchy[0]);
      }

      setTimeout(async function () {
        await surveyCommon.getCafe24CustomerInfo(CAFE24API);
    }, 1000);
    })(
      CAFE24API.init({
        client_id: surveyCommon.app_client_id,
        version: surveyCommon.app_version,
      })
    );
  },
  false
);

// 뒤로 가기 시 이벤트
survey_jQuery(window).bind("hashchange", async function () {
  //
  await essenceSurvey.backWards();
});

// 새로고침시 #progress 제거
history.replaceState({}, null, location.pathname + location.search);
