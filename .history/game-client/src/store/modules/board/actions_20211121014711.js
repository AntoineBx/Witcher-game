export const USER_ADD_CARD_TO_FIELD = "USER_ADD_CARD_TO_FIELD"
import { ADD_CARD_TO_FIELD, REMOVE_CARD_TO_FIELD } from "./mutations";
export default {
    [USER_ADD_CARD_TO_FIELD]({commit, state},{Row, position, uuid}){
        if (position > -1) {
            console.log(state);
            //Look for the uuid on other place of the field array and remove it
            state.fields.forEach((element,index) => {
                let found = element.cards.findIndex(o => o.uuid === uuid)
                if(found != -1 ){
                    commit(REMOVE_CARD_TO_FIELD,{index,found});
                    // state.fields[index].cards.splice(found, 1)
                }
            });
            //add it
            console.log("ADDING FIELD FNDJZKLOFHJO")
            commit(ADD_CARD_TO_FIELD,{Row,position,uuid});
            // state.fields[Row].cards.splice(position,0,{ uuid : uuid})
        }
    },
   
}