const surveyCommonProductList = new SurveyCommon();
let survey_cate_no = surveyCommonProductList.shoplusGetParameters("cate_no");

survey_jQuery(".prdList").hide();

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      await surveyCommonProductList.getCafe24CustomerInfo(CAFE24API);
      let find_category = surveyCommonProductList.survey_category_no_list[
        surveyCommonProductList.survey_mall_id
      ].find((e) => Number(e.no) == Number(survey_cate_no));
      if (find_category) {
        let find_qna_link = surveyCommonProductList.survey_qna_link_list[
          surveyCommonProductList.survey_mall_id
        ].find((e) => e.type == find_category.type);

        let survey_link = find_qna_link.survey_link;

        // 헤어케어
        if (find_category.type == "hair_care") {
          survey_jQuery(".prdVisual.hair .btnPrd").attr("href", `${survey_link}`);
        }
        // 스킨케어
        if (find_category.type == "skin_care") {
          survey_jQuery(".prdVisual.skin .btnPrd").attr("href", `${survey_link}`);
        }
      }

      // care 종류에따른 이미지 영역 / 상품 이름 영역 상품 상세페이지 링크 변경
      let img_list = survey_jQuery(".thumbnail a img");
      for (let img of img_list) {
        let img_id = survey_jQuery(img).attr("id");
        let img_id_array = img_id.split("_");
        if (img_id_array && img_id_array.length > 0) {
          let product_no = surveyCommonProductList.shoplusGetNumber(img_id_array[0]);
          let find = surveyCommonProductList.survey_product_list[
            surveyCommonProductList.survey_mall_id
          ].find((e) => Number(e.no) == Number(product_no));
          if (find) {
            if (find.type == "hair_care") {
              survey_jQuery(img)
                .parent()
                .attr("href", "/product/detail_hair.html?product_no=" + product_no);
              survey_jQuery(img)
                .parent()
                .parent()
                .next()
                .children(".name")
                .children("a")
                .attr("href", "/product/detail_hair.html?product_no=" + product_no);
            }
            if (find.type == "skin_care") {
              survey_jQuery(img)
                .parent()
                .attr("href", "/product/detail_essence.html?product_no=" + product_no);
              survey_jQuery(img)
                .parent()
                .parent()
                .next()
                .children(".name")
                .children("a")
                .attr("href", "/product/detail_essence.html?product_no=" + product_no);
            }
          }
        }
      }
      survey_jQuery(".prdList").show();
    })(
      CAFE24API.init({
        client_id: surveyCommonProductList.app_client_id,
        version: surveyCommonProductList.app_version,
      })
    );
  },
  false
);
