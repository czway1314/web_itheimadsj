$(function () {
  //点击去注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  //点击去登录的链接
  $('#link_login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })
  var form = layui.form

  var layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })
  // 监听注册表单的注册时间

  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name = username]').val(),
      password: $('#form_reg [name = password]').val()
    }
    $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功！')
      $('#link_login').click()
    });
  })

  //监听登录表单的事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: 'http://ajax.frontend.itheima.net/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登录成功！')
        //将得到的token值存到localStorage中
        location.setItem('token', res.token)
        //跳转到主页
        location.href = "/index.html"
      }

    })
  })
})