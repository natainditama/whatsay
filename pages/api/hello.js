// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        res.status(200).json(countries);
      } catch (err) {}
      break;
    default:
      res.status(404).json({ message: "Method not found" });
      break;
  }
}
