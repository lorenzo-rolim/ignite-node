const AppError = (message: string) => {
  console.log(message);
  throw new Error();
};

export { AppError };
