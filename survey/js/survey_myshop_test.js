let add_view_count = 1;
let last_height = 0;
window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;

      let history_start_date = shoplusGetParameters("history_start_date");
      let history_end_date = shoplusGetParameters("history_end_date");
      let status = shoplusGetParameters("status");
      let mode = shoplusGetParameters("mode");

      if (history_start_date) {
        const date1 = dayjs(history_start_date);
        const date2 = dayjs(history_end_date);
        const diff = date2.diff(date1, "day");
        survey_jQuery("#survey_search_date").val(diff);
      }
      if (status) {
        survey_jQuery("#survey_search_status").val(status);
      }
      if (mode) {
        survey_jQuery("#survey_search_status").val(mode);
      }
      surveyGetProductVariants();
      setTimeout(async function () {
        await CAFE24API.getCustomerInfo(function (err, res) {
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



        let start_date1 = dayjs().subtract(3, "month").format("YYYY-MM-DD");
        start_date1 = dayjs(start_date1).add(1, "day").format("YYYY-MM-DD");
        let end_date1 = dayjs().format("YYYY-MM-DD");
        let start_date2 = dayjs().subtract(6, "month").format("YYYY-MM-DD");
        start_date2 = dayjs(start_date2).add(1, "day").format("YYYY-MM-DD");
        let end_date2 = dayjs(start_date1).subtract(1, "day").format("YYYY-MM-DD");


        // 처방 분석 조회 (상품준비중: N10)
        let survey_n00_count1 = await getSurveyOrderCount("N00", start_date1, end_date1);
        let survey_n00_count2 = await getSurveyOrderCount("N00", start_date2, end_date2);
        let survey_n00 = Number(survey_n00_count1) + Number(survey_n00_count2);


        // 처방 분석 조회 (상품준비중: N10)
        let survey_n10_count1 = await getSurveyOrderCount("N10,N22", start_date1, end_date1);
        let survey_n10_count2 = await getSurveyOrderCount("N10,N22", start_date2, end_date2);
        let survey_n10 = Number(survey_n10_count1) + Number(survey_n10_count2);

        // 조제준비 count 조회 (배송준비중: N20)
        let survey_n20_count1 = await getSurveyOrderCount("N20", start_date1, end_date1);
        let survey_n20_count2 = await getSurveyOrderCount("N20", start_date2, end_date2);
        let survey_n20 = Number(survey_n20_count1) + Number(survey_n20_count2);

        // 맞춤조제중 count 조회 (배송대기: N21)
        let survey_n21_count1 = await getSurveyOrderCount("N21", start_date1, end_date1);
        let survey_n21_count2 = await getSurveyOrderCount("N21", start_date2, end_date2);
        let survey_n21 = Number(survey_n21_count1) + Number(survey_n21_count2);

        // 배송중 count 조회 N30 
        let survey_n30_count1 = await getSurveyOrderCount("N30", start_date1, end_date1);
        let survey_n30_count2 = await getSurveyOrderCount("N30", start_date2, end_date2);
        let survey_n30 = Number(survey_n30_count1) + Number(survey_n30_count2);

        // 배송완료 count 조회 N40 
        let survey_n40_count1 = await getSurveyOrderCount("N40", start_date1, end_date1);
        let survey_n40_count2 = await getSurveyOrderCount("N40", start_date2, end_date2);
        let survey_n40 = Number(survey_n40_count1) + Number(survey_n40_count2);

        // 취소/교환/반품 count 조회 N40 
        let survey_cs_count1 = await getSurveyOrderCount("C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36,E40", start_date1, end_date1);
        let survey_cs_count2 = await getSurveyOrderCount("C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36,E40", start_date2, end_date2);
        let survey_cs = Number(survey_cs_count1) + Number(survey_cs_count2);

        let survey_orders1 = await getSurveyOrder("N00,N10,N22,N20,N21,N30,N40,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36", start_date1, end_date1);
        let survey_orders2 = await getSurveyOrder("N00,N10,N22,N20,N21,N30,N40,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36", start_date2, end_date2);

        // let survey_order_count = survey_n00 + survey_n10 + survey_n20 + survey_n21 + survey_n30 + survey_n40 + survey_cs;
        let survey_order_count = survey_orders1.length + survey_orders2.length;
        sessionStorage.removeItem("survey_order_count");
        sessionStorage.setItem("survey_order_count", survey_order_count);
        survey_jQuery("#survey_order_count").text(survey_order_count);

        // 조회된 count 입력
        survey_jQuery(".survey_n10").html(`<span>${survey_n10}</span>`);
        survey_jQuery(".survey_n20").html(`<span>${survey_n20}</span>`);
        survey_jQuery(".survey_n21").html(`<span>${survey_n21}</span>`);
        survey_jQuery(".survey_n30").html(`<span>${survey_n30}</span>`);
        survey_jQuery(".survey_n40").html(`<span>${survey_n40}</span>`);
        if (survey_n10 > 0) {
          survey_jQuery(".survey_n10").addClass("active");
        }
        if (survey_n20 > 0) {
          survey_jQuery(".survey_n20").addClass("active");
        }
        if (survey_n21 > 0) {
          survey_jQuery(".survey_n21").addClass("active");
        }
        if (survey_n30 > 0) {
          survey_jQuery(".survey_n30").addClass("active");
        }
        if (survey_n40 > 0) {
          survey_jQuery(".survey_n40").addClass("active");
        }
        // let survey_diagnosis_result = await getSurveyMyshopDiagnosis();

        let survey_diagnosis_result = await getSurveyDiagnoses();
        let survey_diagnosis_order_result = await getSurveyDiagnosisOrder();

        let status_type = "N00,N10,N22,N20,N21,N30,N40,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,N01";

        let survey_status_array = status_type.split(",");
        let survey_order_list = [];
        for (let order of survey_orders1) {
          if (survey_order_list.length >= 1) {
            break;
          }
          survey_order_list.push(order);
        }
        for (let order of survey_orders2) {
          if (survey_order_list.length >= 1) {
            break;
          }
          survey_order_list.push(order);
        }

        let count = 0;
        let html = "";
        let gift_member_name = "";
        for (const order of survey_order_list) {
          let is_survey_gift = false;
          if (order.additional_order_info_list && order.additional_order_info_list.length > 0) {
            if (order.additional_order_info_list[0].value && order.additional_order_info_list[0].value.indexOf("주문자이름") > -1) {
              is_survey_gift = true;
              let value_array = order.additional_order_info_list[0].value && order.additional_order_info_list[0].value.split("|");
              for(let value of value_array) {
                if (value.indexOf("받는이이름") > -1) {
                  let gift_name_array = value.split(":");
                  gift_member_name = gift_name_array[1];
                }
              }
            }
          }
          if (count > 0) {
            break;
          }
          let order_date = dayjs(order.order_date).format("YYYY-MM-DD");
          let order_date2 = dayjs(order.order_date).format("YYYY.MM.DD");
          let order_id = order.order_id;

          for (const item of order.items) {
            if (survey_status_array.indexOf(item.order_status) < 0) {
              continue;
            }
            if (count > 0) {
              break;
            }
            let product_no = item.product_no;
            let product_name = item.product_name;
            let product_nick_name = "";
            let product_hash_code = "";
            if (item.product_bundle_list) {
              // 세트
              for (const values of item.product_bundle_list[0].additional_option_values) {
                if (values.name && (values.name.indexOf("맞춤형 트리트먼트 이름") > -1 || values.name.indexOf("맞춤형 샴푸 이름") > -1)) {
                  product_nick_name = values.value;
                }
                if (values.name && (values.name.indexOf("해시코드") > -1)) {
                  product_hash_code = values.value;
                }
              }
              if (!product_nick_name || !product_hash_code) {
                if (item.product_bundle_list[0].additional_option_value) {
                  let option_array = item.product_bundle_list[0].additional_option_value.split(";");
                  for (const option of option_array) {
                    if (option.indexOf("이름") > -1 || option.indexOf("이름") > -1) {
                      let name_array = option.split("=");
                      product_nick_name = name_array[1];
                    }
                    if (option.indexOf("해시코드") > -1) {
                      let hash_code_array = option.split("=");
                      product_hash_code = hash_code_array[1];
                    }
                  }
                }
              }

            } else {
              // 세트 X
              if (item && item.additional_option_value) {
                let option_array = item.additional_option_value.split(";");
                for (const option of option_array) {
                  if (option.indexOf("이름") > -1 || option.indexOf("이름") > -1) {
                    let name_array = option.split("=");
                    product_nick_name = name_array[1];
                  }
                  if (option.indexOf("해시코드") > -1) {
                    let hash_code_array = option.split("=");
                    product_hash_code = hash_code_array[1];
                  }
                }
              }
            }
            let payment_amount = item.payment_amount;
            let product_quantity = item.quantity;
            let product_status_text = item.status_text;
            if (product_status_text == "상품준비중" || product_status_text == "배송보류") {
              product_status_text = "처방 분석 중";
            }
            if (product_status_text == "배송준비중") {
              product_status_text = "조제 준비 중";
            }
            if (product_status_text == "배송대기") {
              product_status_text = "맞춤 조제 중";
            }

            let survey_shipping_search_style = "display: none";
            let survey_review_write_html = ``;
            let survey_btn_rebuy_style = "display: none";
            let survey_btn_rebuy_onclick = "";


            let find_qna_at = "";
            let view_result_url = "";
            let find = survey_diagnosis_order_result.find((e) => e.result_hash == product_hash_code);
            if (find) {
              find_qna_at = dayjs(find.qna_at).format("YYYY.MM.DD");
              if (find.parent_hash == "") {
                view_result_url = `/survey/result.html?product_no=${find.product_no}&hash=${product_hash_code}&qna_at=${find_qna_at}`
              } else {
                view_result_url = `/survey/more_result.html?product_no=${find.product_no}&hash=${find.parent_hash}&qna_at=${find_qna_at}&re_qna_hash=${product_hash_code}`
              }
            }


            if (product_status_text == "배송완료" || product_status_text == "배송중") {
              survey_shipping_search_style = "";
              if (find_qna_at) {
                survey_btn_rebuy_onclick = `surveyMoveReBuyPage(${product_no}, '${product_hash_code}', '${find_qna_at}')`;
              }
              if (product_status_text == "배송완료") {
                if (find_qna_at) {
                  survey_btn_rebuy_style = "";
                  survey_review_write_html = `
                  <a
                    href="/myshop/mypage/review.html"
                    class="btnItemFunc btnLineG snap_review_write_btn"
                    data-params="product_no=${product_no}&order_id=${order_id}"
                    data-detail="product_no=${product_no}&order_id=${order_id}&ord_item_code=${item.order_item_code}"
                    status="${status}"
                  >리뷰작성하기</a>
                  `;
                }
              }
            }
            if (!product_hash_code) {
              survey_btn_rebuy_style = "display: none";
            }
            let survey_cancel_style = "display: none";
            if (product_status_text == "입금전" || product_status_text == "처방 분석 중") {
              survey_cancel_style = "";
            }
            let product_image = survey_product_resource.set_product.list_image;
            if (product_no == survey_shampoo_no) {
              product_image = survey_product_resource.shampoo.list_image
            }
            if (product_no == survey_treatment_no) {
              product_image = survey_product_resource.treatment.list_image
            }
            let gift_html = "";
            let nick_name_display = "";
            if (is_survey_gift) {
              nick_name_display = "displaynone";
              if (gift_member_name) {
                gift_html = `
                  <div style="color: #000; font-weight: 700; margin-bottom: 4px;">
                    <svg style="width: 16px; height: 16px; margin-right: 2px; vertical-align: middle;" viewBox="0 0 20 20" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2.64359C10.0077 2.63632 10.0155 2.62899 10.0235 2.6216C10.306 2.35732 10.7023 2.00702 11.1523 1.6693C11.5986 1.33437 12.1181 0.99628 12.6463 0.771647C13.16 0.553149 13.7758 0.401678 14.3625 0.575781C15.4464 0.89745 15.8094 1.77655 15.9065 2.44892C15.9287 2.60256 15.9384 2.75095 15.9405 2.88804H19.5V7.93166H17.7205V19.5H2.27954V7.93166H0.5V2.88804H4.0595C4.06156 2.75095 4.07134 2.60256 4.09352 2.44892C4.19059 1.77655 4.55364 0.89745 5.63753 0.575781C6.22418 0.401678 6.84001 0.553149 7.35372 0.771647C7.88185 0.99628 8.40138 1.33437 8.84769 1.6693C9.29771 2.00702 9.694 2.35732 9.97655 2.6216C9.98445 2.62899 9.99227 2.63632 10 2.64359ZM5.2643 2.88804C5.26621 2.80051 5.27276 2.7087 5.28611 2.61625C5.34824 2.18589 5.52925 1.84806 5.98479 1.71287C6.16784 1.65854 6.46048 1.68504 6.8765 1.86199C7.27809 2.0328 7.70956 2.30763 8.11803 2.61417C8.23885 2.70484 8.35588 2.79693 8.4676 2.88804H5.2643ZM3.48415 7.93166V18.3125H9.3977V7.93166H3.48415ZM9.3977 6.74416V4.07554H1.70461V6.74416H9.3977ZM10.6023 6.74416V4.07554H18.2954V6.74416H10.6023ZM10.6023 7.93166V18.3125H16.5159V7.93166H10.6023ZM14.7357 2.88804H11.5324C11.6441 2.79693 11.7611 2.70484 11.882 2.61417C12.2904 2.30763 12.7219 2.0328 13.1235 1.86199C13.5395 1.68504 13.8322 1.65854 14.0152 1.71287C14.4707 1.84806 14.6518 2.18589 14.7139 2.61625C14.7272 2.7087 14.7338 2.80051 14.7357 2.88804Z" fill="#333333"></path>
                    </svg>
                    <span style="vertical-align: middle;">TO : <span>${gift_member_name}</span>님</span>
                  </div>
                `;
              }
            }
            html += `
            <div class="survey_order_list">
              <ul>
                <li class="diagnosis_order survey_order_area">
                    <div class="top">
                        <div class="date">${order_date2} <span>/ ${order_id}</span>
                    </div>
                        <a href="/myshop/order/detail.html?order_id=${order_id}&page=1&history_start_date=${order_date}&history_end_date=${order_date}" class="moreView"></a>
                    </div>
                    ${gift_html}
                    <div class="mid">
                        <div class="prdOrder">
                            <div class="info">
                                <h4 class="prdName">${product_name}</h4>
                                <h3 class="nickName ${nick_name_display}">#${product_nick_name}</h3>
                                <p class="viewResult ${nick_name_display}"><a href="${view_result_url}">진단결과보기</a></p>
                                <span class="price">${surveyComma(Number(payment_amount))}원 / <em>${product_quantity}개</em></span>
                                <div class="state">
                                    <span>${product_status_text}</span>
                                    <span class="delivery"><a href="#none" style="${survey_shipping_search_style}" onclick="surveyShippingSearch('${order_id}')">배송조회</a></span>
                                </div>
                            </div>
                            <div class="thumbnail">
                                <a><img src="${product_image}"></a>
                            </div>
                        </div>
                    </div>
                    <div class="mBtn gColumn">
                      <!--
                      <a
                        href="#none"
                        class="btnItemFunc survey_shipping_search"
                        style="${survey_shipping_search_style}"
                        onclick="surveyShippingSearch('${order_id}')"
                        >배송조회</a
                      >
                      -->
                      <a
                        href="#none"
                        class="btnItemFunc survey_cancel"
                        style="${survey_cancel_style}"
                        onclick="surveyCancel('${order_id}', '${item.order_status}')"
                        >취소요청</a
                      >
                      <a
                        href="#none"
                        class="btnItemFunc survey_return"
                        style="display: none"
                        >반품신청</a
                      >
                    </div>
                    <div class="mBtn gColumn ${nick_name_display}">
                      ${survey_review_write_html}
                      <a
                        href="#none"
                        class="btnItemFunc black feedback btnRebuy"
                        style="${survey_btn_rebuy_style}"
                        onclick="${survey_btn_rebuy_onclick}"
                        >재구매하기</a
                      >
                    </div>
                </li>
              </ul>
            </div>
            `;
            count++;
          }
        }

        survey_jQuery(".survey_order_area.list .survey_order_list").remove();
        survey_jQuery(".survey_order_area.list").append(html);


        let survey_diagnosis_order_count = survey_jQuery(".survey_order_list").length;
        if (survey_diagnosis_order_count > 0) {
          survey_jQuery(".survey_order_area").show();
        }

        /*
         * 최근진단내역
         */
        // 생성
        survey_jQuery(".diagnosisList").empty();
        let diagnosis_list = [];
        if (survey_diagnosis_result.length > 0) {
          diagnosis_list.push(survey_diagnosis_result[0]);
        }
        let set_html = setSurveyProductListHtml(diagnosis_list);
        survey_jQuery(".diagnosisList").append(set_html);

        // 최근 진단내역 4개 까지 노출
        let survey_diagnosis_list = survey_jQuery(".diagnosisList").children();
        let diagnosi_count = 0;
        for (const survey_diagnosis of survey_diagnosis_list) {
          if (diagnosi_count >= 4) {
            survey_jQuery(survey_diagnosis).remove();
          }
          diagnosi_count++;
        }

        let survey_diagnosis_count = survey_jQuery(".diagnosisList .treatHisBox").length;
        if (survey_diagnosis_count > 0) {
          survey_jQuery(".survey_diagnosis_area").show();
        }

        /**
         * 진단중 or 진단을 시작해보세요!
         */
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
          survey_jQuery("#survey_event_banner").show();
          survey_jQuery(".survey_progress").show();
          is_show_survey_progress = true;
        }

        if (
          survey_diagnosis_order_count == 0 &&
          survey_diagnosis_count == 0 &&
          !is_show_survey_progress
        ) {
          survey_jQuery(".survey_diagnosis_start_link").attr(
            "href",
            `${survey_skin_path}/survey?product_no=${survey_set_product_no}`
          );
          survey_jQuery("#survey_event_banner").show();
          survey_jQuery(".survey_diagnosis_start").show();
        }

        setTimeout(async function () {
          survey_jQuery(".stateSelect").show();
          survey_jQuery(".treatHisBox").show();


          getSurveyDiagnosesCount();
          let board_list = await getSurveyBoard();
          setSurveyBoardReadStatus(board_list);
        }, 500);
      }, 100);
    })(
      CAFE24API.init({
        client_id: app_client_id,
        version: app_version,
      })
    );
  },
  false
);

