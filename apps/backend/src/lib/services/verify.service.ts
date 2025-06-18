import { Injectable } from "@nestjs/common";




@Injectable()
export class VerifyService{

    async getPermissions(id: number) : Promise<string[]>{
        if (id === 100){
            return ['permission1', 'permission3']
        }

        return []
    }

}



