// content/quadratics/function.ts
function zeros(a: number, b: number, c: number) {
  const disc = b * b - 4 * a * c;
  if (disc < 0) return [];

  if (nearlyEquals(disc, 0, 0.1)) return [-b / (2 * a)];

  const x1 = (-b + Math.sqrt(disc)) / (2 * a);
  const x2 = (-b - Math.sqrt(disc)) / (2 * a);
  return [x1, x2];
}

module.exports = {
    zeros: zeros
};