function surveyMoveDetail(element) {
  let order_id = survey_jQuery(element).parent().find(".survey_order_id").text();
  location.href = "/myshop/order/detail.html?order_id=" + order_id;
}

function surveyShippingSearch(order_id) {
  let survey_module_shipping = survey_jQuery(".survey_module_shipping");
  for (const shipping of survey_module_shipping) {
    let shipping_order_id = survey_jQuery(shipping).attr("order_id");
    if (shipping_order_id == order_id) {
      survey_jQuery(shipping).click();
    }
  }
}

function surveyCancel(order_id, order_status) {
  if (order_status == "N22" || order_status == "N10") {
    location.href = `/myshop/order/cancel.html?order_id=${order_id}`;
    return;
  }
  OrderHistory.orderCancel(order_id);
}

async function getSurveyMyshopDiagnosis () {
  if (!survey_member_id) {
    for (let i = 0; i < 5; i++) {
      survey_member_id = await surveyGetMemberInfo();
      if (survey_member_id) {
        break;
      }
    }
  }
  if (!survey_member_id) {
    return [];
  }
  let set_param = {
    member_id: survey_member_id,
  };
  let _survey_diagnosis_result = [];
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis/member`,
      type: "get",
      data: set_param,
      dataType: "json",
      success: async function (result) {
        for (let diagnosis of result) {
          _survey_diagnosis_result.push(diagnosis);
        }
        resolve(_survey_diagnosis_result);
      },
    });
  });
}

// 주문 조회
async function getSurveyDiagnosisOrder() {
  let set_param = {
    member_id: survey_member_id,
    from: dayjs().subtract(6, "month").format("YYYY-MM-DD"),
    to: dayjs().format("YYYY-MM-DD")
  };
  return new Promise(function (resolve, reject) {
    survey_jQuery.ajax({
      url: `${survey_domain}/app/${survey_app_name}/mall/${survey_mall_id}/api/survey/shops/${survey_shop_no}/front/diagnosis/order`,
      type: "GET",
      data: set_param,
      dataType: "json",
      success: function (result) {
        resolve(result);
      },
      error: function (request, status, error) {
        console.log(request, status, error);
        resolve([]);
      },
    });
  });
}