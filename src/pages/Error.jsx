import { useRouteError } from "react-router-dom";

const Error = () =>{
 const error = useRouteError();
 return (
  <div>
   <h2>{error.statustext}</h2>
  </div>
 )
}

export default Error;