const getAlpha = (opacity: number) => {
  return Math.round(opacity * 255).toString(16).padStart(2, "0");
};

export default getAlpha;
