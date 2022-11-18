export const getRandomCoordsAndRotation = () => {
  const screenHeight = window.innerHeight - 150;
  const screenWidth = window.innerWidth - 150;

  const xPos = getRandomNumber(150, screenWidth);
  const yPos = getRandomNumber(150, screenHeight);

  const allowedDegrees = [350, 351, 352, 353, 354, 355, 3, 4, 5, 6];
  const randomIndex = Math.floor(getRandomNumber(0, 10));

  return {
    xPos,
    yPos,
    rotation: `${allowedDegrees[randomIndex]}deg`,
  };
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.random() * (max - min) + min;
};
