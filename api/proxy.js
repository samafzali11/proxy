export default async function handler(req, res) {
  // گرفتن آدرس مقصد از پارامترهای درخواست
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'لطفا پارامتر url را وارد کنید' });
  }
  
  try {
    // درخواست به سایت مقصد
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const data = await response.text();
    
    // برگرداندن پاسخ به کاربر
    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'text/html');
    res.status(200).send(data);
    
  } catch (error) {
    res.status(500).json({ error: 'خطا در ارتباط با سرور مقصد' });
  }
}
