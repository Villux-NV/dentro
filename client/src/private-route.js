const { useContext } = require("react");
const { Route, Redirect } = require("react-router");

const { AuthContext } = require("./components/auth");


const PrivateRoute = ({ component: RouteComponet, ...comps}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route 
      {...comps}
      render={routeProps => 
        !!currentUser ? (
          <RouteComponet {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;