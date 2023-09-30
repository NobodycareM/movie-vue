import request from "@/api/index"


export function login(form) {
    return request({
        url : '/user/login',
        contentType : 'application/json;charset=UTF-8',
        dataType : "json",
        method : 'post',
        data : {
            "username" : form.username,
            "password" : form.password
        }
        }
        )

}
