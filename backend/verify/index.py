import json
import os
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для проверки и активации одноразовых QR-кодов охраной'''
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
    
    if method == 'GET':
        qr_code = event.get('queryStringParameters', {}).get('code', '')
        
        if not qr_code:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'QR code is required'}),
                'isBase64Encoded': False
            }
        
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "SELECT id, full_name, email, phone, is_used, used_at, created_at FROM guests WHERE qr_code = %s",
                    (qr_code,)
                )
                guest = cur.fetchone()
            
            conn.close()
            
            if not guest:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'valid': False, 'error': 'QR-код не найден'}),
                    'isBase64Encoded': False
                }
            
            if guest['is_used']:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'valid': False,
                        'used': True,
                        'error': 'QR-код уже использован',
                        'used_at': guest['used_at'].isoformat() if guest['used_at'] else None
                    }),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'valid': True,
                    'guest': {
                        'id': guest['id'],
                        'full_name': guest['full_name'],
                        'email': guest['email'],
                        'phone': guest['phone'],
                        'created_at': guest['created_at'].isoformat()
                    }
                }),
                'isBase64Encoded': False
            }
        except Exception as e:
            conn.close()
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        qr_code = body.get('code', '')
        
        if not qr_code:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'QR code is required'}),
                'isBase64Encoded': False
            }
        
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "SELECT id, full_name, is_used FROM guests WHERE qr_code = %s",
                    (qr_code,)
                )
                guest = cur.fetchone()
                
                if not guest:
                    conn.close()
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'success': False, 'error': 'QR-код не найден'}),
                        'isBase64Encoded': False
                    }
                
                if guest['is_used']:
                    conn.close()
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'success': False, 'error': 'QR-код уже использован'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute(
                    "UPDATE guests SET is_used = TRUE, used_at = %s WHERE qr_code = %s RETURNING id, full_name, used_at",
                    (datetime.now(), qr_code)
                )
                updated_guest = cur.fetchone()
                conn.commit()
            
            conn.close()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'guest': {
                        'id': updated_guest['id'],
                        'full_name': updated_guest['full_name'],
                        'used_at': updated_guest['used_at'].isoformat()
                    }
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
