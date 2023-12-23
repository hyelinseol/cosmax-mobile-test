let add_view_count = 1;

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;
      surveyGetProductVariants();
      setTimeout(async function () {
        CAFE24API.getCustomerInfo(function (err, res) {
          return new Promise(function (resolve, reject) {
            survey_member_name = null;
            survey_member_id = null;
            if (res) {
              if (res.customer) {
                survey_member_name = res.customer.name;
                survey_member_id = res.customer.member_id;
              }
            }
            resolve(res);
          });
        });

        // 진단 내역 조회
        await getSurveyDiagnosisByDate();
        setSurveyDiagnosis();

        let update_at = null;
        let product_no = null;
        let result = await surveySearchSiagnosisIng();
        if (result) {
          for (const siagnosis of result) {
            if (!update_at) {
              update_at = siagnosis.updated_at;
              product_no = siagnosis.product_no;
            }
            if (dayjs(update_at) < dayjs(siagnosis.updated_at)) {
              update_at = siagnosis.updated_at;
              product_no = siagnosis.product_no;
            }
          }
        }

        let count = survey_jQuery(".treatHisBox").length;
        if (count == 0) {
          survey_jQuery(".check_box").hide();
        } else {
          survey_jQuery(".check_box").show();
        }

        let is_show_survey_progress = false;
        if (product_no) {
          if (Number(product_no) == survey_shampoo_no) {
            product_image = survey_product_resource.shampoo.list_image;
          } else if (Number(product_no) == survey_treatment_no) {
            product_image = survey_product_resource.treatment.list_image;
          } else {
            product_image = survey_product_resource.set_product.list_image;
          }
          survey_jQuery(".survey_progress_hair_img").attr("src", product_image);
          survey_jQuery(".survey_progress_hair_date").text(dayjs(update_at).format("YYYY.MM.DD"));
          survey_jQuery(".survey_progress_hair_link").attr(
            "href",
            `${survey_skin_path}/survey?product_no=${product_no}&type=connect`
          );

          if (count == 0) {
            survey_jQuery(".treatHis.padTop").css("padding-top", "0px");
            survey_jQuery(".order_history.ship").css("margin", "0px");
          }

          survey_jQuery(".survey_progress").show();
          is_show_survey_progress = true;
        }

        if (count <= 6) {
          survey_jQuery(".btn-more").hide();
          survey_jQuery(".survey_progress").css("margin-top", "0px");
          survey_jQuery(".diagnosisList .all_no_data").hide();
          if (count > 0) {
            survey_jQuery(".diagnosisList").addClass("diagnosisList2");
          }
          survey_jQuery(".treatHisBox").show();
        } else {
          survey_jQuery(".diagnosisList").show();
          survey_jQuery(".treatHisBox").each(function (index, element) {
            if (index < 6) {
              survey_jQuery(element).show();
            }
          });
        }

        if (count == 0 && !is_show_survey_progress) {
          // 진단이 없을때 `진단을 시작해보세요!` 노출
          survey_jQuery(".survey_diagnosis_start_link").attr(
            "href",
            `${survey_skin_path}/survey?product_no=${survey_set_product_no}`
          );
          survey_jQuery(".order_history.ship").css("margin", "0px");
          survey_jQuery(".treatHis.padTop").css("padding-top", "0px");
          survey_jQuery("#survey_event_banner").show();
          survey_jQuery(".survey_diagnosis_start").show();
        }
        survey_jQuery(".diagnosisList").show();
      }, 500);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
  },
  false
);

async function surveySearch() {
  add_view_count = 1;
  survey_jQuery(".message").addClass("displaynone");
  let survey_search_date = survey_jQuery("#survey_search_date").val();
  let survey_search_status = survey_jQuery("#survey_search_status").val();
  if (survey_search_status != "diagnosis_ing") {
    await getSurveyDiagnosisByDate(
      dayjs().subtract(survey_search_date, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
      null,
      survey_search_status
    );
    setSurveyDiagnosis();
  } else {
    let result = await surveySearchSiagnosisIng();
    surveySetSiagnosisIng(result);
  }

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

  if (count <= 6) {
    survey_jQuery(".btn-more").hide();
    if (count > 0) {
      survey_jQuery(".diagnosisList").addClass("diagnosisList2");
    }
    survey_jQuery(".treatHisBox").show();
  } else {
    survey_jQuery(".diagnosisList").show();
    survey_jQuery(".treatHisBox").each(function (index, element) {
      if (index < 6) {
        survey_jQuery(element).show();
      }
    });
  }
}

function addView() {
  //
  add_view_count += 1;

  let count = add_view_count * 6;
  survey_jQuery(".treatHisBox").each(function (index, element) {
    if (index < count) {
      survey_jQuery(element).show();
    } else {
      survey_jQuery(element).hide();
    }
  });

  if (count >= survey_jQuery(".treatHisBox").length) {
    survey_jQuery(".btn-more").hide();
  }
}
