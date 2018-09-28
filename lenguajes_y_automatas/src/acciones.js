export const lexico = () => {
  return async dispatch => {
    const result = await services.generarLiquidacion(pkcolocadora, prestamos);
    dispatch({
      type: actionTypes.GENERAR_LIQUIDACION,
      payload: result
    });
  };
};