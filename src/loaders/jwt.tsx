import { client } from "utils/api/client";

type LoginDetails = {
  username: string;
  password: string;
};

export const getJWT = async (loginDetails: LoginDetails) => {
  const formData = new FormData();
  formData.append("username", loginDetails.username);
  formData.append("password", loginDetails.password);

  const response = await client.post(`token`, formData);
  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

export const handshake = async () => {
  console.log(sessionStorage.getItem("instrumentName"));
  const response = await client.post(`instruments/${sessionStorage.getItem("instrumentName")}/activate_instrument_server`, {});
  if (response.status !== 200) {
    return null;
  }

  return response.data;
}
