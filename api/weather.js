export default async function handler(req, res) {
  // Allow only GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Read query params
  const { city, state } = req.query;
  if (!city || !state) {
    return res.status(400).json({ error: 'Missing city or state' });
  }

  // Use the secret key from env
  const apiKey = process.env.WEATHER_API_KEY;
  const location = `${encodeURIComponent(city)},${encodeURIComponent(state)}`;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json({ error: data.error?.message || 'API error' });
    }
    return res.status(200).json(data);
  } catch (err) {
    console.error('Weather fetch error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
