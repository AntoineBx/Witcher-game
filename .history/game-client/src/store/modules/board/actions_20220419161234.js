export const USER_ADD_CARD_TO_FIELD = "USER_ADD_CARD_TO_FIELD"
export const USER_UPDATE_BOARD = "USER_UPDATE_BOARD"
export const USER_UPDATE_SHOWCASE = "USER_UPDATE_SHOWCASE"
import { ADD_CARD_TO_FIELD, REMOVE_CARD_TO_FIELD, UPDATE_BOARD,UPDATE_SHOWCASE, UPDATE_CARDS, ADD_CARD_STATUS } from "./mutations";

export default {
    [USER_UPDATE_BOARD]({commit},board){
        commit(UPDATE_BOARD, {board} );
        commit(UPDATE_CARDS,{cards : board.cards});
    },
    [USER_UPDATE_SHOWCASE]({commit}, idCard){
        commit(UPDATE_SHOWCASE, idCard)
        commit(ADD_CARD_STATUS,{ idCard , status:"showcase"})
    },
    [USER_ADD_CARD_TO_FIELD]({commit, state},{row, position, idCard}){
        // if(state.player == 2){

        //     row = Math.abs(row-5)
        // }
        if (position > -1) {
            
            //Look for the uuid on other place of the field array and remove it
            state.fields.forEach((element,index) => {
                console.log(element);
                let found = element.cards.findIndex(o => o.idCard === idCard)
                if(found != -1 ){
                    commit(REMOVE_CARD_TO_FIELD,{ row:index, position:found });
                }
            });
            //add it
            commit(ADD_CARD_TO_FIELD,{ row:row, position:position, idCard:idCard });
           
            
        }
    },
   
}