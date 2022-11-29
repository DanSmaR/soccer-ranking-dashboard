import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ITeamModel from '../utils/interfaces/team/team.model.interface';
import HttpException from '../utils/exceptions/http.exception';
import IMatch from '../resources/match/match.interface';

function verifyTeamMiddleware(teamModel: ITeamModel): RequestHandler {
  return async (
    req: Request<unknown, unknown, Omit<IMatch, 'id' | 'inProgress'>>,
    _res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { awayTeam, homeTeam } = req.body;
    const teams = await Promise.all([awayTeam, homeTeam].map((id) => teamModel.findById(id)));
    console.log({ teams });
    const hasNoTeam = teams.some((team) => team === null);
    if (hasNoTeam) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }
    return next();
  };
}

export default verifyTeamMiddleware;
