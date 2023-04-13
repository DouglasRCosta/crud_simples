const { checkSchema } = require("express-validator");

module.exports = {
  editUser: checkSchema({
    firstName: {
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 3 },
        errorMessage: "O nome deve ter pelo menos 3 caracteres",
      },
      trim: true,
    },
    lastName: {
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 3 },
        errorMessage: "O nome deve ter pelo menos 3 caracteres",
      },
      trim: true,
    },
    email: {
      optional: { options: { nullable: true } },
      isEmail: {
        errorMessage: "Digite um email válido",
      },
    },
    password: {
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 6 },
        errorMessage: "A senha deve ter pelo menos 6 caracteres",
      },
    },
  }),
};
