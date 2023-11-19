// const updateLeave = (l) =>{
//   const id = l.id
//   l.status=true;
//   fetch(`/leave/${id}`,{
//     method: 'PUT',
//     body:JSON.stringify(l),
//     headers: {
//       'Access-Control-Allow-Credentials':true,
//       // 'Access-Control-Allow-Origin': 'http://localhost:3000',
//       'Content-type': 'application/json; charset=UTF-8',
//     }
//   }).then(response => response.json()).then(data => console.log(data))
// }

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const login = (uname,pwd) => {
  return fetch('/auth',{
    method:'POST',
    body:JSON.stringify({
        username:uname,
        password:pwd
    }),
    headers: {
        'Access-Control-Allow-Credentials':true,
        // 'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-type': 'application/json; charset=UTF-8',
     }
    },{withCredentials: true}).then((response) => {
      let res=false;
      res = response.json().then((da)=> {
        if(response.status == 200){
          
          console.log(res);
          localStorage.setItem("user",JSON.stringify(da) );
          return true;
        }
      })

        if (response.data) {
            console.log("hi from login")
        }
        return res;
  });
}

const logout = () => {
    // removeCookie("token");
    localStorage.removeItem("user");
    return fetch('/auth/logout',{method:'POST'}).then(()=>{return true})
  };

const AuthService = {
    login,
    logout,
    getUser,
    // updateLeave
}
export default AuthService