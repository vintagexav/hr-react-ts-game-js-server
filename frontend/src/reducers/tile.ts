const tile = (state = null, action: { payload: { activeTile: number }; type: string }) => {
  switch (action.type) {
    case 'SET_ACTIVE_TILE':
      return action.payload;
    default:
      return state;
  }
};

export default tile;
