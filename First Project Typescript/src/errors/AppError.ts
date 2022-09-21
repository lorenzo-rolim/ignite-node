const AppError = (message: string) => {
  return {
    message,
    status: 400,
  };
};

export { AppError };
