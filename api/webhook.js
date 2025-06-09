export default async function handler(req, res) {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'נא לספק שם וטלפון' });
  }

  const message = `קיבלנו את הפרטים שלך :) אפשר להתחיל לדבר כבר עכשיו כאן בצ'אט, אנחנו זמינים לכל שאלה`;
  const token = "cix41ldf8vy66f2x";
  const instanceId = "instance124608";

  const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;

  const payload = {
    token: token,
    to: phone.replace(/^0/, '972'), // המרה לפורמט בינלאומי (למשל 052 → 97252)
    body: message,
    priority: 10,
    referenceId: "msg001"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    res.status(200).json({ message: 'ההודעה נשלחה בהצלחה ✅', result });
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשליחת ההודעה', error: error.message });
  }
}
