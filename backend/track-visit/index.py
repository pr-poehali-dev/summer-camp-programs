import os
import json
import psycopg2

def handler(event: dict, context) -> dict:
    """Считает уникальные посещения сайта (один раз на visitor_id)"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if event.get('httpMethod') == 'POST':
        body = json.loads(event.get('body', '{}'))
        visitor_id = body.get('visitor_id', '')
        if visitor_id:
            cur.execute(
                "INSERT INTO visits (visitor_id) VALUES (%s) ON CONFLICT (visitor_id) DO NOTHING",
                (visitor_id,)
            )
            conn.commit()

    cur.execute("SELECT COUNT(*) FROM visits")
    total = cur.fetchone()[0]
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'total': total})
    }
