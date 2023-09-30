import request from "@/api/index"

export function getRandom() {
    return request({
        url : '/movie/random',
        method : 'get',
    })
}

export function getType(type) {
    console.log(type)
    return request({
        url : '/movie/type/' + type,
        method : 'get',
    })
}

export function getMovieById(id) {
    return request({
        url : '/movie/' +  id,
        method : 'get',
    })
}


export function getByTime(time) {
    console.log(time)
    return request({
        url : '/movie/year/' + time,
        method : 'get',
    })
}


export function search(nameField) {
    return request({
        url : '/movie/search/' + nameField,
        method : 'get',
    })
}

