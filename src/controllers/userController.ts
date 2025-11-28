import userService from "../services/userService";

export default {
    async list(_req: any, res: { json: (arg0: any) => void; }) {
        const users = await userService.listUsers();
        res.json(users);
    },

    async get(req: { params: { id: any; }; }, res: { json: (arg0: any) => void; }) {
        const user = await userService.getUser(Number(req.params.id));
        res.json(user);
    },

    async create(_req: any, _res: any) {
        // ...
    },

    async update(_req: any, _res: any) {
        // ...
    },

    async remove(_req: any, _res: any) {
        // ...
    },

    async resetPassword(_req: any, _res: any) {
        // ...
    }
};
