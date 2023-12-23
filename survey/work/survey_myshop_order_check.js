let add_view_count = 0;
let last_height = 0;
window.addEventListener(
  "load",
  async function (event) {
    (async function (CAFE24API) {
      survey_mall_id = CAFE24API.MALL_ID;
      survey_shop_no = CAFE24API.SHOP_NO;

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

        surveyGetProductVariants();

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

        let check_status = null;
        if (status == "analysis") {
          check_status = "처방 분석 중";
        }
        if (status == "ready") {
          check_status = "조제 준비 중";
        }
        if (status == "prepare") {
          check_status = "맞춤 조제 중";
        }
        if (status == "shipping") {
          check_status = "배송중";
        }
        if (status == "complate") {
          check_status = "배송완료";
        }

        // 미노출 할 주문/배송 삭제
        let survey_order_area_list = survey_jQuery(".survey_order_area");
        for (let survey_order_area of survey_order_area_list) {
          let order_status = survey_jQuery(survey_order_area).attr("status");
          if (check_status && check_status != order_status) {
            survey_jQuery(survey_order_area).parent().parent().remove();
          }
          if (!order_status) {
            survey_jQuery(survey_order_area).parent().parent().remove();
          }

          let text = survey_jQuery(survey_order_area).find(".top .date .survey_order_date").text();
          let date_format = text.replace(/-/g, ".");
          survey_jQuery(survey_order_area).find(".top .date .survey_order_date").text(date_format);
        }

        let survey_diagnosis_result = await getSurveyDiagnosis();





        let days = 180;
        if (history_start_date && history_end_date) {
          days = dayjs(history_end_date).diff(history_start_date, 'day');
        } else {
          history_start_date = dayjs().subtract(180, "day").format("YYYY-MM-DD");
          history_end_date = dayjs().format("YYYY-MM-DD");
        }


        let status_type = "N00,N10,N22,N20,N21,N30,N40,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36";
        // 처방 분석 조회 (상품준비중: N10)
        if (status == "analysis") {
          status_type = "N10,N22";
        }
        // 조제준비중 조회 (배송준비중: N20)
        if (status == "ready") {
          status_type = "N20";
        }
        // 맞춤조제중 조회 (배송대기: N21)
        if (status == "prepare") {
          status_type = "N21";
        }
        // 배송중 조회 N30 
        if (status == "shipping") {
          status_type = "N30";
        }
        // 배송완료 조회 N40 
        if (status == "complate") {
          status_type = "N40";
        }
        // 취소/교환/반품 조회 C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36 
        if (mode && mode == "cs") {
          status_type = "C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36";
        }

        let survey_status_array = status_type.split(",");
        let survey_order_list = [];
        let loop_count = Math.ceil(days / 60);
        for (let i = 0; i < loop_count; i++) {
          let start_date = dayjs(history_start_date).add(((i * 60) + i), "day").format("YYYY-MM-DD");
          let end_date = dayjs(start_date).add(60, "day").format("YYYY-MM-DD");
          if (dayjs(end_date) > dayjs(history_end_date)) {
            end_date = dayjs(history_end_date).format("YYYY-MM-DD");
          }
          let survey_orders = await getSurveyOrder(status_type, start_date, end_date);
          for (let order of survey_orders) {
            survey_order_list.push(order);
          }
        }
        // 순서 정렬
        survey_order_list.sort(function(comp1, comp2) {
          let comp1UC = dayjs(comp1.order_date);
          let comp2UC = dayjs(comp2.order_date);
          if (comp1UC < comp2UC) {
            return 1;
          } else {
            return -1;
          }
        });
        let html = "";
        for (const order of survey_order_list) {
          let order_date = dayjs(order.order_date).format("YYYY-MM-DD");
          let order_date2 = dayjs(order.order_date).format("YYYY.MM.DD");
          let order_id = order.order_id;

          for (const item of order.items) {
            if (survey_status_array.indexOf(item.order_status) < 0) {
              continue;
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
            let survey_review_write_style = "display: none";
            let survey_btn_rebuy_style = "display: none";
            let survey_btn_rebuy_onclick = "";
            if (product_status_text == "배송완료" || product_status_text == "배송중") {
              survey_shipping_search_style = "";
              let find = survey_diagnosis_result.find((e) => e.hash == product_hash_code);
              if (find) {
                survey_btn_rebuy_style = "";
                survey_review_write_style = "";
                let qna_at = dayjs(find.qna_at).format("YYYY.MM.DD");
                survey_btn_rebuy_onclick = `surveyMoveReBuyPage(${product_no}, '${product_hash_code}', '${qna_at}')`;
              }
            }
            if (!product_hash_code) {
              survey_btn_rebuy_style = "display: none";
            }
            let survey_cancel_style = "display: none";
            if (product_status_text == "배송전" || product_status_text == "처방 분석 중") {
              survey_cancel_style = "";
            }
            let product_image = survey_product_resource.set_product.list_image;
            if (product_no == survey_shampoo_no) {
              product_image = survey_product_resource.shampoo.list_image
            }
            if (product_no == survey_treatment_no) {
              product_image = survey_product_resource.treatment.list_image
            }

            html += `
            <li class="diagnosis_order survey_order_area displaynone">
                <div class="top">
                    <div class="date">${order_date2} <span>/ ${order_id}</span>
                </div>
                    <a href="/myshop/order/detail.html?order_id=${order_id}&page=1&history_start_date=${order_date}&history_end_date=${order_date}" class="moreView"></a>
                </div>
                <div class="mid">
                    <div class="prdOrder">
                        <div class="info">
                            <h4 class="prdName">${product_name}</h4>
                            <h3 class="nickName">#${product_nick_name}</h3>
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
                    onclick="surveyCancel('${order_id}')"
                    >취소요청</a
                  >
                  <a
                    href="#none"
                    class="btnItemFunc survey_return"
                    style="display: none"
                    >반품신청</a
                  >
                </div>
                <div class="mBtn gColumn">
                  <a
                    href="#"
                    class="btnItemFunc btnLineG snap_review_write_btn"
                    data-params="product_no=${product_no}&order_id=${order_id}"
                    data-detail="product_no=${product_no}&order_id=${order_id}&ord_item_code=${item.order_item_code}"
                    status="${status}"
                    style="${survey_review_write_style}"
                  >리뷰작성하기</a>
                  <a
                    href="#none"
                    class="btnItemFunc black feedback btnRebuy"
                    style="${survey_btn_rebuy_style}"
                    onclick="${survey_btn_rebuy_onclick}"
                    >재구매하기</a
                  >
                </div>
            </li>
            `;
          }
        }

        survey_jQuery(".survey_order_list").empty();
        survey_jQuery(".survey_order_list").html(html);

        if (!html) {
          // survey_jQuery(".survey_diagnosis_list").css("height", "200px");
          survey_jQuery(".message").show();
          survey_jQuery(".btn-more").remove();
        } else {
          addView();
        }




        let count = survey_jQuery(".survey_order_area").length;
        if (count == 0) {
          survey_jQuery(".message").removeClass("displaynone");
          survey_jQuery(".btn-more").hide();
        }

        if (count > 0 && count <= 8) {
          survey_jQuery(".btn-more").hide();
          survey_jQuery(".survey_order_area").removeClass("displaynone");
        }

        if (count > 8) {
          let survey_order_area_list = survey_jQuery(".survey_order_area");
          survey_order_area_list.each(function (index, element) {
            if (index < 8) {
              survey_jQuery(element).removeClass("displaynone");
            }
          });
          survey_jQuery(".btn-more").show();
        } else if (count <= 8) {
          survey_jQuery(".btn-more").hide();
        }



        setTimeout(function () {
          survey_jQuery(".stateSelect").show();
          // survey_jQuery(".survey_diagnosis_list").css("visibility", "");
        }, 500);
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

function addView() {
  add_view_count += 1;
  let total_count = survey_jQuery(".survey_order_area").length;
  let count = add_view_count * 8;
  let last_height = 0;
  window.addEventListener(
    "load",
    async function (event) {
      (async function (CAFE24API) {
        survey_mall_id = CAFE24API.MALL_ID;
        survey_shop_no = CAFE24API.SHOP_NO;

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

          surveyGetProductVariants();

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

          let check_status = null;
          if (status == "analysis") {
            check_status = "처방 분석 중";
          }
          if (status == "ready") {
            check_status = "조제 준비 중";
          }
          if (status == "prepare") {
            check_status = "맞춤 조제 중";
          }
          if (status == "shipping") {
            check_status = "배송중";
          }
          if (status == "complate") {
            check_status = "배송완료";
          }

          // 미노출 할 주문/배송 삭제
          let survey_order_area_list = survey_jQuery(".survey_order_area");
          for (let survey_order_area of survey_order_area_list) {
            let order_status = survey_jQuery(survey_order_area).attr("status");
            if (check_status && check_status != order_status) {
              survey_jQuery(survey_order_area).parent().parent().remove();
            }
            if (!order_status) {
              survey_jQuery(survey_order_area).parent().parent().remove();
            }

            let text = survey_jQuery(survey_order_area).find(".top .date .survey_order_date").text();
            let date_format = text.replace(/-/g, ".");
            survey_jQuery(survey_order_area).find(".top .date .survey_order_date").text(date_format);
          }

          let survey_diagnosis_result = await getSurveyDiagnosis();





          let days = 180;
          if (history_start_date && history_end_date) {
            days = dayjs(history_end_date).diff(history_start_date, 'day');
          } else {
            history_start_date = dayjs().subtract(180, "day").format("YYYY-MM-DD");
            history_end_date = dayjs().format("YYYY-MM-DD");
          }


          let status_type = "N00,N10,N22,N20,N21,N30,N40,C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36,E40";
          // 처방 분석 조회 (상품준비중: N10)
          if (status == "analysis") {
            status_type = "N10,N22";
          }
          // 조제준비중 조회 (배송준비중: N20)
          if (status == "ready") {
            status_type = "N20";
          }
          // 맞춤조제중 조회 (배송대기: N21)
          if (status == "prepare") {
            status_type = "N21";
          }
          // 배송중 조회 N30 
          if (status == "shipping") {
            status_type = "N30";
          }
          // 배송완료 조회 N40 
          if (status == "complate") {
            status_type = "N40";
          }
          // 취소/교환/반품 조회 C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36,E40 
          if (mode && mode == "cs") {
            status_type = "C00,C10,C34,C36,C40,C47,C48,C49,R00,R10,R12,R13,R30,R34,R36,R40,E00,E10,N01,E12,E13,E20,E30,E32,E34,E36,E40";
          }

          let survey_status_array = status_type.split(",");
          let survey_order_list = [];
          let loop_count = Math.ceil(days / 60);
          for (let i = 0; i < loop_count; i++) {
            let start_date = dayjs(history_start_date).add(((i * 60) + i), "day").format("YYYY-MM-DD");
            let end_date = dayjs(start_date).add(60, "day").format("YYYY-MM-DD");
            if (dayjs(end_date) > dayjs(history_end_date)) {
              end_date = dayjs(history_end_date).format("YYYY-MM-DD");
            }
            let survey_orders = await getSurveyOrder(status_type, start_date, end_date);
            for (let order of survey_orders) {
              survey_order_list.push(order);
            }
          }

          let html = "";
          for (const order of survey_order_list) {
            let order_date = dayjs(order.order_date).format("YYYY-MM-DD");
            let order_date2 = dayjs(order.order_date).format("YYYY.MM.DD");
            let order_id = order.order_id;

            for (const item of order.items) {
              if (survey_status_array.indexOf(item.order_status) < 0) {
                continue;
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
              let survey_review_write_style = "display: none";
              let survey_btn_rebuy_style = "display: none";
              let survey_btn_rebuy_onclick = "";
              if (product_status_text == "배송완료" || product_status_text == "배송중") {
                survey_shipping_search_style = "";
                survey_review_write_style = "";
                let find = survey_diagnosis_result.find((e) => e.hash == product_hash_code);
                if (find) {
                  survey_btn_rebuy_style = "";
                  let qna_at = dayjs(find.qna_at).format("YYYY.MM.DD");
                  survey_btn_rebuy_onclick = `surveyMoveReBuyPage(${product_no}, '${product_hash_code}', '${qna_at}')`;
                }
              }
              if (!product_hash_code) {
                survey_btn_rebuy_style = "display: none";
              }
              let survey_cancel_style = "display: none";
              if (product_status_text == "배송전" || product_status_text == "처방 분석 중") {
                survey_cancel_style = "";
              }
              let product_image = survey_product_resource.set_product.list_image;
              if (product_no == survey_shampoo_no) {
                product_image = survey_product_resource.shampoo.list_image
              }
              if (product_no == survey_treatment_no) {
                product_image = survey_product_resource.treatment.list_image
              }

              html += `
              <li class="diagnosis_order survey_order_area displaynone">
                  <div class="top">
                      <div class="date">${order_date2} <span>/ ${order_id}</span>
                  </div>
                      <a href="/myshop/order/detail.html?order_id=${order_id}&page=1&history_start_date=${order_date}&history_end_date=${order_date}" class="moreView"></a>
                  </div>
                  <div class="mid">
                      <div class="prdOrder">
                          <div class="info">
                              <h4 class="prdName">${product_name}</h4>
                              <h3 class="nickName">#${product_nick_name}</h3>
                              <span class="price">${surveyComma(Number(payment_amount))}원 / <em>${product_quantity}개</em></span>
                              <div class="state">
                                  <span>${product_status_text}</span>
                                  <!--
                                    <span class="delivery"><a href="#none" style="${survey_shipping_search_style}" onclick="surveyShippingSearch('${order_id}')">배송조회</a></span>
                                  -->
                              </div>
                          </div>
                          <div class="thumbnail">
                              <a><img src="${product_image}"></a>
                          </div>
                      </div>
                  </div>
                  <div class="mBtn gColumn"
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
                      onclick="surveyCancel('${order_id}')"
                      >취소요청</a
                    >
                    <a
                      href="#none"
                      class="btnItemFunc survey_return"
                      style="display: none"
                      >반품신청</a
                    >
                  </div>
                  <div class="mBtn gColumn">
                    <a
                      href="#"
                      class="btnLineG snap_review_write_btn"
                      data-params="product_no=${product_no}&order_id=${order_id}"
                      data-detail="product_no=${product_no}&order_id=${order_id}&ord_item_code=${item.order_item_code}"
                      status="${status}"
                      style="display: none"
                    >리뷰작성하기</a>
                    <a
                      href="#none"
                      class="btnItemFunc black feedback btnRebuy"
                      style="${survey_btn_rebuy_style}"
                      onclick="${survey_btn_rebuy_onclick}"
                      >재구매하기</a
                    >
                  </div>
              </li>
              `;
            }
          }

          survey_jQuery(".survey_order_list").empty();
          survey_jQuery(".survey_order_list").html(html);

          if (!html) {
            survey_jQuery(".message").show();
            survey_jQuery(".btn-more").remove();
          } else {
            addView();
          }




          let count = survey_jQuery(".survey_order_area").length;
          if (count == 0) {
            survey_jQuery(".message").removeClass("displaynone");
            survey_jQuery(".btn-more").hide();
          }

          if (count > 0 && count <= 8) {
            survey_jQuery(".btn-more").hide();
            survey_jQuery(".survey_order_area").removeClass("displaynone");
          }

          if (count > 8) {
            let survey_order_area_list = survey_jQuery(".survey_order_area");
            survey_order_area_list.each(function (index, element) {
              if (index < 8) {
                survey_jQuery(element).removeClass("displaynone");
              }
            });
            survey_jQuery(".btn-more").show();
          } else if (count <= 8) {
            survey_jQuery(".btn-more").hide();
          }



          setTimeout(function () {
            survey_jQuery(".stateSelect").show();
            // survey_jQuery(".survey_diagnosis_list").css("visibility", "");
          }, 500);
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

  function addView() {
    add_view_count += 1;
    let total_count = survey_jQuery(".survey_order_area").length;
    let count = add_view_count * 8;
    let survey_order_area_list = survey_jQuery(".survey_order_area");
    survey_order_area_list.each(function (index, element) {
      if (index < count) {
        survey_jQuery(element).removeClass("displaynone");
      }
      if (count >= total_count) {
        survey_jQuery(".btn-more").hide();
      }
    });
  }

  function surveySearch() {
    let survey_search_date = survey_jQuery("#survey_search_date").val();
    let survey_search_status = survey_jQuery("#survey_search_status").val();

    let status = `&status=${survey_search_status}`;
    if (survey_search_status == "cs") {
      status = "&mode=cs";
    }
    let history_start_date = dayjs().subtract(survey_search_date, "day").format("YYYY-MM-DD");
    let history_end_date = dayjs().format("YYYY-MM-DD");
    location.href = `${survey_skin_path}/myshop/mypage/order_check.html?history_start_date=${history_start_date}&history_end_date=${history_end_date}${status}`;
  }

  function surveyMoveDetail(element) {
    let order_id = survey_jQuery(element).parent().find(".survey_order_id").text();
    location.href = "/myshop/order/detail.html?order_id=" + order_id;
  }

  let survey_order_area_list = survey_jQuery(".survey_order_area");
  survey_order_area_list.each(function (index, element) {
    if (index < count) {
      survey_jQuery(element).removeClass("displaynone");
    }
    if (count >= total_count) {
      survey_jQuery(".btn-more").hide();
    }
  });
}

function surveySearch() {
  let survey_search_date = survey_jQuery("#survey_search_date").val();
  let survey_search_status = survey_jQuery("#survey_search_status").val();

  let status = `&status=${survey_search_status}`;
  if (survey_search_status == "cs") {
    status = "&mode=cs";
  }
  let history_start_date = dayjs().subtract(survey_search_date, "day").format("YYYY-MM-DD");
  let history_end_date = dayjs().format("YYYY-MM-DD");
  location.href = `${survey_skin_path}/myshop/mypage/order_check.html?history_start_date=${history_start_date}&history_end_date=${history_end_date}${status}`;
}

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

function surveyCancel(order_id) {
  let survey_module_cancel = survey_jQuery(".survey_module_cancel");
  for (const cancel of survey_module_cancel) {
    let cancel_order_id = survey_jQuery(cancel).attr("order_id");
    if (cancel_order_id == order_id) {
      let href = survey_jQuery(cancel).attr("href");
      location.href = "/myshop/order/cancel.html?order_id=" + cancel_order_id;
      break;
    }
  }
}