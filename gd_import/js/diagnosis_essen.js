/* 텍스트 박스 클릭 */
$(function() {
	$(".select ul.row li").click(function() {
		$(".select ul.row li").removeClass("line_checked");
		$(this).addClass("line_checked");
	});
});

/* 텍스트 박스 멀티 클릭 */
$(function() {
	$(".select ul.multi li").click(function() {
		$(this).toggleClass("line_checked");
		$(".dontKnow a").removeClass("active");
	});
});

$(function() {
	$(".select ul.single li").click(function() {
		$(".select ul.single li").removeClass("line_checked");
		$(this).toggleClass("line_checked");
		$(".dontKnow a").removeClass("active");
	});

	$(".select ul.single li.inputTxt").click(function() {
		$(".select ul.single li.etcInput").show();
		$(".dontKnow a").removeClass("active");
	});

	$(".select ul.single li.etcInput .delInput").click(function() {
		$(".select ul.single li.etcInput").hide();
	});
});

/* tyLessMore Button 클릭 */
$(function() {
	$(".itemVote button").click(function() {
		$(".itemVote button").removeClass("active");
		$(this).addClass("active");
		$(".dontKnow a").removeClass("active");
	});

	$("button#solve01").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty01").addClass("active");
	});

	$("button#solve02").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty02").addClass("active");
	});

	$("button#solve03").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty03").addClass("active");
	});

	$("button#solve04").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty04").addClass("active");
	});

	$("button#solve05").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty05").addClass("active");
	});
});

/* satisfy Rate 클릭 */
$(function() {
	$(".selRate span").click(function() {
		$(".selRate span").removeClass("active");
		$(this).addClass("active");
		$(".dontKnow a").removeClass("active");
	});

	$(".selRate span#rate01").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty01").addClass("active");
	});

	$(".selRate span#rate02").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty02").addClass("active");
	});

	$(".selRate span#rate03").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty03").addClass("active");
	});

	$(".selRate span#rate04").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty04").addClass("active");
	});

	$(".selRate span#rate05").click(function() {
		$(".tyTitle span").removeClass("active");
		$(".tyTitle span#ty05").addClass("active");
	});
});

/* tyMultiPhoto 클릭 */
$(function() {
	$(".tyMultiPhoto .items span").click(function() {
		$(this).toggleClass("active");
		$(".dontKnow a").removeClass("active");
	});

	$(".tyMultiPhoto .items span#part01").click(function() {
		$(".tyMultiPhoto .thumbSec span#partImg01").toggleClass("active");
	});

	$(".tyMultiPhoto .items span#part02").click(function() {
		$(".tyMultiPhoto .thumbSec span#partImg02").toggleClass("active");
	});

	$(".tyMultiPhoto .items span#part03").click(function() {
		$(".tyMultiPhoto .thumbSec span#partImg03").toggleClass("active");
	});

	$(".tyMultiPhoto .items span#part04").click(function() {
		$(".tyMultiPhoto .thumbSec span#partImg04").toggleClass("active");
	});

	$(".tyMultiPhoto .items span#part05").click(function() {
		$(".tyMultiPhoto .thumbSec span#partImg05").toggleClass("active");
	});
});

$(function() {
	$(".dontKnow a").click(function() {
		$(this).addClass("active");
		$(".tyTitle span").removeClass("active");
//		$(".tyTitle span#ty05").addClass("active");
		$(".control_bar .swipeTitle span").removeClass("checked");
//		$(".control_bar .swipeTitle span.notSo").addClass("checked");
		$(".itemVote button").removeClass("active");

		$(".select ul.multi li").removeClass("line_checked");
		$(".selRate span").removeClass("active");
		$(".tyMultiPhoto .items span").removeClass("active");
		$(".tyMultiPhoto .thumbSec span").removeClass("active");
		$(".quantity .word").removeClass("active");
		$(".bar .swiper-scrollbar-drag").addClass("dis");

		$(".essenTy li").removeClass("line_checked");
	});
});

/* multi select 클릭 */
$(function() {
	$(".keywordBox .tag").click(function() {
		$(this).toggleClass("active");
	});
});

/* essenTy 클릭 */
$(function() {
	$(".essenTy li").click(function() {
		$(this).toggleClass("line_checked");
	});
});

/* textarea 높이 자동 조절 */
const DEFAULT_HEIGHT = 24; // textarea 기본 height

const $textarea = document.querySelector('.autoTextarea');

$textarea.oninput = (event) => {
  const $target = event.target;

  $target.style.height = 0;
  $target.style.height = DEFAULT_HEIGHT + $target.scrollHeight + 'px';
};