import { userRepository } from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import { conflict, unauthorized } from "../utils/http-error.js";
import type { RegisterInput, LoginInput } from "../validations/auth.validation.js";

export const authService = {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw conflict("E-mail já cadastrado");

    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      password: await hashPassword(input.password),
    });
    return { token: signToken({ userId: user.id }), user };
  },

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) throw unauthorized("Credenciais inválidas");

    const ok = await comparePassword(input.password, user.password);
    if (!ok) throw unauthorized("Credenciais inválidas");

    const { password: _omit, ...safe } = user;
    return { token: signToken({ userId: user.id }), user: safe };
  },
};
