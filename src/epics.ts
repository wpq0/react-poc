import { Observable } from 'rxjs';
import { Action } from 'redux';
import { combineEpics, ActionsObservable } from 'redux-observable';

export default function createEpics(actions$: ActionsObservable<Action>) {
    return combineEpics();
}