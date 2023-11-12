const { exec } = require('../db/mysql')

/**
 * 列表接口
 * @param author {string} 作者
 * @param keyword {number | string} 关键词
 * @returns {Promise<unknown>}
 */
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `  //1=1虽然是成立的，防止报错，防止author和keyword没有值，不然直接拼接order by createtime desc会报错
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    //返回promise
    return exec(sql)
}

/**
 * 获取博客详情
 * @param id
 * @returns {Promise<unknown>}
 */
const getDetail =  (id) => {
    const sql = `select * from blogs where id = '${id}'`
    return  exec(sql).then(rows => {
        return rows[0]
    })

}

/**
 * 新建博客
 * @param blogData
 * @returns {Promise<{id: number}>}
 */
const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含title content 属性

    const {title, content, author} =blogData
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createTime, author)
        value ('${title}', '${content}', '${createTime}', '${author}')
    `

    return exec(sql).then(insertData => {
        console.log('insertData', insertData)
        return {
            id: insertData.insertId  //插入id的值
        }
    })
}

/**
 * 更新博客
 * @param {number} id //更新博客的id
 * @param  blogData
 * @returns
 */
const updateBlog = (id, blogData = {}) => {
    // id 更新博客的id
    // blogData 是一个博客对象，包含title content 属性

    const { title, content } = blogData;

    const sql =`
        update blogs set title ='${title}', content='${content}' where id=${id}
    `

    return exec(sql).then(updateData => {
        console.log('updateData', updateData)
        if(updateData.affectedRows > 0){
            return true
        }
        return false
    })
}

/**
 *
 * @param id {number} 删除的博客id
 * @param author {string} 删除博客的用户
 * @returns
 */
const delBlog = (id, author = {}) => {
    //id 要删除博客的id  删除建议使用软删除，包装数据的可维护性
    const sql =`
        delete from blogs where id='${id}' and author='${author}';
    `
    return exec(sql).then(delData => {
        if(delData.affectedRows > 0){
            return true
        }
        return false
    })
}

module.exports ={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}