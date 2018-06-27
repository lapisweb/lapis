
const getters = {
  permission_routers: state => {
    // 对应permission.js中的state.routers

      return  state.permission.routers;

   },
  addRouters: state => state.permission.addRouters
};
export default getters
