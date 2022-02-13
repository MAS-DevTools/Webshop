const ApiEndpoints = {
    /**Classes */
    GetAllProducts:"http://localhost:6400/products",
    GetAllCatogories:"http://localhost:6400/products/categories",
    GetCategory: "http://localhost:6400/products/category/",
    Login:"http://localhost:6400/auth/login",
    Register:"http://localhost:6400/users",
    Validatetoken: "http://localhost:6400/auth/validatetoken",
    Order:"http://localhost:6400/carts",
    GetUserCart:"http://localhost:6400/carts/user/",
    Methods:{
      POST:"Post",
      GET:"GET",
      PATCH:"PATCH",
      DELETE:"DELETE"
    }
  };
  
  export default ApiEndpoints;
  