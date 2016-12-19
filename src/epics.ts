import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

export default function createEpics() {
    return combineEpics();
}