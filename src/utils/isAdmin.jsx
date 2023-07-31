export const isAdmin = async (access_token) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/user/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = await response.json();

    if (user?.is_admin) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};
