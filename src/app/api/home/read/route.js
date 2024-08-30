import { getDataHome } from '@/service/data/home'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { idHome } = await request.json()

    const response = await getDataHome(idHome)

    let json_response = {
      status: 'success',
      data: response,
    }
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
