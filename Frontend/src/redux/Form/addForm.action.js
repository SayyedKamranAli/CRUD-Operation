import { ADD_DATA } from './addForm.types';


    export const addData = (data) => {
        

        return {

            type: ADD_DATA,
            data: data
        };

    };