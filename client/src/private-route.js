const { useContext } = require("react");
const { Route, Redirect } = require("react-router");

const { AuthContext } = require("./components/auth");


const PrivateRoute = ({ component: RouteComponent, ...comps}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route 
      {...comps}
      render={routeProps => 
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;