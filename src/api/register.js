import request from "@/api/index"


export function register(form) {
    return request({
            url : '/user/register',
            contentType : 'application/json;charset=UTF-8',
            dataType : "json",
            method : 'post',
            data : {
                "username" : form.username,
                "password" : form.password,
                "gender" : form.gender,
                "age" : form.age,
                "phone" : form.phone
            }
        }
    )

}
