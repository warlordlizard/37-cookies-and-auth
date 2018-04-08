import superagent from 'superagent';

export const photosSet = (photos) => ({
  type: 'PHOTOS_SET',
  payload: photos,
});

export const photoCreate = (photo) => ({
  type: 'PHOTO_CREATE',
  payload: photo,
});

export const photoUpdate = (photo) => ({
  type: 'PHOTO_UPDATE',
  payload: photo,
});

export const photoDelete = (photo) => ({
  type: 'PHOTO_DELETE',
  payload: photo,
});

export const photosFetchRequest = (photos) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/photos/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then( res => {
      dispatch(photosSet(res.body.data));
      return res;
    });
};

export const photoCreateRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/photos`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.photo)
    .then(res => {
      dispatch(photoCreate(res.body.data));
      return res;
    });
};


export const photoDeleteRequest = (photo) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.delete(`${__API_URL__}/photos/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(photoDelete(photo));
      return res;
    });
};


export const photoUpdateRequest = (photo) => (dispatch, getState) => {
  let { auth } = getState();
  return superagent.put(`${__API_URL__}/photos/${photo._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', photo.description)
    .attach('photo', photo.photo)
    .then(res => {
      dispatch(photoUpdate(res.body.data));
      return res;
    });
};