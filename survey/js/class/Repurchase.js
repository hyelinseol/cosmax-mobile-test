class SurveyRepurchase {

  constructor() {
    //
  }

  // 문진 조회
  async getSurveyResult(hash, qna_at) {
    let url = `/front/diagnoses?member_id=${surveyCommon.survey_member_id}&from=${qna_at}&to=${qna_at}&hash=${hash}`;
    return new Promise(async function (resolve, reject) {
      await surveyCommon.getSurveyAjax(url).then(function (res) {
        resolve(res);
      })
      .catch(function (err) {
        console.log(err);
        reject(null);
      });
    });
  }
}
