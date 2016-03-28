(function() {
    var WM_API;
    var input = document.getElementById("wm-input");
    var wmBtn = document.getElementById("wm-btn");
    var wmInfo = document.getElementById("wm-user-info");
    var wmBack = document.getElementById("fa-undo");
    var lookupEmail;

    chrome.storage.sync.get('wmApiKey', function(items) {
        WM_API = items.wmApiKey;
    });

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };     

    function addCheck(direction, element) {
        if (direction) {
            // add check
            element.html('<i class="fa fa-check"></i>');
        } else {
            // add non-check
            element.html('<i class="fa fa-times""></i>');
        }
    };

    function grabInfo() {
        lookupEmail = input.value;
        console.log("Sending post for " + lookupEmail);

        $.ajax({
            type: "GET", 
            url: "https://app.monitoringclient.com/internal/v1/users/search", 
            data: { "email": lookupEmail, "token": WM_API},
            statusCode: {
                503: function() {
                     $("#wm-error").text("error: 503");
                },
                504: function() {
                    $("#wm-error").text("error: 504");
                }
            },
        }).done(function(data) {
            var subdomain_link = 'https://' + data.current_company.subdomain + '.monitoringclient.com/';
            var subdomain_replacement_text = '<a target="_blank" href="' + subdomain_link + '">' + data.current_company.subdomain + '</a>';
            $('#subdomain').html(subdomain_replacement_text);

            var admin_link = 'https://admin.monitoringclient.com/companies/' + data.current_company.subdomain;
            var admin_link_text = '<a target="_blank" href="' + admin_link + '">admin</a>';
            $('#admin-page').html(admin_link_text);

            $('#user-level').text(data.max_role);
            $('#subscription-state').text(data.status);
            $('#computer-count').text(data.current_company.computer_count);
            $('#name').html('<strong>' + data.current_company.name + '</strong>');

            addCheck(data.current_company.eligible_for_trial, $('#eligible-trial'));
            addCheck(data.current_company.windows_beta, $('#windows-beta'));
            addCheck(data.current_company.applecare_tracking, $('#applecare-tracking'));
            addCheck(data.current_company.custom_branding, $('#custom-branding'));

            $('#subject-prefix').text(data.current_company.email_subject_prefix);

            $(wmInfo).css("top", "0");

        }).fail(function() {
            console.log("User not found in WM database - check API key if this is incorrect");
            $("#wm-error").text("not found in database");
            $('#admin-page').empty();
            $('#subdomain').empty();
            $('#user-level').empty();
            $('#subscription-state').empty();
            $('#computer-count').empty();
        }).always(function() {
        });

    };

    $(wmBack).click(function() {
        $(wmInfo).css("top", "");
    });


    // Grab email info from Enter key or mouse click on button
    window.addEventListener("keypress", function(e) {
        if (e.keyCode == "13") {
            if (input.value.length > 0) {
                grabInfo();
            };
        };
    }, false);

    wmBtn.addEventListener("click", function(e) {
        if (input.value.length > 0) {
            grabInfo();
        };
    }, false);

    // checks if anything is highlighted, if valid email, activate search
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        input.value  = selection[0].trim().replace(/[^,;]*.?</g, "").replace(/>/g, "");

        if ( validateEmail(input.value) ) {
            grabInfo();
        };
    });

})();
