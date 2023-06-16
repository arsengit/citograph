export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `https://api.semanticscholar.org/graph/v1/author/${id}?fields=name,url,aliases,affiliations,homepage,paperCount,citationCount,hIndex,papers.paperId,papers.title,papers.abstract,papers.venue,papers.year,papers.citationCount,papers.fieldsOfStudy,papers.externalIds,papers.authors`,
      {
        headers: {
          'x-api-key': process.env.X_API_KEY,
        },
      },
    );

    const author = await response.json();
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
