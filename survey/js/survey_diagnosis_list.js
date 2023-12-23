const surveyCommon = new SurveyCommon();
const surveyMyShop = new SurveyMyShop();

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      let type = surveyCommon.shoplusGetParameters("type");

      let history_start_date = surveyCommon.shoplusGetParameters("history_start_date");
      let history_end_date = surveyCommon.shoplusGetParameters("history_end_date");
      let status = surveyCommon.shoplusGetParameters("status");

      await surveyCommon.getCafe24CustomerInfo(CAFE24API);
      await surveyMyShop.surveyGetProductVariants();

      setTimeout(async function () {
        await surveyCommon.getCafe24CustomerInfo(CAFE24API);

        // 문진 조회
        let from = dayjs().subtract(6, "month").format("YYYY-MM-DD");
        let to = dayjs().format("YYYY-MM-DD");

        if (history_start_date) {
          const date1 = dayjs(history_start_date);
          const date2 = dayjs(history_end_date);
          const diff = date2.diff(date1, "day");
          survey_jQuery("#survey_search_date").val(diff);

          from = history_start_date;
          to = history_end_date;
        }
        if (status) {
          survey_jQuery("#survey_search_status").val(status);
        }

        if (status != "diagnosis_ing") {
          let survey_result_list = await surveyMyShop.getSurveyResultByMemberId(from, to);
          surveyMyShop.surveySampleOrderCheck(survey_result_list);

          // 문진 노출
          surveyMyShop.setSurveyResultAllByMemberId(survey_result_list, type, status);
        }

        // 진단 이어하기 입력
        await surveyMyShop.setSurveyStorage();
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

async function surveySearch() {
  survey_jQuery(".message").addClass("displaynone");
  let survey_search_date = survey_jQuery("#survey_search_date").val();
  let survey_search_status = survey_jQuery("#survey_search_status").val();

  let status = `&status=${survey_search_status}`;
  let history_start_date = dayjs().subtract(survey_search_date, "day").format("YYYY-MM-DD");
  let history_end_date = dayjs().format("YYYY-MM-DD");
  location.href = `/myshop/mypage/diagnosis_list.html?history_start_date=${history_start_date}&history_end_date=${history_end_date}${status}`;

  /*
  let count = survey_jQuery(".treatHisBox").length;
  if (count == 0) {
    if (survey_search_status == "diagnosis_ing") {
      let display = survey_jQuery(".survey_progress").css("display");
      if (display == "none") {
        survey_jQuery(".message").removeClass("displaynone");
      }
    } else {
      survey_jQuery(".message").removeClass("displaynone");
    }
  }
*/
}
