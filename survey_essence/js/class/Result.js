// 문진 결과, 재문진 결과
class EssenceResult {
  first_worry = null;
  second_worry = null;
  parent_first_worry = null;
  parent_second_worry = null;

  survey_product_resource = {};
  survey_variant_resource = {};
  boosting_essence_hash = "WAU31S07020000000001CEB1WAU0001";

  // 해시코드
  hash = null;
  // 문진일자
  qna_at = null;

  // 재문진 해시 코드
  re_qna_hash = null;

  // 고민 순위
  worry_select = {
    first: null,
    second: null,
  };

  worry_type_list = {
    dry: "보습",
    sensitive: "진정",
    wrinkle: "탄력",
    color: "색소",
    pore: "트러블<br>모공",
  };
  worry_type_class_list = {
    dry: "purple",
    sensitive: "blue",
    wrinkle: "yellow",
    color: "orange",
    pore: "green",
  };
  survey_diagnosis_result = null;
  survey_diagnosis_parent_result = null;
  survey_bom_result = [];
  survey_parent_bom_result = [];
  worry_info = [];

  constructor(hash, qna_at, re_qna_hash) {
    this.hash = hash;

    let survey_qna_at = surveyCommon.shoplusGetNumber(qna_at);
    let qna_at_format = dayjs(survey_qna_at).format("YYYY-MM-DD");
    this.qna_at = qna_at_format;

    if (re_qna_hash) {
      this.re_qna_hash = re_qna_hash;
      survey_jQuery(".essence_wrap .bg_title span").html(`
        <strong>3WAAU</strong> 알고리즘의<br />
        <strong>피드백 분석 완료!</strong>
      `);
    }
  }

