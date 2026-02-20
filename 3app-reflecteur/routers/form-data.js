export async function formData(req, res) {
  const formData = req.body;
  return res.send(
    `
    ${Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("<br>")}
    `,
  );
}
