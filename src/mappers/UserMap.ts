export default class UserMap {
    //Altere de any para a sua model de User
    public static toDTO(user: any) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    }
  }
  