const {v4: uuidv4 }= require('uuid')
const Post = require('../model/postModel')
module.exports={
   async generate(){
        let id = `${uuidv4()}${Date.now()}`
        let result=await Post.findOne({where:{id}})
        if(!result){
            return id
        }
        return this.generate()
    }
}