var paymentChosen = '';
var tosApproved = false;

var localStorageEnabled = function localStorageEnabled()
{
	var mod = "psCheckIfLocalStorageEnabled";
	try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch(e) {
        return false;
    }
};

var confirmOrder = function confirmOrder()
{
	if(paymentChosen && tosApproved)
	{
		$('#'+paymentChosen+'_payment form').submit();
	}
};

var toggleChosenForm = function(show, undefined)
{
	if(paymentChosen)
	{
		var elt = $('#'+paymentChosen+'_form_container');
		if(elt.attr('data-do-not-toggle') != 1)
		{
			if(show === undefined)
			{
				elt.toggle();
			}
			else if(show)
			{
				elt.show();
			}
			else
			{
				elt.hide();
			}
		}
	}
};

var updateConfirmButton = function updateConfirmButton()
{
	if(paymentChosen && tosApproved)
	{
		$('#confirmOrder').removeAttr('disabled');
	}
	else
	{
		$('#confirmOrder').attr('disabled', 'disabled');
	}
}

$(document).ready(function(){

	if(localStorageEnabled())
	{
		var pref = localStorage.getItem('preferredPaymentMethod');
		if(pref)
		{
			var radio = $('#choose_'+pref);
			if(radio)
			{
				radio.prop('checked', true);
				paymentChosen = pref;
				toggleChosenForm(true);
			}
		}
	}

	$(document).on('change', 'input:radio[name=payment_option]', function(evt){
		console.log('test');
		evt.preventDefault();
		// Hide currently displayed form if there is one
		toggleChosenForm(false);

		var val = $(this).val();
		if(val)
		{
			paymentChosen = val;
			// Display form if there is one
			toggleChosenForm(true);
			if(localStorageEnabled())
			{
				localStorage.setItem('preferredPaymentMethod', val);
			}
		}
		else
		{
			paymentChosen = '';
		}

		updateConfirmButton();
	});

	$(document).on('change', '#cgv', function(){
		tosApproved = $(this).is(':checked');
		updateConfirmButton();
	});
});