// 진단 내역
class SurveyDiagnosis {
  constructor() {
    this.surveyCommonClass = new SurveyCommon();
  }
  // 회원ID, 검색기간
  async getAllList(member_id, from, to) {
    let self = this;
    try {
      return await self.surveyCommonClass.getSurveyAjax(
        `/front/diagnoses?member_id=${member_id}&from=${from}&to=${to}`
      );
    } catch (e) {
      return [];
    }
  }
}
