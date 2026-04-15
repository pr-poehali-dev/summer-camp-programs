import os
import json
import psycopg2

def handler(event: dict, context) -> dict:
    """Возвращает список всех заявок из квиза для страницы /admin"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "SELECT id, created_at, name, phone, shift, age, interests, goal, adaptation, experience, duration, priorities "
        "FROM leads ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    leads = [
        {
            "id": row[0],
            "created_at": row[1].isoformat() if row[1] else None,
            "name": row[2],
            "phone": row[3],
            "shift": row[4],
            "age": row[5],
            "interests": row[6],
            "goal": row[7],
            "adaptation": row[8],
            "experience": row[9],
            "duration": row[10],
            "priorities": row[11],
        }
        for row in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'leads': leads}, ensure_ascii=False)
    }
