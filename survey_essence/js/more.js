const surveyCommon = new SurveyCommon();
let product_no = surveyCommon.shoplusGetParameters("product_no");
let type = surveyCommon.shoplusGetParameters("type");
let hash = surveyCommon.shoplusGetParameters("hash");
let qna_at = surveyCommon.shoplusGetParameters("qna_at");
const essenceSurvey = new EssenceSurvey(Number(product_no));

window.addEventListener(
    "load",
    async function (event) {
        (async function (CAFE24API) {

            await surveyCommon.getCafe24CustomerInfo(CAFE24API);

            // 이전 문진 결과 조회
            essenceSurvey.parent_survey_result = await surveyCommon.getSurveyResult(hash, qna_at);

            // 이전 문진 결과 - 고민 조회
            await essenceSurvey.getSurveyResultWorry(hash);

            // 고민 예외 처리
            essenceSurvey.setExceptionWorry();

            // 처방 앰플 배정 순서 조회
            await essenceSurvey.getAmpouleAssign();

            // 문진 조회
            await essenceSurvey.getSurveyQna();

            // 메뉴바 리스트 가져오기
            essenceSurvey.getReQnaMenuProgressHtml();


            // 질문별 분기 조건 담기
            essenceSurvey.getReQnaProcessQuestion();

            // 화면 노출
            essenceSurvey.setReQnaHtml(essenceSurvey.re_qna_hierarchy[0].children[0]);

            setTimeout(async function () {
                // 기타(서술형) - 클릭시 textarea 노출
                survey_jQuery(".survey_reset").click(function() {
                    survey_jQuery("li.etcInput").show();
                });

                await surveyCommon.getCafe24CustomerInfo(CAFE24API);
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

// 뒤로 가기 시 이벤트
survey_jQuery(window).bind("hashchange", async function () {
    //
    await essenceSurvey.backWardsReQna();
});

// 새로고침시 #progress 제거
history.replaceState({}, null, location.pathname + location.search);
