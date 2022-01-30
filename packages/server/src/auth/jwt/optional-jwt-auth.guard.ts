import { JwtAuthGuard } from './jwt-auth.guard';

export class OptionalJwtAuthGuard extends JwtAuthGuard {

  // Override handleRequest so it never throws an error
  public handleRequest(err, user, info, context) {
    return user;
  }

}
