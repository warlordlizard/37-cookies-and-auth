export default (state=[]. action) => {
  let {type, payload} = action;
  switch(type) {
    case 'PIC_SET':
      return payload;
    case 'PIC_CREATE':
      return [payload, ...state];
    case 'PIC_UPDATE' :
      return state.map(item => item._id ===payload._id ?payload : item);
    case 'PIC_DELETE' :
      return state.filter(item => item._id !== payload._id);
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};