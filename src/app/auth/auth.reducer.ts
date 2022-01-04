import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user: Usuario | null ;
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,
    // Se utiliza desestructuracion para romper la referencia en memoria
    on(setUser, (state, { user }) => ({ ...state, user: {...user}})),
    on(unSetUser, state => ({ ...state, user: null})),
    );

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}
