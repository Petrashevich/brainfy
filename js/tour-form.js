 $(function() {

    $(".tour-form input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $form.find("input#name").val();
            var email = $form.find("input#email").val();
            var phone = $form.find("input#phone").val();
            var companyName = $form.find("input#company-name").val();
            var jobTitle = $form.find("input#job-title").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://formspree.io/f/xvgopgkk",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    companyName: companyName,
                    jobTitle: jobTitle,
                },
                cache: false,
                success: function() {
                    // Success message
                    $form.find('#success').html("<div class='alert alert-success'>");
                    $form.find('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                        $form.find('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                        $form.find('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $form.find('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $form.find('#success').html("<div class='alert alert-danger'>");
                    $form.find('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                        $form.find('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                        $form.find('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $form.find('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
