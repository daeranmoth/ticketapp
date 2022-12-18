import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    //we are on the server
    //requests have to be made to 'SERVICENAME.NAMESPACE.svc.cluster.local'
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/",
      headers: req.headers,
    });
  } else {
    //we are on the browser
    //requests have to be made to ''
    return axios.create({
      baseUrl: "/",
    });
  }
};

export default buildClient;
