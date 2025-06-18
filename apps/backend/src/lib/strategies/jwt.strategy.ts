import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { VerifyService } from "../services/verify.service.js";
import { Strategy, ExtractJwt } from 'passport-jwt';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private readonly verifyService: VerifyService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY || "hola",
        })
    }

    async validate(payload: any): Promise<any | null> {

        try {
            const { idUser, email, persistent, isMachine } = payload;
            const perms = await this.verifyService.getPermissions(+idUser);

            return {
                idUser,
                email,
                persistent: persistent ?? false,
                isMachine: isMachine ?? false,
                perms,
            };
        }
        catch (err) {
            console.log("error in strategy", err);
            return null;
        }
    }
}



