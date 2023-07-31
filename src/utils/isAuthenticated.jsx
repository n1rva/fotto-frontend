export const isAuthenticatedUser = async (access_token) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/token/verify/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: access_token }),
      }
    );

    if (response.status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
};
