window.addEventListener(
  "load",
  function (event) {
    (async function (CAFE24API) {
      setTimeout(async function () {
        survey_mall_id = CAFE24API.MALL_ID;
        survey_shop_no = CAFE24API.SHOP_NO;
        CAFE24API.getCustomerInfo(function (err, res) {
          survey_member_name = null;
          survey_member_id = null;
          if (res) {
            if (res.customer) {
              survey_member_name = res.customer.name;
              survey_member_id = res.customer.member_id;
            }
          }
        });
        let article_no = survey_jQuery("#no").val();
        let board_no = survey_jQuery("#board_no").val();
        let read_status = survey_jQuery("#survey_read_status").text();
        if (read_status != "X") {
          let params = {
            board_no: Number(board_no),
            article_no: Number(article_no),
            read_status: "read",
          };
          setSurveyBoardRead(params);
        }
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

function setSurveyBoardRead(set_param) {
  survey_jQuery.ajax({
    url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/boards`,
    type: "POST",
    accept: "application/json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(set_param),
    dataType: "json",
    success: function (result) {
      console.log("result", result);
    },
  });
}
