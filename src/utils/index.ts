import UserService from "../services/UserService";

export async function checkAlreadyExists(data:string) {
  if (data === 'username') {
    const registered = await UserService.findByUsername(data);

    return registered;
  }

  if (data === 'email') {
    const registered = await UserService.findByEmail(data);

    return registered;
  }

  return null;
}