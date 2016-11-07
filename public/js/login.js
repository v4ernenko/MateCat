$.extend(APP, {
    setLoginEvents: function () {
        APP.ModalWindow = ReactDOM.render(
            React.createElement(ModalWindow),
            $("#modal")[0]
        );
        $('#logoutlink').on('click',function(event){
            //stop form submit
            event.preventDefault();
            $.post('/ajaxLogout',{logout:1},function(data){
                if('unlogged'==data){
                    //ok, unlogged
                    if($('body').hasClass('manage')) {
                        location.href = config.hostpath + config.basepath;
                    } else {
                        window.location.reload();
                    }
                }
            });
        });

        $('.user-menu-preferences').on('click', function () {
            APP.ModalWindow.showModalComponent(PreferencesModal, {}, 'Preferences');
        });

        $('#modal').on('opensuccess', function (e, param) {
            APP.ModalWindow.showModalComponent(SuccessModal, param, param.title);
        });

        $('#modal').on('openpreferences', function (e, param) {
            var props = {};
            if (param)
                props = param;
            APP.ModalWindow.showModalComponent(PreferencesModal, props, 'Preferences');
        });
        $('#modal').on('openresetpassword', function () {
            APP.ModalWindow.showModalComponent(ResetPasswordModal, {}, "Reset Password");
        });
        $('#modal').on('openforgotpassword', function () {
            APP.ModalWindow.showModalComponent(ForgotPasswordModal, {}, "Forgot Password");
        });
        $('#modal').on('openregister', function () {
            var props = {
                googleUrl: $('#sign-in').data('oauth')
            };
            APP.ModalWindow.showModalComponent(RegisterModal, props, "Register Now");
        });
        $('#modal').on('openlogin', function () {
            var style = {
                'width': '80%',
                'maxWidth': '800px',
                'minWidth': '600px'
            };
            var props = {
                googleUrl: $('#sign-in').data('oauth')
            };
            APP.ModalWindow.showModalComponent(LoginModal, props, 'Login or register', style);
        });

        /// TODO
        $('a.authLink').click(function(e){
            e.preventDefault();

            $('#modal').trigger('openlogin');
        });

        this.checkLoginFromQueryString();
    },
    checkLoginFromQueryString: function () {
        var keyParam = APP.getParameterByName("open");
        var modal$ = $('#modal');
        switch (keyParam) {
            case "reset":
                modal$.trigger('openresetpassword');
                break;
            case "preference":
                modal$.trigger('openpreferences');
                break;
        }
    }
});