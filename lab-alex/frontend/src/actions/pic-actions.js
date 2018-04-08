import superagent from 'superagent';

export const picSet = (pics) => ({
  type: 'PIC_SET',
  payload: pics,
});

export const picCreate = (pic) => ({
  type: 'PIC_CREATE',
  payload: pic,
});

export const picUpdate = (pic) => ({
  type: 'PIC_UPDATE',
  payload: pic,
});

export const picDelete = (pic) => ({
  type: 'PIC_DELETE',
  payload: pic,
});

export const picsFetchRequest = (pics) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/pics/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then( res => {
      dispatch(picSet(res.body.data));
      return res;
    });
};

export const picCreateRequest = (pic) => (dispatch, getState) => {
  let { auth } = getState();
  return superagent.post(`${__API_URL__}/pics`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', pic.desc)
    .attach('pic', pic.pic)
    .then(res => {
      dispatch(picCreate(res.body.data));
      return res;
    });
};


export const picDeleteRequest = (pic) => (dispatch, getState) => {
  let { auth } = getState();
  return superagent.delete(`${__API_URL__}/pics/${pic._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(picDelete(pic));
      return res;
    });
};


export const picUpdateRequest = (pic) => (dispatch, getState) => {
  let { auth } = getState();
  return superagent.put(`${__API_URL__}/pics/${pic._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', pic.desc)
    .attach('pic', pic.pic)
    .then(res => {
      dispatch(picUpdate(res.body.data));
      return res;
    });
};