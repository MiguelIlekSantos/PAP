import { Injectable } from "@nestjs/common";
import { Permissions } from "../../data/permissionsList";




@Injectable()
export class VerifyService{

    async getPermissions(id: number) : Promise<string[]>{
        if (id === 747){
            return [Permissions.ADMIN]
        }

        return []
    }

}



