let validate = (profile) => {
  if(!profile.avatar || !profile.bio || !profile.id || !profile.owner || !profile.username || !profile.email) {
    throw new Error('VALIDATION ERROR: missing needed items');
  }
};

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type) {
    case 'PROFILE_CREATE':
      validate(payload);
      return payload;
    case 'PROFILE_UPDATE':
      if(!state) throw new Error('profile is null');
      validate(payload);
      return {...state, ...payload};
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};