window.addEventListener(
  "load",
  function (event) {
    (async function (CAFE24API) {

      survey_member_id = await surveyGetMemberInfo();
      if (!survey_member_id) {
        for (let i = 0; i < 5; i++) {
          survey_member_id = await surveyGetMemberInfo();
          if (survey_member_id) {
            break;
          }
        }
      }

      if (!survey_member_id) {
        return;
      }

      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;
      let product_no = shoplusGetParameters("product_no");
      let hash = shoplusGetParameters("hash");
      let qna_at = shoplusGetParameters("qna_at");

      qna_at = qna_at.replace(/\./gi, '-');
      qna_at = dayjs(qna_at).format("YYYY-MM-DD");

      // 진단 조회 
      // await getSurveyDiagnosisByHash(qna_at, qna_at, hash);
      // 진단 조회 
      let survey_diagnoses_result = await getSurveyDiagnoses(qna_at, qna_at);
      for (const diagnose of survey_diagnoses_result) {
        if (diagnose.hash == hash) {
          const qna_at = dayjs(diagnose.qna_at).format("YYYY-MM-DD");
          let result_path = ``;
          if (diagnose.qna_type == "qna") {
            result_path = `${survey_skin_path}/survey/result.html?product_no=${product_no}&hash=${diagnose.hash}&qna_at=${qna_at}`;
          } else {
            result_path = `${survey_skin_path}/survey/more_result.html?product_no=${product_no}&hash=${diagnose.before_hash}&qna_at=${qna_at}&re_qna_hash=${diagnose.hash}`;
          }
          survey_jQuery("#survey_same_product_re_buy").attr("href", result_path);
          survey_jQuery("#survey_feedback_re_buy").attr(
            "href",
            `${survey_skin_path}/survey/more.html?product_no=${product_no}&hash=${diagnose.hash}&qna_at=${qna_at}`
          );
        }
      }

      setTimeout(function () {
        setProductType(Number(product_no));
        survey_jQuery(".mBtn.gFixed").show();
      }, 1000);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
  },
  false
);
