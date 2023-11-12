const loginCheck = (username, password) => {
    //先使用假数据
    if (username === '小明' && password === '123'){
        console.log('登录成功')
        return true
    }
    return false
}

module.exports = {
    loginCheck
}