export default async function handler(req, res) {
  try {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/randomcard.php');
    const json = await response.json();
    const card = Array.isArray(json.data) ? json.data[0] : json;
    const imageUrl = card?.card_images?.[0]?.image_url_cropped;

    if (!imageUrl) {
      res.status(404).send('Card image not found');
      return;
    }

    res.writeHead(302, { Location: imageUrl });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching random card');
  }
}
