import request from "@/api/index"

export function getUserInfo(username) {
    return request({
        url : '/user/' + username,
        method : 'get',
    })
}
export function upDataUser(form) {
    return request({
        url : '/user',
        contentType : 'application/json;charset=UTF-8',
        dataType : "json",
        method : 'put',
        data : {
            "username" : form.username,
            "password" : form.password,
            "gender" : form.gender,
            "age" : form.age,
            "phone" : form.phone
        }
    })
}

export function getUserAct(userName) {
    return request({
        url : '/userAct/' + userName,
        method : 'get',
    })
}

export function getByGA(ga) {
    return request({
        url : '/movie/GA/' + ga,
        method : 'get',
    })
}

export function saveUserAct(userName,movieName,movieTime,movieType) {
    return request({
        url : '/userAct/userActInfo',
        contentType : 'application/json;charset=UTF-8',
        dataType : "json",
        method : 'post',
        data : {
            "userName" : userName,
            "movieName" : movieName,
            "movieReleaseTime" : movieTime,
            "movieType" : movieType
        }
    })
}


export function getByUserActMovie(username) {
    return request({
        url : '/userAct/UserActMovie/' + username,
        method : 'get',
    })
}
