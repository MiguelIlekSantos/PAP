import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorator.js";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector : Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const permitions = this.reflector.get(Roles, context.getHandler()) // get roles needed from route 

        if (!permitions) {
            return false
        }

        const request = context.switchToHttp().getRequest();  // get info from request
        const userPerms = request.user?.perms ?? [];

        if (userPerms.includes("admin")) {
            return true
        }

        const result = permitions.some((perm) => userPerms.includes(perm));

        return result;
    }
}


