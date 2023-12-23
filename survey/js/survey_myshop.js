const surveyCommon = new SurveyCommon();
const surveyMyShop = new SurveyMyShop();

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {

      let start_date = dayjs().subtract(1, "month").format("YYYY-MM-DD");
      let end_date = dayjs().format("YYYY-MM-DD");
      survey_jQuery(".survey_n10").attr("href", `/myshop/mypage/order_check.html?status=analysis&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n20").attr("href", `/myshop/mypage/order_check.html?status=ready&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n21").attr("href", `/myshop/mypage/order_check.html?status=prepare&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n30").attr("href", `/myshop/mypage/order_check.html?status=shipping&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n40").attr("href", `/myshop/mypage/order_check.html?status=complate&history_start_date=${start_date}&history_end_date=${end_date}`);
      survey_jQuery(".survey_n50").attr("href", `/myshop/mypage/order_check.html?status=feedbackloop&history_start_date=${start_date}&history_end_date=${end_date}`);

      await surveyCommon.getCafe24CustomerInfo(CAFE24API);
      await surveyMyShop.surveyGetProductVariants();

      setTimeout(async function () {
        await surveyCommon.getCafe24CustomerInfo(CAFE24API);
        // 문진 조회
        let from = dayjs().subtract(6, "month").format("YYYY-MM-DD");
        let to = dayjs().format("YYYY-MM-DD");
        let survey_result_list = await surveyMyShop.getSurveyResultByMemberId(from, to);
        surveyMyShop.surveySampleOrderCheck(survey_result_list);

        survey_jQuery("#survey_diagnosis_count").text(survey_result_list.length);

        // 문진 노출
        surveyMyShop.setSurveyResultByMemberId(survey_result_list);

        // 진단 이어하기 입력
        await surveyMyShop.setSurveyStorage();

        // 주문 count 입력
        await surveyMyShop.setOrderCount();

        let qna_link_list = surveyCommon.survey_qna_link_list[surveyCommon.survey_mall_id];
        for (const qna_link of qna_link_list) {
          if (qna_link.type == "hair_care" && qna_link.detail_type == "") {
            survey_jQuery(".survey_hair_care").attr("href", qna_link.survey_link);
          }
          if (qna_link.type == "skin_care") {
            survey_jQuery(".survey_skin_care").attr("href", qna_link.survey_link);
          }
        }

        let snap_writeable_review_count = survey_jQuery(".snap_writeable_review_count")
          .text()
          .trim();
        if (snap_writeable_review_count.length == 0) {
          survey_jQuery(".snap_writeable_review_count").text("0");
        }

        let survey_coupon_count = survey_jQuery(".survey_mypage_coupon_count").text().trim();
        if (survey_coupon_count.length == 0) {
          // survey_jQuery(".survey_mypage_coupon_count").text("0");
        }
        let survey_mileage_count = survey_jQuery(".survey_mypage_mileage_count").text().trim();
        if (survey_mileage_count.length == 1) {
          survey_jQuery(".survey_mypage_mileage_count").text("0P");
        }
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
