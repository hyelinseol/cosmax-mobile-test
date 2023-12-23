const surveyCommonSideBar = new SurveyCommon();
const surveyDiagnosis = new SurveyDiagnosis();

async function setUpdateSurveyResultMember(product_no, hash, member_id) {
  let set_parma = {
    member: {
      member_id
    },
    hash
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${surveyCommonSideBar.survey_domain}/app/${surveyCommonSideBar.survey_app_name}/mall/${surveyCommonSideBar.survey_mall_id}/api/survey/shops/${surveyCommonSideBar.survey_shop_no}/front/product/${product_no}/member`,
      type: "PUT",
      accept: "application/json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(set_parma),
      success: async function (result) {
        sessionStorage.removeItem("survey_result_product_no");
        sessionStorage.removeItem("survey_result_hash");
        sessionStorage.removeItem("survey_result_show_diagnosis");

        resolve(result);
      },
      error: function (request, status, error) {
        resolve([]);
      },
    });
  });
}

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      setTimeout(async function () {
        await surveyCommonSideBar.getCafe24CustomerInfo(CAFE24API);
        let search_from = dayjs().subtract(6, "month").format("YYYY-MM-DD");
        let search_to = dayjs().format("YYYY-MM-DD");
        let diagnosis_result = await surveyDiagnosis.getAllList(
          surveyCommonSideBar.survey_member_id,
          search_from,
          search_to
        );
        survey_jQuery("#survey_sidebar_diagnosis_count").text(diagnosis_result.length);

        let qna_link_list = surveyCommonSideBar.survey_qna_link_list[surveyCommonSideBar.survey_mall_id];
        for (const qna_link of qna_link_list) {
          if (qna_link.type == "hair_care" && qna_link.detail_type == "") {
            survey_jQuery(".survey_hair_care").attr("href", qna_link.survey_link);
          }
          if (qna_link.type == "skin_care") {
            survey_jQuery(".survey_skin_care").attr("href", qna_link.survey_link);
          }
        }

        let snap_writeable_review_count = survey_jQuery(".snap_writeable_review_count").text().trim();
        if (snap_writeable_review_count.length == 0) {
          survey_jQuery(".snap_writeable_review_count").text("0");
        }

        let survey_coupon_count = survey_jQuery(".survey_coupon_count").text().trim();
        if (survey_coupon_count.length == 0) {
          survey_jQuery(".survey_coupon_count").text("0");
        }
        let survey_mileage_count = survey_jQuery(".survey_mileage_count").text().trim();
        if (survey_mileage_count.length == 1) {
          survey_jQuery(".survey_mileage_count").text("0P");
        }

        if (surveyCommonSideBar.survey_member_id) {
          let survey_result_product_no = sessionStorage.getItem("survey_result_product_no");
          let survey_result_hash = sessionStorage.getItem("survey_result_hash");
          if (survey_result_product_no && survey_result_hash) {
            let survey_result_show_diagnosis = sessionStorage.getItem("survey_result_show_diagnosis");
            await setUpdateSurveyResultMember(survey_result_product_no, survey_result_hash, surveyCommonSideBar.survey_member_id);
            if (survey_result_show_diagnosis) {
              alert("진단내역이 저장되었습니다.");
            }
          }
        }

      }, 1000);
    })(
      CAFE24API.init({
        client_id: surveyCommonSideBar.app_client_id,
        version: surveyCommonSideBar.app_version,
      })
    );
  },
  false
);
