export default async function handler(req, res) {
  // آدرس ثابت - هر چی خواستی همینجا عوض کن
  const targetUrl = 'https://web.telegram.org';
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    
    let data = await response.text();
    
    // جایگزینی لینک‌های نسبی به مطلق (برای اینکه دکمه‌ها کار کنن)
    data = data.replace(/(href|src)=["']\/([^"']*)["']/gi, `$1="https://web.telegram.org/$2"`);
    data = data.replace(/(href|src)=["'](?!https?:\/\/)([^"']*)["']/gi, `$1="https://web.telegram.org/$2"`);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(data);
    
  } catch (error) {
    res.status(500).send(`
      <html>
        <body style="font-family: monospace; padding: 20px;">
          <h1>خطا در ارتباط با سرور</h1>
          <p>${error.message}</p>
          <p>بررسی کن: آیا خودت به اینترنت بین‌المللی دسترسی داری؟</p>
        </body>
      </html>
    `);
  }
}
