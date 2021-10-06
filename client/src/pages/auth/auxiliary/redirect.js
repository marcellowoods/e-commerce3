//https://reactrouter.com/web/example/auth-workflow

const roleBasedRedirect = (location, history, isAdmin) => {

    if(location && location.state && location.state.from){
        history.replace(location.state.from);

    } else if (isAdmin) {
        console.log("push admn")
        history.replace("/admin/dashboard");
    } else {
        console.log("push history")
        history.replace("/user/orders");
    }

}

export {roleBasedRedirect};

