import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";




@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    override handleRequest<UserPayload>(err: Error, user: UserPayload, info: Error): UserPayload {

        if (err || info || !user) {
            throw new UnauthorizedException("No permition por this");
        }

        return user
    }

}


