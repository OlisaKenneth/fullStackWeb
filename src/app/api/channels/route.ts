import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/channels – list all channels
export async function GET() {
  try {
    const channels = await prisma.channel.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(channels);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch channels' }, { status: 500 });
  }
}

// POST /api/channels – create a new channel (admin only for now)
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Channel name is required' }, { status: 400 });
    }
    const channel = await prisma.channel.create({
      data: { name: name.trim() },
    });
    return NextResponse.json(channel, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Channel name already exists' }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Failed to create channel' }, { status: 500 });
  }
}