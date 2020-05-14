import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDocumentPlateau, defaultValue } from 'app/shared/model/document-plateau.model';

export const ACTION_TYPES = {
  FETCH_DOCUMENTPLATEAU_LIST: 'documentPlateau/FETCH_DOCUMENTPLATEAU_LIST',
  FETCH_DOCUMENTPLATEAU: 'documentPlateau/FETCH_DOCUMENTPLATEAU',
  CREATE_DOCUMENTPLATEAU: 'documentPlateau/CREATE_DOCUMENTPLATEAU',
  UPDATE_DOCUMENTPLATEAU: 'documentPlateau/UPDATE_DOCUMENTPLATEAU',
  DELETE_DOCUMENTPLATEAU: 'documentPlateau/DELETE_DOCUMENTPLATEAU',
  SET_BLOB: 'documentPlateau/SET_BLOB',
  RESET: 'documentPlateau/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDocumentPlateau>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DocumentPlateauState = Readonly<typeof initialState>;

// Reducer

export default (state: DocumentPlateauState = initialState, action): DocumentPlateauState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTPLATEAU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTPLATEAU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DOCUMENTPLATEAU):
    case REQUEST(ACTION_TYPES.UPDATE_DOCUMENTPLATEAU):
    case REQUEST(ACTION_TYPES.DELETE_DOCUMENTPLATEAU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTPLATEAU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTPLATEAU):
    case FAILURE(ACTION_TYPES.CREATE_DOCUMENTPLATEAU):
    case FAILURE(ACTION_TYPES.UPDATE_DOCUMENTPLATEAU):
    case FAILURE(ACTION_TYPES.DELETE_DOCUMENTPLATEAU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTPLATEAU_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTPLATEAU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOCUMENTPLATEAU):
    case SUCCESS(ACTION_TYPES.UPDATE_DOCUMENTPLATEAU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOCUMENTPLATEAU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/document-plateaus';

// Actions

export const getEntities: ICrudGetAllAction<IDocumentPlateau> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DOCUMENTPLATEAU_LIST,
  payload: axios.get<IDocumentPlateau>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDocumentPlateau> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DOCUMENTPLATEAU,
    payload: axios.get<IDocumentPlateau>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDocumentPlateau> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOCUMENTPLATEAU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDocumentPlateau> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOCUMENTPLATEAU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDocumentPlateau> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOCUMENTPLATEAU,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
