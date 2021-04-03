document.write("<script type='text/javascript' src='bootstrap/js/bootstrap.min.js'></script>'")
document.write("<script type='text/javascript' src='docs.min.js'></script>'")
document.write("<script type='text/javascript' src='../background/lib/layui/layui.all.js'></script>'")
document.write("<script type='text/javascript' src='jquery-3.2.1.min.js'></script>'")

var LOCAL_URL = 'http://127.0.0.1:9091'

var REQUEST_TYPE = {
    "POST": "post",
    "PUT": "put",
    "GET": "get",
    "DELETE": "delete"
}

var BUSINESS_CODE = {
    "SUCCESS": "SUCCESS"
}

function ajax(url, type, paramsArr, body) {
    var loding = 0
    var result = {}
    url = LOCAL_URL + url
    if (paramsArr.length != 0) {
        url = url + "?"
        var i = 0
        for (var key in paramsArr) {
            if (i == 0) {
                url = url + key + "=" + paramsArr[key]
            } else {
                url = url + "&" + key + "=" + paramsArr[key]
            }
            i++
        }
    }
    $.ajax({
        type: type,
        url: url,
        async: false,
        data: body,
        beforeSend: function () {
            loding = layer.load()
        },
        success: function (data) {
            layer.close(loding)
            result = data
        },
        error: function () {
            layerAlert("请求错误")
            layer.close(loding)
        }
    })
    return result
}


function nullAlert(obj, message) {
    if (obj == null || obj == undefined || obj == "") {
        layerAlert(message)
        return true
    }
    return false
}

/**
 * 确认窗口
 * return {
 *      确认：true
 *      取消：false
 *
 * @param message
 */
function layerConfirm(message) {
    layer.confirm(message, {
        icon: 3,
        title: '提示'
    }, function (cindex) {
        layer.close(cindex);
        return true
    }, function (cindex) {
        layer.close(cindex);
        return false
    });
}

function layerAlert(message) {
    layer.msg(message)
}

/**
 * 邮箱验证
 */
function vertifyEmail(email) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
    if (email == '') {
        layerAlert("邮箱格式错误")
        return false;
    }
    if (reg.test(email)) {
        return true
    } else {
        layerAlert("邮箱格式错误")
        return false
    }
}

/**
 * 手机号验证
 */
function vertifyPhoneNumber(phoneNumber) {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/

    if (phoneNumber == '') {
        layerAlert("手机号码格式错误")
        return false
    }
    if (reg.test(phoneNumber)) {
        return true
    } else {
        layerAlert("手机号码格式错误")
        return false
    }

}

function sleep(numberMillis){
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime){
            return
        }
    }
}

