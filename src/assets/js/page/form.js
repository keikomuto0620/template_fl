import jQuery from "jquery";
const $ = jQuery;

const confirm = $('#js-confirm');
const submit = $('#js-submit');

$('#js-confirm').on('click', function () {
	if ($(this).prop("checked") == false) {
		submit.attr("disabled", "disabled").parent().addClass('c-btn--disabled');
	} else {
		submit.removeAttr("disabled").parent().removeClass('c-btn--disabled');
	}
});
