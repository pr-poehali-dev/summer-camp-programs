import os
import json
import urllib.request
# v3

def handler(event: dict, context) -> dict:
    """Отправляет данные заявки из квиза в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '—')
    phone = body.get('phone', '—')
    shift = body.get('shift', '—')
    age = body.get('age', '—')
    interests = body.get('interests', '—')
    goal = body.get('goal', '—')
    adaptation = body.get('adaptation', '—')
    experience = body.get('experience', '—')
    duration = body.get('duration', '—')
    priorities = body.get('priorities', '—')

    text = (
        f"🎉 <b>Новая заявка из квиза!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Телефон:</b> {phone}\n"
        f"🏕️ <b>Подобранная смена:</b> {shift}\n\n"
        f"📋 <b>Ответы квиза:</b>\n"
        f"• Возраст: {age}\n"
        f"• Интересы: {interests}\n"
        f"• Цель: {goal}\n"
        f"• Адаптация: {adaptation}\n"
        f"• Опыт лагерей: {experience}\n"
        f"• Длительность: {duration}\n"
        f"• Приоритеты: {priorities}"
    )

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({
        'chat_id': int(chat_id),
        'text': text,
        'parse_mode': 'HTML'
    }).encode('utf-8')

    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
    urllib.request.urlopen(req)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }