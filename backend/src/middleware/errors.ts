import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler,
} from "express";

/**
 * Ошибка с HTTP-статусом. Бросай её в сервисах/роутах, когда хочешь
 * вернуть конкретный код: throw new HttpError(409, "Out of stock").
 * Всё, что не HttpError, errorHandler ниже считает неожиданным → 500.
 */
export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * Обёртка для async-роутов. Express 4 НЕ ловит ошибки из async-функций,
 * поэтому ловим reject сами и передаём в next(err) — дальше его поймает
 * errorHandler. Использование:
 *   router.get("/", asyncHandler(async (req, res) => { ... }));
 */
export const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
  ): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };

/**
 * Глобальный обработчик ошибок. У него РОВНО 4 аргумента — именно по этой
 * сигнатуре Express понимает, что это error-middleware (а не обычный роут).
 * Монтируется ПОСЛЕДНИМ в app.ts, после всех роутов.
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err instanceof HttpError ? err.status : 500;
  if (status >= 500) console.error(err); // неожиданное логируем в консоль
  res.status(status).json({
    error: err instanceof HttpError ? err.message : "Internal server error",
  });
};
