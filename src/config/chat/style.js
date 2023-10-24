const darkMode = {
    channelListMessenger: {
        flatListContent: {
            backgroundColor:'#000'
        },
    },
    messageList:{
        container: {
            backgroundColor:'#000',
        }
    },
    messageInput:{
        container: {
            backgroundColor:'#000',
        },
        inputBox:{
            color:'#fff'
        }
    },
    channelPreview:{ // chatbox
        container: {
            backgroundColor:'#000',
            // borderBottomWidth: 1,
            // borderColor: '#A8A8A8'
        },
        date: {
            color:'#808080'
        },
        message: {
            color:'#808080'
        },
        title: {
            color:'#fff'
        }
    }
}
// 
const lightMode = {
    channelListMessenger: {
        flatListContent: {
            // backgroundColor:'#eee'
        },
    },
    messageList:{
        container: {
            // backgroundColor:'#000',
        }
    },
    messageInput:{
        container: {
            // backgroundColor:'#000',
        }
    },
    channelPreview:{ // chatbox
        container: {
        // backgroundColor:'#000'
        },
        date: {
            color:'#808080'
        },
        message: {
            color:'#808080'
        },
        title: {
            color:'#000'
        }
    }
}
export {
    darkMode,
    lightMode
}