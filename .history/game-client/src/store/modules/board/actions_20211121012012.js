export const USER_ADD_CARD_TO_FIELD = "USER_ADD_CARD_TO_FIELD"

export default {
    [USER_ADD_CARD_TO_FIELD](state,{uuid,Row,position}){
        if (position > -1) {
            //Look for the uuid on other place of the field array and remove it
            state.fields.forEach((element,index) => {
                let found = element.cards.findIndex(o => o.uuid === uuid)
                if(found != -1 ){
                    state.fields[index].cards.splice(found, 1)
                }
            });
            //add it
            commit(ADD_NOTE_PLAYING, note)
            state.fields[Row].cards.splice(position,0,{ uuid : uuid})
        }
    },
   
}