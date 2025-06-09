export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ message: 'חסר שם או טלפון' });
  }

  return res.status(200).json({ message: 'קיבלנו את הפרטים בהצלחה' });
}
