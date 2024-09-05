const { Monster } = require("../models");

module.exports = class MonsterController {
  static async getAllMonster(req, res, next) {
    try {
      const data = await Monster.findAll();
      res.status(200).json({ data: data, message: `success` });
    } catch (err) {
      console.log(err, "<<< err getAllMonster");
      next(err);
    }
  }

  static async getPerMonster(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Monster.findByPk(id);
      if (!data) {
        next({ name: "NotFound", message: `Monster id:${id} not found` });
        return;
      }
      res.status(200).json({ data: data, message: `success` });
    } catch (err) {
      console.log(err, "<<< err getPerMonster");
      next(err);
    }
  }
};
