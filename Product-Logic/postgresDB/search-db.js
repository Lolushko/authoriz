import db from "./db.js" 

class SearchDb {
  async search(limit, offset) {
    return db.query(`
    SELECT * FROM product
    LIMIT ${limit}
    OFFSET ${offset}`)
  }

  async searchN(name, limit, offset) {
    return db.query(`
    SELECT * FROM product
    WHERE name ILIKE '${name}'
    LIMIT ${limit}
    OFFSET ${offset}`)
  }

  async searchNC(name, color, limit, offset) {
    return db.query(`
    SELECT * FROM product
    WHERE name ILIKE '${name}'
    AND color ILIKE '${color}'
    LIMIT ${limit}
    OFFSET ${offset}`)
  }

  async searchNY(name, year, limit, offset) {
    return db.query(`
    SELECT * FROM product
    WHERE name ILIKE'${name}'
    AND year = '${year}'
    LIMIT ${limit}
    OFFSET ${offset}`)
  }

  async searchNM(name, model, limit, offset) {
    return db.query(`
    SELECT * FROM product
    WHERE name ILIKE '${name}'
    AND model ILIKE '${model}'
    LIMIT ${limit}
    OFFSET ${offset}`)
  }

  async searchNMY(name, model, year, limit, offset) {
    return db.query(`
    SELECT * FROM product
    WHERE name ILIKE'${name}'
    AND model ILIKE'${model}'
    AND year = '${year}'
    LIMIT ${limit}
    OFFSET ${offset}`)
  }

  async searchNMC(name, model, color, limit, offset) {
    return db.query(`
    SELECT * FROM product
    WHERE name ILIKE'${name}'
    AND model ILIKE'${model}'
    AND color ILIKE'${color}'
    LIMIT ${limit}
    OFFSET ${offset}`)
  }

  async searchNMCY(name, model, color, year, limit, offset) {
    return db.query(`
    SELECT * FROM product
    WHERE name ILIKE'${name}'
    AND model ILIKE'${model}'
    AND color ILIKE'${color}'
    AND year = '${year}'
    LIMIT ${limit}
    OFFSET ${offset}`)
  }
}

export default new SearchDb()