//https://reactrouter.com/web/example/auth-workflow

const roleBasedRedirect = (location, navigate, isAdmin) => {

    if(location && location.state && location.state.from){
        // history.replace(location.state.from);
        navigate(location.state.from, { replace: true });

    } else if (isAdmin) {
        // console.log("push admn")
        navigate("/admin/dashboard", { replace: true });
        // history.replace("/admin/dashboard");
    } else {
        // console.log("push history")
        // history.replace("/user/orders");
        navigate("/user/orders", { replace: true });
    }

}

export {roleBasedRedirect};

