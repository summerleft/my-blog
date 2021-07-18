const state = {
  username: "",
};
const mutations = {
  setState: (state, payload) => {
    Object.assign(state, payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
}