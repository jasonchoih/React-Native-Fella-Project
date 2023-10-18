export default 
{
    user: { 
        required: "Please fill in your username" ,
        pattern: {
            value: /^[a-zA-Z0-9\_\-\@\.]{6,26}$/,
            message: 'The format is a-z A-Z 0-9 _-@., length 6-26'
        }
    },
    pass: { 
        required: "Please fill in your password" ,
        pattern:{
            value:/^[a-zA-Z0-9\_\-\@\.]{6,26}$/,
            message:'The format is a-z A-Z 0-9 _-@., length 6-26'
        }
    },
    email: {
        required: "Please fill in your email" ,
        pattern:{
            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message:'Please fill in a valid email'
        }
    },
    phone: { 
        required: "手机不能为空。",
        pattern:{
            value:/^\d{6,11}$/,
            message:"格式为 6-11位数字"
        }
    },
    nick:{
        required: "Please fill in your name" ,
        pattern:{
            // value:/^[a-zA-Z0-9_\u4E00-\u9FA5]{2,16}$/,
            // message:'格式为 a-zA-Z0-9_或中文，长度2-16'
        }
    },
    tag:{
        required: "Please fill in your tag" ,
    },
    parent: {
        // required: "Parent cannot be empty" ,
        pattern:{
            value:/^\d{6,12}$/,
            message:'格式为 6-12位数字'
        }
    },
    code: {
        required: "验证码不能为空。" ,
        pattern:{
            value:/^\d{6}$/,
            message:'格式为 6位数字'
        }
    },
    content: { 
        required: "Content cannot be empty" ,
    },
    bio: { 
        // required: "Content cannot be empty" ,
    },
    website: { 
        required: "Content cannot be empty" ,
    },
}