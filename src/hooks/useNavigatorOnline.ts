import * as React from "react";

const getOnlineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine == "boolean"
    ? navigator.onLine
    : true;

const useNavigationOnline = () => {
  const [status, setStatus] = React.useState(getOnlineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);
  
  React.useEffect(()=> {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)
    }
  }, [])
  return status;
};

export default useNavigationOnline