  // 문진 조회
  async getSurveyResult() {
    let self = this;
    let url = "";
    if (self.re_qna_hash) {
      let to = dayjs().format("YYYY-MM-DD");
      url = `/front/diagnoses?hash=${self.re_qna_hash}&from=${self.qna_at}&to=${to}`;
      await self.getSurveyParentResult();
      await self.getSurveyParentBoms();
    } else {
      url = `/front/diagnoses?hash=${self.hash}&from=${self.qna_at}&to=${self.qna_at}`;
    }

    await surveyCommon
      .getSurveyAjax(url)
      .then(function (res) {
        self.survey_diagnosis_result = res[0][0];

        // 고민 1순위
        self.first_worry =
          self.worry_type_list[
          self.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix.first_worry
          ];
        // 고민 2순위
        self.second_worry =
          self.worry_type_list[
          self.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix.second_worry
          ];
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // 이전 문진 조회
  async getSurveyParentResult() {
    let self = this;
    let from = dayjs("2023-01-01").format("YYYY-MM-DD");
    let to = dayjs().format("YYYY-MM-DD");
    let url = `/front/diagnoses?hash=${self.hash}&from=${from}&to=${to}`;
    await surveyCommon
      .getSurveyAjax(url)
      .then(function (res) {
        self.survey_diagnosis_parent_result = res[0][0];
        // 고민 1순위
        self.parent_first_worry =
          self.worry_type_list[
          self.survey_diagnosis_parent_result.essence_result.essence_result.care_point.chemical_mix.first_worry
          ];
        // 고민 2순위
        self.parent_second_worry =
          self.worry_type_list[
          self.survey_diagnosis_parent_result.essence_result.essence_result.care_point.chemical_mix.second_worry
          ];
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  async getSurveyBoms() {
    let self = this;
    let url = `/front/bom/${self.survey_diagnosis_result.bom_code[0]}`;
    await surveyCommon
      .getSurveyAjax(url)
      .then(function (res) {
        self.survey_bom_result = res;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // 이전 결과 BOM 조회
  async getSurveyParentBoms() {
    let self = this;
    let url = `/front/bom/${self.survey_diagnosis_parent_result.bom_code[0]}`;
    await surveyCommon
      .getSurveyAjax(url)
      .then(function (res) {
        self.survey_parent_bom_result = res;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // 이전 결과 BOM 조회
  surveyDeleteBr(text) {
    if (text && text.indexOf("<br>") !== -1) {
      return text.replace("<br>", "");
    }
    return text;
  }
  surveyReplaceCommaByBr(text) {
    if (text && text.indexOf("<br>") !== -1) {
      return text.replace("<br>", "·");
    }
    return text;
  }
  // 문진 결과 입력
  async setSurveyResult() {
    // 회원명 입력
    this.setMemberName();

    // 닉네임 입력
    this.setNickName();

    // 고민 입력
    this.setWorry();

    // Formula Code 입력
    this.setFormulaCode();

    // 케어 포인트 입력
    this.setCarePoint();

    // 피부타입 입력
    this.setSkinType();

    // 베이스 텍스쳐 입력
    this.setBaseTexture();

    // 전성분 입력
    this.setIngredients();

    // 엠플 설명 이미지 입력
    this.setAmpouleDescriptionImg();

    // 솔루션 입력
    this.setSolution();

    // 리뷰 이미지 입력
    this.setReviewImage();

    // 사용할 때 주의 사항
    this.setWarning();

    // 이전문진 비교 입력 ( 재문진 )
    if (this.survey_diagnosis_parent_result) {
      this.setUpGrade();
      this.setChangeSolution();
      await this.getSurveyResultWorry(re_qna_hash);
      this.setChangeTexture();
    }
  }
  // 회원명 입력
  setMemberName() {
    let member_name = surveyCommon.survey_member_name;
    if (!member_name) {
      member_name = "고객";
    }
    survey_jQuery(".survey_memeber_name").text(member_name);
  }

  // 닉네임 입력
  setNickName() {
    survey_jQuery(".fixed-box .box-info .box-left .subject .name").text(
      "#" + this.survey_diagnosis_result.essence_result.manage_product_nick_name
    );
    survey_jQuery(".survey_nick_name").text("#" + this.survey_diagnosis_result.essence_result.manage_product_nick_name);
  }

  // 고민 입력
  setWorry() {
    survey_jQuery(".survey_worry_fist").html(this.first_worry);
    if (!this.first_worry) {
      survey_jQuery(".survey_worry_fist").parent().hide();
    }

    survey_jQuery(".survey_worry_second").html(this.second_worry);
    if (!this.second_worry) {
      survey_jQuery(".survey_worry_second").parent().hide();
    }

    let first_worry = this.survey_diagnosis_result?.essence_result?.essence_result?.care_point?.chemical_mix?.first_worry;
    let second_worry = this.survey_diagnosis_result?.essence_result?.essence_result?.care_point?.chemical_mix?.second_worry;
    // 우선순위 color 입력
    survey_jQuery(".survey_worry_fist").parent().attr("class", this.worry_type_class_list[first_worry]);
    survey_jQuery(".survey_worry_second").parent().attr("class", this.worry_type_class_list[second_worry]);

    // Formula Code color 입력
    let chemical_full_code_color = [
      {
        code: "Hydrating",
        color: "purple",
      },
      {
        code: "Illuminating",
        color: "orange",
      },
      {
        code: "Smoothing",
        color: "yellow",
      },
      {
        code: "Pore Refreshing",
        color: "green",
      },
      {
        code: "Calming",
        color: "blue",
      },
    ];
    let chemical_full_code1 = this.survey_diagnosis_result?.essence_result?.essence_result?.ampoule[0]?.chemical_full_code.replace(/[0-9]/g, "");
    let color1 = "purple";
    let find_chemical_full_code_color1 = chemical_full_code_color.find((e) => e.code == chemical_full_code1);
    if (find_chemical_full_code_color1) {
      color1 = find_chemical_full_code_color1.color;
    }

    let chemical_full_code2 = this.survey_diagnosis_result?.essence_result?.essence_result?.ampoule[1]?.chemical_full_code.replace(/[0-9]/g, "");
    let color2 = "purple";
    let find_chemical_full_code_color2 = chemical_full_code_color.find((e) => e.code == chemical_full_code2);
    if (find_chemical_full_code_color2) {
      color2 = find_chemical_full_code_color2.color;
    }
    survey_jQuery(".first_worry_code").parent().attr("class", color1);
    survey_jQuery(".second_worry_code").parent().attr("class", color2);

    let first_worry_code_background = survey_jQuery(".first_worry_code").parent().css("background");
    survey_jQuery(".first_solution_chemical_code").css("background", first_worry_code_background);

    let second_solution_chemical_code_background = survey_jQuery(".second_worry_code").parent().css("background");
    survey_jQuery(".second_solution_chemical_code").css("background", second_solution_chemical_code_background);

  }

  // Formula Code 입력
  setFormulaCode() {

    let chemical_code1 = this.survey_diagnosis_result.essence_result.essence_result.ampoule[0]?.chemical_code || "";
    let chemical_code2 = this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.chemical_code || "";
    let chemical_full_code1 = this.survey_diagnosis_result.essence_result.essence_result.ampoule[0]?.chemical_full_code || "";
    let chemical_full_code2 = this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.chemical_full_code || "";

    let concept_code = this.survey_diagnosis_result.essence_result.essence_result.concept_ampoule[0]?.chemical_code || "";
    if (!chemical_code2 && concept_code) {
      chemical_code2 = concept_code;
    }

    let concept_full_code = this.survey_diagnosis_result.essence_result.essence_result.concept_ampoule[0]?.chemical_full_code || "";
    if (!chemical_full_code2 && concept_full_code) {
      chemical_full_code2 = concept_full_code;
    }

    // Formula Code 입력
    let formula_code =
      chemical_code1 +
      chemical_code2 +
      "-" +
      this.survey_diagnosis_result.essence_result.essence_result.texture.base_code;
    survey_jQuery(".essence_wrap .ess_sec02 .img_area .product_info .code strong").text(
      formula_code
    );

    survey_jQuery(".first_worry_code").text(
      chemical_code1
    );
    survey_jQuery(".second_worry_code").text(
      chemical_code2
    );
    survey_jQuery(".base_code").text(this.survey_diagnosis_result.essence_result.essence_result.texture.base_code);

    survey_jQuery(".first_worry_full_code").text(
      chemical_full_code1
    );
    survey_jQuery(".second_worry_full_code").text(
      chemical_full_code2
    );
    if (!chemical_code2) {
      survey_jQuery(".code_txt.txt02").hide();
      survey_jQuery(".bg02").parent().hide();
      survey_jQuery(".second_worry_code").parent().hide();
    }
  }
  // 케어 포인트 입력
  setCarePoint() {
    if (!this.first_worry && !this.second_worry) {
      survey_jQuery(".care_point_area").hide();
      return;
    }
    let worry_text = `#${this.surveyReplaceCommaByBr(this.first_worry)}`;
    if (this.second_worry) {
      worry_text += `, #${this.surveyReplaceCommaByBr(this.second_worry)}`;
    }
    survey_jQuery(".essence_wrap .ess_sec03 .cont > ul > li .left_cont span strong").text(worry_text);

    let worry_type_class = {
      dry: "purple",
      sensitive: "blue",
      wrinkle: "yellow",
      color: "orange",
      pore: "green",
    };

    // 고민 순위 컬러 선택
    survey_jQuery(".essence_wrap .ess_sec03 .care_area ul li").addClass("off");
    survey_jQuery(
      `.${worry_type_class[
      this.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix.first_worry
      ]
      }`
    ).removeClass("off");
    survey_jQuery(
      `.${worry_type_class[
      this.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix.second_worry
      ]
      }`
    ).removeClass("off");

    // 색소 1순위, 건조 2순위 고민
    let worry_rank_text = `${this.surveyReplaceCommaByBr(this.first_worry)} 1순위`;
    if (this.second_worry) {
      worry_rank_text += `, ${this.surveyReplaceCommaByBr(this.second_worry)} 2순위 고민`;
    }
    survey_jQuery(".worry_text").text(worry_rank_text);

    survey_jQuery(".first_worry").text(this.surveyReplaceCommaByBr(this.first_worry));
    survey_jQuery(".second_worry").text(this.surveyReplaceCommaByBr(this.second_worry));
    if (!this.second_worry) {
      survey_jQuery(".second_worry").parent().parent().hide();
    }

    // 케어 포인트 > 고민순위에 따른 설명
    if (surveyCommon.survey_is_moile_device === false) {
      // PC
      let worry_type_description = surveyCommon.surveyEnter(
        this.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix
          .pc_worry_type_description
      );
      survey_jQuery(".worry_type_description").html(worry_type_description);

      let pc_first_worry_description = surveyCommon.surveyEnter(
        this.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix
          .pc_first_worry_description
      );
      let pc_second_worry_description = surveyCommon.surveyEnter(
        this.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix
          .pc_second_worry_description
      );
      survey_jQuery(".first_worry_description").html(pc_first_worry_description);
      survey_jQuery(".second_worry_description").html(pc_second_worry_description);
    } else {
      // Mobile
      let worry_type_description = surveyCommon.surveyEnter(
        this.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix
          .mobile_worry_type_description
      );
      survey_jQuery(".worry_type_description").html(worry_type_description);

      let mobile_first_worry_description = surveyCommon.surveyEnter(
        this.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix
          .mobile_first_worry_description
      );
      let mobile_second_worry_description = surveyCommon.surveyEnter(
        this.survey_diagnosis_result.essence_result.essence_result.care_point.chemical_mix
          .mobile_second_worry_description
      );
      survey_jQuery(".first_worry_description").html(mobile_first_worry_description);
      survey_jQuery(".second_worry_description").html(mobile_second_worry_description);
    }
  }
  // 피부타입 입력
  setSkinType() {
    survey_jQuery(".essence_wrap .ess_sec03 .cont > ul > li .center_cont .box_tit").text(
      this.survey_diagnosis_result.essence_result.essence_result.skin_type.skin_type
    );

    survey_jQuery(".essence_wrap .ess_sec03 .cont > ul > li .center_cont p").html(
      surveyCommon.surveyEnter(this.survey_diagnosis_result.essence_result.essence_result.skin_type.mobile_skin_type_description)
    );

    if (this.survey_diagnosis_parent_result?.essence_result?.essence_result?.skin_type) {
      survey_jQuery(".essence_wrap .ess_sec03 .cont > ul > li .center_cont .box_tit").text(
        this.survey_diagnosis_parent_result.essence_result.essence_result.skin_type.skin_type
      );

      survey_jQuery(".essence_wrap .ess_sec03 .cont > ul > li .center_cont p").html(
        surveyCommon.surveyEnter(this.survey_diagnosis_parent_result.essence_result.essence_result.skin_type.mobile_skin_type_description)
      );
    }
  }
  // 베이스 텍스쳐 입력
  setBaseTexture() {
    survey_jQuery(".texture_base_name").html(
      surveyCommon.surveyEnter(this.survey_diagnosis_result.essence_result.essence_result.texture.base_name)
    );
    survey_jQuery(".texture_base_description").text(
      surveyCommon.surveyEnter(
        this.survey_diagnosis_result.essence_result.essence_result.texture.base_description.mobile_text
      )
    );

    survey_jQuery(".texture_base_detail_description").html(
      surveyCommon.surveyEnter(
        this.survey_diagnosis_result.essence_result.essence_result.texture.base_detail_description.mobile_text
      )
    );

    survey_jQuery(".texture_base_img1").attr(
      "src",
      this.survey_diagnosis_result.essence_result.essence_result.texture.base_img1
    );
    survey_jQuery(".texture_base_img2").attr(
      "src",
      this.survey_diagnosis_result.essence_result.essence_result.texture.base_img2
    );

    let skin_type_texture_description = "";
    if (surveyCommon.survey_is_moile_device === false) {
      skin_type_texture_description = this.survey_diagnosis_result.essence_result.essence_result.skin_type.pc_texture_description;
    } else {
      skin_type_texture_description = this.survey_diagnosis_result.essence_result.essence_result.skin_type.mobile_texture_description;
    }

    survey_jQuery(".skin_type_texture_description").html(surveyCommon.surveyEnter(skin_type_texture_description));
    if (this.re_qna_hash) {
      survey_jQuery(".skin_type_texture_description").html(
        surveyCommon.surveyEnter(
          this.survey_diagnosis_parent_result.essence_result.essence_result.skin_type.mobile_texture_description
        )
      );
    }
  }
  // 전성분 입력
  setIngredients() {
    this.survey_bom_result;
    let survey_ingredients = [];
    for (const bom of this.survey_bom_result) {
      if (bom.ingredients && bom.ingredients.length > 0) {
        for (const ingredient of bom.ingredients) {
          if (survey_ingredients.indexOf(ingredient.RAWCDK) == -1) {
            survey_ingredients.push(ingredient.RAWCDK);
          }
        }
      }
    }
    let survey_ingredient_text = survey_ingredients.join(", ");
    survey_jQuery(".survey_ingredients").html(survey_ingredient_text);
  }
  // 사용할 때 주의 사항
  setWarning() {
    let survey_warning = survey_jQuery(".survey_warning").html();
    if (
      this.survey_diagnosis_result.essence_result.essence_result.ampoule[0]?.chemical_code == "P3" ||
      this.survey_diagnosis_result.essence_result.essence_result.ampoule[0]?.chemical_code == "P4" ||
      this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.chemical_code == "P3" ||
      this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.chemical_code == "P4"
    ) {
      survey_warning +=
        "4. 알파-하이드록시애시드(α-hydroxyacid, AHA)(이하 “AHA”라 한다) 함유제품<br>&nbsp; 가) 햇빛에 대한 피부의 감수성을 증가시킬 수 있으므로 자외선 차단제를 함께 사용할 것<br>&nbsp; 나) 일부에 시험 사용하여 피부 이상을 확인할 것";

      survey_jQuery(".survey_warning").html(survey_warning);
    }
  }
  // 엠플 설명 이미지 입력
  setAmpouleDescriptionImg() {
    let count = 0;
    let html = "";
    for (const ampoule of this.survey_diagnosis_result.essence_result.essence_result.ampoule) {
      if (surveyCommon.survey_is_moile_device === false) {
        if (!ampoule.pc_chemical_description_img1 || !ampoule.pc_chemical_description_img2 || !ampoule.pc_chemical_description_img3) {
          continue;
        }
        html += `
        <li>
          <div class="mySolutionBox">
            <div class="solTitle"><img src="${ampoule.mobile_chemical_description_img1}" /></div>
            <div class="solMov">
              <div class="solVodSec">
                <iframe 
                  src="${ampoule.mobile_chemical_description_img2}" 
                  width="100%" 
                  height="225" 
                  frameborder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowfullscreen="">
                </iframe>
              </div>
            </div>
            <div class="solDesc"><img src="${ampoule.mobile_chemical_description_img3}" /></div>
          </div>
        </li>
        `;
        survey_jQuery(".survey_ampoule_description_img_area").html(html);
      } else {
        if (!ampoule.mobile_chemical_description_img1 || !ampoule.mobile_chemical_description_img2 || !ampoule.mobile_chemical_description_img3) {
          continue;
        }
        html += `
        <li>
          <div class="mySolutionBox">
            <div class="solTitle"><img src="${ampoule.mobile_chemical_description_img1}" /></div>
            <div class="solMov">
              <div class="solVodSec">
                <iframe 
                  src="${ampoule.mobile_chemical_description_img2}" 
                  width="100%" 
                  height="225" 
                  frameborder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowfullscreen="">
                </iframe>
              </div>
            </div>
            <div class="solDesc"><img src="${ampoule.mobile_chemical_description_img3}" /></div>
          </div>
        </li>
        `;
        survey_jQuery(".survey_ampoule_description_img_area").empty();
        survey_jQuery(".survey_ampoule_description_img_area").html(html);
      }
      count++;
      if (count == 2) {
        break;
      }
    }
  }
  // 솔루션 입력
  setSolution() {
    let html = ``;
    let count = 0;
    if (!this.survey_diagnosis_result.essence_result.essence_result.display_concept_ampoule) {
      this.survey_diagnosis_result.essence_result.essence_result.display_concept_ampoule = this.survey_diagnosis_result.essence_result.essence_result.concept_ampoule;
    }
    for (const concept_ampoule of this.survey_diagnosis_result.essence_result.essence_result.display_concept_ampoule) {
      let concept_ampoule_description = "";
      if (surveyCommon.survey_is_moile_device === false) {
        concept_ampoule_description = concept_ampoule.concept_ampoule_description.pc_text;
      } else {
        concept_ampoule_description = concept_ampoule.concept_ampoule_description.mobile_text;
      }
      let style = "";
      if (count > 0) {
        style = "margin-top: 100px;";
      }
      html += `
      <div class="max-width" style="${style}">
        <div class="title">
          <strong>${concept_ampoule.concept_ampoule_name}</strong><br />
          <span>${surveyCommon.surveyEnter(concept_ampoule_description)}</span>
        </div>
        <div class="cont">
          <ul>
      `;
      for (const ingredient of concept_ampoule.ampoule_ingredients) {
        let ingredient_name = "";
        let ingredient_img = "";
        if (surveyCommon.survey_is_moile_device === false) {
          ingredient_name = ingredient.pc_ingredient_name;
          ingredient_img = ingredient.pc_ingredient_img;
        } else {
          ingredient_name = ingredient.mobile_ingredient_name;
          ingredient_img = ingredient.mobile_ingredient_img;
        }
        html += `
          <li>
            <p>
              <img src="${ingredient_img}" alt="${ingredient_name}" />
            </p>
            <span>${ingredient_name}</span>
          </li>
        `;
      }
      html += `
            </ul>
          </div>
        </div>
      `;
      count++;
    }
    if (count == 0) {
      survey_jQuery(".survey_solution_area").html("");
      survey_jQuery(".survey_solution_area").hide();
    } else {
      survey_jQuery(".survey_solution_area").html(html);
    }
  }
  // 리뷰 이미지 입력
  setReviewImage() {
    let count = 1;
    for (const ampoule of this.survey_diagnosis_result.essence_result.essence_result.ampoule) {
      let review_img = "";
      if (surveyCommon.survey_is_moile_device === false) {
        review_img = ampoule.pc_chemical_review_img;
      } else {
        review_img = ampoule.mobile_chemical_review_img;
      }
      survey_jQuery(`.survey_review_img${count}`).attr("src", review_img);
      count++;
    }
    let survey_review_img2_src = survey_jQuery(`.survey_review_img2`).attr("src");
    if (this.survey_diagnosis_result.essence_result.essence_result.ampoule.length == 1 || !survey_review_img2_src) {
      survey_jQuery(`.survey_review_img2`).parent().hide();
    }
  }

  async getSurveyCafe24ProductVariant() {
    const discount_type = surveyCommon.shoplusGetParameters("discount_type");
    let self = this;
    for (let survey_product of surveyCommon.survey_product_list[surveyCommon.survey_mall_id]) {
      if (survey_product.type == "skin_care") {
        if (discount_type) {
          if (discount_type == survey_product.detail_type) {
            await self.getSurveyCafe24Product(survey_product);
            await self.getSurveyCafe24Variant(survey_product);
          }
        } else {
          await self.getSurveyCafe24Product(survey_product);
          await self.getSurveyCafe24Variant(survey_product);
        }
      }
    }
  }

  async getSurveyCafe24Product(survey_product) {
    console.log("survey_product", survey_product);
    let self = this;
    return new Promise(async function (resolve, reject) {
      CAFE24API.get(`/api/v2/products/${survey_product.no}?embed=discountprice`, function (err, res) {
        self.survey_product_resource[survey_product.product_type] = res.product;
        if (res) {
          resolve(res);
        } else {
          resolve(err);
        }
      });
    });
  }

  async getSurveyCafe24Variant(survey_product) {
    let self = this;
    return new Promise(async function (resolve, reject) {
      CAFE24API.get(`/api/v2/products/${survey_product.no}/variants`, function (err, res) {
        if (res && res.variants.length > 0) {
          res.variants[0].product_no = survey_product.no;
          self.survey_variant_resource[survey_product.product_type] = res.variants[0];
          resolve(res);
        } else {
          resolve(err);
        }
      });
    });
  }

  async setBottomBuyArea() {

    if (Object.keys(this.survey_product_resource).includes("essence") == false) {
      await surveyCommon.surveySleep(500);
      if (Object.keys(this.survey_product_resource).includes("essence") == false) {
        await surveyCommon.surveySleep(500);
      }
    }

    // 디폴트는 에센스 요금 노출
    let product_type = "essence";
    let survey_discount_type = surveyCommon.shoplusGetParameters("discount_type");
    let survey_buy_type = surveyCommon.shoplusGetParameters("buy_type");
    // 임직원인 경우에는 임직원 상품 요금 노출
    if (survey_discount_type && survey_discount_type.indexOf("employees") > -1 && survey_buy_type) {
      product_type = "employees_" + survey_buy_type;
    }

    // essence 상품을 찾아 가격 입력
    let price = 0;
    let product_info = null;
    for (let survey_product of surveyCommon.survey_product_list[surveyCommon.survey_mall_id]) {
      if (Object.keys(this.survey_product_resource).includes(survey_product.product_type) && survey_product.product_type == product_type) {
        if (price == 0) {
          price = Number(this.survey_product_resource[survey_product.product_type].price);
          product_info = this.survey_product_resource[survey_product.product_type];
        } else {
          if (price > Number(this.survey_product_resource[survey_product.product_type].price)) {
            price = Number(this.survey_product_resource[survey_product.product_type].price);
            product_info = this.survey_product_resource[survey_product.product_type];
          }
        }
      }
    }

    let sale_percent = 0;
    let discount_price = price;
    if (product_info?.discountprice) {
      discount_price = Number(product_info.discountprice.mobile_discount_price);
      if (price > discount_price) {
        // 소수점 버림
        sale_percent = Math.floor((price - discount_price) / (price) * 100);
      }
    }

    if (discount_price <= 0) {
      discount_price = 24800;
    }

    survey_jQuery(".survey_bottom_price .total strong em").text(surveyCommon.surveyComma(discount_price) + "원");
    if (sale_percent > 0) {
      survey_jQuery(".survey_bottom_price .total strong").before(
        `
          <strike style="font-size: 12px;">${surveyCommon.surveyComma(price)}</strike>
          <p class="disPrice" style="display: inline;">${sale_percent}%</p>
        `
      );
      survey_jQuery("#survey_strike").text(surveyCommon.surveyComma(price));
      survey_jQuery("#survey_discount").text(sale_percent + "%");

      survey_jQuery("#survey_strike").show();
      survey_jQuery("#survey_discount").show();
    }
    survey_jQuery("#totalPrice.total-price .price").text(
      surveyCommon.surveyComma(discount_price) + "원"
    );

    // 임직원이고 판매가가 0일때 할인율(%), 원가 노출하지 않음
    if (product_type.indexOf("employees") > -1 && Number(product_info.discountprice.mobile_discount_price) <= 0) {
      discount_price = 0;
      survey_jQuery(".fixed-box .box-info .box-right .result-wrap .total-price strike").hide();
      survey_jQuery(".fixed-box .box-info .box-right .result-wrap .total-price .discount").hide();
      survey_jQuery("#totalPrice .price").css("color", "rgb(255, 88, 93)");
      survey_jQuery("#totalPrice .price").text(surveyCommon.surveyComma(discount_price) + "원");
    }

    survey_jQuery("#totalPrice.total-price .price").css("font-size", "18px");
  }

  // bom, hash, 닉네임 옵션 입력
  setInputBomCode() {
    survey_jQuery("select[id^='setproduct_option_id']").each(function (index, element) {
      // 세트 상품에 속한 상품 선택
      let options = survey_jQuery(element).children();

      for (let i = 0; i < options.length; i++) {
        let text = survey_jQuery(options[i]).text();

        if (survey_jQuery(options[i]).val() == "*") {
          continue;
        } else {
          let element_id = survey_jQuery(element).attr("id");
          let val = survey_jQuery(options[i]).val();
          var e = document.getElementById(element_id);
          e.value = val;
          var event = new Event("change", { bubbles: true });
          e.dispatchEvent(event);
        }
      }
    });
    setTimeout(function () {
      // 코드 입력
      essenceResult.survey_diagnosis_result.bom_code[0]
      survey_jQuery("input[name^='setproduct_add_option_id']").each(function (index, element) {
        let input_value = survey_jQuery(element).val();
        // 에센스
        if (input_value.indexOf("맞춤형 에센스 BOM") > -1) {
          let input_id = survey_jQuery(element).attr("name");
          survey_jQuery("#" + input_id).val(essenceResult.survey_diagnosis_result.bom_code[0]);
          survey_jQuery(element).next().val(essenceResult.survey_diagnosis_result.bom_code[0]);
        }
        if (input_value.indexOf("맞춤형 부스팅 에센스 BOM") > -1) {
          let input_id = survey_jQuery(element).attr("name");
          survey_jQuery("#" + input_id).val(essenceResult.boosting_essence_hash);
          survey_jQuery(element).next().val(essenceResult.boosting_essence_hash);
        }
        if (input_value.indexOf("이름") > -1) {
          let input_id = survey_jQuery(element).attr("name");
          survey_jQuery("#" + input_id).val(essenceResult.survey_diagnosis_result.manage_product_nick_name);
          survey_jQuery(element).next().val(essenceResult.survey_diagnosis_result.manage_product_nick_name);
        }
        if (input_value.indexOf("해시코드") > -1) {
          let input_id = survey_jQuery(element).attr("name");
          survey_jQuery("#" + input_id).val(essenceResult.survey_diagnosis_result.hash);
          survey_jQuery(element).next().val(essenceResult.survey_diagnosis_result.hash);
        }
      });

      survey_jQuery("#survey_result").css("visibility", "visible");
    }, 500);
  }

  setUpGrade() {

    survey_jQuery(".essence_upgrade .parent_first_worry").html(this.parent_first_worry);
    survey_jQuery(".essence_upgrade .parent_second_worry").html(this.parent_second_worry);

    if (!this.parent_second_worry) {
      survey_jQuery(".essence_upgrade .parent_second_worry").parent().hide();
    }

    survey_jQuery(".essence_upgrade .survey_worry_fist").html(this.first_worry);
    survey_jQuery(".essence_upgrade .survey_worry_second").html(this.second_worry);
    if (!this.second_worry) {
      survey_jQuery(".essence_upgrade .survey_worry_second").parent().hide();
    }

    survey_jQuery(".parnet_survey_nick_name").text("#" + this.survey_diagnosis_parent_result.manage_product_nick_name);

    let parent_chemical_code1 = this.survey_diagnosis_parent_result.essence_result.essence_result.ampoule[0]?.chemical_code || "";
    let parent_chemical_code2 = this.survey_diagnosis_parent_result.essence_result.essence_result.ampoule[1]?.chemical_code || "";

    let parent_concept_code = this.survey_diagnosis_parent_result.essence_result.essence_result.concept_ampoule[0]?.chemical_code || "";
    if (!parent_chemical_code2 && parent_concept_code) {
      parent_chemical_code2 = parent_concept_code;
    }

    let parent_formula_code =
      parent_chemical_code1 +
      parent_chemical_code2 +
      "-" +
      this.survey_diagnosis_parent_result.essence_result.essence_result.texture.base_code;
    survey_jQuery(".essence_upgrade .parent_formula_code").text(
      parent_formula_code
    );

    let chemical_code1 = this.survey_diagnosis_result.essence_result.essence_result.ampoule[0]?.chemical_code || "";
    let chemical_code2 = this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.chemical_code || "";

    let concept_code = this.survey_diagnosis_result.essence_result.essence_result.concept_ampoule[0]?.chemical_code || "";
    if (!chemical_code2 && concept_code) {
      chemical_code2 = concept_code;
    }

    let formula_code =
      chemical_code1 +
      chemical_code2 +
      "-" +
      this.survey_diagnosis_result.essence_result.essence_result.texture.base_code;
    survey_jQuery(".essence_upgrade .formula_code").text(
      formula_code
    );
  }
  setChangeSolution() {

    survey_jQuery(".first_solution_name").html(surveyCommon.surveyEnter(this.survey_diagnosis_result.essence_result.essence_result.ampoule[0]?.chemical_name || ""));
    survey_jQuery(".first_solution_name_en").html(surveyCommon.surveyEnter(this.survey_diagnosis_result.essence_result.essence_result.ampoule[0]?.chemical_name_en || ""));
    let first_find = this.survey_diagnosis_parent_result.essence_result.essence_result.ampoule.find((e) => e.bulk_code == this.survey_diagnosis_result.essence_result.essence_result.ampoule[0]?.bulk_code || "");
    if (!first_find) {
      // 변경
      let change_text = this.getFeedbackAmpouleLevelChange("change");
      survey_jQuery(".first_solution_change").addClass("iconew");
      survey_jQuery(".first_solution_change").html(`<strong>${change_text}</strong>`);
    } else {
      // 유지
      let change_text = this.getFeedbackAmpouleLevelChange("same");
      survey_jQuery(".first_solution_change").addClass("icosame");
      survey_jQuery(".first_solution_change").html(`<strong>${change_text}</strong>`);
    }


    survey_jQuery(".second_solution_name").html(surveyCommon.surveyEnter(this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.chemical_name || ""));
    survey_jQuery(".second_solution_name_en").html(surveyCommon.surveyEnter(this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.chemical_name_en || ""));
    let second_find = this.survey_diagnosis_parent_result.essence_result.essence_result.ampoule.find((e) => e.bulk_code == this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.bulk_code || "");
    if (!second_find) {
      let change_text = this.getFeedbackAmpouleLevelChange("change");
      survey_jQuery(".second_solution_change").addClass("iconew");
      survey_jQuery(".second_solution_change").html(`<strong>${change_text}</strong>`);
    } else {
      // 유지
      let change_text = this.getFeedbackAmpouleLevelChange("same");
      survey_jQuery(".second_solution_change").addClass("icosame");
      survey_jQuery(".second_solution_change").html(`<strong>${change_text}</strong>`);
    }

    survey_jQuery(".first_solution_chemical_code").text(this.survey_diagnosis_result.essence_result.essence_result.ampoule[0]?.chemical_code || "");
    survey_jQuery(".second_solution_chemical_code").text(this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.chemical_code || "");

    if (!this.survey_diagnosis_result.essence_result.essence_result.ampoule[1]?.chemical_code) {
      survey_jQuery(".second_solution_change").parent().css("visibility", "hidden");
    }
  }
  setChangeTexture() {
    let base_level_change_info = null;
    const parnet_base_code = Number(this.survey_diagnosis_parent_result.essence_result.essence_result.texture.base_code);
    const base_code = Number(this.survey_diagnosis_result.essence_result.essence_result.texture.base_code);
    if (parnet_base_code == base_code) {
      survey_jQuery(".change_texture").parent().parent().parent().hide();
      return;
    }
    if (parnet_base_code > base_code) {
      base_level_change_info = this.getFeedbackBaseLevelChange("down");
    }
    if (parnet_base_code < base_code) {
      base_level_change_info = this.getFeedbackBaseLevelChange("up");
    }
    survey_jQuery(".change_texture").attr("src", base_level_change_info.img);
  }

  getFeedbackAmpouleLevelChange(type) {
    let ampoule_level_change_find = this.survey_diagnosis_result.essence_result.essence_result.feedback.ampoule_level_change.list.find((e) => e.type == type);
    let change_text = "";
    if (surveyCommon.survey_is_moile_device === false) {
      change_text = ampoule_level_change_find.pc_text;
    } else {
      change_text = ampoule_level_change_find.mobile_text;
    }
    return change_text;
  }

  getFeedbackBaseLevelChange(type) {
    let find = this.survey_diagnosis_result.essence_result.essence_result.feedback.base_level_change.list.find((e) => e.type == type);
    if (surveyCommon.survey_is_moile_device === false) {
      return {
        text: find.pc_text,
        img: find.pc_img,
      };
    } else {
      return {
        text: find.mobile_text,
        img: find.mobile_img,
      };
    }
  }

  async getSurveyResultWorry(hash) {
    let self = this;
    let url = `/front/skin_care/worry?hash=${hash}`;
    await surveyCommon
      .getSurveyAjax(url)
      .then(function (res) {
        self.worry_info = res;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
