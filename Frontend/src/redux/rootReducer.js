import { combineReducers } from 'redux';


    import counterReducer from './Counter/counter.reducer';
    import addForm from './Form/addForm.reducer';


    const rootReducer = combineReducers({

        counter: counterReducer,
        
         addForm,
        
    });

    export default rootReducer;