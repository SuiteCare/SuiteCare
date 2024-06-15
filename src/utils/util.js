export const wageOptions = (min, max, step) => {
  const options = [];

  for (let i = min; i <= max; i += step) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return options;
};
