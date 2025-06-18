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
        const result = request.user?.perms.indexOf(permitions) > -1; // check if user has permission

        return result;
    }
}


