import { StyleSheet } from 'react-native';
// 
export const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        top:0,
        bottom: 0,
        left:0,
        right:0,
        zIndex: 1000,
        position: 'absolute',
        overflowX: 'hidden',
        height: '100%'
    },
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor:'#fff',
        flexDirection: 'column'
    },
    main:{
        minWidth:460,
        backgroundColor: 'yellow',
        borderRadius: 8,
        zIndex: 1000000,
        paddingVertical:30,
        paddingHorizontal:50
    }
});