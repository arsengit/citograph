export default async function handler(req, res) {
  const { paper } = req.body;
  try {
    const responses = await Promise.all(
      paper.references.map((reference) =>
        fetch(
          `https://api.semanticscholar.org/graph/v1/paper/${reference.paperId}?fields=title,citations.paperId`,
          {
            headers: {
              'x-api-key': process.env.X_API_KEY,
            },
          },
        ).then((res) => res.json()),
      ),
    );

    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
