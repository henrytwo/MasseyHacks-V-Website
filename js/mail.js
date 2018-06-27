$(document).ready(function () {
    function sub (email) {
        if (email.val() != '') {
            swal({
                type: 'info',
                title: 'Processing subscription'
            });
            swal.showLoading()

            $.ajax({
                url: './php/emailSub.php',
                type: 'POST',
                data: {
                    email: email.val()
                },
                success: function (msg) {
                    if (msg == "success") {
                        swal({
                            type: 'success',
                            title: 'Subscribed!',
                            html: 'Get ready for the latest updates about MasseyHacks V! <br>(' + email.val() + ')'
                        });
                        email.val("");

                    } else if (msg == 'invalid') {
                        swal(
                            'Oops...',
                            'Invalid email address.',
                            'error'
                        );
                    } else if (msg == 'asubbed'){
                        swal(
                            'Oops...',
                            'You are already subscribed. <br>(' + email.val() + ')',
                            'error'
                        );
                    } else {
                        swal(
                            'Oops...',
                            'Something went wrong! Please try again later.',
                            'error'
                        );
                    }
                },
                error: function () {
                    swal(
                        'Oops...',
                        'Something went wrong! Please try again later.',
                        'error'
                    );
                }

            });
        }
    }

    $('#mce-EMAIL').keydown(function (e) {
        if (e.which == 13 && (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
            e.preventDefault();
            var email = $('#mce-EMAIL');
			console.log(email);
            sub(email);
			$('#mce-EMAIL').val('');
        }
    });

    $('#mc-embedded-subscribe').click(function () {
        var email = $('#mce-EMAIL');
		console.log(email);
        sub(email);
		$('#mce-EMAIL').val('');
    });
});