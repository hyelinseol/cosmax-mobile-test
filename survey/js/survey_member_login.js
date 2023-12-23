window.addEventListener(
  "load",
  async function (event) {
    const surveyCommon = new SurveyCommon();
    (async function (CAFE24API) {
      let is_qna_product = false;
      await surveyCommon.getCafe24CustomerInfo(CAFE24API);
      const survey_basket_product = sessionStorage.getItem("survey_basket_product");
      if (survey_basket_product) {
        const survey_basket_product_list = JSON.parse(survey_basket_product);
        if (survey_basket_product_list && survey_basket_product_list.length > 0) {
          for (const survey_basket_product of survey_basket_product_list) {
            if (survey_basket_product) {
              let find = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => Number(e.no) == Number(survey_basket_product));
              if (find) {
                is_qna_product = true;
              }
            }
          }
        }
      }
    
      if (is_qna_product == false) {
        survey_jQuery("#noMemberWrap").show();
      }
      sessionStorage.removeItem("survey_basket_product");
    })(
      CAFE24API.init({
        client_id: surveyCommon.app_client_id,
        version: surveyCommon.app_version,
      })
    );
  },
  false
);