import { useEffect, useState } from "react";

const API_ENPOINT = "https://686eea1b91e85fac429f4c1c.mockapi.io/api";

type RequestType = {
  loading?: boolean;
};
export const useGetFlags = () => {
  const [request, setRequest] = useState<RequestType & { data?: { flag: string; prefix: string }[] }>();

  useEffect(() => {
    setRequest({ loading: true });
    fetch(`${API_ENPOINT}/countries`)
      .then((res) => res.json())
      .then((data) => setRequest({ data, loading: false }));
  }, []);

  return { loading: request?.loading, data: request?.data };
};

export const useGetCountries = () => {
  const [request, setRequest] = useState<RequestType & { data?: { countryName: string; id: string }[] }>();

  useEffect(() => {
    setRequest({ loading: true });
    fetch(`${API_ENPOINT}/countryNames`)
      .then((res) => res.json())
      .then((data) => setRequest({ data, loading: false }));
  }, []);

  return { loading: request?.loading, data: request?.data };
};
