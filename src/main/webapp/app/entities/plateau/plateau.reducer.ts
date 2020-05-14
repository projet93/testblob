import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlateau, defaultValue } from 'app/shared/model/plateau.model';

export const ACTION_TYPES = {
  FETCH_PLATEAU_LIST: 'plateau/FETCH_PLATEAU_LIST',
  FETCH_PLATEAU: 'plateau/FETCH_PLATEAU',
  CREATE_PLATEAU: 'plateau/CREATE_PLATEAU',
  UPDATE_PLATEAU: 'plateau/UPDATE_PLATEAU',
  DELETE_PLATEAU: 'plateau/DELETE_PLATEAU',
  RESET: 'plateau/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlateau>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PlateauState = Readonly<typeof initialState>;

// Reducer

export default (state: PlateauState = initialState, action): PlateauState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLATEAU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLATEAU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PLATEAU):
    case REQUEST(ACTION_TYPES.UPDATE_PLATEAU):
    case REQUEST(ACTION_TYPES.DELETE_PLATEAU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PLATEAU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLATEAU):
    case FAILURE(ACTION_TYPES.CREATE_PLATEAU):
    case FAILURE(ACTION_TYPES.UPDATE_PLATEAU):
    case FAILURE(ACTION_TYPES.DELETE_PLATEAU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLATEAU_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLATEAU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLATEAU):
    case SUCCESS(ACTION_TYPES.UPDATE_PLATEAU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLATEAU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/plateaus';

// Actions

export const getEntities: ICrudGetAllAction<IPlateau> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PLATEAU_LIST,
    payload: axios.get<IPlateau>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPlateau> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLATEAU,
    payload: axios.get<IPlateau>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPlateau> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLATEAU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPlateau> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLATEAU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlateau> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLATEAU,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
