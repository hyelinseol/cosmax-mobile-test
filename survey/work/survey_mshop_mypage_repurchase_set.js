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

      console.log("survey_member_id", survey_member_id);
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
      console.log("qna_at", qna_at);
      // 진단 조회 
      let result = await getSurveyDiagnosisByHash(qna_at, qna_at, hash);
      console.log("result >>> ", result);

      setTimeout(function () {
        console.log("show~");
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
