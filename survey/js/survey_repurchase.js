const surveyCommon = new SurveyCommon();
const surveyRepurchase = new SurveyRepurchase();

let product_no = surveyCommon.shoplusGetParameters("product_no");
let hash = surveyCommon.shoplusGetParameters("hash");
let qna_at = surveyCommon.shoplusGetParameters("qna_at");

window.addEventListener(
  "load",
  function (event) {
    (async function (CAFE24API) {
      setTimeout(async function () {
        await surveyCommon.getCafe24CustomerInfo(CAFE24API);

        qna_at = qna_at.replace(/\./gi, '-');
        qna_at = dayjs(qna_at).format("YYYY-MM-DD");

        // 진단 조회 
        let survey_diagnoses_result = await surveyRepurchase.getSurveyResult(hash, qna_at);

        for (const survey_diagnoses of survey_diagnoses_result) {
          for ( diagnose of survey_diagnoses) {
            if (diagnose.hash == hash) {
              let find_product = surveyCommon.survey_product_list[surveyCommon.survey_mall_id].find((e) => Number(e.no) == Number(product_no));
              let view_path = "";
              let more_resilt_file = "";
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
            }
            const qna_at = dayjs(diagnose.qna_at).format("YYYY-MM-DD");
            let result_path = ``;
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
      }, 100);
    })(
      CAFE24API.init({
        client_id: surveyCommon.app_client_id,
        version: surveyCommon.app_version,
      })
    );
  },
  false
);
