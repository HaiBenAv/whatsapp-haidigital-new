export default async function handler(req, res) {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'נא להזין שם וטלפון' });
  }

  const message = `קיבלנו את הפרטים שלך :) אפשר להתחיל לדבר כבר עכשיו כאן בצ'אט, אנחנו זמינים לכל שאלה`;

  const token = "cix41ldf8vy66f2x";
  const instanceId = "instance124608";

  // כאן אנחנו ממירים את המספר לפורמט בינ"ל
  let cleanedPhone = phone.trim();
  if (cleanedPhone.startsWith("0")) {
    cleanedPhone = "972" + cleanedPhone.slice(1);
  } else if (cleanedPhone.startsWith("+")) {
    cleanedPhone = cleanedPhone.replace("+", "");
  }

  const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;

  const payload = {
    token: token,
    to: cleanedPhone,
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
    res.status(500).json({ message: 'שגיאה בשליחת ההודעה ❌', error: error.message });
  }
}
