let survey_option_list = survey_jQuery(".survey_option_area");
for (let survey_option of survey_option_list) {
  let survey_option_text = survey_jQuery(survey_option).text();
  if (survey_option_text.indexOf("BOM") > -1) {
    survey_option_text = survey_option_text.replace("[", "");
    survey_option_text = survey_option_text.replace("]", "");

    let survey_option_array = survey_option_text.split(",");

    let survey_name_array = survey_option_array[1].split(":");
    let survey_nick_name = survey_jQuery.trim(survey_name_array[1]);

    let survey_bom_array = survey_option_array[0].split(":");
    let survey_bom_code = survey_jQuery.trim(survey_bom_array[1]);

    let option_html = `
     <div class="survey_nick_name" nick_name="${survey_nick_name}">
        #${survey_nick_name}
     </div>
     <div class="survey_bom_code" bom_code="${survey_bom_code}">
        (${survey_bom_code})
     </div>
    `;
    survey_jQuery(survey_option).html(option_html);
  }
}
