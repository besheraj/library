import {CDKDriveCustomer} from "./cdkDriveCustomer/api"

async function heelo() {
    const token = new CDKDriveCustomer({client_id:"blalk",client_secret:"sdkfksjdhf"})
    const init = await token.init()
    console.log(init)
};
heelo(); 