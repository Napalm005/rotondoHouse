$(function() {
   $(".form__input_phone").mask("8 999 999 99 99");

   $('.form__input, .form__textarea').on('input change', function() {
      $(this).val() != ''? $(this).addClass('_no-empty') : $(this).removeClass('_no-empty');
   })

   $('[required]').on('change', function() {
      var $this = $(this),
      parent = $this.parent();
      if ($this.val() == '') {
         validError()
      } else {
         validSuccess();
      }
      if ($this.attr('type') == 'email') {
         var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/;
         if (!filter.test($this.val())) {
            validError()
         } else {
            validSuccess();
         }
      }
      function validError() {
         parent.addClass('_error').removeClass('_success');
      }
      function validSuccess() {
         parent.removeClass('_error').addClass('_success');
      }
   });


   $('[required]').on('keyup', function() {
      var $this = $(this),
      parent = $this.parent();
      parent.removeClass('_error')
   });
   // Проверка при отправке
   var $obj = $('.form').find('.js-button-submit');
   $obj.on("click", function () {
      var valid = true;
      var $targetForm = $(this).parents('.form');
      $targetForm.find('[required]').map(function () {
         var $this = $(this),
         parent = $this.parent();
         var placeholder = $(this).attr('placeholder');
         if ($this.val() == '') {
            parent.addClass('_error');
            valid = false;
         } else {
            parent.removeClass('_error');
         }

         if ($this.attr('type') == 'email') {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/;
            var $email = $targetForm.find('[type="email"]');

            if (!filter.test($email.val())) {
               parent.addClass('_error');
               valid = false;
            } else {
               parent.removeClass('_error');
            }
         }

         if ($this.attr('type') == 'checkbox') {
            if (!$this.is(':checked')) {
               parent.addClass('_error');
               valid = false;
            } else {
               parent.removeClass('_error');
            }
         }
      });

      $('.popup__air').css('display', 'none');

      if (valid) {
         $('.popup__error').css('display', 'none');
         $('.popup__success').css('display', 'block');

         if ($targetForm.hasClass('js-ajax_form')) {
            var dataForm = $targetForm.serialize(),
            callback = $targetForm.data('back'),
            actionURL = $targetForm.attr('action');

            $.post(actionURL, dataForm, function (data) {
               window[callback](data);
            }, 'json');
         } else {
            $targetForm.submit();
         }
      } else {
         $('.popup__error').css('display', 'block');
      }
      return false;
   });
});
