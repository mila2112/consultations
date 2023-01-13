import client from "./models/clients";
import bcrypt from "bcrypt";
import lawyer from "./models/lawyer";
const seed = async function() {
    try {
        const salt = await bcrypt.genSalt(10);
        await client.create([
            { firstName: "Анна",lastName:"Саргсян", patronymic: "Ден",phone:"098989898",password: await bcrypt.hash("ann111222" , salt)},
            { firstName: "Арсен",lastName:"Акопян", patronymic: "Армен",phone:"098787878",password: await bcrypt.hash("ars7878787", salt) },
        ]);
        await lawyer.create([
            { firstName: "Армен",lastName:"Багдасарян", patronymic: "Сурен",phone:"077878787",password: await bcrypt.hash("arm7878787", salt), laws:"civil law" },
            { firstName: "Лилит",lastName:"Саргсян", patronymic: "Арман",phone:"097898989",password: await bcrypt.hash("lil7878787", salt)},
        ]);
        console.log("Database seeded.");
    }
    catch (err){
        console.log("error=>",err)
    }
};
export default seed;
