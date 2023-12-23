const surveyCommon = new SurveyCommon();

async function setSurveyLink() {
  (async function (CAFE24API) {
    await surveyCommon.getCafe24CustomerInfo(CAFE24API);

    // 문진 경로 link 수정
    for (const qna_link of surveyCommon.survey_qna_link_list[surveyCommon.survey_mall_id]) {
      // 헤어케어 문진 페이지 링크
      if (qna_link.type == "hair_care") {
        // survey_jQuery(".mainSurvey .hair a").attr("href", qna_link.survey_link);
        // survey_jQuery(".survey_hair_care").attr("href", qna_link.survey_link);
      }
      // 스킨케어 문진 페이지 링크
      if (qna_link.type == "skin_care") {
        // survey_jQuery(".mainSurvey .skin a").attr("href", qna_link.survey_link);
        // survey_jQuery(".survey_skin_care").attr("href", qna_link.survey_link);
      }
    }

    let main_survey_product_list = survey_jQuery(".main_survey_product");
    for (const main_survey_product of main_survey_product_list) {
      let product_no = survey_jQuery(main_survey_product).attr("product_no");
      let find_survey_product = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => Number(e.no) == Number(product_no));
      if (find_survey_product?.type == "hair_care") {
        survey_jQuery(main_survey_product).attr("href", "/product/detail_hair.html?product_no=" + product_no);
      }
      if (find_survey_product?.type == "skin_care") {
        survey_jQuery(main_survey_product).attr("href", "/product/detail_essence.html?product_no=" + product_no);
      }
    }
  })(
    CAFE24API.init({
      client_id: surveyCommon.app_client_id,
      version: surveyCommon.app_version,
    })
  );
}

setSurveyLink();
