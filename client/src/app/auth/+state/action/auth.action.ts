import { createAction, props, union } from '@ngrx/store';
import { IError } from 'src/app/@models/error.interface';
import { AuthModel } from 'src/app/@models/auth-model';

export const Login = createAction('[Auth] Login', props<{payload: AuthModel.ILogin}>());
export const LoginSuceess = createAction('[Auth] Login Success', props<{payload: AuthModel.IUser}>());
export const LoginFaild = createAction('[Auth] Login Faild', props<{payload: IError}>());

const all = union({Login, LoginSuceess, LoginFaild});
export type UserLoginActionUnion = typeof all;