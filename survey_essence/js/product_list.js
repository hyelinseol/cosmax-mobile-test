const essenceCommon = new EssenceCommon();
let survey_cate_no = essenceCommon.shoplusGetParameters("cate_no");

window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      await essenceCommon.getCafe24CustomerInfo(CAFE24API);
      let find_category = essenceCommon.survey_category_no_list[essenceCommon.survey_mall_id].find(
        (e) => Number(e.no) == Number(survey_cate_no)
      );
      if (find_category) {
        // 헤어케어
        if (find_category.type == "hair_care") {
          survey_jQuery(".prdVisual.hair .btnPrd").attr("href", `${find_category.survey_link}`);
        }
        // 스킨케어
        if (find_category.type == "skin_care") {
          survey_jQuery(".prdVisual.skin .btnPrd").attr("href", `${find_category.survey_link}`);
        }
      }
    })(
      CAFE24API.init({
        client_id: essenceCommon.app_client_id,
        version: essenceCommon.app_version,
      })
    );
  },
  false
);
