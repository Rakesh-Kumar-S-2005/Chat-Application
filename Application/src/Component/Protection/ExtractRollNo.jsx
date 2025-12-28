export const ExtractRollNo = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    // console.log("Decoded Payload:", decodedPayload);
    return decodedPayload.sub;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
