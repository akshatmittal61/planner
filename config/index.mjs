 import env from "dotenv";

// config();

// export const PORT = process.env.PORT;
// export const dbUri = process.env.MONGO_CONNECTION_URL;
// export const jwtSecret = process.env.JWT_SECRET;

class Config{
    _config={}
    constructor(){
        env.config();
        this._config={
            PORT=process.env.PORT,
            dbUri=process.env.MONGO_CONNECTION_URL,
            jwtSecret=process.env.JWT_SECRET
        }
    }
    get(key) {
        const val = this._config[key] ?? null;

        if (!val) {
            throw new Error(`Config for key [${key}] not found`);
        }

        return val;
    }
    set(key, val) {
        this._config[key] = val;
    }
}

const config = new Config();

export default config;