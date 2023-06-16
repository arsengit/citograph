// pages/api/getPaperByAuthorId.js
export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const response = await fetch(
      `https://api.semanticscholar.org/graph/v1/author/${id}/papers?fields=title,abstract,year,venue,openAccessPdf,authors,citations,citations.paperId,citations.title,citations.citationCount,citations.influentialCitationCount,citations.year,citations.authors,citations.abstract,references.authors,references.paperId,references.title,references.url,references.venue,references.year,references.citationCount,references.influentialCitationCount,references.abstract`,
      {
        headers: {
          'x-api-key': process.env.X_API_KEY,
        },
      },
    );

    const paper = await response.json();
    res.status(200).json(paper);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
