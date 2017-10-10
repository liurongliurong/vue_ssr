let api = {}
api.f = (num) => {
  num = num < 10 ? '0' + num : num
  return num
}
api.date = (d, t) => {
  var year = d.getFullYear()
  var month = api.f(d.getMonth() + 1)
  var day = api.f(d.getDate())
  var hour = api.f(d.getHours())
  var minutes = api.f(d.getMinutes())
  var seconds = api.f(d.getSeconds())
  switch (t) {
    case 'date':
      return year + '-' + month + '-' + day
    case 'time':
      return hour + ':' + minutes + ':' + seconds
    case 'sTime':
      return hour + ':' + minutes
    default:
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  }
}
api.serialize = data => {
  var str = []
  for (let [k, v] of Object.entries(data)) {
    str.push(k + '=' + v)
  }
  str = str.join('&')
  return str
}
api.decimal = (f) => {
  return f.toFixed(2)
}
api.readable = (num) => {
  var result = ''
  num = (num || 0).toString()
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return result
}
api.telReadable = (tel) => {
  return tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
api.cardReadable = (tel) => {
  return tel.replace(/(\d{4})\d{10}(\d{4})/, '$1****$2')
}
api.currency = (num, n) => {
  var result = ''
  num = api.decimal(num)
  result = api.readable(num.slice(0, num.length - 3)) + num.slice(-3)
  return result
}
api.createCode = (mycanvas) => {
  var str = api.rand()
  var cxt = mycanvas.getContext('2d')
  cxt.fillStyle = '#000'
  cxt.fillRect(0, 0, 90, 40)
  for (var j = 0; j < 20; j++) {
    cxt.strokeStyle = '#fff'
    cxt.beginPath()
    cxt.moveTo(api.line().x, api.line().y)
    cxt.lineTo(api.line().x, api.line().y)
    cxt.lineWidth = 0.5
    cxt.closePath()
    cxt.stroke()
  }
  cxt.fillStyle = 'red'
  cxt.font = 'bold 20px Arial'
  cxt.fillText(str, 20, 25)
  return str
}
api.rand = () => {
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var arr = str.split('')
  var validate = ''
  var ranNum
  for (var i = 0; i < 4; i++) {
    ranNum = Math.floor(Math.random() * 62)
    validate += arr[ranNum]
  }
  return validate
}
api.line = () => {
  var line = {x: 0, y: 0}
  line.x = Math.floor(Math.random() * 90)
  line.y = Math.floor(Math.random() * 40)
  return line
}
api.checkFrom = (form) => {
  var data = {}
  var c = true
  for (var i = 0; i <= form.length - 2; i++) {
    if (form[i].value) {
      if (api.checkFiled(form[i], form)) {
        if (form[i].getAttribute('isChange')) {
          data[form[i].name] = encodeURIComponent(form[i].value)
        } else {
          data[form[i].name] = form[i].value
        }
      } else {
        c = false
      }
    } else {
      api.setTips(form[i], 'null')
      c = false
    }
  }
  if (!c) {
    return false
  } else {
    return data
  }
}
api.checkOne = (form, obj) => {
  var data = {}
  for (var i = 0; i <= form.length - 2; i++) {
    if (form[i].value) {
      if (obj.check(form[i])) {
        data[form[i].name] = form[i].value
      } else {
        return {status: 'invalid', n: i}
      }
    } else {
      return {status: 'null', n: i}
    }
  }
  return data
}
api.checkFiled = (ele, form) => {
  if (!ele.checkValidity()) {
    api.setTips(ele, 'invalid')
  } else if ((ele.name === 'imgCode' && ele.value.toLowerCase() !== localStorage.getItem('code').toLowerCase()) || (ele.name === 'password1' && ele.value !== form.password.value) || (ele.name === 'trade_password1' && ele.value !== form.trade_password.value)) {
    api.setTips(ele, 'error')
  } else {
    api.setTips(ele, 'valid')
    return true
  }
}
api.checkCode = (form) => {
  var c = true
  var i = 0
  while (form[i].name !== 'code') {
    if (form[i].value) {
      if (!api.checkFiled(form[i])) {
        c = false
      }
    } else {
      api.setTips(form[i], 'null')
      c = false
    }
    i++
  }
  return c
}
api.setTips = (ele, str) => {
  ele.setAttribute('data-status', str)
  setTimeout(() => {
    ele.setAttribute('data-status', '')
  }, 2000)
}
export default api
