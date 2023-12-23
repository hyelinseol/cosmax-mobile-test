const surveyCommon = new SurveyCommon();
const surveyRepurchase = new SurveyRepurchase();

let product_no = surveyCommon.shoplusGetParameters("product_no");
let hash = surveyCommon.shoplusGetParameters("hash");
let qna_at = surveyCommon.shoplusGetParameters("qna_at");

window.addEventListener(
  "load",
  function (event) {
    (async function (CAFE24API) {  

      await surveyCommon.getCafe24CustomerInfo(CAFE24API);

      // 진단 조회 
      let survey_diagnoses_result = await surveyRepurchase.getSurveyResult(hash, qna_at);
      for (const survey_diagnoses of survey_diagnoses_result) {
        for ( diagnose of survey_diagnoses) {
          if (diagnose.hash == hash) {

            let find_product = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => Number(e.no) == Number(product_no));
            console.log("find_product", find_product);
            let view_path = "";
            let more_resilt_file = "";
            let result_path = ``;

            if (find_product.type == "skin_care") {
              view_path = "survey_essence";
              more_resilt_file = "result.html";
              let find_set_essence = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => e.type == "skin_care" && e.product_type == "set_essence");
              if (find_set_essence) {
                product_no = find_set_essence.no;
              }
            }

            if (find_product.type == "hair_care") {
              view_path = "survey";
              more_resilt_file = "more_result.html";

              // 헤어케어 샘플
              if (find_product.product_type.indexOf("sample") > -1) {
                const sample_qna_at = dayjs(diagnose.qna_at).format("YYYY-MM-DD");
                if (diagnose.qna_type == "qna") {
                  result_path = `/${view_path}/sample_result.html?product_no=${product_no}&hash=${diagnose.hash}&qna_at=${sample_qna_at}`;
                } else {
                  result_path = `/${view_path}/sample_more_result.html?product_no=${product_no}&hash=${diagnose.before_hash}&qna_at=${sample_qna_at}&re_qna_hash=${diagnose.hash}`;
                }
                survey_jQuery("#survey_same_product_re_buy").attr("href", result_path);
                survey_jQuery("#survey_feedback_re_buy").attr(
                  "href",
                  `/${view_path}/sample_more.html?product_no=${product_no}&hash=${diagnose.hash}&qna_at=${sample_qna_at}`
                );
                return;
              }
            }

            const qna_at = dayjs(diagnose.qna_at).format("YYYY-MM-DD");
            if (diagnose.qna_type == "qna") {
              result_path = `/${view_path}/result.html?product_no=${product_no}&hash=${diagnose.hash}&qna_at=${qna_at}`;
            } else {
              result_path = `/${view_path}/${more_resilt_file}?product_no=${product_no}&hash=${diagnose.before_hash}&qna_at=${qna_at}&re_qna_hash=${diagnose.hash}`;
            }
            survey_jQuery("#survey_same_product_re_buy").attr("href", result_path);
            survey_jQuery("#survey_feedback_re_buy").attr(
              "href",
              `/${view_path}/more.html?product_no=${product_no}&hash=${diagnose.hash}&qna_at=${qna_at}`
            );
          }
        }
      }

      setTimeout(function () {
        survey_jQuery(".mBtn.gFixed").show();
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
