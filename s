import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      let data = await kv.get('minhWebApp_data');
      if (!data) {
        data = {
          tasks: [{id: 1, text: "Ví dụ: Nộp bài tập lớn", category: 'hoctap', priority: 'high', startDateTime: new Date().toISOString(), endDateTime: new Date().toISOString(), completed: false}],
          calendarId: "lqm186005@gmail.com"
        };
      }
      return response.status(200).json(data);
    } 
    
    else if (request.method === 'POST') {
      const newData = request.body;
      await kv.set('minhWebApp_data', newData);
      return response.status(200).json({ message: 'Lưu dữ liệu thành công' });
    }
    
    else {
      return response.status(405).json({ error: 'Phương thức không được phép' });
    }
  } catch (error) {
    console.error('API Lỗi:', error);
    return response.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
}```

**b. Tệp `api/calendar.js`** (Để tạo sự kiện lịch)
```javascript
import { google } from 'googleapis';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Chỉ chấp nhận POST' });
  }

  try {
    const { calendarId, title, startTime, endTime } = request.body;
    
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });
    
    const event = {
      summary: title,
      start: { dateTime: startTime, timeZone: 'Asia/Ho_Chi_Minh' },
      end: { dateTime: endTime, timeZone: 'Asia/Ho_Chi_Minh' },
    };

    const createdEvent = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
    });
    
    return response.status(200).json({ message: 'Đã thêm sự kiện vào lịch thành công!' });

  } catch (error) {
    console.error('Lỗi API Calendar:', error);
    return response.status(500).json({ message: 'Lỗi khi tạo sự kiện lịch.' });
  }
}
