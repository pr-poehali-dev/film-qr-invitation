import json
import os
import hashlib
import secrets
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для регистрации гостей и генерации одноразовых QR-кодов'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(dsn)
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        full_name = body.get('full_name', '').strip()
        email = body.get('email', '').strip()
        phone = body.get('phone', '').strip()
        
        if not full_name or not email:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Full name and email are required'}),
                'isBase64Encoded': False
            }
        
        qr_code = hashlib.sha256(secrets.token_bytes(32)).hexdigest()[:32]
        
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "INSERT INTO guests (full_name, email, phone, qr_code) VALUES (%s, %s, %s, %s) RETURNING id, qr_code, created_at",
                    (full_name, email, phone, qr_code)
                )
                guest = cur.fetchone()
                conn.commit()
            
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': guest['id'],
                    'qr_code': guest['qr_code'],
                    'full_name': full_name,
                    'created_at': guest['created_at'].isoformat()
                }),
                'isBase64Encoded': False
            }
        except Exception as e:
            conn.rollback()
            conn.close()
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    conn.close()
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
