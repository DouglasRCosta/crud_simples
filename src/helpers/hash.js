const bcrypt = require("bcrypt");
module.exports = {
  async encript(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
  async compararHash(password, hash) {
    const resultado = await bcrypt.compare(password, hash);
    return resultado;
  },
};
