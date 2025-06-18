export type CreateUserDTO = {
  name: string;
  email: string;
  passwordHash: string;
};

export type UpdateUserDTO = Partial<CreateUserDTO>;
